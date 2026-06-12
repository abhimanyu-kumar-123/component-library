"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/* ── Radio control (presentational) ──────────────────────────────────── */

type RadioProps = {
  checked?: boolean;
  /** Disable hover affordance (e.g. inside a disabled row). */
  disabled?: boolean;
  className?: string;
};

/**
 * The radio circle (Figma `4809:9694`). Default = grey ring; selected =
 * brand-primary ring + brand-primary center dot. Usually driven by RadioGroup.
 */
function Radio({ checked = false, disabled, className }: RadioProps) {
  return (
    <span
      className={cn(
        "grid size-5 shrink-0 place-items-center rounded-full bg-white transition-colors",
        checked
          ? "border-2 border-brand-primary"
          : "border-[1.5px] border-text-disabled",
        !disabled && !checked && "group-hover:border-brand-primary",
        className
      )}
    >
      {checked && (
        <span className="size-2.5 rounded-full bg-brand-primary" />
      )}
    </span>
  );
}

/* ── RadioGroup ──────────────────────────────────────────────────────── */

type RadioOption = {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
};

type RadioGroupProps = {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

/**
 * Single-select radio list. Controlled (`value`) or uncontrolled
 * (`defaultValue`). Renders a Radio + label per option.
 */
function RadioGroup({
  options,
  value,
  defaultValue,
  onValueChange,
  className,
}: RadioGroupProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const current = value ?? internal;

  function select(v: string) {
    if (value === undefined) setInternal(v);
    onValueChange?.(v);
  }

  return (
    <div role="radiogroup" className={cn("flex flex-col gap-3", className)}>
      {options.map((o) => {
        const selected = current === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={o.disabled}
            onClick={() => select(o.value)}
            className="group inline-flex items-center gap-2 rounded-full text-left outline-none focus-visible:ring-2 focus-visible:ring-accent-violet-light disabled:pointer-events-none disabled:opacity-50"
          >
            <Radio checked={selected} disabled={o.disabled} />
            <span className="type-body-1 text-text-primary">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export { Radio, RadioGroup };
