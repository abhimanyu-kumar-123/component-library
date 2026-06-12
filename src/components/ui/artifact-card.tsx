"use client";

import * as React from "react";
import {
  CheckCircle,
  HandbagSimple,
  Lock,
  MagnifyingGlass,
  SealCheck,
  Tag,
  Truck,
} from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Pill } from "@/components/ui/pill";

export type ArtifactType =
  | "report"
  | "website"
  | "catalog"
  | "brand-kit"
  | "document";

export type ArtifactStatus = "in-progress" | "completed";

/* ── Type-specific CSS preview mocks (AI-native, no images) ───────────── */

/** Compact storefront preview — used for website / brand-kit / catalog. */
function StorePreview({ size = "sm" }: { size?: "sm" | "lg" }) {
  const lg = size === "lg";
  return (
    <div className="flex h-full flex-col bg-white">
      {/* store top bar */}
      <div className="flex items-center justify-between px-2 py-1.5">
        <span className="size-1.5 rounded-full bg-text-secondary/40" />
        <span
          className={cn(
            "font-semibold tracking-[0.15em] text-text-primary",
            lg ? "text-[15px]" : "text-[8px]"
          )}
          style={{ fontFamily: "Georgia, serif" }}
        >
          DEVIKA
        </span>
        <span className="size-1.5 rounded-full bg-text-secondary/40" />
      </div>
      {/* hero */}
      <div className="relative mx-2 flex flex-1 items-center justify-center overflow-hidden rounded-md bg-gradient-grey-dark">
        <span
          className={cn(
            "font-semibold tracking-wider text-white/90",
            lg ? "text-[28px]" : "text-[13px]"
          )}
          style={{ fontFamily: "Georgia, serif" }}
        >
          SALE
        </span>
        <span
          className={cn(
            "absolute rounded bg-warning-default font-medium text-white",
            lg
              ? "bottom-2 right-2 px-1.5 py-0.5 text-[10px]"
              : "bottom-1 right-1 px-1 text-[6px]"
          )}
        >
          UPTO 50% OFF
        </span>
      </div>
      {/* category circles */}
      <div className="flex items-center justify-center gap-1.5 px-2 py-1.5">
        {["bg-warning-default/40", "bg-brand-primary/30", "bg-accent-teal/50", "bg-text-secondary/20"].map(
          (c, i) => (
            <span
              key={i}
              className={cn("rounded-full", c, lg ? "size-7" : "size-3.5")}
            />
          )
        )}
      </div>
    </div>
  );
}

/** Spreadsheet / financial-statement preview — used for report / document. */
function TablePreview({ size = "sm" }: { size?: "sm" | "lg" }) {
  const lg = size === "lg";
  const cols = ["bg-success-light", "bg-accent-violet-light", "bg-danger-light", "bg-warning-light"];
  return (
    <div className={cn("flex h-full flex-col bg-white", lg ? "gap-1.5 p-3" : "gap-1 p-2")}>
      <span
        className={cn(
          "rounded-full bg-text-primary/70",
          lg ? "h-2.5 w-2/5" : "h-1.5 w-2/5"
        )}
      />
      {/* header row */}
      <div className="flex gap-0.5">
        <span className={cn("flex-1 rounded-sm bg-gradient-grey-dark", lg ? "h-4" : "h-2")} />
      </div>
      {/* body rows */}
      {Array.from({ length: lg ? 7 : 4 }).map((_, r) => (
        <div key={r} className="flex gap-0.5">
          <span className={cn("w-1/3 rounded-sm bg-surface-app", lg ? "h-3" : "h-1.5")} />
          {cols.map((c, i) => (
            <span
              key={i}
              className={cn(
                "flex-1 rounded-sm",
                (r + i) % 3 === 0 ? c : "bg-surface-app",
                lg ? "h-3" : "h-1.5"
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function ArtifactThumb({
  type,
  size = "sm",
}: {
  type: ArtifactType;
  size?: "sm" | "lg";
}) {
  if (type === "report" || type === "document")
    return <TablePreview size={size} />;
  return <StorePreview size={size} />;
}

/* ── Full-page storefront preview (for the artifact preview sheet) ────── */
const STORE_FEATURES = [
  { icon: <Truck weight="regular" />, label: "Free\nShipping" },
  { icon: <SealCheck weight="regular" />, label: "Assured\nQuality" },
  { icon: <Lock weight="regular" />, label: "Secure\nPayment" },
  { icon: <Tag weight="regular" />, label: "Best\nPrice" },
];
const STORE_CATEGORIES = [
  { label: "Sarees", c: "bg-warning-default/30" },
  { label: "Trending", c: "bg-brand-primary/25" },
  { label: "Popular", c: "bg-accent-teal/50" },
  { label: "Clearance", c: "bg-danger/20" },
];

/** A tall, full-page storefront mock used when previewing website/catalog artifacts. */
function StorePageFull() {
  return (
    <div className="flex flex-col bg-white">
      {/* coupon strip */}
      <div className="bg-text-primary px-3 py-2 text-center text-[10px] font-medium leading-4 text-white">
        10% off upto ₹250 · Coupon: GET10 · Min Order ₹1799
      </div>

      {/* store header */}
      <div className="flex items-center justify-between px-4 py-3 text-text-primary [&_svg]:size-4">
        <MagnifyingGlass weight="regular" />
        <span
          className="text-[18px] font-semibold tracking-[0.2em]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          DEVIKA
        </span>
        <HandbagSimple weight="regular" />
      </div>

      {/* hero */}
      <div className="relative mx-4 flex h-44 items-center justify-center overflow-hidden rounded-xl bg-gradient-grey-dark">
        <span
          className="text-[40px] font-semibold tracking-widest text-white/90"
          style={{ fontFamily: "Georgia, serif" }}
        >
          SALE
        </span>
        <span className="absolute bottom-3 right-3 rounded bg-warning-default px-2 py-1 text-[11px] font-medium text-white">
          UPTO 50% OFF
        </span>
      </div>
      {/* carousel dots */}
      <div className="flex justify-center gap-1.5 py-3">
        <span className="size-1.5 rounded-full bg-text-secondary/30" />
        <span className="size-1.5 rounded-full bg-text-primary" />
        <span className="size-1.5 rounded-full bg-text-secondary/30" />
      </div>

      {/* feature row */}
      <div className="flex justify-between px-4 pb-5">
        {STORE_FEATURES.map((f) => (
          <div key={f.label} className="flex w-16 flex-col items-center gap-1.5">
            <span className="grid size-9 place-items-center rounded-full bg-surface-app text-brand-primary [&_svg]:size-4">
              {f.icon}
            </span>
            <span className="whitespace-pre text-center text-[10px] leading-[12px] text-text-secondary">
              {f.label}
            </span>
          </div>
        ))}
      </div>

      {/* category */}
      <div className="px-4 pb-6">
        <p className="pb-3 text-center text-[13px] font-medium tracking-[0.15em] text-text-secondary">
          CATEGORY
        </p>
        <div className="flex justify-between">
          {STORE_CATEGORIES.map((c) => (
            <div key={c.label} className="flex flex-col items-center gap-2">
              <span className={cn("size-16 rounded-full", c.c)} />
              <span className="text-[11px] leading-4 text-text-primary">
                {c.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Status pill — in-progress (orange + dot) / completed (green + check).
    Both icons occupy a 12px box so the two pills share identical metrics. */
function StatusPill({ status }: { status: ArtifactStatus }) {
  if (status === "completed")
    return (
      <Pill tone="success" background={false} icon={<CheckCircle weight="regular" />}>
        Completed
      </Pill>
    );
  return (
    <Pill
      tone="warning"
      background={false}
      icon={
        <span className="flex size-3 shrink-0 items-center justify-center">
          <span className="size-1.5 rounded-full bg-warning-default" />
        </span>
      }
    >
      In progress
    </Pill>
  );
}

type ArtifactCardProps = {
  type: ArtifactType;
  name: string;
  /** Relative time, e.g. "10 min ago". */
  time: string;
  status: ArtifactStatus;
  /** 0–100, shown as an orange bar while in-progress. */
  progress?: number;
  onClick?: () => void;
  className?: string;
};

/**
 * A uniform artifact card for the Artifacts panel — status pill, type-specific
 * preview thumbnail, name, last-updated time, and (while generating) an orange
 * progress bar. Tapping opens the artifact preview sheet. Source: Figma `4678:22184`.
 */
function ArtifactCard({
  type,
  name,
  time,
  status,
  progress = 55,
  onClick,
  className,
}: ArtifactCardProps) {
  const inProgress = status === "in-progress";
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex w-full flex-col gap-2.5 rounded-2xl bg-white p-2.5 text-left outline-none transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0px_14px_28px_rgba(0,0,0,0.08)] focus-visible:ring-2 focus-visible:ring-brand-primary/40",
        className
      )}
    >
      <span className="flex px-0.5">
        <StatusPill status={status} />
      </span>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-surface-muted bg-white">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
          <ArtifactThumb type={type} />
        </div>
      </div>

      <div className="flex flex-col gap-1 px-0.5">
        <h3 className="type-h3 truncate text-text-primary">{name}</h3>
        <span className="type-body-2 text-text-secondary">{time}</span>
        {inProgress && (
          <span className="mt-1 block h-1.5 w-full overflow-hidden rounded-full bg-surface-app">
            <span
              className="block h-full rounded-full bg-warning-default transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </span>
        )}
      </div>
    </button>
  );
}

export { ArtifactCard, ArtifactThumb, StorePageFull };
