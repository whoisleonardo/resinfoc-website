// Adapt only the former brand defaults; colors saved by the editor stay editable.
const LEGACY_COLORS = {
  '#573b6f': '#1F5278',
  '#f4b030': '#A63D32', // Dark coral keeps small labels readable on light surfaces.
  '#378054': '#173143',
  '#516e90': '#1F5278',
};

export function displayColor(value, fallback = 'var(--brand-ink)') {
  if (typeof value !== 'string' || !value.trim()) return fallback;
  const color = value.trim();
  const legacy = LEGACY_COLORS[color.toLowerCase()];
  if (legacy) return legacy;

  // Hex covers the admin picker and non-DOM rendering; CSS validates other saved formats.
  const isHex = /^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i.test(color);
  if (isHex || globalThis.CSS?.supports('color', color)) return value;
  return fallback;
}
