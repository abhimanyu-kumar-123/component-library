"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type ToggleProps = Omit<
  React.ComponentProps<"button">,
  "onChange" | "value"
> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Optional label rendered to the right of the toggle. */
  label?: React.ReactNode;
};

/**
 * iOS-style on/off Toggle — a pill track with a sliding white knob. On = brand
 * gradient track, off = grey track. Use for a single binary setting (the
 * `Switch` is a segmented view toggle; `Checkbox` is a circular multi-select).
 * Controlled (`checked`) or uncontrolled (`defaultChecked`); optional `label`.
 */
function Toggle({
  checked,
  defaultChecked,
  onCheckedChange,
  label,
  disabled,
  className,
  ...props
}: ToggleProps) {
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const isOn = checked ?? internal;

  function toggle() {
    const next = !isOn;
    if (checked === undefined) setInternal(next);
    onCheckedChange?.(next);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full text-left outline-none focus-visible:ring-2 focus-visible:ring-accent-violet-light disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200",
          isOn ? "bg-gradient-primary" : "bg-border-divider"
        )}
      >
        <span
          className={cn(
            "absolute left-0.5 size-5 rounded-full bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.25)] transition-transform duration-200",
            isOn ? "translate-x-5" : "translate-x-0"
          )}
        />
      </span>
      {label != null && (
        <span className="type-body-1 text-text-primary">{label}</span>
      )}
    </button>
  );
}

export { Toggle };
