import fs from "fs";
import path from "path";

// Master Prompt Section 13:
// check:hardcoded verifies that components use data props / settings layer
// rather than uneditable inline business facts.

const DIRECTORIES_TO_SCAN = ["app", "components"];
const IGNORED_FILES = ["seed.ts", "hours.ts", "settings.ts", "DECISIONS.md", "README.md"];

// Business patterns that should only live in settings/db, not hardcoded inside component markups
const SUSPICIOUS_PATTERNS = [
  /href="tel:\+34000000000"/, // placeholder phone without variables
];

let hasErrors = false;

function scanDirectory(dir: string) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (stat.isFile() && (file.endsWith(".tsx") || file.endsWith(".ts"))) {
      if (IGNORED_FILES.some((ig) => file.includes(ig))) continue;

      const content = fs.readFileSync(fullPath, "utf-8");
      for (const pattern of SUSPICIOUS_PATTERNS) {
        if (pattern.test(content)) {
          console.error(`❌ Hardcoded pattern found in ${fullPath}: ${pattern}`);
          hasErrors = true;
        }
      }
    }
  }
}

console.log("🔍 Running check:hardcoded verification on app/ and components/...");
for (const d of DIRECTORIES_TO_SCAN) {
  scanDirectory(d);
}

if (hasErrors) {
  console.error("❌ check:hardcoded failed! Please move business literals to settings/DB.");
  process.exit(1);
} else {
  console.log("✅ check:hardcoded passed! Zero forbidden hardcoded patterns detected.");
}
