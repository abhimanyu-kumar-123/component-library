"use client";

import * as React from "react";
import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex shrink-0 select-none items-center justify-center gap-1 whitespace-nowrap font-sans font-medium leading-4 transition-[background,box-shadow,color,transform] outline-none focus-visible:ring-[3px] focus-visible:ring-accent-violet-light disabled:pointer-events-none active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary — indigo gradient, teal inner stroke, soft drop shadow.
        // `hover:` only applies on devices that support hover (desktop);
        // `active:` mirrors it as press feedback for touch (mobile).
        primary:
          "bg-[linear-gradient(93deg,#5b7df4_1%,#4066f1_99%)] text-white shadow-[0px_5px_5px_rgba(0,0,0,0.1),inset_0px_0px_1px_0px_var(--accent-teal)] hover:bg-[linear-gradient(93deg,#2b9ff5_1%,#4066f1_99%)] active:bg-[linear-gradient(93deg,#2b9ff5_1%,#4066f1_99%)] disabled:bg-none disabled:bg-accent-violet-light disabled:text-white disabled:shadow-none",
        // Secondary — translucent white "glass", white border, primary text.
        secondary:
          "border border-white bg-white/60 text-text-primary shadow-[0px_5px_10px_rgba(0,0,0,0.05)] hover:bg-white hover:shadow-[0px_5px_5px_rgba(0,0,0,0.05)] active:bg-white active:shadow-[0px_5px_5px_rgba(0,0,0,0.05)] disabled:border-transparent disabled:bg-white disabled:text-text-disabled disabled:shadow-none",
        // Ghost — transparent, brand-coloured text; subtle tint on hover/press.
        ghost:
          "text-brand-primary hover:bg-brand-primary/10 active:bg-brand-primary/10 disabled:bg-transparent disabled:text-text-disabled",
      },
      size: {
        lg: "rounded-lg p-3 text-[13px]",
        md: "rounded-lg px-3 py-2.5 text-[13px]",
        sm: "rounded px-2 py-1 text-[10px] [&_svg]:size-3",
        "icon-lg": "size-10 rounded-lg p-3",
        "icon-md": "size-9 rounded-lg p-2.5",
        "icon-sm": "size-6 rounded p-1 [&_svg]:size-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/**
 * Fire a short haptic pulse on supported devices (Android Chrome, etc.).
 * No-ops where the Vibration API is unavailable (notably iOS Safari).
 */
function triggerHaptic(duration = 10) {
  if (
    typeof navigator !== "undefined" &&
    typeof navigator.vibrate === "function"
  ) {
    navigator.vibrate(duration);
  }
}

type ButtonProps = useRender.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Enable touch haptic feedback on press (mobile). Defaults to true. */
    haptic?: boolean;
  };

function Button({
  className,
  variant,
  size,
  haptic = true,
  render = <button />,
  ...props
}: ButtonProps) {
  // Rule: the ghost variant always renders at the large size.
  const resolvedSize = variant === "ghost" ? "lg" : size;

  const defaultProps = {
    "data-slot": "button",
    className: cn(buttonVariants({ variant, size: resolvedSize, className })),
    onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => {
      // Only buzz for finger taps — never for mouse or pen.
      if (haptic && event.pointerType === "touch") {
        triggerHaptic();
      }
    },
  } as const;

  return useRender({
    render,
    props: mergeProps<"button">(defaultProps, props),
  });
}

export { Button, buttonVariants };
