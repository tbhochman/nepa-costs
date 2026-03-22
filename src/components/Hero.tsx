"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: 4.5, suffix: " years", label: "Average EIS completion time", decimals: 1 },
  { value: 1703, suffix: " pages", label: "Average EIS length", decimals: 0 },
  { value: 6, prefix: "$", suffix: "M", label: "Average EIS cost (DOE)", decimals: 0 },
];

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const raf = useRef(0);
  const start = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;
    const animate = (ts: number) => {
      if (!start.current) start.current = ts;
      const p = Math.min((ts - start.current) / 2000, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(eased * value);
      if (p < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [started, value]);

  return (
    <span className="font-bold tabular-nums">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(var(--muted) 1px, transparent 1px), linear-gradient(90deg, var(--muted) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-4xl"
      >
        <div className="text-[var(--accent)] text-sm font-mono tracking-widest uppercase mb-6">
          An Interactive Data Story
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          The Cost of{" "}
          <span className="text-[var(--accent)]">NEPA</span>
        </h1>

        <p className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto mb-16 leading-relaxed">
          How the National Environmental Policy Act shapes the time, cost, and
          outcome of American infrastructure — told through the best available data.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)]"
            >
              <div className="text-4xl md:text-5xl text-[var(--accent)]">
                <AnimatedNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </div>
              <div className="text-sm text-[var(--muted)] mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--muted)]"
      >
        <span className="text-xs">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full border-2 border-[var(--muted)] flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-[var(--muted)] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
