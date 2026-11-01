/**
 * WCAG 2.2 Contrast Ratio Verification Script
 * Validates the "Blue Hour" palette tokens for Swing Forn de Pa.
 */

function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace("#", "");
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function relativeLuminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(hex1: string, hex2: string): number {
  const lum1 = relativeLuminance(hexToRgb(hex1));
  const lum2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

const TOKENS = {
  night: "#0E1540",
  hour: "#2236C8",
  flour: "#FFFBF0",
  sun: "#FFD23F",
  crust: "#F07A1F",
  tomato: "#C9341F",
  sage: "#CFE3C2",
};

interface PairingTest {
  name: string;
  fg: keyof typeof TOKENS;
  bg: keyof typeof TOKENS;
  minRatio: number;
  role: string;
}

const REQUIRED_PAIRINGS: PairingTest[] = [
  { name: "Night text on Flour canvas", fg: "night", bg: "flour", minRatio: 7.0, role: "Primary body & headlines on light" },
  { name: "Hour cobalt text/links on Flour", fg: "hour", bg: "flour", minRatio: 7.0, role: "Links and subheads on light" },
  { name: "Flour text on Night canvas", fg: "flour", bg: "night", minRatio: 7.0, role: "Primary text in dark sections" },
  { name: "Flour text on Hour cobalt", fg: "flour", bg: "hour", minRatio: 7.0, role: "White text in Blue Hour sections" },
  { name: "Night text on Sun disc / button", fg: "night", bg: "sun", minRatio: 7.0, role: "High-contrast text on golden badge" },
  { name: "Night text on Crust button fill", fg: "night", bg: "crust", minRatio: 5.5, role: "Crust button with dark text" },
  { name: "Tomato on Flour canvas", fg: "tomato", bg: "flour", minRatio: 4.5, role: "Seasonal alerts on light" },
  { name: "Flour on Tomato badge fill", fg: "flour", bg: "tomato", minRatio: 4.5, role: "Urgent seasonal badges" },
];

console.log("=== Blue Hour Palette Contrast Verification ===");
let hasFailures = false;

for (const p of REQUIRED_PAIRINGS) {
  const fgHex = TOKENS[p.fg];
  const bgHex = TOKENS[p.bg];
  const ratio = contrastRatio(fgHex, bgHex);
  const passed = ratio >= p.minRatio;
  
  const status = passed ? "✓ PASS" : "✗ FAIL";
  console.log(`${status} | ${p.name.padEnd(35)} | ${ratio.toFixed(2)}:1 (req >= ${p.minRatio.toFixed(1)}:1) | Role: ${p.role}`);
  
  if (!passed) {
    hasFailures = true;
  }
}

if (hasFailures) {
  console.error("\nSome required contrast pairings failed WCAG standards!");
  process.exit(1);
} else {
  console.log("\nAll required Blue Hour contrast pairings PASS WCAG 2.2 AA / AAA!");
}
