"use client";

import Link from "next/link";
import sourcesData from "../../../public/data/sources.json";

const QUALITY_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  high: { bg: "bg-green-500/10", text: "text-green-400", label: "High Quality" },
  good: { bg: "bg-blue-500/10", text: "text-blue-400", label: "Good Quality" },
  moderate: { bg: "bg-yellow-500/10", text: "text-yellow-400", label: "Moderate" },
};

export default function MethodologyPage() {
  return (
    <div className="pt-20 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-sm text-[var(--accent)] hover:underline mb-4 inline-block"
        >
          &larr; Back to story
        </Link>

        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Sources & Methodology
        </h1>
        <p className="text-[var(--muted)] mb-12 max-w-2xl">
          This site synthesizes data from peer-reviewed research, government
          reports, and policy analysis. Every claim is sourced. We flag
          limitations and present counterpoints where the data warrants them.
        </p>

        {/* Key methodological notes */}
        <div className="mb-12 p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)]">
          <h2 className="text-xl font-bold mb-4">Methodological Notes</h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold mb-1">Data availability is uneven</p>
              <p className="text-[var(--muted)]">
                EIS data is well-documented by CEQ, but Environmental
                Assessments and Categorical Exclusions are far more numerous
                and far less tracked. The GAO reported in 2014 that agencies do
                not systematically track NEPA costs or timelines for EA/CE
                reviews. Most visualizations on this site reflect EIS-level
                data.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Cost data is sparse</p>
              <p className="text-[var(--muted)]">
                No government-wide mechanism exists for tracking NEPA review
                costs. The cost estimates used here come primarily from DOE
                records, which may not be representative of other agencies.
                Cost ranges should be treated as approximations.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">
                Correlation vs. causation
              </p>
              <p className="text-[var(--muted)]">
                Several data points show correlations (e.g., highway cost
                increases post-NEPA, longer timelines in certain periods).
                These correlations are noted but should not be interpreted as
                proof that NEPA alone caused the observed changes. Multiple
                factors — including other regulations, market conditions, and
                project complexity — contribute to infrastructure timelines
                and costs.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">
                The counterpoint matters
              </p>
              <p className="text-[var(--muted)]">
                Research by Niskanen/CATF and others argues that 68-84% of
                project delays are attributable to factors &ldquo;outside NEPA&rdquo; —
                including insufficient agency funding, poor inter-agency
                coordination, decision-maker changes, and duplicative state
                reviews. Only ~0.22% of NEPA decisions face litigation. This
                site presents both perspectives.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">
                NAM/FAI data scope
              </p>
              <p className="text-[var(--muted)]">
                The NAM/FAI $7.9 billion figure covers all federal permitting
                costs to manufacturers — not just NEPA. It includes Clean
                Water Act, Clean Air Act, and other regulatory compliance. This
                is noted wherever the figure appears.
              </p>
            </div>
          </div>
        </div>

        {/* Source list */}
        <h2 className="text-xl font-bold mb-6">Sources</h2>
        <div className="space-y-4">
          {sourcesData.sources.map((source) => {
            const quality = QUALITY_COLORS[source.quality] || QUALITY_COLORS.moderate;
            return (
              <div
                key={source.id}
                className="p-5 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:text-[var(--accent)] transition-colors"
                      >
                        {source.name}
                      </a>
                      <span className="text-xs text-[var(--muted)]">
                        ({source.year})
                      </span>
                    </div>
                    <div className="text-sm text-[var(--muted)] mb-2">
                      {source.org}
                    </div>
                    <div className="text-xs text-[var(--muted)]">
                      <span className="opacity-70">Quality: </span>
                      {source.qualityNote}
                    </div>
                    <div className="text-xs text-[var(--muted)] mt-1">
                      <span className="opacity-70">Limitation: </span>
                      {source.limitation}
                    </div>
                  </div>
                  <span
                    className={`shrink-0 px-2 py-1 text-xs rounded ${quality.bg} ${quality.text}`}
                  >
                    {quality.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Data download section */}
        <div className="mt-12 p-6 rounded-2xl border border-dashed border-[var(--card-border)]">
          <h3 className="font-semibold mb-2">Raw Data</h3>
          <p className="text-sm text-[var(--muted)] mb-4">
            The compiled datasets used in this visualization are available as
            JSON files. These aggregate data from the sources listed above.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "eis-timelines.json",
              "eis-length.json",
              "cost-estimates.json",
              "litigation.json",
              "sector-projects.json",
            ].map((file) => (
              <a
                key={file}
                href={`/data/${file}`}
                className="px-3 py-1.5 text-xs rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors font-mono"
              >
                {file}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
