#!/usr/bin/env node
/**
 * Token-drift report (non-blocking).
 *
 * Flags values that bypass the token system — raw #hex colours and arbitrary
 * `shadow-[…]` utilities — so they can be promoted to tokens / named shadow
 * utilities (shadow-glass / shadow-card / shadow-lift / shadow-sheet /
 * shadow-inset-glass).
 *
 * Report-only by design: it prints candidates and exits 0 so it never breaks a
 * deploy. Once the remaining candidates are cleaned up (or allow-listed), flip
 * EXIT_ON_FINDINGS to true and add it to `prebuild` to make it a hard gate.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const EXIT_ON_FINDINGS = false; // flip to true once drift is cleaned to enforce

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Files where raw values are legitimate (token defs, brand marks, the manifest
 *  which intentionally enumerates the gradient stop values). */
const SKIP = [/globals\.css$/, /brand-logos/, /\/icons\.tsx$/, /lib\/design-os\.ts$/];

/** Arbitrary shadows that are sanctioned (brand inner stroke on gradient CTAs;
 *  the small elevation on the Toggle knob). */
const ALLOWED_SHADOW = [
  /var\(--accent-teal\)/,
  /0px_1px_2px_rgba\(0,0,0,0\.25\)/, // Toggle knob
  /0px_-10px_30px_rgba\(0,0,0,0\.1\)/, // CallbackBar upward float shadow
  /0px_2px_6px_rgba\(0,0,0,0\.05\)/, // on-dark / card button subtle elevation
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|css)$/.test(p)) out.push(p);
  }
  return out;
}

const files = walk(join(root, "src")).filter((f) => !SKIP.some((re) => re.test(f)));
const shadowRe = /shadow-\[[^\]]+\]/g;
const hexRe = /#[0-9a-fA-F]{6}\b/g;

let total = 0;
const report = [];

for (const f of files) {
  const hits = new Set();
  readFileSync(f, "utf8")
    .split("\n")
    .forEach((line, i) => {
      const n = i + 1;
      for (const m of line.matchAll(shadowRe)) {
        if (!ALLOWED_SHADOW.some((re) => re.test(m[0])))
          hits.add(`L${n}  arbitrary shadow  ${m[0].slice(0, 56)}`);
      }
      // Raw hex outside brand gradient definitions and line comments.
      const code = line.split("//")[0];
      if (!code.includes("linear-gradient")) {
        for (const m of code.matchAll(hexRe)) hits.add(`L${n}  raw hex           ${m[0]}`);
      }
    });
  if (hits.size) {
    total += hits.size;
    report.push(
      `  ${relative(root, f)}\n` + [...hits].map((h) => `      - ${h}`).join("\n")
    );
  }
}

if (total) {
  console.log(
    `\n⚠ token-drift report — ${total} candidate(s) bypass the token system:\n` +
      report.join("\n") +
      `\n\nPromote to a token / named shadow utility where one fits, or allow-list` +
      ` intentional one-offs in scripts/check-tokens.mjs.\n`
  );
  if (EXIT_ON_FINDINGS) process.exit(1);
} else {
  console.log("✓ no token drift — all colours/shadows are token-based.");
}
