export const CHART_COLORS = {
  accent: "#f59e0b",
  accentLight: "#fbbf24",
  muted: "#64748b",
  foreground: "#e2e8f0",
  cardBorder: "#334155",
  danger: "#ef4444",
  success: "#22c55e",
  blue: "#3b82f6",
  purple: "#8b5cf6",
  teal: "#14b8a6",
  orange: "#f97316",
  pink: "#ec4899",
  slate: "#94a3b8",
};

export const SECTOR_COLORS: Record<string, string> = {
  solar: "#f59e0b",
  wind: "#3b82f6",
  transmission: "#8b5cf6",
  geothermal: "#ef4444",
  highways: "#64748b",
  forestry: "#22c55e",
  pipelines: "#f97316",
  mining: "#94a3b8",
  water: "#14b8a6",
};

export function formatCost(value: number): string {
  if (value >= 1_000_000_000)
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function getChartDimensions(
  containerWidth: number,
  aspectRatio = 16 / 9,
  margin = { top: 40, right: 30, bottom: 50, left: 60 }
) {
  const width = containerWidth;
  const height = Math.min(width / aspectRatio, 500);
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  return { width, height, innerWidth, innerHeight, margin };
}
