import * as React from "react";
import { CaretRight, Target } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SectionTitleProps = Omit<React.ComponentProps<"div">, "title"> & {
  /** Leading icon inside the white circle. Defaults to Target. */
  icon?: React.ReactNode;
  title: React.ReactNode;
  /** Optional secondary copy line under the title. */
  subtext?: React.ReactNode;
  /** Right-side slot — overrides the built-in "View all" CTA. */
  action?: React.ReactNode;
  /** Convenience: renders a ghost "View all" + caret CTA. */
  onViewAll?: () => void;
  viewAllLabel?: string;
};

/**
 * Section header row: a white icon circle + title (+ optional subtext) on the
 * left, and an optional CTA on the right. Use one above each home/onboarding
 * section. Source of truth: Figma node `4547:4923`.
 */
function SectionTitle({
  icon = <Target weight="fill" />,
  title,
  subtext,
  action,
  onViewAll,
  viewAllLabel = "View all",
  className,
  ...props
}: SectionTitleProps) {
  const cta =
    action ??
    (onViewAll ? (
      <Button variant="ghost" onClick={onViewAll}>
        {viewAllLabel}
        <CaretRight />
      </Button>
    ) : null);

  return (
    <div
      data-slot="section-title"
      className={cn("flex items-center justify-between gap-2", className)}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-text-primary [&_svg]:size-4">
          {icon}
        </span>
        <div className="flex min-w-0 flex-col justify-center">
          <h2 className="type-h2 truncate text-text-primary">{title}</h2>
          {subtext != null && (
            <p className="type-body-2 truncate text-text-secondary">{subtext}</p>
          )}
        </div>
      </div>
      {cta}
    </div>
  );
}

export { SectionTitle };
