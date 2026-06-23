"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CaretRight, ChatTeardropText, Check, Clock, ListChecks } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { Pill } from "@/components/ui/pill";
import { SectionCard } from "@/components/ui/section-card";
import { SelectorPill } from "@/components/ui/selector-pill";
import { StarRating } from "@/components/ui/star-rating";
import { UserThumbnail } from "@/components/ui/user-thumbnail";
import { BottomNav } from "@/components/ui/bottom-nav";
import { CallbackBar } from "@/components/ui/callback-bar";
import { InfoNote } from "@/components/ui/info-note";
import { BottomSheet } from "@/components/ui/bottom-sheet";

const AVATAR = "https://i.pravatar.cc/120?img=47";
const POC_AVATAR = "https://i.pravatar.cc/120?img=12";

/* Go-live journey — early steps done (filled dots + solid rail), then the
   recent/active region uses hollow ring nodes + a dotted rail, ending on the
   ongoing Launch target. Figma node 5321:10123. */
type JourneyStep = {
  label: string;
  date: string;
  status: "done" | "ongoing";
  node: "filled" | "ring" | "target";
};

const JOURNEY: JourneyStep[] = [
  { label: "Documents", date: "Jun 15", status: "done", node: "filled" },
  { label: "Catalog", date: "Jun 15", status: "done", node: "filled" },
  { label: "Website", date: "Jun 15", status: "done", node: "filled" },
  { label: "Marketing", date: "Jun 15", status: "done", node: "ring" },
  { label: "Launch", date: "Jun 15", status: "ongoing", node: "target" },
];

const ISSUES = ["POC", "Service Speed", "Website Quality", "Other"];

function JourneyNode({ node }: { node: JourneyStep["node"] }) {
  if (node === "filled")
    return <span className="block size-2 rounded-full bg-brand-primary" />;
  if (node === "target")
    return (
      <span className="grid size-3.5 place-items-center rounded-full border-[1.5px] border-brand-primary bg-white">
        <span className="block size-1.5 rounded-full bg-brand-primary" />
      </span>
    );
  // ring
  return (
    <span className="block size-3.5 rounded-full border-[1.5px] border-brand-primary bg-white" />
  );
}

function JourneyTimeline({ onStep }: { onStep: () => void }) {
  return (
    <div className="flex flex-col">
      {JOURNEY.map((s, i) => {
        const isLast = i === JOURNEY.length - 1;
        // Rail into the NEXT node is solid only between filled (done) dots.
        const nextFilled = !isLast && JOURNEY[i + 1].node === "filled";
        return (
          <div key={s.label} className="relative flex items-start gap-3 pb-2 last:pb-0">
            {/* node column — fixed width so the rail stays centered across node
                sizes; self-stretch so the rail spans the full row into the next node */}
            <div className="relative flex w-3.5 shrink-0 justify-center self-stretch">
              {!isLast && (
                <span
                  className={cn(
                    "absolute left-1/2 -bottom-7 -translate-x-1/2",
                    // start below the upper node — bigger offset for the taller ring/target
                    s.node === "filled" ? "top-9" : "top-[42px]",
                    nextFilled
                      ? "w-0.5 rounded-full bg-brand-primary"
                      : "w-0 border-l-2 border-dotted border-brand-primary/50"
                  )}
                />
              )}
              <span className="relative z-10 mt-6">
                <JourneyNode node={s.node} />
              </span>
            </div>

            <button
              type="button"
              onClick={onStep}
              className="flex flex-1 items-center justify-between gap-2 rounded-xl bg-white p-3 text-left outline-none transition-colors active:bg-surface-muted"
            >
              <span className="flex min-w-0 flex-col gap-1">
                <span className="type-caption text-text-secondary">{s.date}</span>
                <span className="flex flex-wrap items-center gap-2">
                  <span className="type-h2 font-medium text-text-primary">{s.label}</span>
                  <Pill tone={s.status === "done" ? "success" : "neutral"} background>
                    {s.status === "done" ? "Completed" : "Ongoing"}
                  </Pill>
                </span>
              </span>
              <CaretRight weight="bold" className="size-4 shrink-0 text-text-secondary" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default function BeforeLiveScreen() {
  const router = useRouter();
  const toChat = React.useCallback(() => router.push("/chat"), [router]);
  const [rateOpen, setRateOpen] = React.useState(false);
  const [rating, setRating] = React.useState(4);
  const [issues, setIssues] = React.useState<string[]>([]);
  const [note, setNote] = React.useState("");

  const toggleIssue = (i: string) =>
    setIssues((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]));

  React.useEffect(() => {
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });
    return () => document.removeEventListener("touchstart", noop);
  }, []);

  return (
    <div className="bg-surface-app sm:flex sm:min-h-screen sm:items-center sm:justify-center sm:bg-neutral-200 sm:p-6">
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-surface-app motion-safe:animate-screen-in sm:h-[852px] sm:w-[393px] sm:rounded-[44px] sm:shadow-2xl">
        {/* Header */}
        <div className="shrink-0 bg-surface-app pt-[env(safe-area-inset-top)]">
          <Header
            left={
              <div className="flex items-center gap-2">
                <UserThumbnail src={AVATAR} story />
                <div className="flex flex-col">
                  <span className="type-h2 text-text-primary">Hi Rohit,</span>
                  <span className="text-[12px] leading-[14px] text-text-secondary">
                    devikatextiles.com
                  </span>
                </div>
              </div>
            }
          />
        </div>

        {/* Scrollable content */}
        <main className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
          {/* Go-live hero */}
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-5 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-success text-white [&_svg]:size-8">
              <Check weight="bold" />
            </span>
            <div className="flex flex-col gap-1">
              <h1 className="type-h1 text-text-primary">You&apos;re ready to go live!</h1>
              <p className="type-body-1 text-text-secondary">
                The world awaits your products.
              </p>
            </div>
            <div className="flex flex-col gap-1 rounded-xl bg-accent-violet-light px-4 py-3 text-center">
              <p className="type-h3 font-semibold text-accent-violet">Early Launch Alert!</p>
              <p className="type-body-2 text-accent-violet">
                We&apos;re super excited to report — we launched two days ahead of
                schedule!
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => setRateOpen(true)}
            >
              Continue
            </Button>
          </div>

          {/* Recent conversation */}
          <SectionCard icon={<ChatTeardropText weight="fill" />} title="Recent conversation">
            <button
              type="button"
              onClick={toChat}
              className="block w-full space-y-2.5 text-left outline-none transition-transform active:scale-[0.99]"
            >
              <Pill tone="neutral" background={false} icon={<Clock />}>
                Jan 11, 11:50AM
              </Pill>
              <p className="type-body-1 text-text-primary">
                Porem ipsum dolor sit amet, consectetur elit. Nunc vulputate libero
                et velit interdum.
              </p>
              <InfoNote>This was discussed in the last conversation</InfoNote>
            </button>
          </SectionCard>

          {/* Your journey */}
          <SectionCard icon={<ListChecks weight="fill" />} title="Your journey" surface="glass">
            <JourneyTimeline onStep={toChat} />
          </SectionCard>
        </main>

        {/* Rating sheet — submit to enter marketing */}
        <BottomSheet
          open={rateOpen}
          onOpenChange={setRateOpen}
          title="How would you rate your experience?"
          description="On a scale of 1–5, how likely are you to recommend Shopdeck to a friend?"
          primaryLabel="Submit Feedback"
          onPrimary={() => {
            setRateOpen(false);
            router.push("/after-live");
          }}
        >
          <div className="flex flex-col gap-5">
            <StarRating value={rating} onValueChange={setRating} className="justify-center" />

            <div className="flex flex-col gap-2.5">
              <p className="type-h3 text-text-primary">Please select one or more issues</p>
              <div className="flex flex-wrap gap-2">
                {ISSUES.map((i) => (
                  <SelectorPill
                    key={i}
                    selected={issues.includes(i)}
                    onClick={() => toggleIssue(i)}
                  >
                    {i}
                  </SelectorPill>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <p className="type-h3 text-text-primary">Tell us more</p>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Type here"
                rows={3}
                className="w-full resize-none rounded-lg border border-divider bg-white p-3 type-body-1 text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-brand-primary"
              />
            </div>
          </div>
        </BottomSheet>

        {/* Fixed bottom region */}
        <div className="shrink-0 bg-surface-app pb-[env(safe-area-inset-bottom)]">
          <CallbackBar
            src={POC_AVATAR}
            title="Call Anirudh"
            description="for any kind of assistance during onboarding"
            onCall={toChat}
          />
          <BottomNav
            onHome={() => router.push("/home")}
            onSearchClick={toChat}
            onAction={() => router.push("/artifacts")}
          />
        </div>
      </div>
    </div>
  );
}
