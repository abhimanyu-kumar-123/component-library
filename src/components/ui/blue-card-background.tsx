import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const blueCardBackgroundVariants = cva(
  "relative isolate flex min-h-[168px] flex-col gap-3 overflow-hidden rounded-2xl p-4 text-white",
  {
    variants: {
      // Stacking layers for a notification deck (dark navy → bright royal blue).
      layer: {
        back: "bg-[linear-gradient(103deg,#0b1440_0%,#20307c_100%)]",
        middle:
          "bg-[linear-gradient(103deg,#2342b8_0%,#4d72ec_100%)] shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.5)]",
        front:
          "bg-[linear-gradient(103deg,#1d4ed8_0%,#5e8ef6_100%)] shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.5)]",
      },
    },
    defaultVariants: {
      layer: "front",
    },
  }
);

type BlueCardBackgroundProps = React.ComponentProps<"div"> &
  VariantProps<typeof blueCardBackgroundVariants>;

/**
 * Decorative blue gradient surface. Use the `layer` variant to build a
 * stacked notification deck (back → middle → front).
 */
function BlueCardBackground({
  className,
  layer,
  ...props
}: BlueCardBackgroundProps) {
  return (
    <div
      data-slot="blue-card-background"
      className={cn(blueCardBackgroundVariants({ layer, className }))}
      {...props}
    />
  );
}

export { BlueCardBackground, blueCardBackgroundVariants };
