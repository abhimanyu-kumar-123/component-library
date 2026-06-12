"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Empty state shown when a seller hasn't activated Google marketing yet.
 * The Google "orbit" illustration + a motivating hook + CTA. Figma `4860:5418`.
 * Pass `className` (e.g. a min-height) to keep the surrounding section's height
 * constant across tabs.
 */
function GoogleEmptyState({
  onCta,
  className,
}: {
  onCta?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-2xl bg-white px-5 py-6 text-center",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/google-marketing.png"
        alt=""
        className="h-[85px] w-auto select-none"
      />
      <h3 className="type-h2 text-text-primary">
        Boost Your <span className="text-brand-primary">Sales</span> with{" "}
        <span className="text-brand-primary">Google</span>
      </h3>
      <p className="mx-auto max-w-[260px] type-body-1 text-text-secondary">
        Reach millions of customers searching for products like yours on Google.
      </p>
      <Button variant="primary" size="md" className="mt-2" onClick={onCta}>
        Activate Google Marketing
      </Button>
    </div>
  );
}

export { GoogleEmptyState };
