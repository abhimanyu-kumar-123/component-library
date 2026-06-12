"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/** Selected checkbox glyph (Figma `4809:9693`) — brand circle with a cut-out
 *  check. `currentColor` drives the circle, so set the colour on the wrapper. */
function CheckboxSelectedIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10.4279 1.38574C12.5588 1.49352 14.5809 2.38745 16.0968 3.90332C17.7135 5.52009 18.6226 7.71261 18.6251 9.99902V10C18.6251 11.7058 18.1197 13.3736 17.172 14.792C16.2243 16.2103 14.8769 17.3159 13.3009 17.9688C11.7249 18.6215 9.99056 18.7917 8.31752 18.459C6.64447 18.1262 5.10771 17.3048 3.9015 16.0986C2.69528 14.8924 1.87395 13.3557 1.54115 11.6826C1.20835 10.0095 1.37858 8.27523 2.03138 6.69922C2.68419 5.12323 3.78979 3.77584 5.20814 2.82812C6.62648 1.88047 8.29434 1.375 10.0001 1.375H10.0011L10.4279 1.38574ZM13.1251 7.5C13.0431 7.5 12.9617 7.51553 12.8859 7.54688C12.81 7.57829 12.7408 7.62458 12.6828 7.68262L8.75013 11.6162L7.31752 10.1826C7.20027 10.0654 7.04094 10 6.87513 10C6.70931 10 6.55002 10.0654 6.43275 10.1826C6.31548 10.2999 6.25013 10.4591 6.25013 10.625C6.25013 10.7909 6.31548 10.9501 6.43275 11.0674L8.30775 12.9424C8.36578 13.0005 8.43503 13.0467 8.51088 13.0781C8.58667 13.1095 8.6681 13.126 8.75013 13.126C8.8322 13.126 8.91357 13.1095 8.98939 13.0781C9.06527 13.0467 9.13447 13.0005 9.19252 12.9424L13.5675 8.56738C13.6255 8.50936 13.6709 8.44005 13.7023 8.36426C13.7337 8.28839 13.7501 8.20712 13.7501 8.125C13.7501 8.04288 13.7337 7.96161 13.7023 7.88574C13.6709 7.80995 13.6255 7.74064 13.5675 7.68262C13.5094 7.62455 13.4403 7.5783 13.3644 7.54688C13.2886 7.51548 13.2072 7.50002 13.1251 7.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

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

  const control = isChecked ? (
    // The SVG's circle is inset in its viewBox; scale it up so the filled
    // circle matches the 20px default ring exactly (box stays size-5).
    <span className="grid size-5 shrink-0 place-items-center text-brand-primary">
      <CheckboxSelectedIcon className="size-5 scale-[1.16]" />
    </span>
  ) : (
    <span
      className={cn(
        "size-5 shrink-0 rounded-full border-[1.5px] border-text-disabled bg-white transition-colors",
        !disabled && "group-hover:border-brand-primary"
      )}
    />
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
