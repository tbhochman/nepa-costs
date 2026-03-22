"use client";

import { motion } from "framer-motion";
import { formatNumber, formatCost } from "@/lib/chartUtils";

const levels = [
  {
    type: "EIS",
    fullName: "Environmental Impact Statement",
    volume: 100,
    cost: 6000000,
    time: "4.5 years",
    share: "~0.5%",
    color: "#f59e0b",
    width: 30,
  },
  {
    type: "EA",
    fullName: "Environmental Assessment",
    volume: 10000,
    cost: 200000,
    time: "1-2 years",
    share: "~4.5%",
    color: "#3b82f6",
    width: 60,
  },
  {
    type: "CE",
    fullName: "Categorical Exclusion",
    volume: 45000,
    cost: 50000,
    time: "~105 days",
    share: "~95%",
    color: "#22c55e",
    width: 100,
  },
];

interface NEPAPyramidProps {
  activeStep: number;
}

export function NEPAPyramid({ activeStep }: NEPAPyramidProps) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex flex-col items-center gap-3">
        {levels.map((level, i) => {
          const isActive = activeStep >= i;
          const isHighlighted = activeStep === i;
          return (
            <motion.div
              key={level.type}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{
                opacity: isActive ? 1 : 0.2,
                scaleX: isActive ? 1 : 0.8,
              }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="w-full"
              style={{ maxWidth: `${level.width}%` }}
            >
              <div
                className={`relative rounded-lg p-4 border transition-all duration-300 ${
                  isHighlighted ? "ring-2 ring-offset-2 ring-offset-[var(--background)]" : ""
                }`}
                style={{
                  backgroundColor: `${level.color}15`,
                  borderColor: `${level.color}40`,
                  // ring color set via Tailwind class
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="text-lg font-bold"
                    style={{ color: level.color }}
                  >
                    {level.type}
                  </span>
                  <span className="text-xs text-[var(--muted)]">
                    {level.share} of reviews
                  </span>
                </div>
                <div className="text-xs text-[var(--muted)]">
                  {level.fullName}
                </div>

                {isHighlighted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 pt-3 border-t border-[var(--card-border)] grid grid-cols-3 gap-2"
                  >
                    <div>
                      <div className="text-xs text-[var(--muted)]">Volume/yr</div>
                      <div className="text-sm font-semibold">
                        ~{formatNumber(level.volume)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[var(--muted)]">Avg Cost</div>
                      <div className="text-sm font-semibold">
                        {formatCost(level.cost)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[var(--muted)]">Timeline</div>
                      <div className="text-sm font-semibold">{level.time}</div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {activeStep >= 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center text-sm text-[var(--muted)]"
        >
          Total estimated annual NEPA cost:{" "}
          <span className="text-[var(--accent)] font-semibold">$1-5 billion</span>
        </motion.div>
      )}
    </div>
  );
}
