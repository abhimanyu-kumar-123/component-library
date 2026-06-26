"use client";

import Lottie from "lottie-react";
import { cn } from "@/lib/utils";
import successConfettiAnimation from "@/assets/lottie/success-confetti.json";

export function SuccessConfetti({ className }: { className?: string }) {
  return (
    <Lottie
      animationData={successConfettiAnimation}
      loop={false}
      autoplay
      speed={0.5}
      className={cn("size-full", className)}
    />
  );
}
