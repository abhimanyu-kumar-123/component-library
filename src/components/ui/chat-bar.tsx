"use client";

import * as React from "react";
import {
  Microphone,
  PaperPlaneRight,
  PhoneIncoming,
  Plus,
} from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

function triggerHaptic(duration = 10) {
  if (
    typeof navigator !== "undefined" &&
    typeof navigator.vibrate === "function"
  ) {
    navigator.vibrate(duration);
  }
}

/** Small ice-blue circular icon button used inside the ChatBar. */
function ChatIconButton({
  className,
  onPointerDown,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="chat-icon-button"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-3xl bg-surface-app p-2 text-text-primary outline-none transition-transform active:scale-[0.92] focus-visible:ring-2 focus-visible:ring-accent-violet-light [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      onPointerDown={(e) => {
        if (e.pointerType === "touch") triggerHaptic();
        onPointerDown?.(e);
      }}
      {...props}
    />
  );
}

type ChatBarProps = Omit<React.ComponentProps<"div">, "onChange" | "onSubmit"> & {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Fired by the send button / Enter key with the current text. */
  onSubmit?: (value: string) => void;
  onAdd?: () => void;
  onMic?: () => void;
  onCall?: () => void;
};

/**
 * Chat input bar — a glass field with an add button, a text input, and
 * voice / call actions on a white→ice-blue gradient backdrop.
 * When the field has text, the call button becomes a gradient send button.
 */
function ChatBar({
  placeholder = "Ask about your business...",
  value,
  defaultValue = "",
  onValueChange,
  onSubmit,
  onAdd,
  onMic,
  onCall,
  className,
  ...props
}: ChatBarProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const current = value ?? internal;
  const hasText = current.trim().length > 0;

  function change(next: string) {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  }

  function submit() {
    if (!hasText) return;
    onSubmit?.(current);
    if (value === undefined) setInternal("");
  }

  return (
    <div
      data-slot="chat-bar"
      className={cn(
        "flex w-full flex-col items-center bg-gradient-to-b from-white to-[#e9ecf9] to-80% px-4 py-5",
        className
      )}
      {...props}
    >
      <div className="flex w-full items-center justify-between gap-2 rounded-2xl border border-white bg-white/50 p-3 shadow-[0px_20px_40px_rgba(0,0,0,0.1)] transition-[background,box-shadow] hover:bg-white hover:shadow-[0px_20px_20px_rgba(0,0,0,0.1)] focus-within:bg-white focus-within:shadow-[0px_20px_20px_rgba(0,0,0,0.1)]">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <ChatIconButton aria-label="Add" onClick={onAdd}>
            <Plus />
          </ChatIconButton>
          <input
            value={current}
            onChange={(e) => change(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder={placeholder}
            className="min-w-0 flex-1 bg-transparent type-body-1 text-text-primary outline-none placeholder:text-text-secondary"
          />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ChatIconButton aria-label="Voice input" onClick={onMic}>
            <Microphone />
          </ChatIconButton>
          {hasText ? (
            <button
              type="button"
              data-slot="chat-send-button"
              aria-label="Send"
              onClick={submit}
              onPointerDown={(e) => {
                if (e.pointerType === "touch") triggerHaptic();
              }}
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(91deg,#5b7df4_1%,#4066f1_99%)] text-white shadow-[0px_5px_5px_rgba(0,0,0,0.1),inset_0px_0px_1px_0px_var(--accent-teal)] outline-none transition-transform active:scale-[0.92] focus-visible:ring-2 focus-visible:ring-accent-violet-light [&_svg]:size-4 [&_svg]:shrink-0"
            >
              <PaperPlaneRight weight="fill" />
            </button>
          ) : (
            <ChatIconButton aria-label="Call" onClick={onCall}>
              <PhoneIncoming />
            </ChatIconButton>
          )}
        </div>
      </div>
    </div>
  );
}

export { ChatBar, ChatIconButton };
