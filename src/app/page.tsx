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
        subtitle="Three tiers of review, vastly different in scope, cost, and consequence."
        source="CEQ, IFP, DOE"
        steps={[
          {
            content: (
              <div>
                <p className="font-semibold mb-2">
                  Environmental Impact Statements (EIS)
                </p>
                <p>
                  The most rigorous review. Only ~100 are completed per year, but
                  each averages <strong>4.5 years</strong> and costs around{" "}
                  <strong>$6 million</strong>. Complex EIS can cost tens of
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
                  ~$200K each and taking 1-2 years. EAs determine whether a full
                  EIS is needed.
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
                  representing 95% of all NEPA reviews. Each costs ~$50K and takes
                  about 105 days. These are for actions deemed unlikely to have
                  significant environmental effects.
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
                  <strong>$1-5 billion annually</strong> on NEPA compliance —
                  though the GAO has noted that agencies do not systematically
                  track these costs.
                </p>
              </div>
            ),
          },
        ]}
        chart={(step) => <NEPAPyramid activeStep={step} />}
      />

      {/* Section B: The Growing Paperwork */}
      <div className="bg-[var(--section-alt)]">
        <ScrollSection
          id="paperwork"
          title="The Growing Paperwork"
          subtitle="EIS documents have grown from a few dozen pages to over 1,700."
          source="CEQ EIS Length Report, 2020"
          sourceUrl="https://ceq.doe.gov/nepa-practice/eis-length.html"
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
                  <strong>661 pages</strong> of main body text — over{" "}
                  <strong>4x the recommended maximum</strong>. The CEQ recommended
                  limit is shown in red.
                </p>
              ),
            },
            {
              content: (
                <p>
                  Including appendices, the total reaches{" "}
                  <strong>1,703 pages</strong> on average. The appendices alone
                  (1,042 pages) are 7x longer than the CEQ recommended total.
                  An estimated 90% of EIS content is written for litigation
                  prevention.
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
        subtitle="EIS completion times peaked in 2017, then began improving — but most still miss the deadline."
        source="CEQ EIS Timeline Report, 2025"
        sourceUrl="https://ceq.doe.gov/nepa-practice/eis-timelines.html"
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
                The 2024 median reached <strong>2.2 years</strong> — a
                significant improvement. But <strong>61% of EISs</strong> still
                exceeded the 2-year statutory deadline.
              </p>
            ),
          },
          {
            content: (
              <p>
                Timelines vary dramatically by agency. FHWA averages{" "}
                <strong>6.2 years</strong>, while DOE completes reviews in
                ~3.5 years. The Forest Service and BLM, which produce the most
                EISs, fall in between.
              </p>
            ),
          },
        ]}
        chart={(step) => <EISTimelineChart activeStep={step} />}
      />

      {/* Section D: The Cost Escalation */}
      <div className="bg-[var(--section-alt)]">
        <ScrollSection
          id="costs"
          title="The Cost Escalation"
          subtitle="From $50,000 to $25 million — the staggering range of NEPA review costs."
          source="DOE, GAO-14-369, IFP"
          reverse
          steps={[
            {
              content: (
                <p>
                  NEPA review costs span three orders of magnitude. A Categorical
                  Exclusion costs ~<strong>$50K</strong>, an EA ~
                  <strong>$200K</strong>, a typical EIS ~<strong>$6M</strong>,
                  and complex EIS for major projects can reach{" "}
                  <strong>$25M+</strong>.
                </p>
              ),
            },
            {
              content: (
                <p>
                  The cost of a single review is only part of the picture. EIS
                  costs also vary by agency and project complexity. DOE&apos;s
                  average EIS costs <strong>$6 million</strong> — the
                  government-wide average is likely higher.
                </p>
              ),
            },
            {
              content: (
                <p>
                  DOE EIS costs have escalated from <strong>$250K in 2003</strong>{" "}
                  to <strong>$7.5M by 2016</strong> — a{" "}
                  <strong>30x increase in 13 years</strong>. This growth tracks
                  with the expansion in document length and analytical scope.
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
        source="IFP, DOE, CEQ"
        steps={[
          {
            content: (
              <p>
                <strong>62% of energy-related EIS reviews</strong> are for clean
                energy projects — solar, wind, transmission, and geothermal. Only
                16% are for fossil fuel projects.
              </p>
            ),
          },
          {
            content: (
              <p>
                The disparity is even starker at BLM. Clean energy projects
                required <strong>19 EISs</strong> vs. just <strong>5</strong> for
                fossil fuels. Meanwhile, fossil fuels received{" "}
                <strong>211 EAs</strong> — the easier, shorter review — compared
                to only 9 for clean energy.
              </p>
            ),
          },
          {
            content: (
              <p>
                Offshore wind illustrates the bottleneck:{" "}
                <strong>42 MW operational</strong> vs.{" "}
                <strong>18,581 MW stuck in permitting</strong>. The capacity
                waiting in the queue is 442x what&apos;s already built.
              </p>
            ),
          },
          {
            content: (
              <p>
                A single geothermal project can require{" "}
                <strong>6 separate NEPA reviews</strong> — one for each phase from
                land access through construction. Each review restarts the clock
                and creates new litigation exposure.
              </p>
            ),
          },
        ]}
        chart={(step) => <CleanEnergyParadox activeStep={step} />}
      />

      {/* Section F: Who Sues and Who Wins? */}
      <div className="bg-[var(--section-alt)]">
        <ScrollSection
          id="litigation"
          title="Who Sues and Who Wins?"
          subtitle="NEPA litigation patterns reveal who challenges projects, how often they succeed, and how long it takes."
          source="Breakthrough Institute, 2024; RFF, 2025"
          reverse
          steps={[
            {
              content: (
                <p>
                  Public lands and forestry face the most NEPA litigation (
                  <strong>37%</strong> of all cases), followed by energy projects (
                  <strong>29%</strong>). 72% of cases are filed by NGOs, with the
                  top 10 organizations responsible for 35% of all challenges.
                </p>
              ),
            },
            {
              content: (
                <p>
                  Agencies win <strong>~80% of the time</strong> on appeal — but
                  winning still takes an average of{" "}
                  <strong>4.2 years</strong> from EIS publication to resolution.
                  The process itself is the punishment.
                </p>
              ),
            },
            {
              content: (
                <p>
                  For clean energy specifically, EIS litigation rates are high:{" "}
                  <strong>50% of wind EIS</strong> and{" "}
                  <strong>37.5% of solar EIS</strong> projects face court
                  challenges. Yet paradoxically, litigated and non-litigated
                  projects have nearly identical timelines to operation.
                </p>
              ),
            },
            {
              content: (
                <p>
                  <strong>Important context:</strong> Only ~0.22% of all NEPA
                  decisions face litigation. The high litigation rates apply to
                  major EIS-level projects. The vast majority of NEPA reviews —
                  especially CEs and EAs — proceed without legal challenge.
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
        source="Bennon & Wilson (2023), Liscow & Brooks, NAM/FAI"
        steps={[
          {
            content: (
              <p>
                Of <strong>355 major infrastructure projects</strong> tracked
                from 2010-2018, fewer than half were completed by 2022.{" "}
                <strong>14% were cancelled</strong> and 40% remained in progress.
                28% faced predevelopment litigation, and 89% of those cases
                involved NEPA claims.
              </p>
            ),
          },
          {
            content: (
              <p>
                Interstate highway spending per mile{" "}
                <strong>tripled from the 1960s to the 1980s</strong> — a pattern
                that emerged after NEPA&apos;s passage. The U.S. takes{" "}
                <strong>80% longer</strong> than peer nations for permitting.
                (Note: the highway cost increase is a correlation, not proven
                causation.)
              </p>
            ),
          },
          {
            content: (
              <p>
                Cancellation rates vary sharply by sector. Solar (32%) and wind
                (31%) projects are cancelled at roughly double the rate of
                transmission (12%). Energy projects face shorter permits but
                higher litigation and cancellation rates.
              </p>
            ),
          },
          {
            content: (
              <p>
                The relationship between NEPA and delay is real but
                multifactorial. 68-84% of delays are attributed to factors
                &ldquo;outside NEPA&rdquo; — decision-maker changes, poor
                documentation, and ESA compliance. NEPA reform alone won&apos;t
                solve the permitting problem, but it&apos;s a necessary piece.
              </p>
            ),
          },
        ]}
        chart={(step) => <InfraComparison activeStep={step} />}
      />

      {/* CTA */}
      <section className="py-24 px-4 bg-[var(--section-alt)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore by Sector</h2>
          <p className="text-[var(--muted)] mb-8">
            Dive deeper into NEPA data for specific industry sectors — solar,
            wind, transmission, highways, forestry, and more.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--background)] font-semibold rounded-lg hover:bg-[var(--accent-light)] transition-colors"
          >
            Explore Sector Data
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-[var(--muted)]">
            Data compiled from CEQ, RFF, Breakthrough Institute, IFP, Niskanen/CATF,
            NAM/FAI, Stanford, Yale/Brookings, GAO, and CGO.
          </div>
          <Link
            href="/methodology"
            className="text-sm text-[var(--accent)] hover:underline"
          >
            View all sources & methodology
          </Link>
        </div>
      </footer>
    </>
  );
}
