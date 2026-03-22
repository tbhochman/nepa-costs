"use client";

import { useState, ReactNode } from "react";
import { useInView } from "react-intersection-observer";

interface Step {
  content: ReactNode;
}

interface ScrollSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  source?: string;
  sourceUrl?: string;
  steps: Step[];
  chart: (activeStep: number) => ReactNode;
  reverse?: boolean;
}

export function ScrollSection({
  id,
  title,
  subtitle,
  source,
  sourceUrl,
  steps,
  chart,
  reverse = false,
}: ScrollSectionProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id={id} className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[var(--muted)] text-lg">{subtitle}</p>
          )}
          {source && (
            <div className="mt-3">
              {sourceUrl ? (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-badge hover:bg-[var(--accent)]/20 transition-colors"
                >
                  {source}
                </a>
              ) : (
                <span className="source-badge">{source}</span>
              )}
            </div>
          )}
        </div>

        {/* Side-by-side layout */}
        <div
          className={`flex flex-col lg:flex-row gap-8 ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Sticky chart */}
          <div className="lg:w-3/5 lg:sticky lg:top-20 lg:self-start">
            <div className="chart-container bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] p-6 min-h-[400px] flex items-center justify-center">
              {chart(activeStep)}
            </div>
          </div>

          {/* Scrollable steps */}
          <div className="lg:w-2/5 space-y-4">
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
          </div>
        </div>
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
    threshold: 0.6,
    onChange: (inView) => {
      if (inView) onInView();
    },
  });

  return (
    <div
      ref={ref}
      className={`p-6 rounded-xl border transition-all duration-300 min-h-[200px] flex items-center ${
        active
          ? "border-[var(--accent)]/30 bg-[var(--accent)]/5"
          : "border-transparent bg-transparent opacity-40"
      }`}
    >
      <div>
        <div className="text-xs text-[var(--accent)] font-mono mb-2">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="text-sm md:text-base leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
