"use client";

import * as React from "react";
import { CaretDown, LightbulbFilament } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Pill } from "@/components/ui/pill";

type Badge = { label: string; tone: "success" | "brand" };

// Map the card's badge tones onto the shared Pill component (always UPPERCASE).
const badgeTone = { success: "success", brand: "neutral" } as const;

type CollapsibleCardProps = {
  /** Eyebrow label, e.g. "STRATEGY 1". */
  strategy: string;
  title: string;
  /** Summary badges shown when collapsed. */
  badges?: Badge[];
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Content (e.g. ListCards) revealed when expanded. */
  children?: React.ReactNode;
  className?: string;
};

/**
 * Collapsible strategy card. Collapsed shows the title + summary badges;
 * expanded reveals its children (typically ListCards).
 */
function CollapsibleCard({
  strategy,
  title,
  badges = [],
  defaultOpen = false,
  open,
  onOpenChange,
  children,
  className,
}: CollapsibleCardProps) {
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = open ?? internal;

  function toggle() {
    const next = !isOpen;
    if (open === undefined) setInternal(next);
    onOpenChange?.(next);
  }

  return (
    <div
      data-slot="collapsible-card"
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "flex w-full flex-col rounded-2xl bg-white p-3",
        isOpen ? "gap-3 border border-surface-muted" : "gap-2",
        className
      )}
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        className="flex flex-col gap-1 text-left outline-none"
      >
        <div className="flex items-center justify-between gap-2">
          <Pill
            tone="neutral"
            background={false}
            icon={<LightbulbFilament weight="regular" />}
          >
            {strategy}
          </Pill>
          <CaretDown
            className={cn(
              "size-3 shrink-0 text-text-secondary transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </div>

        <span className="type-h2 text-text-primary">
          {title}
        </span>

        {!isOpen && badges.length > 0 && (
          <span className="mt-0.5 flex flex-wrap items-center gap-1">
            {badges.map((b, i) => (
              <Pill key={i} tone={badgeTone[b.tone]}>
                {b.label}
              </Pill>
            ))}
          </span>
        )}
      </button>

      {isOpen && <div className="flex flex-col gap-3">{children}</div>}
    </div>
  );
}

export { CollapsibleCard };
