"use client";

import * as React from "react";
import { Warning } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import {
  CardActions,
  CardBadge,
  CardButton,
  CardDescription,
  CardHeader,
  CardMeta,
  CardTitle,
} from "@/components/ui/card";

export type ActionCard = {
  /** Leading icon in the title row. */
  icon?: React.ReactNode;
  title: string;
  desc: string;
  /** Trailing timestamp (e.g. "Today", "3 Days ago"). */
  time: string;
  /** Amber status pill label. Defaults to "GO LIVE RISK". */
  badge?: string;
};

type ActionDeckProps = {
  cards: ActionCard[];
  /** Primary CTA label (liquid-glass button). Defaults to "Continue". */
  continueLabel?: string;
  /** Secondary CTA label (outline). When omitted, only the primary shows. */
  viewLabel?: string;
  /** Fired by the primary CTA, with the front card's index. */
  onContinue?: (index: number) => void;
  /** Fired by the secondary CTA, with the front card's index. */
  onView?: (index: number) => void;
  className?: string;
};

/**
 * Rotating "wheel" of stacked notification cards. Tap a back card, swipe
 * vertically (mobile), or scroll (desktop) to rotate the deck forward.
 * The front card is interactive; the cards behind peek out and darken with depth.
 */
function ActionDeck({
  cards,
  continueLabel = "Continue",
  viewLabel,
  onContinue,
  onView,
  className,
}: ActionDeckProps) {
  const n = cards.length;
  const [active, setActive] = React.useState(0);
  const lockRef = React.useRef(false);

  const rotate = React.useCallback(() => {
    if (n < 2 || lockRef.current) return;
    lockRef.current = true;
    setActive((a) => (a + 1) % n);
    window.setTimeout(() => {
      lockRef.current = false;
    }, 450);
  }, [n]);

  // Per-position styling: [front, middle, back]
  const transforms = [
    "translateY(37px) scale(1)",
    "translateY(12px) scale(0.94)",
    "translateY(0px) scale(0.88)",
  ];
  const scrim = [0, 0.34, 0.6];
  const zIndex = [30, 20, 10];

  // Track the start of a touch so we can detect a swipe on mobile.
  const touchStart = React.useRef<{ x: number; y: number } | null>(null);

  return (
    <div
      className={cn("relative h-[210px] touch-none select-none", className)}
      onWheel={(e) => {
        if (Math.abs(e.deltaY) > 4) rotate();
      }}
      onTouchStart={(e) => {
        const t = e.touches[0];
        touchStart.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        const s = touchStart.current;
        if (!s) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - s.x;
        const dy = t.clientY - s.y;
        // a deliberate swipe (mostly vertical) rotates the wheel
        if (Math.abs(dy) > 24 && Math.abs(dy) >= Math.abs(dx)) rotate();
        touchStart.current = null;
      }}
    >
      {cards.map((c, i) => {
        const pos = (i - active + n) % n;
        const isFront = pos === 0;
        // Only the front + the two cards behind it are styled/visible.
        const depth = Math.min(pos, 2);
        return (
          <div
            key={i}
            aria-hidden={!isFront}
            onClick={() => {
              if (!isFront) rotate();
            }}
            className="absolute inset-x-0 top-0 origin-top transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: transforms[depth],
              zIndex: zIndex[depth],
              cursor: isFront ? "default" : "pointer",
            }}
          >
            <div className="relative isolate flex min-h-[168px] flex-col justify-center gap-3 overflow-hidden rounded-2xl bg-[linear-gradient(103deg,#1d4ed8_0%,#5e8ef6_100%)] p-4 text-white shadow-inset-glass">
              {/* depth scrim — darker as the card goes back */}
              <div
                className="pointer-events-none absolute inset-0 bg-[#0b1440] transition-opacity duration-500"
                style={{ opacity: scrim[depth] }}
              />
              <div
                className="relative flex flex-col gap-3 transition-opacity duration-300"
                style={{
                  opacity: isFront ? 1 : 0,
                  pointerEvents: isFront ? "auto" : "none",
                }}
              >
                <CardHeader>
                  <CardTitle>
                    {c.icon}
                    {c.title}
                  </CardTitle>
                  <CardDescription>{c.desc}</CardDescription>
                  <CardMeta>
                    <CardBadge>
                      <Warning weight="fill" />
                      {c.badge ?? "GO LIVE RISK"}
                    </CardBadge>
                    <span>{c.time}</span>
                  </CardMeta>
                </CardHeader>
                <CardActions>
                  {viewLabel && (
                    <CardButton variant="outline" onClick={() => onView?.(i)}>
                      {viewLabel}
                    </CardButton>
                  )}
                  <CardButton variant="glass" onClick={() => onContinue?.(i)}>
                    {continueLabel}
                  </CardButton>
                </CardActions>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { ActionDeck };
