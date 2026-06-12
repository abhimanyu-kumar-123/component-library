"use client";

import * as React from "react";
import { CalendarBlank, CaretDown } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

function triggerHaptic(duration = 10) {
  if (
    typeof navigator !== "undefined" &&
    typeof navigator.vibrate === "function"
  ) {
    navigator.vibrate(duration);
  }
}

type DropdownOption = { label: string; value: string };

type DropdownProps = {
  options: DropdownOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  /** Leading icon. Defaults to a calendar. Pass `null` to hide. */
  icon?: React.ReactNode;
  className?: string;
};

/**
 * Glass pill dropdown — opens a menu of options. The trigger turns solid
 * white when open/hovered; the caret flips. Controlled or uncontrolled.
 */
function Dropdown({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select",
  icon,
  className,
}: DropdownProps) {
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
    <div
      ref={rootRef}
      data-slot="dropdown"
      className={cn("relative inline-flex flex-col items-start", className)}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onPointerDown={(e) => {
          if (e.pointerType === "touch") triggerHaptic();
        }}
        className={cn(
          "inline-flex h-9 w-full items-center justify-between gap-2 rounded-full border border-white px-3 text-[13px] leading-5 text-text-primary outline-none transition-[background,box-shadow] focus-visible:ring-2 focus-visible:ring-accent-violet-light",
          open
            ? "bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.04)]"
            : "bg-white/50 shadow-[0px_4px_8px_rgba(0,0,0,0.04)] hover:bg-white hover:shadow-[0px_4px_4px_rgba(0,0,0,0.04)]"
        )}
      >
        <span className="flex min-w-0 items-center gap-1 [&_svg]:size-4 [&_svg]:shrink-0">
          {icon === undefined ? <CalendarBlank /> : icon}
          <span className="truncate">{selected?.label ?? placeholder}</span>
        </span>
        <CaretDown
          className={cn(
            "size-3 shrink-0 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-[calc(100%+8px)] z-50 min-w-[160px] overflow-hidden rounded-xl border border-white bg-white px-3 shadow-[0px_4px_20px_rgba(0,0,0,0.12)]"
        >
          {options.map((o, i) => (
            <li key={o.value}>
              <button
                type="button"
                role="option"
                aria-selected={o.value === current}
                onClick={() => select(o.value)}
                className={cn(
                  "flex w-full items-center py-3 text-left type-body-1 text-text-primary outline-none transition-colors hover:text-brand-primary",
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
  );
}

export { Dropdown };
