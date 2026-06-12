import * as React from "react";
import { Check, Checks } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

type ChatBubbleProps = React.ComponentProps<"div"> & {
  variant: "user" | "ai";
  /** Timestamp shown in the bubble footer, e.g. "8:00AM". */
  time?: string;
  /** User bubble only — `read` shows a muted double-tick, else a single tick. */
  read?: boolean;
  /** AI bubble only — sender row above the bubble (badge + name, etc.). */
  header?: React.ReactNode;
};

/**
 * Chat message bubble. Caps at 80% of the available width.
 * - `ai`:   light gradient, tail at top-left, optional sender header.
 * - `user`: dark gradient, white text, tail at top-right, read receipt.
 */
function ChatBubble({
  variant,
  time,
  read = false,
  header,
  className,
  children,
  ...props
}: ChatBubbleProps) {
  const isUser = variant === "user";

  return (
    <div
      data-slot="chat-bubble"
      className={cn(
        "flex max-w-[80%] flex-col gap-2",
        isUser ? "items-end self-end" : "items-start self-start",
        className
      )}
      {...props}
    >
      {!isUser && header && (
        <div className="flex items-center gap-1.5 type-h3 text-text-primary">
          {header}
        </div>
      )}

      <div
        className={cn(
          "flex flex-col gap-1 rounded-2xl p-3 type-body-1",
          isUser
            ? "items-end rounded-tr-[2px] bg-[linear-gradient(95deg,#1d2025_0%,#3c3f45_100%)] text-white"
            : "items-start rounded-tl-[2px] bg-[linear-gradient(103deg,#e8ebf9_0%,#f8f9ff_100%)] text-text-primary"
        )}
      >
        <p className="font-normal">{children}</p>
        <div className="flex items-center gap-1.5 self-end">
          {time && (
            <span className="text-[10px] leading-[14px] text-text-secondary">
              {time}
            </span>
          )}
          {isUser &&
            (read ? (
              <Checks
                weight="bold"
                className="size-4 shrink-0 text-text-secondary"
              />
            ) : (
              <Check
                weight="bold"
                className="size-4 shrink-0 text-text-secondary"
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export { ChatBubble };
