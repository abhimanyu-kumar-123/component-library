"use client";

import Lottie from "lottie-react";

import { cn } from "@/lib/utils";
import radarAnimation from "@/assets/lottie/radar.json";

/**
 * Animated radar/scanning loader (Lottie) — used in the "Marketing in progress"
 * banner in place of a static icon while data is still coming in.
 */
export function RadarLoader({ className }: { className?: string }) {
  return (
    <Lottie
      animationData={radarAnimation}
      loop
      autoplay
      className={cn("size-full", className)}
    />
  );
}
