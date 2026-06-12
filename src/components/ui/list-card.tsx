"use client";

import * as React from "react";
import { ChatTeardropText, WarningCircle } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const toneColor = {
  pending: "text-warning-default",
  ongoing: "text-brand-primary",
} as const;

type ListCardProps = Omit<React.ComponentProps<"div">, "content"> & {
  /** `pending` = amber status · `ongoing` = brand status. */
  tone?: "pending" | "ongoing";
  status: string;
  title: string;
  /** Optional body, e.g. a <ListContent />. */
  content?: React.ReactNode;
  /** Optional CTA row, e.g. <ListCardButton /> elements. */
  actions?: React.ReactNode;
  /** Show the trailing chat icon. Defaults to true. */
  showChat?: boolean;
};

/** Grey list card: status header + optional content + optional CTAs. */
function ListCard({
  tone = "pending",
  status,
  title,
  content,
  actions,
  showChat = true,
  className,
  ...props
}: ListCardProps) {
  return (
    <div
      data-slot="list-card"
      className={cn(
        "flex w-full flex-col gap-3 rounded-xl bg-surface-muted p-3",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-5">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <WarningCircle className={cn("size-3 shrink-0", toneColor[tone])} />
            <span
              className={cn(
                "type-caption",
                toneColor[tone]
              )}
            >
              {status}
            </span>
          </div>
          <p className="type-h3 text-text-primary">
            {title}
          </p>
        </div>
        {showChat && (
          <ChatTeardropText className="size-4 shrink-0 text-text-secondary/60" />
        )}
      </div>

      {content}

      {actions && <div className="flex items-start gap-2">{actions}</div>}
    </div>
  );
}

type ListCardButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "variant" | "size"
> & {
  /** `glass` = secondary look · `primary` = gradient. */
  variant?: "glass" | "primary";
};

/**
 * Compact CTA for a ListCard — the library Button at the small size, pinned
 * to a consistent height so primary and secondary always match.
 */
function ListCardButton({
  variant = "glass",
  className,
  ...props
}: ListCardButtonProps) {
  return (
    <Button
      data-slot="list-card-button"
      variant={variant === "primary" ? "primary" : "secondary"}
      size="sm"
      className={cn("h-7", className)}
      {...props}
    />
  );
}

export { ListCard, ListCardButton };
