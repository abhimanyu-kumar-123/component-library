"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CaretLeft, SquaresFour } from "@phosphor-icons/react";

import { Header } from "@/components/ui/header";
import { RoundButton } from "@/components/ui/round-button";
import { Switch } from "@/components/ui/switch";
import { ChatBar } from "@/components/ui/chat-bar";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { AiBadge } from "@/components/icons";
import { ActivityFeed } from "./activity-feed";

type Message = { id: number; from: "seller" | "ai"; text: string; time: string };

const INITIAL: Message[] = [
  {
    id: 1,
    from: "seller",
    text: "I've restocked most of the products. Can we resume the ads now?",
    time: "9:41AM",
  },
  {
    id: 2,
    from: "ai",
    text: "Great! I found stock updated for all products except 6 SKUs that are still unavailable.",
    time: "9:41AM",
  },
  {
    id: 3,
    from: "seller",
    text: "That's fine, please continue marketing for the available products.",
    time: "9:42AM",
  },
  {
    id: 4,
    from: "ai",
    text: "Done — I've resumed your Meta ads for all in-stock products and excluded the unavailable SKUs to avoid wasted spend.",
    time: "9:42AM",
  },
];

/* ── Auto-reply framework ──────────────────────────────────────────────
 * A simple, pluggable rule engine: the first rule whose `test` matches the
 * seller's message produces the AI reply. Add/edit rules here, or swap
 * `getAiReply` for a real API call (it can be async — return a Promise).
 * ---------------------------------------------------------------------- */
type ReplyRule = { test: RegExp; reply: string };

const AI_RULES: ReplyRule[] = [
  {
    test: /\b(resume|restart|start|continue)\b.*\bads?\b|\bresume\b/i,
    reply: "On it — I'll resume your Meta ads for all in-stock products.",
  },
  {
    test: /\b(pause|stop|halt|hold)\b/i,
    reply:
      "Done. I've paused the campaign so you won't spend while we sort this out.",
  },
  {
    test: /\b(stock|inventory|sku|restock)\b/i,
    reply:
      "Checking your catalogue… stock looks updated for most products; a few SKUs are still unavailable.",
  },
  {
    test: /\b(spend|spends|budget|gmv|profit|cpo|performance|report|sales)\b/i,
    reply:
      "Here's a quick read: spends are at 50% of budget and GMV is trending up 12% today.",
  },
  {
    test: /\b(hi|hello|hey|thanks|thank you|great|ok|okay)\b/i,
    reply: "Anytime! What would you like me to handle next?",
  },
];

const AI_FALLBACK =
  "Got it — I'll look into that and update your campaign accordingly.";

function getAiReply(text: string): string {
  return AI_RULES.find((rule) => rule.test.test(text))?.reply ?? AI_FALLBACK;
}

function ChatScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = React.useState<"chat" | "activity">(
    searchParams.get("tab") === "activity" ? "activity" : "chat"
  );
  const [messages, setMessages] = React.useState<Message[]>(INITIAL);
  const [draft, setDraft] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const endRef = React.useRef<HTMLDivElement>(null);
  const idRef = React.useRef(INITIAL.length);
  const nextId = () => (idRef.current += 1);

  // Enable iOS `:active` press feedback on tap.
  React.useEffect(() => {
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });
    return () => document.removeEventListener("touchstart", noop);
  }, []);

  // Keep the latest message (or the typing indicator) in view.
  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function send(value: string) {
    const text = value.trim();
    if (!text) return;

    // 1. Append the seller's message.
    setMessages((m) => [
      ...m,
      { id: nextId(), from: "seller", text, time: "Now" },
    ]);
    setDraft("");

    // 2. AI "thinks", then auto-replies via the rule framework.
    setTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: nextId(), from: "ai", text: getAiReply(text), time: "Now" },
      ]);
      setTyping(false);
    }, 900);
  }

  return (
    <div className="bg-white sm:flex sm:min-h-screen sm:items-center sm:justify-center sm:bg-neutral-200 sm:p-6">
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-white motion-safe:animate-screen-in sm:h-[852px] sm:w-[393px] sm:rounded-[44px] sm:shadow-2xl">
        {/* Tab header — fixed (gradient on Chat, flat surface on Activity) */}
        <div
          className={`shrink-0 pt-[env(safe-area-inset-top)] ${
            tab === "activity"
              ? "bg-surface-app"
              : "bg-gradient-to-b from-[#e9ecf9] to-white"
          }`}
        >
          <Header
            className="border-b-0 bg-transparent"
            left={
              <RoundButton
                size="icon-md"
                aria-label="Back"
                onClick={() => router.push("/home")}
              >
                <CaretLeft />
              </RoundButton>
            }
            center={
              <Switch
                options={[
                  { label: "Chat", value: "chat" },
                  { label: "Activity", value: "activity" },
                ]}
                value={tab}
                onValueChange={(v) => setTab(v as "chat" | "activity")}
              />
            }
            right={
              <RoundButton
                size="icon-md"
                aria-label="Artifacts"
                onClick={() => router.push("/artifacts")}
              >
                <SquaresFour />
              </RoundButton>
            }
          />
        </div>

        {tab === "activity" ? (
          <ActivityFeed />
        ) : (
          <>
        {/* Conversation — scrolls between the fixed bars */}
        <main className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
          {messages.map((m, i) => {
            const firstOfRun = m.from === "ai" && messages[i - 1]?.from !== "ai";
            return m.from === "ai" ? (
              <ChatBubble
                key={m.id}
                variant="ai"
                time={m.time}
                header={
                  firstOfRun ? (
                    <>
                      <AiBadge className="size-5" />
                      Shopdeck
                    </>
                  ) : undefined
                }
              >
                {m.text}
              </ChatBubble>
            ) : (
              <ChatBubble key={m.id} variant="user" time={m.time} read>
                {m.text}
              </ChatBubble>
            );
          })}

          {typing && (
            <ChatBubble variant="ai">
              <span className="flex items-center gap-1 py-0.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-1.5 animate-bounce rounded-full bg-text-secondary"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </span>
            </ChatBubble>
          )}

          <div ref={endRef} />
        </main>

        {/* Chat nav — fixed */}
        <div className="shrink-0 pb-[env(safe-area-inset-bottom)]">
          <ChatBar
            placeholder="Ask about your business..."
            value={draft}
            onValueChange={setDraft}
            onSubmit={send}
          />
        </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ChatPage() {
  // useSearchParams() requires a Suspense boundary on static routes.
  return (
    <React.Suspense fallback={null}>
      <ChatScreen />
    </React.Suspense>
  );
}
