"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { CHART_COLORS } from "@/lib/chartUtils";
import { useInView } from "react-intersection-observer";

const data = [
  { era: "1970s", pages: 30, label: "Early NEPA" },
  { era: "1980s", pages: 150, label: "Growth" },
  { era: "1990s", pages: 350, label: "Expansion" },
  { era: "2000s", pages: 600, label: "Pre-reform" },
  { era: "2013-18", pages: 1703, label: "Recent avg" },
];

const CEQ_MAX = 150;

interface PageCountTimelineProps {
  activeStep: number;
}

export function PageCountTimeline({ activeStep }: PageCountTimelineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  // Mark as animated once in view
  useEffect(() => {
    if (inView && !hasAnimated) setHasAnimated(true);
  }, [inView, hasAnimated]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const margin = { top: 30, right: 20, bottom: 50, left: 60 };
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

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.era))
      .range([0, innerW])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, 1900])
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

    // CEQ recommended max line (always show once step >= 1)
    if (activeStep >= 1) {
      g.append("line")
        .attr("x1", 0)
        .attr("x2", innerW)
        .attr("y1", y(CEQ_MAX))
        .attr("y2", y(CEQ_MAX))
        .attr("stroke", CHART_COLORS.danger)
        .attr("stroke-dasharray", "6,4")
        .attr("stroke-width", 1.5)
        .attr("opacity", 0)
        .transition()
        .duration(600)
        .attr("opacity", 1);

      g.append("text")
        .attr("x", innerW - 4)
        .attr("y", y(CEQ_MAX) - 8)
        .attr("text-anchor", "end")
        .attr("fill", CHART_COLORS.danger)
        .attr("font-size", 11)
        .text("FRA page limit: 150 pages")
        .attr("opacity", 0)
        .transition()
        .duration(600)
        .attr("opacity", 1);
    }

    // ALL bars appear together
    const animDuration = hasAnimated ? 0 : 800;

    g.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.era)!)
      .attr("width", x.bandwidth())
      .attr("y", hasAnimated ? (d) => y(d.pages) : innerH)
      .attr("height", hasAnimated ? (d) => innerH - y(d.pages) : 0)
      .attr("fill", (d) =>
        d.pages > CEQ_MAX ? CHART_COLORS.accent : CHART_COLORS.blue
      )
      .attr("rx", 4)
      .transition()
      .duration(animDuration)
      .ease(d3.easeCubicOut)
      .attr("y", (d) => y(d.pages))
      .attr("height", (d) => innerH - y(d.pages));

    // Labels on bars
    g.selectAll(".bar-label")
      .data(data)
      .join("text")
      .attr("class", "bar-label")
      .attr("x", (d) => x(d.era)! + x.bandwidth() / 2)
      .attr("y", (d) => y(d.pages) - 8)
      .attr("text-anchor", "middle")
      .attr("fill", CHART_COLORS.foreground)
      .attr("font-size", 13)
      .attr("font-weight", 600)
      .attr("opacity", 0)
      .text((d) => d.pages.toLocaleString())
      .transition()
      .duration(400)
      .delay(hasAnimated ? 0 : 600)
      .attr("opacity", 1);

    // Axes
    g.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(x).tickSize(0))
      .select(".domain")
      .remove();

    g.append("g")
      .attr("class", "axis")
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickFormat((d) => `${d} pg`)
      )
      .select(".domain")
      .remove();

    // Stacked breakdown for last bar (step 2+)
    if (activeStep >= 2) {
      const lastBar = data[data.length - 1];
      const barX = x(lastBar.era)!;
      const mainBody = 661;
      const appendices = 1042;

      g.append("line")
        .attr("x1", barX)
        .attr("x2", barX + x.bandwidth())
        .attr("y1", y(mainBody))
        .attr("y2", y(mainBody))
        .attr("stroke", CHART_COLORS.foreground)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "3,3")
        .attr("opacity", 0)
        .transition()
        .delay(200)
        .duration(400)
        .attr("opacity", 0.6);

      const annotX = barX + x.bandwidth() + 8;
      g.append("text")
        .attr("x", annotX)
        .attr("y", y(mainBody + appendices / 2))
        .attr("fill", CHART_COLORS.muted)
        .attr("font-size", 10)
        .attr("opacity", 0)
        .text("← appendices: 1,042 pg")
        .transition()
        .delay(300)
        .duration(400)
        .attr("opacity", 1);

      g.append("text")
        .attr("x", annotX)
        .attr("y", y(mainBody / 2))
        .attr("fill", CHART_COLORS.muted)
        .attr("font-size", 10)
        .attr("opacity", 0)
        .text("← main body: 661 pg")
        .transition()
        .delay(400)
        .duration(400)
        .attr("opacity", 1);
    }
  }, [activeStep, hasAnimated]);

  return (
    <div ref={(el) => { containerRef.current = el; inViewRef(el); }} className="w-full">
      <svg ref={svgRef} />
    </div>
  );
}
