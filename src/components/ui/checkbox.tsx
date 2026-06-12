"use client";

import * as React from "react";
import { Check } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

type CheckboxProps = Omit<
  React.ComponentProps<"button">,
  "onChange" | "value"
> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Optional label rendered to the right of the control. */
  label?: React.ReactNode;
};

/**
 * Circular checkbox (Figma `4809:9693`). Default = grey ring; selected =
 * brand-primary fill + white check. Controlled (`checked`) or uncontrolled
 * (`defaultChecked`). Pass `label` to render an aligned, clickable label.
 */
function Checkbox({
  checked,
  defaultChecked,
  onCheckedChange,
  label,
  disabled,
  className,
  ...props
}: CheckboxProps) {
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const isChecked = checked ?? internal;

  function toggle() {
    const next = !isChecked;
    if (checked === undefined) setInternal(next);
    onCheckedChange?.(next);
  }

  const control = (
    <span
      className={cn(
        "grid size-5 shrink-0 place-items-center rounded-full transition-colors [&_svg]:size-3.5",
        isChecked
          ? "border-2 border-brand-primary bg-brand-primary text-white"
          : "border-[1.5px] border-text-disabled bg-white",
        !disabled && !isChecked && "group-hover:border-brand-primary"
      )}
    >
      {isChecked && <Check weight="bold" />}
    </span>
  );

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full text-left outline-none focus-visible:ring-2 focus-visible:ring-accent-violet-light disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {control}
      {label != null && (
        <span className="type-body-1 text-text-primary">{label}</span>
      )}
    </button>
  );
}

export { Checkbox };
