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
                  The most rigorous review. Only ~100 are completed per year.
                  EIS timelines have ranged from{" "}
                  <strong>2.2 to 4.7 years</strong>{" "}
                  <span className="text-xs text-[var(--muted)]">(median NOI→final EIS, 2010–2024, CEQ)</span>.
                  Costs range from{" "}
                  <strong>$250K–$2M</strong>{" "}
                  <span className="text-xs text-[var(--muted)]">(CEQ estimate, 2003)</span>{" "}
                  to <strong>$7.5M avg</strong>{" "}
                  <span className="text-xs text-[var(--muted)]">(DOE contractor costs, 2016)</span>.
                  Complex EISs can cost tens of millions.
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
                  The middle tier. About <strong>10,000 per year</strong>.
                  EAs often cost hundreds of thousands of dollars{" "}
                  <span className="text-xs text-[var(--muted)]">(~$200K avg, USFS 2007; ~$386K avg, DOE 2016)</span>{" "}
                  and typically take 1–2 years.
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
                  representing 95% of all NEPA reviews. These are for actions
                  deemed unlikely to have significant environmental effects, but
                  the work involved varies enormously: DOE completes CEs in{" "}
                  <strong>1-2 days</strong>, while the Forest Service median is{" "}
                  <strong>105 days</strong>. FHWA CEs can run 100+ pages and
                  take months.{" "}
                  <a href="https://www.construction-physics.com/p/how-nepa-works" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[Construction Physics]</a>
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
                  <strong>$1–5 billion annually</strong>{" "}
                  <span className="text-xs text-[var(--muted)]">(IFP estimate)</span>{" "}on NEPA compliance —
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
          subtitle={<>EIS documents have grown from a few dozen pages to <strong>1,703 pages</strong> including appendices <span className="text-xs text-[var(--muted)]">(2013–2018 avg, CEQ)</span>. Main body: 661 pages. <a href="https://ceq.doe.gov/nepa-practice/eis-length.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[CEQ]</a></>}
          reverse
          steps={[
            {
              content: (
                <p>
                  In the 1970s, an EIS was typically <strong>30 pages</strong>.
                  NEPA&apos;s original intent was concise environmental analysis.
                  The current FRA/CEQ page limit for EIS main text is{" "}
                  <strong>150 pages</strong>{" "}(300 for extraordinary complexity).
                  Appendices are excluded from the limit.
                </p>
              ),
            },
            {
              content: (
                <p>
                  By 2013–2018, the average EIS main body had grown to{" "}
                  <strong>661 pages</strong>{" "}
                  <span className="text-xs text-[var(--muted)]">(final EIS main text, 2013–2018 avg, CEQ)</span>
                  {" "}— over <strong>4x the FRA page limit</strong>. The red
                  line shows the 150-page limit for main text.
                </p>
              ),
            },
            {
              content: (
                <p>
                  Including appendices, the total reaches{" "}
                  <strong>1,703 pages</strong>{" "}
                  <span className="text-xs text-[var(--muted)]">(2013–2018 avg, CEQ)</span>.
                  Agencies use appendices — which don&apos;t count toward
                  the FRA limit — to work around the cap. The appendices
                  alone (1,042 pages) are 7x longer than the main-text limit.
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
        subtitle={<>Formal EIS review time fell — but total project delay did not necessarily fall. <a href="https://ceq.doe.gov/nepa-practice/eis-timelines.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[CEQ]</a></>}
        steps={[
          {
            content: (
              <div>
                <div className="text-xs text-[var(--muted)] mb-3 p-2 rounded bg-[var(--section-alt)] border border-[var(--card-border)]">
                  Chart measures formal EIS review only (NOI→final EIS). Excludes pre-application and post-approval delay.
                </div>
                <p>
                  From 2010 to 2024, the median EIS completion time{" "}
                  <span className="text-xs text-[var(--muted)]">(NOI→final EIS)</span>{" "}
                  ranged from <strong>2.2 to 4.7 years</strong>. The green line
                  shows the 2-year benchmark{" "}
                  <span className="text-xs text-[var(--muted)]">(statutory deadline under FRA, 2023)</span>.
                </p>
              </div>
            ),
          },
          {
            content: (
              <div>
                <p>
                  Formal EIS time peaked at <strong>4.7 years</strong>{" "}
                  <span className="text-xs text-[var(--muted)]">(median NOI→ROD, 2017, CEQ)</span>{" "}
                  and fell to <strong>2.2 years</strong>{" "}
                  <span className="text-xs text-[var(--muted)]">(median NOI→final EIS, 2024, CEQ)</span>.
                  But much of this decline reflects agencies shifting work into
                  a <strong>pre-NEPA phase</strong> that doesn&apos;t appear on
                  the clock, not a reduction in total project delay.
                </p>
                <p className="mt-3">
                  BLM now runs a formal pre-NEPA assessment for wind and solar,
                  where projects are reviewed and modified{" "}
                  <em>before</em> the NEPA process officially begins. And
                  nevertheless, <strong>61% of EISs</strong>{" "}
                  <span className="text-xs text-[var(--muted)]">(RFF, 2025)</span>{" "}
                  still exceeded the 2-year deadline.{" "}
                  <a href="https://www.rff.org/publications/reports/how-long-does-it-take-national-environmental-policy-act-timelines-and-outcomes-for-clean-energy-projects/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[RFF]</a>
                </p>
              </div>
            ),
          },
          {
            content: (
              <p>
                RFF found that <strong>12 of 21 solar projects</strong>{" "}
                <span className="text-xs text-[var(--muted)]">(RFF, 2025)</span>{" "}took
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
                <strong>6.2 years</strong>{" "}
                <span className="text-xs text-[var(--muted)]">(mean NOI→ROD, 2010–2018, CEQ)</span>,
                while DOE completes reviews in ~3.5 years. The Forest Service
                and BLM, which produce the most EISs, fall in between.{" "}
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
                <div>
                  <p>
                    NEPA review costs have escalated dramatically across
                    available estimates:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li><strong>$250K–$2M</strong>{" "}
                      <span className="text-xs text-[var(--muted)]">(CEQ EIS estimate, 2003)</span>
                    </li>
                    <li>CEs ~<strong>$50K</strong>, EAs ~<strong>$200K</strong>, EISs ~<strong>$1M</strong>{" "}
                      <span className="text-xs text-[var(--muted)]">(USFS avg, 2007)</span>
                    </li>
                    <li>EAs <strong>$386K</strong>, EISs <strong>$7.5M</strong>{" "}
                      <span className="text-xs text-[var(--muted)]">(DOE contractor costs, 2016)</span>
                    </li>
                  </ul>
                  <p className="mt-2 text-xs text-[var(--muted)]">
                    The DOE figure is much higher partly because DOE is the only
                    agency that systematically tracks contractor costs.{" "}
                    <a href="https://www.construction-physics.com/p/how-nepa-works" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[Construction Physics]</a>
                  </p>
                </div>
              ),
            },
            {
              content: (
                <p>
                  No government-wide cost data exists — the GAO found that
                  agencies do not routinely track the cost of completing NEPA
                  analyses{" "}
                  <span className="text-xs text-[var(--muted)]">(GAO-14-369, 2014)</span>.
                  DOE is essentially the only agency that published contractor
                  costs.{" "}
                  <a href="https://www.gao.gov/products/gao-14-369" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[GAO-14-369]</a>
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
                <strong>62% of energy-related EIS reviews</strong>{" "}
                <span className="text-xs text-[var(--muted)]">(IFP analysis)</span>{" "}are for clean
                energy projects — solar, wind, transmission, and geothermal. Only
                16% are for fossil fuel projects.{" "}
                <a href="https://ifp.org/how-nepa-will-tax-clean-energy/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[IFP]</a>
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
                  <strong>37%</strong>{" "}of all appellate cases), followed by
                  energy projects (<strong>29%</strong>). 72% of cases are filed
                  by NGOs, with the top 10 organizations responsible for 35% of
                  all challenges.{" "}
                  <span className="text-xs text-[var(--muted)]">(387 appellate cases, 2013–2022, Breakthrough)</span>{" "}
                  <a href="https://thebreakthrough.org/issues/energy/understanding-nepa-litigation" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[Breakthrough, 2024]</a>
                </p>
              ),
            },
            {
              content: (
                <div>
                  <p>
                    Overall agency win rate:{" "}
                    <strong>74%</strong>{" "}
                    <span className="text-xs text-[var(--muted)]">(all courts, 2013–2022, Breakthrough)</span>.
                    On appeal specifically, agencies win ~<strong>80%</strong>.
                    But winning still takes a median of{" "}
                    <strong>19 months</strong>{" "}in litigation, and{" "}
                    <strong>4.2 years</strong>{" "}from EIS publication to
                    appellate resolution{" "}
                    <span className="text-xs text-[var(--muted)]">(appeals only)</span>.
                    The process itself is the punishment.{" "}
                    <a href="https://thebreakthrough.org/issues/energy/the-procedural-hangover" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[Breakthrough]</a>
                  </p>
                </div>
              ),
            },
            {
              content: (
                <p>
                  For clean energy specifically, EIS litigation rates are high:{" "}
                  <strong>50% of wind EIS</strong> and{" "}
                  <strong>37.5% of solar EIS</strong>{" "}projects face court
                  challenges{" "}
                  <span className="text-xs text-[var(--muted)]">(RFF, 2025)</span>.{" "}
                  <a href="https://www.rff.org/publications/reports/taking-green-energy-projects-to-court-nepa-review-and-court-challenges-to-renewable-energy/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[RFF, 2025]</a>
                </p>
              ),
            },
            {
              content: (
                <div>
                  <p>
                    NEPA is the most litigated environmental law. Lawsuits are
                    sometimes used strategically — not to fix genuine
                    inadequacies, but to delay projects until proponents give
                    up. As one activist opposing a missile defense project put
                    it: the hope is that delay{" "}
                    <em>&ldquo;will lead to cancellation... That&apos;s what
                    we always hope for in these suits.&rdquo;</em>
                  </p>
                </div>
              ),
            },
            {
              content: (
                <div>
                  <p>
                    The threat of litigation pushes agencies to produce
                    &ldquo;bullet-proof&rdquo; documents — one agency testified
                    that litigation had{" "}
                    <em>&ldquo;forced them to spend as much as necessary&rdquo;</em>{" "}
                    to make documents defensible. A Forest Service report found
                    that team members{" "}
                    <em>&ldquo;often believe that much of their work is
                    &apos;for the courts&apos; and not particularly useful for
                    line officers who make decisions.&rdquo;</em>
                  </p>
                  <p className="mt-3">
                    The result: an estimated{" "}
                    <strong>90% of EIS content</strong>{" "}is written for
                    litigation defense, not decision-making. Agencies include
                    ever more analysis — sometimes citing unpublished,
                    non-peer-reviewed papers — simply because courts have
                    penalized agencies for not addressing them.{" "}
                    <a href="https://www.construction-physics.com/p/how-nepa-works" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[Construction Physics]</a>
                  </p>
                </div>
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
        subtitle="Direct evidence from 355 major projects, plus suggestive historical patterns."
        steps={[
          {
            content: (
              <div>
                <p className="font-semibold mb-2 text-sm text-[var(--accent)]">Direct evidence</p>
                <p>
                  Of <strong>355 major infrastructure projects</strong>{" "}
                  <span className="text-xs text-[var(--muted)]">(energy + transport, 2010–2018, Bennon &amp; Wilson 2023)</span>,
                  fewer than half were completed by 2022.{" "}
                  <strong>14% were cancelled</strong>{" "}and 40% remained in progress.
                  28% faced predevelopment litigation, and 89% of those cases
                  involved NEPA claims.{" "}
                  <a href="https://cddrl.fsi.stanford.edu/publication/nepa-litigation-over-large-energy-and-transport-infrastructure-projects" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[Bennon &amp; Wilson, 2023]</a>
                </p>
              </div>
            ),
          },
          {
            content: (
              <p>
                Cancellation rates vary sharply by sector{" "}
                <span className="text-xs text-[var(--muted)]">(Bennon &amp; Wilson, 2023)</span>.
                Solar (<strong>32%</strong>) and wind (<strong>31%</strong>)
                projects are cancelled at roughly double the rate of
                transmission (<strong>12%</strong>). Energy projects face
                shorter permits but higher litigation and cancellation rates.{" "}
                <a href="https://cddrl.fsi.stanford.edu/publication/nepa-litigation-over-large-energy-and-transport-infrastructure-projects" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[Bennon &amp; Wilson]</a>
              </p>
            ),
          },
          {
            content: (
              <div>
                <p className="font-semibold mb-2 text-sm text-[var(--accent)]">Suggestive historical correlation</p>
                <p>
                  Interstate highway spending per mile{" "}
                  <strong>tripled from the 1960s to the 1980s</strong>{" "}
                  <span className="text-xs text-[var(--muted)]">(real dollars, Liscow &amp; Brooks)</span>
                  {" "}— a pattern that emerged after NEPA&apos;s passage. This
                  is a correlation, not proven causation.{" "}
                  <a href="https://law.yale.edu/yls-today/news/zachary-liscow-and-leah-brooks-cost-highway-construction" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-xs">[Liscow &amp; Brooks]</a>
                </p>
                <p className="mt-3">
                  Separately, the U.S. takes <strong>80% longer</strong>{" "}than
                  peer nations for permitting{" "}
                  <span className="text-xs text-[var(--muted)]">(NAM/FAI Survey)</span>.
                </p>
              </div>
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
