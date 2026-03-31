"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const sections = [
  { id: "hero", label: "Top" },
  { id: "pyramid", label: "Scale" },
  { id: "paperwork", label: "Paperwork" },
  { id: "timelines", label: "Timelines" },
  { id: "costs", label: "Costs" },
  { id: "clean-energy", label: "Clean Energy" },
  { id: "litigation", label: "Litigation" },
  { id: "infrastructure", label: "Infrastructure" },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sectionEls = sections
        .map((s) => ({
          id: s.id,
          el: document.getElementById(s.id),
        }))
        .filter((s) => s.el);

      const viewportMiddle = window.scrollY + window.innerHeight / 3;

      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const el = sectionEls[i].el!;
        if (el.offsetTop <= viewportMiddle) {
          setActiveSection(sectionEls[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--background)]/90 backdrop-blur-lg border-b border-[var(--card-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between font-[family-name:var(--font-ibm-plex-sans)]">
        <Link
          href="/"
          className="font-semibold text-sm tracking-tight text-[var(--accent)]"
        >
          The Cost of NEPA
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                activeSection === section.id
                  ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {section.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/explore"
            className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Explore Sectors
          </Link>
          <Link
            href="/methodology"
            className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Sources
          </Link>
        </div>
      </div>
    </nav>
  );
}
