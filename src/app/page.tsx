"use client";

import { Hero } from "@/components/Hero";
import { ScrollSection } from "@/components/ScrollSection";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { NEPAPyramid } from "@/components/charts/NEPAPyramid";
import { PageCountTimeline } from "@/components/charts/PageCountTimeline";
import { EISTimelineChart } from "@/components/charts/EISTimelineChart";
import { CostWaterfall } from "@/components/charts/CostWaterfall";
import { CleanEnergyParadox } from "@/components/charts/CleanEnergyParadox";
import { LitigationDashboard } from "@/components/charts/LitigationDashboard";
import { InfraComparison } from "@/components/charts/InfraComparison";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Hero />

      {/* Section A: The NEPA Pyramid */}
      <ScrollSection
        id="pyramid"
        title="The Scale of NEPA"
        subtitle={<>Three tiers of review, vastly different in scope, cost, and consequence. <a href="https://ceq.doe.gov/nepa-practice/eis-length.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[CEQ]</a> <a href="https://ifp.org/no-nepa-really-is-a-problem-for-clean-energy/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[IFP]</a></>}
        steps={[
          {
            content: (
              <div>
                <p className="font-semibold mb-2">
                  Environmental Impact Statements (EIS)
                </p>
                <p>
                  The most rigorous review. Only ~100 are completed per year, but
                  each averages <strong>4.5 years</strong>{" "}and costs around{" "}
                  <strong>$6 million</strong>. Complex EISs can cost tens of
                  millions.
                </p>
              </div>
            ),
          },
          {
            content: (
              <div>
                <p className="font-semibold mb-2">
                  Environmental Assessments (EA)
                </p>
                <p>
                  The middle tier. About <strong>10,000 per year</strong>, costing
                  ~$200K each and taking 1-2 years.
                </p>
                <p className="mt-2">
                  EAs were never described in the original law — they started as
                  a way of determining whether an EIS is required, and have since
                  become a process unto themselves that routinely take years to
                  complete.
                </p>
              </div>
            ),
          },
          {
            content: (
              <div>
                <p className="font-semibold mb-2">
                  Categorical Exclusions (CE)
                </p>
                <p>
                  The vast majority — <strong>~45,000 per year</strong>,
                  representing 95% of all NEPA reviews. On average, Categorical
                  Exclusions cost ~$50K and take about 105 days. These are for
                  actions deemed unlikely to have significant environmental
                  effects.
                </p>
              </div>
            ),
          },
          {
            content: (
              <div>
                <p className="font-semibold mb-2">The Total Cost</p>
                <p>
                  Across all three tiers, federal agencies spend an estimated{" "}
                  <strong>$1-5 billion annually</strong>{" "}on NEPA compliance —
                  though the GAO has noted that agencies do not systematically
                  track these costs.{" "}
                  <a href="https://ifp.org/environmental-review/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[IFP]</a>{" "}
                  <a href="https://www.gao.gov/products/gao-14-369" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[GAO]</a>
                </p>
              </div>
            ),
          },
        ]}
        chart={(step) => <NEPAPyramid activeStep={step} />}
      />

      {/* Section B: The Growing Paperwork */}
      <div className="section-fade-in">
        <ScrollSection
          id="paperwork"
          title="The Growing Paperwork"
          subtitle={<>EIS documents have grown from a few dozen pages to over 1,700. <a href="https://ceq.doe.gov/nepa-practice/eis-length.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[CEQ]</a></>}
          reverse
          steps={[
            {
              content: (
                <p>
                  In the 1970s, an EIS was typically <strong>30 pages</strong>.
                  NEPA&apos;s original intent was concise environmental analysis.
                  CEQ guidelines recommend a <strong>150-page maximum</strong>.
                </p>
              ),
            },
            {
              content: (
                <p>
                  By 2013-2018, the average EIS had grown to{" "}
                  <strong>661 pages</strong>{" "}of main body text — over{" "}
                  <strong>4x the statutory limit</strong>. The FRA page limit
                  is shown in red.
                </p>
              ),
            },
            {
              content: (
                <p>
                  Including appendices, the total reaches{" "}
                  <strong>1,703 pages</strong>{" "}on average. Although the Fiscal
                  Responsibility Act imposed page limits on the main body of
                  EIS documents, agencies use appendices — which don&apos;t
                  count toward the limit — to work around the cap. The
                  appendices alone (1,042 pages) are 7x longer than the
                  recommended total.
                </p>
              ),
            },
          ]}
          chart={(step) => <PageCountTimeline activeStep={step} />}
        />
      </div>

      {/* Section C: How Long Does It Take? */}
      <ScrollSection
        id="timelines"
        title="How Long Does It Take?"
        subtitle={<>EIS completion times peaked in 2017, then began improving — but most still miss the deadline. <a href="https://ceq.doe.gov/nepa-practice/eis-timelines.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[CEQ]</a></>}
        steps={[
          {
            content: (
              <p>
                From 2010 to 2024, the median EIS completion time ranged from{" "}
                <strong>2.2 to 4.7 years</strong>. The green line shows the
                2-year target set by the FAST-41 and Fiscal Responsibility Act.
              </p>
            ),
          },
          {
            content: (
              <p>
                Timelines peaked at <strong>4.7 years in 2017</strong>, then
                began declining. This may reflect reform efforts, changes in
                project mix, or agencies prioritizing simpler reviews.
              </p>
            ),
          },
          {
            content: (
              <p>
                The 2024 median reached <strong>2.2 years</strong>, but{" "}
                <strong>61% of EISs</strong>{" "}still exceeded the 2-year
                statutory deadline. And these shorter timelines partly reflect
                agencies shifting work into a{" "}
                <strong>pre-NEPA phase</strong>{" "}that doesn&apos;t show up on
                the clock. BLM now runs a formal pre-NEPA assessment for
                wind and solar, where projects are reviewed and modified{" "}
                <em>before</em> the NEPA process officially begins.{" "}
                <a href="https://www.rff.org/publications/reports/how-long-does-it-take-national-environmental-policy-act-timelines-and-outcomes-for-clean-energy-projects/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[RFF]</a>
              </p>
            ),
          },
          {
            content: (
              <p>
                RFF found that <strong>12 of 21 solar projects</strong>{" "}took
                over 2 years just from initial application to the Notice of
                Intent that starts the formal NEPA clock. For wind,{" "}
                <strong>9 of 14 projects</strong>{" "}took 2+ years before formal
                review began. The formal NEPA period is sandwiched between
                pre-application delays and post-approval steps — shortening
                the middle doesn&apos;t necessarily shorten the total.{" "}
                <a href="https://www.rff.org/publications/reports/how-long-does-it-take-national-environmental-policy-act-timelines-and-outcomes-for-clean-energy-projects/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[RFF, 2025]</a>
              </p>
            ),
          },
          {
            content: (
              <p>
                Timelines vary dramatically by agency. FHWA averages{" "}
                <strong>6.2 years</strong>, while DOE completes reviews in
                ~3.5 years. The Forest Service and BLM, which produce the most
                EISs, fall in between.{" "}
                <a href="https://ceq.doe.gov/nepa-practice/eis-timelines.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[CEQ, 2025]</a>
              </p>
            ),
          },
        ]}
        chart={(step) => <EISTimelineChart activeStep={step} />}
      />

      {/* Section D: The Cost Escalation */}
      <div className="section-fade-in">
        <ScrollSection
          id="costs"
          title="The Cost Escalation"
          subtitle="From $50,000 to $25 million — the staggering range of NEPA review costs."
          reverse
          steps={[
            {
              content: (
                <p>
                  NEPA review costs span three orders of magnitude. A Categorical
                  Exclusion costs ~<strong>$50K</strong>, an EA ~
                  <strong>$200K</strong>, a typical EIS ~<strong>$6M</strong>,
                  and complex EIS for major projects can reach{" "}
                  <strong>$25M+</strong>.{" "}
                  <a href="https://www.gao.gov/products/gao-14-369" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[GAO-14-369]</a>
                </p>
              ),
            },
            {
              content: (
                <p>
                  The cost of a single review is only part of the picture. EIS
                  costs also vary by agency and project complexity. DOE&apos;s
                  average EIS costs <strong>$6 million</strong> — the
                  government-wide average is likely higher.{" "}
                  <a href="https://www.energy.gov/nepa/nepa-documents" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[DOE]</a>
                </p>
              ),
            },
            {
              content: (
                <p>
                  DOE EIS costs have escalated from <strong>$250K in 2003</strong>{" "}
                  to <strong>$7.5M by 2016</strong> — a{" "}
                  <strong>30x increase in 13 years</strong>. This growth tracks
                  with the expansion in document length and analytical scope.{" "}
                  <a href="https://www.construction-physics.com/p/how-nepa-works" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[Construction Physics]</a>
                </p>
              ),
            },
          ]}
          chart={(step) => <CostWaterfall activeStep={step} />}
        />
      </div>

      {/* Section E: The Clean Energy Paradox */}
      <ScrollSection
        id="clean-energy"
        title="The Clean Energy Paradox"
        subtitle="NEPA review requirements fall disproportionately on clean energy projects."
        steps={[
          {
            content: (
              <p>
                <strong>62% of energy-related EIS reviews</strong>{" "}are for clean
                energy projects — solar, wind, transmission, and geothermal. Only
                16% are for fossil fuel projects.{" "}
                <a href="https://ifp.org/how-nepa-will-tax-clean-energy/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[IFP]</a>
              </p>
            ),
          },
          {
            content: (
              <p>
                Offshore wind illustrates the bottleneck:{" "}
                <strong>42 MW operational</strong> vs.{" "}
                <strong>18,581 MW stuck in permitting</strong>. The capacity
                waiting in the queue is 442x what&apos;s already built.{" "}
                <a href="https://www.energy.gov/nepa/nepa-documents" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[DOE]</a>
              </p>
            ),
          },
          {
            content: (
              <p>
                A single geothermal project can require{" "}
                <strong>6 separate NEPA reviews</strong> — one for each phase from
                land access through construction. Each review restarts the clock
                and creates new litigation exposure.{" "}
                <a href="https://ifp.org/how-nepa-will-tax-clean-energy/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[IFP]</a>
              </p>
            ),
          },
        ]}
        chart={(step) => <CleanEnergyParadox activeStep={step} />}
      />

      {/* Section F: Who Sues and Who Wins? */}
      <div className="section-fade-in">
        <ScrollSection
          id="litigation"
          title="Who Sues and Who Wins?"
          subtitle="NEPA litigation patterns reveal who challenges projects, how often they succeed, and how long it takes."
            reverse
          steps={[
            {
              content: (
                <p>
                  Public lands and forestry face the most NEPA litigation (
                  <strong>37%</strong>{" "}of all cases), followed by energy projects (
                  <strong>29%</strong>). 72% of cases are filed by NGOs, with the
                  top 10 organizations responsible for 35% of all challenges.{" "}
                  <a href="https://thebreakthrough.org/issues/energy/understanding-nepa-litigation" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[Breakthrough, 2024]</a>
                </p>
              ),
            },
            {
              content: (
                <p>
                  Agencies win <strong>~80% of the time</strong>{" "}on appeal — but
                  winning still takes an average of{" "}
                  <strong>4.2 years</strong>{" "}from EIS publication to resolution.
                  The process itself is the punishment.{" "}
                  <a href="https://thebreakthrough.org/issues/energy/understanding-nepa-litigation" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[Breakthrough]</a>
                </p>
              ),
            },
            {
              content: (
                <p>
                  For clean energy specifically, EIS litigation rates are high:{" "}
                  <strong>50% of wind EIS</strong> and{" "}
                  <strong>37.5% of solar EIS</strong>{" "}projects face court
                  challenges. Yet paradoxically, litigated and non-litigated
                  projects have nearly identical timelines to operation.{" "}
                  <a href="https://www.rff.org/publications/reports/taking-green-energy-projects-to-court-nepa-review-and-court-challenges-to-renewable-energy/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[RFF, 2025]</a>
                </p>
              ),
            },
          ]}
          chart={(step) => <LitigationDashboard activeStep={step} />}
        />
      </div>

      {/* Section G: The Infrastructure Comparison */}
      <ScrollSection
        id="infrastructure"
        title="The Infrastructure Impact"
        subtitle="355 major projects, international comparisons, and the bottom line."
        steps={[
          {
            content: (
              <p>
                Of <strong>355 major infrastructure projects</strong>{" "}tracked
                from 2010-2018, fewer than half were completed by 2022.{" "}
                <strong>14% were cancelled</strong>{" "}and 40% remained in progress.
                28% faced predevelopment litigation, and 89% of those cases
                involved NEPA claims.{" "}
                <a href="https://cddrl.fsi.stanford.edu/publication/nepa-litigation-over-large-energy-and-transport-infrastructure-projects" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[Bennon & Wilson, 2023]</a>
              </p>
            ),
          },
          {
            content: (
              <p>
                Interstate highway spending per mile{" "}
                <strong>tripled from the 1960s to the 1980s</strong> — a pattern
                that emerged after NEPA&apos;s passage. The U.S. takes{" "}
                <strong>80% longer</strong>{" "}than peer nations for permitting.
                (Note: the highway cost increase is a correlation, not proven
                causation.){" "}
                <a href="https://law.yale.edu/yls-today/news/zachary-liscow-and-leah-brooks-cost-highway-construction" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[Liscow & Brooks]</a>
              </p>
            ),
          },
          {
            content: (
              <p>
                Cancellation rates vary sharply by sector. Solar (32%) and wind
                (31%) projects are cancelled at roughly double the rate of
                transmission (12%). Energy projects face shorter permits but
                higher litigation and cancellation rates.{" "}
                <a href="https://cddrl.fsi.stanford.edu/publication/nepa-litigation-over-large-energy-and-transport-infrastructure-projects" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[Bennon & Wilson]</a>
              </p>
            ),
          },
        ]}
        chart={(step) => <InfraComparison activeStep={step} />}
      />

      {/* CTA */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(255, 79, 0, 0.05) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="w-12 h-[3px] bg-[var(--accent)] mx-auto mb-8 rounded-full opacity-70" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore by Sector</h2>
          <p className="text-[var(--muted)] text-lg mb-10 leading-relaxed">
            Dive deeper into NEPA data for specific industry sectors — solar,
            wind, transmission, highways, forestry, and more.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--accent)] text-[var(--background)] font-semibold rounded-lg hover:bg-[var(--accent-light)] transition-all hover:shadow-lg hover:shadow-[var(--accent)]/20"
          >
            Explore Sector Data
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-[var(--card-border)]/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-[var(--muted)] leading-relaxed">
            Data compiled from CEQ, RFF, Breakthrough Institute, IFP, Niskanen/CATF,
            NAM/FAI, Stanford, Yale/Brookings, GAO, and CGO.
          </div>
          <Link
            href="/methodology"
            className="text-sm text-[var(--accent)] hover:underline"
          >
            View all sources &amp; methodology
          </Link>
        </div>
      </footer>
    </>
  );
}
