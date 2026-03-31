// FAI Brand Color System
// Primary: International Orange #FF4F00, Cod Gray #121212, White #FFFFFF
// Secondary: Celestial Blue #4997D0, Chrome Yellow #FFA300, Timberwolf #D9D9D6

export const CHART_COLORS = {
  accent: "#FF4F00",       // International Orange — primary data series
  accentLight: "#ff7033",
  muted: "#D9D9D6",        // Timberwolf
  foreground: "#ffffff",
  cardBorder: "#2e2e2e",
  danger: "#ef4444",
  success: "#22c55e",
  blue: "#4997D0",          // Celestial Blue — secondary series
  yellow: "#FFA300",        // Chrome Yellow — tertiary series
  purple: "#8b5cf6",
  teal: "#14b8a6",
  orange: "#FF4F00",
  pink: "#ec4899",
  slate: "#D9D9D6",
};

export const SECTOR_COLORS: Record<string, string> = {
  solar: "#FFA300",         // Chrome Yellow
  wind: "#4997D0",          // Celestial Blue
  transmission: "#8b5cf6",
  geothermal: "#FF4F00",    // International Orange
  highways: "#D9D9D6",      // Timberwolf
  forestry: "#22c55e",
  pipelines: "#FFA300",
  mining: "#D9D9D6",
  water: "#4997D0",
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
