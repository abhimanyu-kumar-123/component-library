"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { RoundButton } from "@/components/ui/round-button";
import { ActivityIcon, AiBadge, HomeIcon } from "@/components/icons";

function triggerHaptic(duration = 10) {
  if (
    typeof navigator !== "undefined" &&
    typeof navigator.vibrate === "function"
  ) {
    navigator.vibrate(duration);
  }
}

type BottomNavProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onHome?: () => void;
  onAction?: () => void;
  /** When set, the search pill becomes a tappable button (e.g. open chat)
   *  instead of an inline text input. */
  onSearchClick?: () => void;
  /** Leading badge inside the search pill. Defaults to the AI badge. */
  leadingIcon?: React.ReactNode;
  /** Trailing round-button icon. Defaults to the activity icon. */
  trailingIcon?: React.ReactNode;
};

/**
 * Mobile bottom navigation bar: a gradient "home" round-button, a glass
 * "Ask anything…" search pill with a gradient badge, and a trailing action.
 */
function BottomNav({
  placeholder = "Ask anything...",
  value,
  onValueChange,
  onHome,
  onAction,
  onSearchClick,
  leadingIcon,
  trailingIcon,
  className,
  ...props
}: BottomNavProps) {
  return (
    <div
      data-slot="bottom-nav"
      className={cn("w-full border-t border-white bg-surface-app", className)}
      {...props}
    >
      <div className="flex items-center gap-3 p-4">
        {/* Home */}
        <RoundButton
          selected
          size="icon-lg"
          aria-label="Home"
          onClick={onHome}
          className="bg-[linear-gradient(91deg,#5b7df4_1%,#4066f1_99%)] [&_svg]:size-5"
        >
          <HomeIcon />
        </RoundButton>

        {/* Search pill — a button (navigates) when onSearchClick is set,
            otherwise an inline text input. */}
        {onSearchClick ? (
          <button
            type="button"
            onClick={onSearchClick}
            onPointerDown={(e) => {
              if (e.pointerType === "touch") triggerHaptic();
            }}
            className="flex h-10 flex-1 items-center gap-2 overflow-hidden rounded-full border border-white bg-white/50 px-2.5 text-left shadow-[0px_10px_20px_rgba(0,0,0,0.1)] outline-none transition-[background] hover:bg-white focus-visible:bg-white active:bg-white"
          >
            <span className="flex size-5 shrink-0 items-center justify-center [&_svg]:size-5">
              {leadingIcon ?? <AiBadge />}
            </span>
            <span className="min-w-0 flex-1 truncate type-body-2 text-text-primary/70">
              {placeholder}
            </span>
          </button>
        ) : (
          <label
            onPointerDown={(e) => {
              if (e.pointerType === "touch") triggerHaptic();
            }}
            className="flex h-10 flex-1 items-center gap-2 overflow-hidden rounded-full border border-white bg-white/50 px-2.5 shadow-[0px_10px_20px_rgba(0,0,0,0.1)] transition-[background] hover:bg-white focus-within:bg-white"
          >
            <span className="flex size-5 shrink-0 items-center justify-center [&_svg]:size-5">
              {leadingIcon ?? <AiBadge />}
            </span>
            <input
              value={value}
              onChange={(e) => onValueChange?.(e.target.value)}
              placeholder={placeholder}
              className="min-w-0 flex-1 bg-transparent type-body-2 text-text-primary outline-none placeholder:text-text-primary/70"
            />
          </label>
        )}

        {/* Trailing action */}
        <RoundButton
          size="icon-lg"
          aria-label="Open"
          onClick={onAction}
          className="[&_svg]:size-5"
        >
          {trailingIcon ?? <ActivityIcon />}
        </RoundButton>
      </div>
    </div>
  );
}

export { BottomNav };
