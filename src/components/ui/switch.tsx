"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type SwitchOption = { label: string; value: string };

type SwitchProps = Omit<
  React.ComponentProps<"div">,
  "onChange" | "defaultValue"
> & {
  options: SwitchOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Enable touch haptic feedback on change (mobile). Defaults to true. */
  haptic?: boolean;
};

function triggerHaptic(duration = 10) {
  if (
    typeof navigator !== "undefined" &&
    typeof navigator.vibrate === "function"
  ) {
    navigator.vibrate(duration);
  }
}

/**
 * Segmented switch — a two-or-more option toggle. The active option is filled
 * with the brand gradient pill; the rest read as plain text on the glass track.
 */
function Switch({
  options,
  value,
  defaultValue,
  onValueChange,
  haptic = true,
  className,
  ...props
}: SwitchProps) {
  const [internal, setInternal] = React.useState(
    defaultValue ?? options[0]?.value
  );
  const active = value ?? internal;

  function select(next: string) {
    if (next === active) return;
    if (haptic) triggerHaptic();
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  }

  return (
    <div
      role="tablist"
      data-slot="switch"
      className={cn(
        "inline-flex h-9 items-center rounded-[20px] border border-white bg-white/50 p-px shadow-glass transition-[background,box-shadow] hover:bg-white hover:shadow-[0px_10px_10px_rgba(0,0,0,0.1)] has-[button:active]:bg-white has-[button:active]:shadow-[0px_10px_10px_rgba(0,0,0,0.1)]",
        className
      )}
      {...props}
    >
      {options.map((option) => {
        const isActive = option.value === active;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => select(option.value)}
            className={cn(
              "relative flex h-full flex-1 select-none items-center justify-center whitespace-nowrap rounded-[48px] px-[18px] text-[13px] leading-5 outline-none transition-[color] focus-visible:ring-[3px] focus-visible:ring-accent-violet-light",
              isActive
                ? "bg-[linear-gradient(93deg,#5b7df4_1%,#4066f1_99%)] font-medium text-white shadow-[inset_0px_0px_1px_0px_var(--accent-teal)]"
                : "font-normal text-text-primary"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export { Switch };
