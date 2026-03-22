"use client";

import { motion } from "framer-motion";

interface CleanEnergyParadoxProps {
  activeStep: number;
}

export function CleanEnergyParadox({ activeStep }: CleanEnergyParadoxProps) {
  return (
    <div className="w-full max-w-lg mx-auto space-y-8">
      {/* Step 0: EIS energy breakdown */}
      {activeStep >= 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-sm text-[var(--muted)] mb-3">
            Energy-related EIS reviews by type
          </div>
          <div className="flex gap-1 h-12 rounded-lg overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "62%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[var(--accent)] flex items-center justify-center text-xs font-semibold text-[var(--background)]"
            >
              Clean Energy 62%
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "16%" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-[var(--muted)] flex items-center justify-center text-xs font-semibold text-[var(--background)]"
            >
              Fossil 16%
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "22%" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-[var(--card-border)] flex items-center justify-center text-xs font-semibold"
            >
              Other 22%
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Step 1: Offshore wind */}
      {activeStep >= 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-sm text-[var(--muted)] mb-3">
            Offshore Wind Status (MW)
          </div>
          <div className="space-y-2">
            {[
              {
                label: "Operational",
                value: 42,
                max: 19555,
                color: "var(--success)",
              },
              {
                label: "Under Construction",
                value: 932,
                max: 19555,
                color: "var(--accent)",
              },
              {
                label: "Stuck in Permitting",
                value: 18581,
                max: 19555,
                color: "var(--danger)",
              },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.label}</span>
                  <span className="font-semibold" style={{ color: item.color }}>
                    {item.value.toLocaleString()} MW
                  </span>
                </div>
                <div className="h-3 bg-[var(--card-border)] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(item.value / item.max) * 100}%`,
                    }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 2: Geothermal reviews */}
      {activeStep >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-sm text-[var(--muted)] mb-3">
            Geothermal: 6 NEPA Reviews for 1 Project
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Land EA",
              "Leasing EA",
              "Exploration CE",
              "Wells EA",
              "Wellfield EA",
              "Construction EIS",
            ].map((review, i) => (
              <motion.div
                key={review}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="px-3 py-2 rounded-lg bg-[var(--danger)]/10 border border-[var(--danger)]/20 text-sm"
              >
                <span className="text-[var(--danger)] font-mono text-xs mr-1.5">
                  {i + 1}
                </span>
                {review}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
