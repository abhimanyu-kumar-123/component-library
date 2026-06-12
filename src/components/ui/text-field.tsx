"use client";

import * as React from "react";
import { CaretDown, Info, WarningCircle } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

/* ── Shared shell: label + bordered box + hint / error row ───────────── */

type FieldShellProps = {
  label?: string;
  /** Helper text (Info icon). Hidden when `error` is set. */
  hint?: string;
  /** Error message — turns the border red and swaps the hint for a warning. */
  error?: string;
  /** Render the focus border without relying on `:focus-within` (e.g. open select). */
  forceActive?: boolean;
  className?: string;
  children: React.ReactNode;
};

const boxBase =
  "flex h-10 w-full items-center gap-2 rounded-lg border bg-white px-2.5 type-body-1 transition-colors";

function FieldShell({
  label,
  hint,
  error,
  forceActive,
  className,
  children,
}: FieldShellProps) {
  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      {label && (
        <span className="type-body-2 text-text-secondary">
          {label}
        </span>
      )}

      {children}

      {error ? (
        <span className="flex items-center gap-1 type-body-2 text-danger [&_svg]:size-3 [&_svg]:shrink-0">
          <WarningCircle weight="regular" />
          {error}
        </span>
      ) : hint ? (
        <span className="flex items-center gap-1 type-body-2 text-text-secondary [&_svg]:size-3 [&_svg]:shrink-0">
          <Info weight="regular" />
          {hint}
        </span>
      ) : null}
    </div>
  );
}

/** Border colour by state — resting → hover (dark) → focus (brand) → error (red). */
function borderClasses(error?: string) {
  return error
    ? "border-danger"
    : "border-border-divider hover:border-brand-primary focus-within:border-brand-primary";
}

/* ── TextField (textfield) ───────────────────────────────────────────── */

type TextFieldProps = Omit<React.ComponentProps<"input">, "className"> & {
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
};

/**
 * Labelled text input. States are handled with CSS (hover → dark border,
 * focus → brand border); pass `error` for the red error state + message,
 * or `hint` for an info helper line. Source of truth: Figma node `4586:931`.
 */
function TextField({
  label,
  hint,
  error,
  className,
  ...props
}: TextFieldProps) {
  return (
    <FieldShell label={label} hint={hint} error={error} className={className}>
      <div className={cn(boxBase, borderClasses(error))}>
        <input
          className="min-w-0 flex-1 bg-transparent text-text-primary outline-none placeholder:text-text-secondary"
          {...props}
        />
      </div>
    </FieldShell>
  );
}

/* ── SelectField (dropdown) ──────────────────────────────────────────── */

type SelectOption = { label: string; value: string };

type SelectFieldProps = {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

/**
 * Labelled select — a white bordered form dropdown. Caret flips up when open;
 * border goes brand-blue while open. Controlled (`value`) or uncontrolled.
 */
function SelectField({
  label,
  hint,
  error,
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select",
  className,
}: SelectFieldProps) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const current = value ?? internal;
  const selected = options.find((o) => o.value === current);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function select(v: string) {
    if (value === undefined) setInternal(v);
    onValueChange?.(v);
    setOpen(false);
  }

  return (
    <FieldShell label={label} hint={hint} error={error} className={className}>
      <div ref={rootRef} className="relative w-full">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            boxBase,
            "justify-between outline-none",
            error
              ? "border-danger"
              : open
                ? "border-brand-primary"
                : "border-border-divider hover:border-brand-primary"
          )}
        >
          <span
            className={cn(
              "min-w-0 flex-1 truncate text-left",
              selected ? "text-text-primary" : "text-text-secondary"
            )}
          >
            {selected?.label ?? placeholder}
          </span>
          <CaretDown
            className={cn(
              "size-4 shrink-0 text-text-primary transition-transform",
              open && "rotate-180"
            )}
          />
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute left-0 top-[calc(100%+4px)] z-50 w-full overflow-hidden rounded-lg border border-border-divider bg-white px-2.5 shadow-[0px_4px_20px_rgba(0,0,0,0.12)]"
          >
            {options.map((o, i) => (
              <li key={o.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={o.value === current}
                  onClick={() => select(o.value)}
                  className={cn(
                    "flex w-full items-center py-2.5 text-left type-body-1 text-text-primary outline-none transition-colors hover:text-brand-primary",
                    i > 0 && "border-t border-neutral-100"
                  )}
                >
                  {o.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </FieldShell>
  );
}

export { TextField, SelectField };
