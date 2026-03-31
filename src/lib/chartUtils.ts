export const CHART_COLORS = {
  accent: "#c0392b",
  accentLight: "#e74c3c",
  muted: "#6b7280",
  foreground: "#1a1a1a",
  cardBorder: "#e5e7eb",
  danger: "#dc2626",
  success: "#16a34a",
  blue: "#2563eb",
  purple: "#7c3aed",
  teal: "#0d9488",
  orange: "#ea580c",
  pink: "#db2777",
  slate: "#6b7280",
};

export const SECTOR_COLORS: Record<string, string> = {
  solar: "#ea580c",
  wind: "#2563eb",
  transmission: "#7c3aed",
  geothermal: "#dc2626",
  highways: "#4b5563",
  forestry: "#16a34a",
  pipelines: "#ea580c",
  mining: "#6b7280",
  water: "#0d9488",
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
