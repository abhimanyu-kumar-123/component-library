"use client";

import * as React from "react";
import { CaretRight, Clock } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { MetaLogo } from "@/components/brand-logos";

type Stat = { label: string; value: string };

type StrategyCardProps = {
  /** Leading icon in the grey box. Defaults to the Meta logo. */
  icon?: React.ReactNode;
  /** Top summary line. */
  summary: React.ReactNode;
  /** Headline inside the amber detail box. */
  detail: React.ReactNode;
  /** Stats shown in the amber footer strip (split by a divider). */
  stats?: Stat[];
  /** Bottom-left note (rendered with a clock icon). */
  footnote?: React.ReactNode;
  /** Bottom-right timestamp. */
  time?: string;
  onDetailClick?: () => void;
  className?: string;
};

/** Strategy summary card with an amber action highlight and a schedule note. */
function StrategyCard({
  icon,
  summary,
  detail,
  stats = [],
  footnote,
  time,
  onDetailClick,
  className,
}: StrategyCardProps) {
  return (
    <div
      data-slot="strategy-card"
      className={cn("flex w-full items-start rounded-2xl bg-white p-3", className)}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        {/* Summary */}
        <div className="flex items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface-muted text-text-primary [&_svg]:size-5">
            {icon ?? <MetaLogo />}
          </span>
          <p className="min-w-0 flex-1 type-body-1 text-text-primary">
            {summary}
          </p>
        </div>

        {/* Amber detail box */}
        <div className="flex w-full flex-col overflow-hidden rounded-xl border border-warning-amber">
          <button
            type="button"
            onClick={onDetailClick}
            className="flex w-full items-center justify-between gap-2 border border-warning-light py-2 pl-3 pr-2 text-left outline-none transition-colors hover:bg-[#fffaf0]"
          >
            <span className="text-[12px] font-medium leading-4 text-[#995400]">
              {detail}
            </span>
            <CaretRight className="size-3 shrink-0 text-[#995400]" />
          </button>

          {stats.length > 0 && (
            <div className="flex items-stretch justify-between bg-warning-light px-3 py-1.5">
              {stats.map((s, i) => (
                <React.Fragment key={i}>
                  {i > 0 && (
                    <div className="mx-1 w-px self-stretch bg-warning-amber/40" />
                  )}
                  <div className="flex flex-1 flex-col items-center justify-center text-center text-[#995400]">
                    <span className="text-[11px] font-normal leading-4">
                      {s.label}
                    </span>
                    <span className="text-[13px] font-semibold leading-[18px]">
                      {s.value}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {(footnote || time) && (
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1 type-body-2 text-text-primary">
              <Clock className="size-4 shrink-0" />
              {footnote}
            </span>
            {time && (
              <span className="shrink-0 text-[10px] leading-4 text-text-secondary">
                {time}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export { StrategyCard };
