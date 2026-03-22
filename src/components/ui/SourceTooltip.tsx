"use client";

import { useState } from "react";

interface SourceTooltipProps {
  source: string;
  url?: string;
  children?: React.ReactNode;
}

export function SourceTooltip({ source, url, children }: SourceTooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children || <span className="source-badge">Source</span>}
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg text-xs text-[var(--foreground)] whitespace-nowrap z-50 shadow-lg">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              {source}
            </a>
          ) : (
            source
          )}
        </span>
      )}
    </span>
  );
}
