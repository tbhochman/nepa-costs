"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { CHART_COLORS, SECTOR_COLORS } from "@/lib/chartUtils";
import { motion } from "framer-motion";

import litigationData from "../../../public/data/litigation.json";

interface LitigationDashboardProps {
  activeStep: number;
}

export function LitigationDashboard({ activeStep }: LitigationDashboardProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const margin = { top: 20, right: 20, bottom: 40, left: 130 };
    const width = containerWidth;
    const height = Math.min(350, containerWidth * 0.55);
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%");

    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    if (activeStep <= 1) {
      // Sector breakdown - horizontal bar chart
      const sectors = litigationData.breakthrough.bySector;
      const y = d3
        .scaleBand()
        .domain(sectors.map((s) => s.sector))
        .range([0, innerH])
        .padding(0.25);

      const x = d3.scaleLinear().domain([0, 45]).range([0, innerW]);

      // Grid
      x.ticks(4).forEach((tick) => {
        g.append("line")
          .attr("x1", x(tick))
          .attr("x2", x(tick))
          .attr("y1", 0)
          .attr("y2", innerH)
          .attr("stroke", CHART_COLORS.cardBorder)
          .attr("stroke-opacity", 0.3);
      });

      const sectorColorMap: Record<string, string> = {
        "Public Lands/Forestry": SECTOR_COLORS.forestry,
        Energy: SECTOR_COLORS.solar,
        Transportation: SECTOR_COLORS.highways,
        "Water/Coastal": SECTOR_COLORS.water,
        "Mining/Minerals": SECTOR_COLORS.mining,
      };

      sectors.forEach((sector, i) => {
        const color = sectorColorMap[sector.sector] || CHART_COLORS.muted;

        g.append("rect")
          .attr("x", 0)
          .attr("y", y(sector.sector)!)
          .attr("width", 0)
          .attr("height", y.bandwidth())
          .attr("fill", color)
          .attr("rx", 4)
          .transition()
          .duration(600)
          .delay(i * 100)
          .attr("width", x(sector.share));

        g.append("text")
          .attr("x", x(sector.share) + 6)
          .attr("y", y(sector.sector)! + y.bandwidth() / 2)
          .attr("dominant-baseline", "middle")
          .attr("fill", CHART_COLORS.foreground)
          .attr("font-size", 12)
          .attr("font-weight", 600)
          .attr("opacity", 0)
          .text(`${sector.share}%`)
          .transition()
          .delay(i * 100 + 400)
          .duration(300)
          .attr("opacity", 1);

        if (activeStep >= 1 && sector.agencyWinRate) {
          g.append("text")
            .attr("x", x(sector.share) + 40)
            .attr("y", y(sector.sector)! + y.bandwidth() / 2)
            .attr("dominant-baseline", "middle")
            .attr("fill", CHART_COLORS.muted)
            .attr("font-size", 10)
            .attr("opacity", 0)
            .text(`(${sector.agencyWinRate}% agency win)`)
            .transition()
            .delay(i * 100 + 600)
            .duration(300)
            .attr("opacity", 1);
        }
      });

      g.append("g")
        .attr("class", "axis")
        .selectAll("text")
        .data(sectors)
        .join("text")
        .attr("x", -8)
        .attr("y", (d) => y(d.sector)! + y.bandwidth() / 2)
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "middle")
        .attr("fill", CHART_COLORS.muted)
        .attr("font-size", 11)
        .text((d) => d.sector);
    }
  }, [activeStep]);

  return (
    <div className="w-full space-y-4">
      <div ref={containerRef}>
        <svg ref={svgRef} />
      </div>

      {/* Key stats below chart */}
      {activeStep >= 0 && (
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              value: `${litigationData.breakthrough.agencyWinRate}%`,
              label: "Agency win rate",
              color: CHART_COLORS.success,
            },
            {
              value: `${litigationData.breakthrough.ngoInitiated}%`,
              label: "Filed by NGOs",
              color: CHART_COLORS.accent,
            },
            {
              value: `${litigationData.breakthrough.avgYearsToResolution}yr`,
              label: "Avg resolution",
              color: CHART_COLORS.danger,
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center p-3 rounded-lg bg-[var(--section-alt)] border border-[var(--card-border)]"
            >
              <div
                className="text-xl font-bold"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-[var(--muted)]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Clean energy litigation rates */}
      {activeStep >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-[var(--section-alt)] border border-[var(--card-border)]"
        >
          <div className="text-sm font-semibold mb-3">
            Clean Energy EIS Litigation Rates (RFF)
          </div>
          <div className="space-y-2">
            {[
              { type: "Wind EIS", rate: 50, color: SECTOR_COLORS.wind },
              { type: "Solar EIS", rate: 37.5, color: SECTOR_COLORS.solar },
              { type: "Geothermal EIS", rate: 33, color: SECTOR_COLORS.geothermal },
            ].map((item) => (
              <div key={item.type}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{item.type}</span>
                  <span style={{ color: item.color }}>{item.rate}%</span>
                </div>
                <div className="h-2 bg-[var(--card-border)] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.rate}%` }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

    </div>
  );
}
