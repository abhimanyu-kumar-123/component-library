"use client";

import * as React from "react";
import { CaretRight, Target } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

type SectionCardProps = {
  /** Leading icon in the header (inline, no circle). Defaults to Target. */
  icon?: React.ReactNode;
  title: React.ReactNode;
  /** Renders a compact "View all" + caret ghost link on the right. */
  onViewAll?: () => void;
  viewAllLabel?: string;
  /** Body surface: `white` = inner white panel (default) · `glass` = transparent. */
  surface?: "white" | "glass";
  className?: string;
  children: React.ReactNode;
};

/**
 * A glass card with the section title inset in its header (Figma `5304:968`):
 * an icon + title (+ optional "View all") header strip over a body. Use for a
 * self-contained section block (e.g. Recent conversation, Your journey). For a
 * header that sits *above* separate cards, use `SectionTitle` instead.
 */
function SectionCard({
  icon = <Target weight="fill" />,
  title,
  onViewAll,
  viewAllLabel = "View all",
  surface = "white",
  className,
  children,
}: SectionCardProps) {
  return (
    <div
      data-slot="section-card"
      className={cn(
        "overflow-hidden rounded-2xl border border-white bg-white/60",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <span className="flex min-w-0 items-center gap-2 text-text-primary [&_svg]:size-4 [&_svg]:shrink-0">
          {icon}
          <span className="truncate type-h2">{title}</span>
        </span>
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="flex shrink-0 items-center gap-0.5 type-h3 text-brand-primary outline-none transition-opacity active:opacity-70 [&_svg]:size-3"
          >
            {viewAllLabel}
            <CaretRight weight="bold" />
          </button>
        )}
      </div>
      <div className={cn(surface === "white" ? "bg-white p-3" : "px-3 pb-3")}>
        {children}
      </div>
    </div>
  );
}

export { SectionCard };
