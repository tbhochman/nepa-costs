"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { CHART_COLORS } from "@/lib/chartUtils";

import timelineData from "../../../public/data/eis-timelines.json";

interface EISTimelineChartProps {
  activeStep: number;
}

export function EISTimelineChart({ activeStep }: EISTimelineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const margin = { top: 30, right: 30, bottom: 50, left: 50 };
    const width = containerWidth;
    const height = Math.min(400, containerWidth * 0.6);
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

    const data = timelineData.medianByYear;

    const x = d3
      .scaleLinear()
      .domain([2010, 2024])
      .range([0, innerW]);

    const y = d3
      .scaleLinear()
      .domain([0, 5.5])
      .range([innerH, 0]);

    // Grid
    g.append("g")
      .attr("class", "grid")
      .selectAll("line")
      .data(y.ticks(5))
      .join("line")
      .attr("x1", 0)
      .attr("x2", innerW)
      .attr("y1", (d) => y(d))
      .attr("y2", (d) => y(d));

    // FRA 2-year deadline line
    g.append("line")
      .attr("x1", 0)
      .attr("x2", innerW)
      .attr("y1", y(2))
      .attr("y2", y(2))
      .attr("stroke", CHART_COLORS.success)
      .attr("stroke-dasharray", "6,4")
      .attr("stroke-width", 1.5);

    g.append("text")
      .attr("x", 4)
      .attr("y", y(2) - 8)
      .attr("fill", CHART_COLORS.success)
      .attr("font-size", 11)
      .text("FRA 2-year target");

    // Area fill
    const area = d3
      .area<(typeof data)[0]>()
      .x((d) => x(d.year))
      .y0(innerH)
      .y1((d) => y(d.medianYears))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(data)
      .attr("fill", `${CHART_COLORS.accent}15`)
      .attr("d", area);

    // Line
    const line = d3
      .line<(typeof data)[0]>()
      .x((d) => x(d.year))
      .y((d) => y(d.medianYears))
      .curve(d3.curveMonotoneX);

    const path = g
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", CHART_COLORS.accent)
      .attr("stroke-width", 2.5)
      .attr("d", line);

    // Animate line drawing (only on first render)
    const pathLength = path.node()!.getTotalLength();
    if (!hasDrawn) {
      path
        .attr("stroke-dasharray", pathLength)
        .attr("stroke-dashoffset", pathLength)
        .transition()
        .duration(1500)
        .ease(d3.easeQuadOut)
        .attr("stroke-dashoffset", 0);
    }

    // Dots
    g.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => x(d.year))
      .attr("cy", (d) => y(d.medianYears))
      .attr("r", hasDrawn ? 4 : 0)
      .attr("fill", CHART_COLORS.accent)
      .transition()
      .duration(hasDrawn ? 0 : 400)
      .delay((_, i) => hasDrawn ? 0 : i * 80 + 500)
      .attr("r", 4);

    if (!hasDrawn) setHasDrawn(true);

    // Highlight annotations based on step
    if (activeStep >= 1) {
      // Peak year
      const peak = data.reduce((a, b) =>
        a.medianYears > b.medianYears ? a : b
      );
      g.append("text")
        .attr("x", x(peak.year))
        .attr("y", y(peak.medianYears) - 15)
        .attr("text-anchor", "middle")
        .attr("fill", CHART_COLORS.danger)
        .attr("font-size", 12)
        .attr("font-weight", 600)
        .attr("opacity", 0)
        .text(`Peak: ${peak.medianYears} years (${peak.year})`)
        .transition()
        .duration(500)
        .attr("opacity", 1);
    }

    if (activeStep >= 1) {
      // Current year
      const latest = data[data.length - 1];
      g.append("text")
        .attr("x", x(latest.year))
        .attr("y", y(latest.medianYears) - 15)
        .attr("text-anchor", "end")
        .attr("fill", CHART_COLORS.success)
        .attr("font-size", 12)
        .attr("font-weight", 600)
        .attr("opacity", 0)
        .text(`${latest.medianYears} years (${latest.year})`)
        .transition()
        .delay(300)
        .duration(500)
        .attr("opacity", 1);
    }

    // Agency bars for step 3
    if (activeStep >= 3) {
      const agencies = timelineData.topAgencies.slice(0, 4);
      const agencyY = d3
        .scaleBand()
        .domain(agencies.map((a) => a.abbrev))
        .range([innerH * 0.1, innerH * 0.7])
        .padding(0.3);

      const agencyX = d3
        .scaleLinear()
        .domain([0, 7])
        .range([innerW * 0.55, innerW]);

      // Background
      g.append("rect")
        .attr("x", innerW * 0.5)
        .attr("y", 0)
        .attr("width", innerW * 0.52)
        .attr("height", innerH)
        .attr("fill", "var(--background)")
        .attr("opacity", 0)
        .transition()
        .duration(300)
        .attr("opacity", 0.9);

      g.append("text")
        .attr("x", innerW * 0.75)
        .attr("y", 5)
        .attr("text-anchor", "middle")
        .attr("fill", CHART_COLORS.foreground)
        .attr("font-size", 12)
        .attr("font-weight", 600)
        .attr("opacity", 0)
        .text("By Agency (avg years)")
        .transition()
        .delay(200)
        .duration(400)
        .attr("opacity", 1);

      agencies.forEach((agency, i) => {
        g.append("rect")
          .attr("x", innerW * 0.55)
          .attr("y", agencyY(agency.abbrev)!)
          .attr("width", 0)
          .attr("height", agencyY.bandwidth())
          .attr("fill", CHART_COLORS.accent)
          .attr("rx", 3)
          .attr("opacity", 0.7)
          .transition()
          .delay(400 + i * 100)
          .duration(600)
          .attr(
            "width",
            agencyX(agency.avgYears) - innerW * 0.55
          );

        g.append("text")
          .attr("x", innerW * 0.54)
          .attr("y", agencyY(agency.abbrev)! + agencyY.bandwidth() / 2)
          .attr("text-anchor", "end")
          .attr("dominant-baseline", "middle")
          .attr("fill", CHART_COLORS.foreground)
          .attr("font-size", 11)
          .attr("opacity", 0)
          .text(agency.abbrev)
          .transition()
          .delay(400 + i * 100)
          .duration(400)
          .attr("opacity", 1);

        g.append("text")
          .attr(
            "x",
            agencyX(agency.avgYears) + 4
          )
          .attr("y", agencyY(agency.abbrev)! + agencyY.bandwidth() / 2)
          .attr("dominant-baseline", "middle")
          .attr("fill", CHART_COLORS.accent)
          .attr("font-size", 11)
          .attr("font-weight", 600)
          .attr("opacity", 0)
          .text(`${agency.avgYears}y`)
          .transition()
          .delay(600 + i * 100)
          .duration(400)
          .attr("opacity", 1);
      });
    }

    // Axes
    g.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${innerH})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(8)
          .tickFormat((d) => String(d))
      )
      .select(".domain")
      .remove();

    g.append("g")
      .attr("class", "axis")
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickFormat((d) => `${d}yr`)
      )
      .select(".domain")
      .remove();
  }, [activeStep]);

  return (
    <div ref={containerRef} className="w-full">
      <svg ref={svgRef} />
    </div>
  );
}
