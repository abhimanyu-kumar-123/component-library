import * as React from "react";

import { cn } from "@/lib/utils";

export type ProgressTone = "orange" | "blue" | "red" | "green";

/** Base token colour per tone — the gradient runs from a visible light tint of
 * this colour (mixed with white) to the solid colour. All token-based. */
const TONE_VAR: Record<ProgressTone, string> = {
  orange: "var(--warning-default)", // #e08a2d
  blue: "var(--brand-primary)", // #4764cd
  red: "var(--danger)", // #f44336
  green: "var(--success)", // #22a12a
};

/** How light the gradient's left end is (lower = lighter). 42% keeps the light
 * tint clearly visible against the grey track while staying obviously "light". */
const LIGHT_MIX = "42%";

type ProgressBarProps = {
  /** Fill percentage, 0–100. */
  value: number;
  tone?: ProgressTone;
  className?: string;
};

/**
 * Slim progress bar — a grey track (`border-divider`) with a tone-gradient
 * fill that runs light → solid (e.g. light green → green). Source of truth:
 * Figma node `4909:4892`.
 */
function ProgressBar({ value, tone = "orange", className }: ProgressBarProps) {
  const color = TONE_VAR[tone];
  return (
    <span
      className={cn(
        "block h-1.5 w-full overflow-hidden rounded-full bg-border-divider",
        className
      )}
    >
      <span
        className="block h-full rounded-full"
        style={{
          width: `${Math.max(0, Math.min(100, value))}%`,
          backgroundImage: `linear-gradient(to right, color-mix(in srgb, ${color} ${LIGHT_MIX}, white), ${color})`,
        }}
      />
    </span>
  );
}

export { ProgressBar };
