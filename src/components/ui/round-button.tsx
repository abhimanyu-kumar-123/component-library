"use client";

import * as React from "react";
import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const roundButtonVariants = cva(
  "relative inline-flex shrink-0 select-none items-center justify-center gap-1 whitespace-nowrap border font-sans font-medium leading-5 outline-none transition-[background,box-shadow,transform] active:scale-[0.98] focus-visible:ring-[3px] focus-visible:ring-accent-violet-light disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      size: {
        // text pills
        md: "h-9 rounded-[18px] px-3 text-[13px]",
        lg: "h-10 rounded-[20px] px-3 text-[13px]",
        // icon-only squares
        "icon-md": "size-9 rounded-[18px]",
        "icon-lg": "size-10 rounded-[20px]",
      },
      selected: {
        false:
          "border-white bg-white/50 text-text-primary shadow-glass hover:bg-white hover:shadow-[0px_10px_10px_rgba(0,0,0,0.1)]",
        true: "rounded-full border-transparent bg-[linear-gradient(93deg,#5b7df4_1%,#4066f1_99%)] text-white shadow-[0px_5px_5px_rgba(0,0,0,0.1),inset_0px_0px_1px_0px_var(--accent-teal)]",
      },
    },
    defaultVariants: {
      size: "lg",
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

type RoundButtonProps = useRender.ComponentProps<"button"> &
  VariantProps<typeof roundButtonVariants> & {
    /** Enable touch haptic feedback on press (mobile). Defaults to true. */
    haptic?: boolean;
  };

function RoundButton({
  className,
  size,
  selected,
  haptic = true,
  render = <button />,
  ...props
}: RoundButtonProps) {
  const defaultProps = {
    "data-slot": "round-button",
    className: cn(roundButtonVariants({ size, selected, className })),
    onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => {
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

export { RoundButton, roundButtonVariants };
