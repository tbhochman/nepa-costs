"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { CHART_COLORS, formatCost } from "@/lib/chartUtils";

const reviewTypes = [
  { type: "CE", cost: 50000, label: "Categorical\nExclusion" },
  { type: "EA", cost: 200000, label: "Environmental\nAssessment" },
  { type: "EIS (avg)", cost: 6000000, label: "Environmental\nImpact Statement" },
  { type: "Complex EIS", cost: 25000000, label: "Major\nProjects" },
];

const costHistory = [
  { year: 2003, cost: 250000 },
  { year: 2006, cost: 800000 },
  { year: 2009, cost: 2000000 },
  { year: 2012, cost: 3500000 },
  { year: 2016, cost: 7500000 },
];

interface CostWaterfallProps {
  activeStep: number;
}

export function CostWaterfall({ activeStep }: CostWaterfallProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const prevStep = useRef(activeStep);

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

    if (activeStep <= 1) {
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
    } else {
      // Cost history trend
      const x = d3
        .scaleLinear()
        .domain([2002, 2017])
        .range([0, innerW]);

      const y = d3
        .scaleLinear()
        .domain([0, 8000000])
        .range([innerH, 0]);

      // Grid
      g.append("g")
        .attr("class", "grid")
        .selectAll("line")
        .data(y.ticks(4))
        .join("line")
        .attr("x1", 0)
        .attr("x2", innerW)
        .attr("y1", (d) => y(d))
        .attr("y2", (d) => y(d));

      // Area
      const area = d3
        .area<(typeof costHistory)[0]>()
        .x((d) => x(d.year))
        .y0(innerH)
        .y1((d) => y(d.cost))
        .curve(d3.curveMonotoneX);

      g.append("path")
        .datum(costHistory)
        .attr("fill", `${CHART_COLORS.danger}15`)
        .attr("d", area);

      // Line
      const line = d3
        .line<(typeof costHistory)[0]>()
        .x((d) => x(d.year))
        .y((d) => y(d.cost))
        .curve(d3.curveMonotoneX);

      const path = g
        .append("path")
        .datum(costHistory)
        .attr("fill", "none")
        .attr("stroke", CHART_COLORS.danger)
        .attr("stroke-width", 2.5)
        .attr("d", line);

      const pathLength = path.node()!.getTotalLength();
      path
        .attr("stroke-dasharray", pathLength)
        .attr("stroke-dashoffset", pathLength)
        .transition()
        .duration(1200)
        .attr("stroke-dashoffset", 0);

      // Dots + labels
      costHistory.forEach((d, i) => {
        g.append("circle")
          .attr("cx", x(d.year))
          .attr("cy", y(d.cost))
          .attr("r", 0)
          .attr("fill", CHART_COLORS.danger)
          .transition()
          .delay(i * 150 + 400)
          .duration(300)
          .attr("r", 5);

        g.append("text")
          .attr("x", x(d.year))
          .attr("y", y(d.cost) - 14)
          .attr("text-anchor", "middle")
          .attr("fill", CHART_COLORS.foreground)
          .attr("font-size", 12)
          .attr("font-weight", 600)
          .attr("opacity", 0)
          .text(formatCost(d.cost))
          .transition()
          .delay(i * 150 + 500)
          .duration(300)
          .attr("opacity", 1);
      });

      // Multiplier annotation
      g.append("text")
        .attr("x", innerW / 2)
        .attr("y", y(7500000) - 20)
        .attr("text-anchor", "middle")
        .attr("fill", CHART_COLORS.danger)
        .attr("font-size", 16)
        .attr("font-weight", 700)
        .attr("opacity", 0)
        .text("30x increase in 13 years")
        .transition()
        .delay(1500)
        .duration(500)
        .attr("opacity", 1);

      // Axes
      g.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${innerH})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(5)
            .tickFormat((d) => String(d))
        )
        .select(".domain")
        .remove();

      g.append("g")
        .attr("class", "axis")
        .call(
          d3
            .axisLeft(y)
            .ticks(4)
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
