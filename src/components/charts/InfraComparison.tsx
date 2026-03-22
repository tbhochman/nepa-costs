"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { CHART_COLORS } from "@/lib/chartUtils";
import { motion } from "framer-motion";

import sectorData from "../../../public/data/sector-projects.json";

const projectOutcomes = [
  { status: "Completed", share: 46, color: CHART_COLORS.success },
  { status: "Still in Progress", share: 40, color: CHART_COLORS.accent },
  { status: "Cancelled", share: 14, color: CHART_COLORS.danger },
];

interface InfraComparisonProps {
  activeStep: number;
}

export function InfraComparison({ activeStep }: InfraComparisonProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const margin = { top: 20, right: 20, bottom: 40, left: 10 };
    const width = containerWidth;
    const height = Math.min(300, containerWidth * 0.5);
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

    if (activeStep === 0) {
      // Project outcomes donut
      const radius = Math.min(innerW, innerH) / 2.2;
      const donutG = g.append("g").attr("transform", `translate(${innerW / 2},${innerH / 2})`);

      const pie = d3.pie<(typeof projectOutcomes)[0]>().value((d) => d.share).sort(null);
      const arc = d3.arc<d3.PieArcDatum<(typeof projectOutcomes)[0]>>().innerRadius(radius * 0.55).outerRadius(radius);

      donutG
        .selectAll("path")
        .data(pie(projectOutcomes))
        .join("path")
        .attr("fill", (d) => d.data.color)
        .attr("stroke", "var(--background)")
        .attr("stroke-width", 2)
        .transition()
        .duration(800)
        .attrTween("d", function (d) {
          const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
          return (t) => arc(interpolate(t)) || "";
        });

      // Center text
      donutG.append("text").attr("text-anchor", "middle").attr("dominant-baseline", "middle").attr("fill", CHART_COLORS.foreground).attr("font-size", 22).attr("font-weight", 700).text("355");
      donutG.append("text").attr("text-anchor", "middle").attr("y", 22).attr("fill", CHART_COLORS.muted).attr("font-size", 11).text("major projects");

      // Legend
      projectOutcomes.forEach((item, i) => {
        const ly = innerH - 20 + i * 0 ;
        donutG.append("circle").attr("cx", radius + 20).attr("cy", -30 + i * 22).attr("r", 5).attr("fill", item.color);
        donutG.append("text").attr("x", radius + 30).attr("y", -30 + i * 22).attr("dominant-baseline", "middle").attr("fill", CHART_COLORS.foreground).attr("font-size", 12).text(`${item.status}: ${item.share}%`);
      });
    }
  }, [activeStep]);

  return (
    <div className="w-full space-y-4">
      <div ref={containerRef}>
        <svg ref={svgRef} />
      </div>

      {/* Highway cost and international comparison */}
      {activeStep >= 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="p-4 rounded-xl bg-[var(--danger)]/5 border border-[var(--danger)]/20">
            <div className="text-2xl font-bold text-[var(--danger)]">3x</div>
            <div className="text-sm text-[var(--muted)] mt-1">
              Highway cost per mile increase (1960s → 1980s)
            </div>
            <div className="text-xs text-[var(--muted)] mt-2 opacity-60">
              Liscow & Brooks
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[var(--accent)]/5 border border-[var(--accent)]/20">
            <div className="text-2xl font-bold text-[var(--accent)]">80%</div>
            <div className="text-sm text-[var(--muted)] mt-1">
              Longer than peer nations for permitting
            </div>
            <div className="text-xs text-[var(--muted)] mt-2 opacity-60">
              NAM/FAI Survey
            </div>
          </div>
        </motion.div>
      )}

      {/* Sector cancellation rates */}
      {activeStep >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-[var(--section-alt)] border border-[var(--card-border)]"
        >
          <div className="text-sm font-semibold mb-3">
            Cancellation Rates by Sector (Bennon & Wilson)
          </div>
          <div className="space-y-2">
            {sectorData.sectors
              .filter((s) => s.metrics && "cancellationRate" in s.metrics && s.metrics.cancellationRate)
              .sort((a, b) => ((b.metrics as { cancellationRate?: number }).cancellationRate || 0) - ((a.metrics as { cancellationRate?: number }).cancellationRate || 0))
              .map((sector) => {
                const rate = (sector.metrics as { cancellationRate?: number }).cancellationRate;
                return (
                  <div key={sector.id}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{sector.name}</span>
                      <span className="text-[var(--danger)]">{rate}%</span>
                    </div>
                    <div className="h-2 bg-[var(--card-border)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${rate}%` }}
                        transition={{ duration: 0.6 }}
                        className="h-full rounded-full bg-[var(--danger)]"
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </motion.div>
      )}

      {/* Delay attribution context */}
      {activeStep >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl border border-[var(--accent)]/20 bg-[var(--accent)]/5"
        >
          <div className="text-sm">
            <span className="font-semibold text-[var(--accent)]">
              Nuance matters:
            </span>{" "}
            68-84% of delays are attributed to factors &ldquo;outside NEPA&rdquo;
            — decision-maker changes, poor documentation, project modifications,
            ESA compliance, and court challenges. The relationship between NEPA
            and cost/delay is real but multifactorial.
          </div>
        </motion.div>
      )}
    </div>
  );
}
