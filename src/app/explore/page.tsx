"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import sectorData from "../../../public/data/sector-projects.json";
import { SECTOR_COLORS, formatCost } from "@/lib/chartUtils";

type Sector = (typeof sectorData.sectors)[number];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyMetrics = Record<string, any>;

const ICONS: Record<string, string> = {
  sun: "\u2600\uFE0F",
  wind: "\uD83C\uDF2C\uFE0F",
  zap: "\u26A1",
  flame: "\uD83D\uDD25",
  road: "\uD83D\uDEE3\uFE0F",
  trees: "\uD83C\uDF32",
  pipeline: "\uD83D\uDEE2\uFE0F",
  pickaxe: "\u26CF\uFE0F",
  droplets: "\uD83D\uDCA7",
};

const SECTOR_IMAGES: Record<string, string> = {
  solar: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=300&fit=crop&q=60",
  wind: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&h=300&fit=crop&q=60",
  transmission: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=300&fit=crop&q=60",
  geothermal: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=600&h=300&fit=crop&q=60",
  highways: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&h=300&fit=crop&q=60",
  forestry: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=300&fit=crop&q=60",
  pipelines: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&h=300&fit=crop&q=60",
  mining: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&h=300&fit=crop&q=60",
  water: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=300&fit=crop&q=60",
};

function MetricRow({ label, value }: { label: string; value: string | number | null | undefined }) {
  if (value === null || value === undefined) return null;
  return (
    <div className="flex justify-between py-1.5 border-b border-[var(--card-border)] last:border-0">
      <span className="text-sm text-[var(--muted)]">{label}</span>
      <span className="text-sm font-semibold">{String(value)}</span>
    </div>
  );
}

function SectorCard({ sector, onClick, isSelected }: { sector: Sector; onClick: () => void; isSelected: boolean }) {
  const color = SECTOR_COLORS[sector.id] || "#64748b";
  const metrics = sector.metrics as AnyMetrics;

  return (
    <motion.button
      layout
      onClick={onClick}
      className={`text-left rounded-xl border transition-all overflow-hidden card-hover ${
        isSelected
          ? "border-[var(--accent)] bg-[var(--accent)]/5 ring-1 ring-[var(--accent)]/20"
          : "border-[var(--card-border)] bg-white shadow-sm hover:border-[var(--muted)]"
      }`}
    >
      {/* Sector image banner */}
      {SECTOR_IMAGES[sector.id] && (
        <div className="relative h-24 overflow-hidden">
          <img
            src={SECTOR_IMAGES[sector.id]}
            alt={sector.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-40" />
        </div>
      )}
      <div className="p-5">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{ICONS[sector.icon] || ""}</span>
        <div>
          <div className="font-semibold">{sector.name}</div>
          <div
            className="text-xs px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: `${color}20`,
              color,
            }}
          >
            {sector.tier === "primary" ? "Strong data" : "Moderate data"}
          </div>
        </div>
      </div>
      <p className="text-xs text-[var(--muted)] line-clamp-2">
        {sector.keyFinding}
      </p>

      {/* Quick metrics */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        {metrics.avgEISMonths && (
          <div className="text-center p-2 rounded bg-[var(--section-alt)]">
            <div className="text-lg font-bold" style={{ color }}>
              {String(metrics.avgEISMonths)}mo
            </div>
            <div className="text-[10px] text-[var(--muted)]">EIS avg</div>
          </div>
        )}
        {metrics.avgTimelineYears && (
          <div className="text-center p-2 rounded bg-[var(--section-alt)]">
            <div className="text-lg font-bold" style={{ color }}>
              {String(metrics.avgTimelineYears)}yr
            </div>
            <div className="text-[10px] text-[var(--muted)]">avg timeline</div>
          </div>
        )}
        {metrics.litigationRateEIS && (
          <div className="text-center p-2 rounded bg-[var(--section-alt)]">
            <div className="text-lg font-bold text-[var(--danger)]">
              {String(metrics.litigationRateEIS)}%
            </div>
            <div className="text-[10px] text-[var(--muted)]">litigation</div>
          </div>
        )}
        {metrics.cancellationRate && (
          <div className="text-center p-2 rounded bg-[var(--section-alt)]">
            <div className="text-lg font-bold text-[var(--danger)]">
              {String(metrics.cancellationRate)}%
            </div>
            <div className="text-[10px] text-[var(--muted)]">cancelled</div>
          </div>
        )}
        {metrics.shareOfEIS && (
          <div className="text-center p-2 rounded bg-[var(--section-alt)]">
            <div className="text-lg font-bold" style={{ color }}>
              {String(metrics.shareOfEIS)}%
            </div>
            <div className="text-[10px] text-[var(--muted)]">of all EIS</div>
          </div>
        )}
        {metrics.shareOfLitigation && (
          <div className="text-center p-2 rounded bg-[var(--section-alt)]">
            <div className="text-lg font-bold text-[var(--danger)]">
              {String(metrics.shareOfLitigation)}%
            </div>
            <div className="text-[10px] text-[var(--muted)]">of litigation</div>
          </div>
        )}
      </div>
      </div>
    </motion.button>
  );
}

function SectorDetail({ sector }: { sector: Sector }) {
  const color = SECTOR_COLORS[sector.id] || "#64748b";
  const metrics = sector.metrics as AnyMetrics;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{ICONS[sector.icon] || ""}</span>
        <div>
          <h3 className="text-xl font-bold">{sector.name}</h3>
          <div className="text-sm text-[var(--muted)]">{sector.source}</div>
        </div>
      </div>

      <p className="text-sm mb-6 p-3 rounded-lg" style={{ backgroundColor: `${color}10`, borderLeft: `3px solid ${color}` }}>
        {sector.keyFinding}
      </p>

      {("caveat" in sector) && sector.caveat && (
        <div className="mb-4 p-3 rounded-lg bg-[var(--accent)]/5 border border-[var(--accent)]/20 text-sm">
          <span className="font-semibold text-[var(--accent)]">Note: </span>
          {String(sector.caveat)}
        </div>
      )}

      <div className="space-y-0">
        <MetricRow label="EIS projects analyzed" value={metrics.eisProjects as string} />
        <MetricRow label="EA projects analyzed" value={metrics.eaProjects as string} />
        <MetricRow label="Avg EIS timeline" value={metrics.avgEISMonths ? `${metrics.avgEISMonths} months` : (metrics.avgEISYears ? `${metrics.avgEISYears} years` : null)} />
        <MetricRow label="Avg EA timeline" value={metrics.avgEAMonths ? `${metrics.avgEAMonths} months` : null} />
        <MetricRow label="Meets 2-year target" value={metrics.meetsTwoYearTarget ? `${metrics.meetsTwoYearTarget}%` : null} />
        <MetricRow label="EA meets 1-year target" value={metrics.eaMeetsOneYear ? `${metrics.eaMeetsOneYear}%` : null} />
        <MetricRow label="Avg overall timeline" value={metrics.avgTimelineYears ? `${metrics.avgTimelineYears} years` : null} />
        <MetricRow label="Time waiting for approval" value={metrics.timeWaitingForApproval ? `${metrics.timeWaitingForApproval}%` : null} />
        <MetricRow label="EIS litigation rate" value={metrics.litigationRateEIS ? `${metrics.litigationRateEIS}%` : (metrics.litigationRate ? `${metrics.litigationRate}%` : null)} />
        <MetricRow label="EA litigation rate" value={metrics.litigationRateEA ? `${metrics.litigationRateEA}%` : null} />
        <MetricRow label="Cancellation rate" value={metrics.cancellationRate ? `${metrics.cancellationRate}%` : null} />
        <MetricRow label="Share of all EIS" value={metrics.shareOfEIS ? `${metrics.shareOfEIS}%` : null} />
        <MetricRow label="Share of all litigation" value={metrics.shareOfLitigation ? `${metrics.shareOfLitigation}%` : null} />
        <MetricRow label="Agency win rate" value={metrics.agencyWinRate ? `${metrics.agencyWinRate}%` : null} />
        <MetricRow label="Capacity added" value={metrics.capacityAdded as string} />
        <MetricRow label="Share of national capacity growth" value={metrics.capacityShare ? `${metrics.capacityShare}%` : null} />
        <MetricRow label="Projects analyzed" value={metrics.projectsAnalyzed as string} />
        <MetricRow label="Paperwork duration" value={metrics.paperworkYears ? `${metrics.paperworkYears} years` : null} />
        <MetricRow label="Multiple reviews required" value={metrics.multipleReviews ? `Up to ${metrics.multipleReviews}` : null} />
        <MetricRow label="Cost per mile change" value={metrics.costPerMileChange as string} />
        <MetricRow label="Transit cost comparison" value={metrics.transitCostComparison as string} />
      </div>

      {/* Offshore wind special section */}
      {"offshoreWind" in sector && sector.offshoreWind && (
        <div className="mt-6 p-4 rounded-xl bg-[var(--section-alt)]">
          <div className="text-sm font-semibold mb-3">Offshore Wind Status</div>
          <div className="space-y-2">
            {[
              { label: "Operational", value: (sector.offshoreWind as {operational: number}).operational, color: "var(--success)" },
              { label: "Under Construction", value: (sector.offshoreWind as {underConstruction: number}).underConstruction, color: "var(--accent)" },
              { label: "In Permitting", value: (sector.offshoreWind as {stuckInPermitting: number}).stuckInPermitting, color: "var(--danger)" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span>{item.label}</span>
                <span className="font-semibold" style={{ color: item.color }}>
                  {item.value.toLocaleString()} MW
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function ExplorePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "primary" | "secondary">("all");

  const sectors = sectorData.sectors.filter(
    (s) => filter === "all" || s.tier === filter
  );
  const selected = sectorData.sectors.find((s) => s.id === selectedId);

  return (
    <div className="pt-20 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <Link
            href="/"
            className="text-sm text-[var(--accent)] hover:underline mb-4 inline-block"
          >
            &larr; Back to story
          </Link>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Sector Explorer
          </h1>
          <p className="text-[var(--muted)] max-w-2xl">
            Compare NEPA timelines, costs, litigation rates, and outcomes across
            industry sectors. Sectors are ranked by data quality and coverage.
          </p>

          <div className="flex gap-2 mt-6">
            {(["all", "primary", "secondary"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                  filter === f
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "border-[var(--card-border)] text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {f === "all"
                  ? "All Sectors"
                  : f === "primary"
                  ? "Strong Data"
                  : "Moderate Data"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sector grid */}
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sectors.map((sector) => (
              <SectorCard
                key={sector.id}
                sector={sector}
                isSelected={selectedId === sector.id}
                onClick={() =>
                  setSelectedId(selectedId === sector.id ? null : sector.id)
                }
              />
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:w-1/2 lg:sticky lg:top-20 lg:self-start">
            <AnimatePresence mode="wait">
              {selected ? (
                <SectorDetail key={selected.id} sector={selected} />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-64 flex items-center justify-center rounded-2xl border border-dashed border-[var(--card-border)] text-[var(--muted)]"
                >
                  <p>Select a sector to view detailed data</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Clean Energy Paradox callout */}
        <div className="mt-16 p-6 rounded-2xl bg-[var(--accent)]/5 border border-[var(--accent)]/20">
          <h3 className="text-lg font-bold mb-2">The Clean Energy Paradox</h3>
          <p className="text-sm text-[var(--muted)] mb-4">
            Clean energy projects face disproportionate NEPA burden compared to
            fossil fuel projects.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--accent)]">62%</div>
              <div className="text-xs text-[var(--muted)]">
                of energy EIS are clean energy
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--muted)]">16%</div>
              <div className="text-xs text-[var(--muted)]">
                of energy EIS are fossil fuels
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--accent)]">10%</div>
              <div className="text-xs text-[var(--muted)]">
                of solar growth goes through NEPA
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--accent)]">3.7%</div>
              <div className="text-xs text-[var(--muted)]">
                of wind growth goes through NEPA
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
