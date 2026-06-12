"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

function triggerHaptic(duration = 10) {
  if (
    typeof navigator !== "undefined" &&
    typeof navigator.vibrate === "function"
  ) {
    navigator.vibrate(duration);
  }
}

type CardVariant = "blue" | "white";
const CardContext = React.createContext<CardVariant>("blue");
const useCardVariant = () => React.useContext(CardContext);

type CardProps = React.ComponentProps<"div"> & {
  /** `blue` = gradient notification card · `white` = activity item card. */
  variant?: CardVariant;
};

/**
 * Notification / activity card. Two variants:
 *  - `blue`  — gradient surface, white text, stacked layout.
 *  - `white` — white surface, icon box + content column.
 * Compose with the parts below; text parts adapt to the variant.
 */
function Card({ variant = "blue", className, ...props }: CardProps) {
  return (
    <CardContext.Provider value={variant}>
      <div
        data-slot="card"
        data-variant={variant}
        className={cn(
          variant === "white"
            ? "flex w-full items-start gap-2 rounded-2xl bg-white px-3 pb-4 pt-3 text-text-primary"
            : "relative isolate flex min-h-[168px] w-full flex-col justify-center gap-3 overflow-hidden rounded-2xl bg-[linear-gradient(103deg,#1d4ed8_0%,#5e8ef6_100%)] p-4 text-white shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.5)]",
          className
        )}
        {...props}
      />
    </CardContext.Provider>
  );
}

/** White variant — the ice-blue icon box. Pass an icon as the child. */
function CardIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-icon"
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-lg bg-surface-app text-text-primary [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  );
}

/** White variant — the content column next to the icon. */
function CardBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-body"
      className={cn("flex min-w-0 flex-1 flex-col gap-2", className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  const variant = useCardVariant();
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col",
        variant === "white" ? "gap-0.5" : "gap-2",
        className
      )}
      {...props}
    />
  );
}

/** Title row — pass an icon as the first child (blue variant). */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  const variant = useCardVariant();
  return (
    <div
      data-slot="card-title"
      className={cn(
        "flex items-center gap-1 font-medium [&_svg]:size-4 [&_svg]:shrink-0",
        variant === "white"
          ? "type-body-1 text-text-primary"
          : "text-[16px] leading-5 text-white",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  const variant = useCardVariant();
  return (
    <p
      data-slot="card-description"
      className={cn(
        "text-[12px] font-normal leading-normal",
        variant === "white" ? "text-text-secondary" : "text-white/70",
        className
      )}
      {...props}
    />
  );
}

/** Small caption line — e.g. a timestamp or "12 products • …" (white variant). */
function CardCaption({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-caption"
      className={cn(
        "text-[10px] font-normal leading-[14px] text-text-secondary",
        className
      )}
      {...props}
    />
  );
}

/** Meta row — blue variant: holds a CardBadge + timestamp (justify-between). */
function CardMeta({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-meta"
      className={cn(
        "flex items-center justify-between text-[10px] font-medium leading-[14px] text-white",
        className
      )}
      {...props}
    />
  );
}

/** Footer row — typically an action button + a warning (white variant). */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex w-full items-end justify-between gap-2", className)}
      {...props}
    />
  );
}

/** Status pill — blue variant amber "GO LIVE RISK". Icon as first child. */
function CardBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="card-badge"
      className={cn(
        "inline-flex items-center gap-1 rounded-md bg-black/30 px-1.5 py-[3px] text-[10px] font-medium leading-[14px] text-warning-amber [&_svg]:size-3 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  );
}

/** Inline warning (no pill) — white variant orange "GO LIVE RISK". */
function CardWarning({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="card-warning"
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap text-[10px] font-medium leading-[14px] text-warning-default [&_svg]:size-3 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  );
}

function CardActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-actions"
      className={cn("flex items-stretch gap-2", className)}
      {...props}
    />
  );
}

const cardButtonVariants = cva(
  "inline-flex flex-1 select-none items-center justify-center gap-[3px] rounded-lg px-4 py-2 type-h3 outline-none transition-[background,transform] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white/60 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        outline: "border border-white/30 text-white hover:bg-white/10",
        glass:
          "bg-white text-text-primary shadow-[0px_2px_6px_rgba(0,0,0,0.05)] hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
);

type CardButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof cardButtonVariants> & {
    /** Touch haptic feedback on press. Defaults to true. */
    haptic?: boolean;
  };

/** Action button styled for the blue card surface (outline or liquid-glass). */
function CardButton({
  className,
  variant,
  haptic = true,
  onPointerDown,
  ...props
}: CardButtonProps) {
  return (
    <button
      data-slot="card-button"
      className={cn(cardButtonVariants({ variant, className }))}
      onPointerDown={(event) => {
        if (haptic && event.pointerType === "touch") triggerHaptic();
        onPointerDown?.(event);
      }}
      {...props}
    />
  );
}

export {
  Card,
  CardIcon,
  CardBody,
  CardHeader,
  CardTitle,
  CardDescription,
  CardCaption,
  CardMeta,
  CardFooter,
  CardBadge,
  CardWarning,
  CardActions,
  CardButton,
  cardButtonVariants,
};
