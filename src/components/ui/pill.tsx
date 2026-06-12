"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { WarningCircle } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

const pillVariants = cva(
  // RULE: pill labels are ALWAYS uppercase (type-caption already uppercases;
  // the explicit `uppercase` keeps the rule even if type-caption changes).
  "inline-flex items-center gap-1 rounded-md py-[3px] type-caption uppercase [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      // The surface the pill sits on (drives the text/background palette).
      surface: { light: "", dark: "" },
      // Semantic meaning.
      tone: { neutral: "", success: "", danger: "", warning: "" },
      // Filled background vs. text-only.
      background: { true: "px-1.5", false: "" },
    },
    compoundVariants: [
      /* ── LIGHT surface — text ───────────────────────────────────── */
      { surface: "light", tone: "success", class: "text-success" },
      { surface: "light", tone: "danger", class: "text-danger" },
      { surface: "light", tone: "warning", class: "text-warning-default" },
      {
        surface: "light",
        tone: "neutral",
        background: true,
        class: "text-brand-primary",
      },
      {
        surface: "light",
        tone: "neutral",
        background: false,
        class: "text-text-secondary",
      },
      /* ── LIGHT surface — background ─────────────────────────────── */
      { surface: "light", tone: "neutral", background: true, class: "bg-surface-app" },
      { surface: "light", tone: "success", background: true, class: "bg-success-light" },
      { surface: "light", tone: "danger", background: true, class: "bg-danger-light" },
      { surface: "light", tone: "warning", background: true, class: "bg-warning-light" },

      /* ── DARK surface — text (soft, light-on-dark) ──────────────── */
      { surface: "dark", tone: "neutral", class: "text-accent-violet" },
      { surface: "dark", tone: "success", class: "text-success-soft" },
      { surface: "dark", tone: "danger", class: "text-danger-soft" },
      { surface: "dark", tone: "warning", class: "text-warning-amber" },
      /* ── DARK surface — background ──────────────────────────────── */
      { surface: "dark", background: true, class: "bg-black/30" },
    ],
    defaultVariants: { surface: "light", tone: "neutral", background: true },
  }
);

type PillProps = Omit<React.ComponentProps<"span">, "color"> &
  VariantProps<typeof pillVariants> & {
    /** `true` → default WarningCircle · a node → custom icon · omit → none. */
    icon?: React.ReactNode | boolean;
  };

/**
 * Status pill / badge. Four semantic `tone`s on a `light` or `dark` `surface`,
 * with an optional filled `background` and a leading `icon`.
 *
 *   <Pill tone="success">Live</Pill>
 *   <Pill tone="warning" icon>Go live risk</Pill>
 *   <Pill surface="dark" tone="danger" icon background={false}>Failed</Pill>
 */
function Pill({
  className,
  surface,
  tone,
  background,
  icon,
  children,
  ...props
}: PillProps) {
  // RULE: pill icons are always outline (regular weight).
  const iconNode =
    icon === true ? <WarningCircle weight="regular" /> : icon || null;

  return (
    <span
      data-slot="pill"
      className={cn(pillVariants({ surface, tone, background }), className)}
      {...props}
    >
      {iconNode}
      {children}
    </span>
  );
}

export { Pill, pillVariants };
