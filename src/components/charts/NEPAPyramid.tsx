"use client";

import { motion, AnimatePresence } from "framer-motion";
import { formatNumber, formatCost } from "@/lib/chartUtils";

const levels = [
  {
    type: "EIS",
    fullName: "Environmental Impact Statement",
    volume: 100,
    cost: 6000000,
    time: "4.5 years",
    share: "~0.5%",
    color: "#FF4F00",
    width: 55,
  },
  {
    type: "EA",
    fullName: "Environmental Assessment",
    volume: 10000,
    cost: 200000,
    time: "1-2 years",
    share: "~4.5%",
    color: "#4997D0",
    width: 78,
  },
  {
    type: "CE",
    fullName: "Categorical Exclusion",
    volume: 45000,
    cost: 50000,
    time: "1 day–6 mo",
    share: "~95%",
    color: "#FFA300",
    width: 100,
  },
];

interface NEPAPyramidProps {
  activeStep: number;
}

export function NEPAPyramid({ activeStep }: NEPAPyramidProps) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex flex-col items-center gap-4">
        {levels.map((level, i) => {
          const isHighlighted = activeStep === i;
          const isPast = activeStep > i;
          return (
            <motion.div
              key={level.type}
              className="w-full"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{
                opacity: isHighlighted ? 1 : isPast ? 0.5 : 0.2,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: "easeOut",
              }}
              style={{
                maxWidth: `${level.width}%`,
              }}
            >
              <div
                className={`relative rounded-lg p-4 border transition-all duration-500 ${
                  isHighlighted
                    ? "ring-2 ring-offset-2 ring-offset-[var(--background)] ring-[var(--accent)]"
                    : ""
                }`}
                style={{
                  backgroundColor: `${level.color}15`,
                  borderColor: isHighlighted ? level.color : `${level.color}30`,
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

                <AnimatePresence>
                  {isHighlighted && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-[var(--card-border)] grid grid-cols-3 gap-2">
                        <div>
                          <div className="text-xs text-[var(--muted)]">
                            Volume/yr
                          </div>
                          <div className="text-sm font-semibold">
                            ~{formatNumber(level.volume)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-[var(--muted)]">
                            Avg Cost
                          </div>
                          <div className="text-sm font-semibold">
                            {formatCost(level.cost)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-[var(--muted)]">
                            Timeline
                          </div>
                          <div className="text-sm font-semibold">
                            {level.time}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {activeStep >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 text-center text-sm text-[var(--muted)]"
        >
          Total estimated annual NEPA cost:{" "}
          <span className="text-[var(--accent)] font-semibold">
            $1-5 billion
          </span>
        </motion.div>
      )}
    </div>
  );
}
