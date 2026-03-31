"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { CHART_COLORS, formatCost } from "@/lib/chartUtils";

const reviewTypes = [
  { type: "CE", cost: 50000, label: "Categorical\nExclusion" },
  { type: "EA", cost: 200000, label: "Environmental\nAssessment" },
  { type: "EIS (avg)", cost: 6000000, label: "Environmental\nImpact Statement" },
  { type: "Complex EIS", cost: 25000000, label: "Major\nProjects" },
];

interface CostWaterfallProps {
  activeStep: number;
}

export function CostWaterfall({ activeStep }: CostWaterfallProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const margin = { top: 30, right: 20, bottom: 50, left: 70 };
    const width = containerWidth;
    const height = Math.min(420, containerWidth * 0.65);
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

    {
      // Waterfall view of review types
      const x = d3
        .scaleBand()
        .domain(reviewTypes.map((d) => d.type))
        .range([0, innerW])
        .padding(0.25);

      const y = d3
        .scaleLog()
        .domain([30000, 30000000])
        .range([innerH, 0]);

      // Grid
      [50000, 200000, 1000000, 5000000, 25000000].forEach((tick) => {
        g.append("line")
          .attr("x1", 0)
          .attr("x2", innerW)
          .attr("y1", y(tick))
          .attr("y2", y(tick))
          .attr("stroke", CHART_COLORS.cardBorder)
          .attr("stroke-opacity", 0.3);
      });

      const colors = [CHART_COLORS.success, CHART_COLORS.blue, CHART_COLORS.accent, CHART_COLORS.danger];

      reviewTypes.forEach((d, i) => {
        const barHeight = innerH - y(d.cost);
        g.append("rect")
          .attr("x", x(d.type)!)
          .attr("width", x.bandwidth())
          .attr("y", innerH)
          .attr("height", 0)
          .attr("fill", colors[i])
          .attr("rx", 4)
          .transition()
          .duration(600)
          .delay(i * 150)
          .attr("y", y(d.cost))
          .attr("height", barHeight);

        g.append("text")
          .attr("x", x(d.type)! + x.bandwidth() / 2)
          .attr("y", y(d.cost) - 10)
          .attr("text-anchor", "middle")
          .attr("fill", colors[i])
          .attr("font-size", 14)
          .attr("font-weight", 700)
          .attr("opacity", 0)
          .text(formatCost(d.cost))
          .transition()
          .delay(i * 150 + 400)
          .duration(400)
          .attr("opacity", 1);
      });

      // X axis
      g.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${innerH})`)
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain")
        .remove();

      // Y axis
      g.append("g")
        .attr("class", "axis")
        .call(
          d3
            .axisLeft(y)
            .tickValues([50000, 200000, 1000000, 5000000, 25000000])
            .tickFormat((d) => formatCost(d as number))
        )
        .select(".domain")
        .remove();
    }
  }, [activeStep]);

  return (
    <div ref={containerRef} className="w-full">
      <svg ref={svgRef} />
    </div>
  );
}
