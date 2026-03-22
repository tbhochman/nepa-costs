"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface StatCardProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  source?: string;
  decimals?: number;
  duration?: number;
  highlight?: boolean;
}

export function StatCard({
  value,
  prefix = "",
  suffix = "",
  label,
  source,
  decimals = 0,
  duration = 2000,
  highlight = false,
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (!inView) return;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(eased * value);

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [inView, value, duration]);

  return (
    <div
      ref={ref}
      className={`text-center p-6 rounded-xl border ${
        highlight
          ? "border-[var(--accent)]/30 bg-[var(--accent)]/5"
          : "border-[var(--card-border)] bg-[var(--card-bg)]"
      }`}
    >
      <div
        className={`text-4xl md:text-5xl font-bold stat-number ${
          highlight ? "text-[var(--accent)]" : "text-[var(--foreground)]"
        }`}
      >
        {prefix}
        {displayValue.toFixed(decimals)}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-[var(--muted)]">{label}</div>
      {source && <div className="source-badge mt-2">{source}</div>}
    </div>
  );
}
