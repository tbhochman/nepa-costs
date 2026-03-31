"use client";

import { useState, ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

interface Step {
  content: ReactNode;
}

interface ScrollSectionProps {
  id: string;
  title: string;
  subtitle?: ReactNode;
  steps: Step[];
  chart: (activeStep: number) => ReactNode;
  reverse?: boolean;
}

export function ScrollSection({
  id,
  title,
  subtitle,
  steps,
  chart,
  reverse = false,
}: ScrollSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
  });

  return (
    <section id={id} className="py-28 px-4" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="max-w-2xl mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="w-12 h-[3px] bg-[var(--accent)] mb-6 rounded-full" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[var(--muted)] text-lg leading-relaxed">{subtitle}</p>
          )}
        </motion.div>

        {/* Side-by-side layout */}
        <motion.div
          className={`flex flex-col lg:flex-row gap-8 ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
          initial={{ opacity: 0, y: 40 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Sticky chart */}
          <div className="lg:w-3/5 lg:sticky lg:top-20 lg:self-start">
            <div className="chart-container bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] p-6 min-h-[400px] flex items-center justify-center">
              {chart(activeStep)}
            </div>
          </div>

          {/* Scrollable steps */}
          <div className="lg:w-2/5 space-y-16">
            {steps.map((step, i) => (
              <StepBlock
                key={i}
                index={i}
                active={activeStep === i}
                onInView={() => setActiveStep(i)}
              >
                {step.content}
              </StepBlock>
            ))}
            <div className="h-[30vh]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StepBlock({
  children,
  index,
  active,
  onInView,
}: {
  children: ReactNode;
  index: number;
  active: boolean;
  onInView: () => void;
}) {
  const { ref } = useInView({
    threshold: 0.5,
    rootMargin: "-35% 0px -35% 0px",
    onChange: (inView) => {
      if (inView) onInView();
    },
  });

  return (
    <div
      ref={ref}
      className={`relative rounded-xl transition-all duration-500 ease-out min-h-[250px] flex items-center overflow-hidden ${
        active
          ? "bg-[var(--card-bg)]"
          : "bg-transparent opacity-40"
      }`}
      style={{
        transform: active ? "scale(1)" : "scale(0.97)",
        transition: "all 500ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Left accent border */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-all duration-500"
        style={{
          background: active ? "var(--accent)" : "transparent",
        }}
      />
      <div className="p-8 pl-7">
        <div className="text-xs text-[var(--accent)] font-[family-name:var(--font-ibm-plex-mono)] mb-2">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="text-sm md:text-base leading-relaxed text-[var(--foreground)]">{children}</div>
      </div>
    </div>
  );
}
