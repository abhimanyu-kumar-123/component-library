#!/usr/bin/env node
/**
 * Governance guardrail (blocking).
 *
 * Every component file in src/components/ui/ MUST be registered in BOTH:
 *   1. the machine-readable manifest  → src/lib/design-os.ts  (COMPONENTS)
 *   2. the live gallery               → src/app/page.tsx       (REGISTRY)
 *
 * This keeps design-os.ts — the single source of truth an AI / "design system
 * import" consumes — from silently drifting out of sync with the real library.
 * Runs automatically before `npm run build` (prebuild).
 */
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const uiDir = join(root, "src/components/ui");

/** ui files intentionally NOT surfaced as their own entry (none today). */
const ALLOWLIST = new Set([]);

const slugsIn = (rel) =>
  new Set(
    [...readFileSync(join(root, rel), "utf8").matchAll(/slug:\s*"([^"]+)"/g)].map(
      (m) => m[1]
    )
  );

const components = readdirSync(uiDir)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => f.replace(/\.tsx$/, ""))
  .filter((s) => !ALLOWLIST.has(s));

const manifest = slugsIn("src/lib/design-os.ts");
const gallery = slugsIn("src/app/page.tsx");

const problems = [];
for (const slug of components) {
  const missing = [];
  if (!manifest.has(slug)) missing.push("design-os.ts (COMPONENTS)");
  if (!gallery.has(slug)) missing.push("gallery REGISTRY (src/app/page.tsx)");
  if (missing.length) problems.push(`  • ${slug} — missing from: ${missing.join(" + ")}`);
}

if (problems.length) {
  console.error(
    `\n✗ design-os drift — ${problems.length} component(s) not registered everywhere:\n` +
      problems.join("\n") +
      `\n\nEvery src/components/ui/*.tsx needs a matching slug in BOTH` +
      ` src/lib/design-os.ts (COMPONENTS) and the gallery REGISTRY (src/app/page.tsx).\n`
  );
  process.exit(1);
}

console.log(
  `✓ design-os in sync — all ${components.length} ui components registered in the manifest + gallery.`
);
