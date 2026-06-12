"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const selectorPillVariants = cva(
  "inline-flex select-none items-center justify-center whitespace-nowrap rounded-[42px] border px-3 py-1.5 text-[12px] font-medium leading-4 text-text-primary outline-none transition-[background,box-shadow,border-color,transform] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-accent-violet-light disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      selected: {
        false:
          "border-white bg-white/50 shadow-[0px_2px_8px_rgba(0,0,0,0.05)] hover:bg-white hover:shadow-[0px_2px_4px_rgba(0,0,0,0.05)] active:bg-white",
        true: "border-brand-primary bg-white/50 shadow-[0px_2px_8px_rgba(0,0,0,0.05)]",
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

function triggerHaptic(duration = 10) {
  if (
    typeof navigator !== "undefined" &&
    typeof navigator.vibrate === "function"
  ) {
    navigator.vibrate(duration);
  }
}

type SelectorPillProps = React.ComponentProps<"button"> &
  VariantProps<typeof selectorPillVariants> & {
    /** Touch haptic feedback on press. Defaults to true. */
    haptic?: boolean;
  };

/**
 * Glass selector / filter pill. `selected` swaps the border to brand-primary.
 */
function SelectorPill({
  className,
  selected,
  haptic = true,
  onPointerDown,
  ...props
}: SelectorPillProps) {
  return (
    <button
      type="button"
      data-slot="selector-pill"
      aria-pressed={selected ?? false}
      className={cn(selectorPillVariants({ selected, className }))}
      onPointerDown={(e) => {
        if (haptic && e.pointerType === "touch") triggerHaptic();
        onPointerDown?.(e);
      }}
      {...props}
    />
  );
}

export { SelectorPill, selectorPillVariants };
