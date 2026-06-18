"use client";

import * as React from "react";
import { CaretLeft, X } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RoundButton } from "@/components/ui/round-button";
import { SectionTitle } from "@/components/ui/section-title";

type BottomSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Optional SectionTitle header (icon defaults to Target inside SectionTitle). */
  title?: string;
  titleIcon?: React.ReactNode;
  /** Lead paragraph under the header. */
  description?: string;
  /** Show a back button (top-left) and fire this on press. */
  onBack?: () => void;
  /** Footer — convenience primary/secondary, or a custom `footer` node. */
  primaryLabel?: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

/**
 * Bottom sheet modal. Slides up from the bottom of the nearest positioned
 * ancestor (give the parent `relative` — the mobile frame already is). Grabber
 * handle, glass back/close buttons, optional SectionTitle header + description,
 * scrollable body, and a Secondary/Primary footer. Source: Figma `4626:1015`.
 */
function BottomSheet({
  open,
  onOpenChange,
  title,
  titleIcon,
  description,
  onBack,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  footer,
  children,
  className,
}: BottomSheetProps) {
  React.useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  const hasFooter = footer || primaryLabel || secondaryLabel;

  return (
    <div className="absolute inset-0 z-50" role="dialog" aria-modal="true">
      {/* Scrim */}
      <button
        type="button"
        aria-label="Close"
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 bg-black/40 motion-safe:animate-fade-in"
      />

      {/* Sheet — floats 4px off the left/right/bottom edges and grows up to
          4px from the top (full page), after which the body scrolls. */}
      <div
        className={cn(
          "absolute inset-x-1 bottom-1 z-10 flex max-h-[calc(100%-8px)] flex-col overflow-hidden rounded-[20px] border border-white bg-surface-muted shadow-sheet motion-safe:animate-sheet-up",
          className
        )}
      >
        {onBack ? (
          /* ── With back button ──────────────────────────────────────────
             Sticky header holds the back/close row; pb-2 keeps a persistent
             8px gap, body pt-2 adds 8px more at rest → 16px gap initially,
             8px while scrolling. */
          <>
            <div className="relative shrink-0 px-2 pb-2 pt-2">
              <span className="absolute left-1/2 top-1.5 h-1 w-8 -translate-x-1/2 rounded-full bg-neutral-300" />
              <div className="flex items-center justify-between">
                <RoundButton
                  size="icon-md"
                  aria-label="Back"
                  onClick={onBack}
                  className="[&_svg]:size-4"
                >
                  <CaretLeft />
                </RoundButton>
                <RoundButton
                  size="icon-md"
                  aria-label="Close"
                  onClick={() => onOpenChange(false)}
                  className="[&_svg]:size-4"
                >
                  <X />
                </RoundButton>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 pb-4 pt-2">
              {title && <SectionTitle icon={titleIcon} title={title} />}
              {description && (
                <p className="type-body-1 text-text-primary">{description}</p>
              )}
              {children}
            </div>
          </>
        ) : (
          /* ── Without back button ───────────────────────────────────────
             Sticky opaque header holds the title + close (8px inset); the body
             scrolls *below* it so content never overlaps the close button. */
          <>
            <div className="relative shrink-0 px-4 pb-2 pt-1.5">
              <span className="absolute left-1/2 top-1.5 h-1 w-8 -translate-x-1/2 rounded-full bg-neutral-300" />
              <RoundButton
                size="icon-md"
                aria-label="Close"
                onClick={() => onOpenChange(false)}
                className="absolute right-2 top-2 [&_svg]:size-4"
              >
                <X />
              </RoundButton>
              {title ? (
                <h2 className="type-h2 truncate pr-12 pt-3 text-text-primary">
                  {title}
                </h2>
              ) : (
                <div className="h-9" />
              )}
            </div>

            <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 pb-4 pt-1">
              {description && (
                <p className="type-body-1 text-text-primary">{description}</p>
              )}
              {children}
            </div>
          </>
        )}

        {/* Sticky footer */}
        {hasFooter && (
          <div className="flex shrink-0 items-center gap-2 border-t border-white p-4">
            {footer ?? (
              <>
                {secondaryLabel && (
                  <Button
                    variant="secondary"
                    size="lg"
                    className="flex-1"
                    onClick={onSecondary}
                  >
                    {secondaryLabel}
                  </Button>
                )}
                {primaryLabel && (
                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    onClick={onPrimary}
                  >
                    {primaryLabel}
                  </Button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export { BottomSheet };
