"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CaretRight,
  ChatTeardropText,
  Check,
  Info,
  ListChecks,
  Path,
  PhoneCall,
  ShieldCheck,
  Smiley,
  Sparkle,
  User,
} from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { Pill } from "@/components/ui/pill";
import { SectionTitle } from "@/components/ui/section-title";
import { UserThumbnail } from "@/components/ui/user-thumbnail";
import { BlueCardBackground } from "@/components/ui/blue-card-background";
import { BottomNav } from "@/components/ui/bottom-nav";

const AVATAR = "https://i.pravatar.cc/120?img=47";
const POC_AVATAR = "https://i.pravatar.cc/120?img=12";

/* ── A muted, inline info note (used under cards) ───────────────────── */
function InfoNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-lg bg-surface-muted px-3 py-2">
      <Info className="mt-0.5 size-4 shrink-0 text-text-secondary" />
      <span className="type-body-2 text-text-secondary">{children}</span>
    </div>
  );
}

/* ── One row inside an activity / updates card ──────────────────────── */
function ActivityRow({
  icon,
  iconClass,
  title,
  sub,
  subClass,
  showChevron,
  onClick,
}: {
  icon: React.ReactNode;
  iconClass: string;
  title: string;
  sub: string;
  subClass?: string;
  showChevron?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left outline-none transition-colors active:bg-surface-muted"
    >
      <span
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-full [&_svg]:size-[18px]",
          iconClass
        )}
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="type-h3 text-text-primary">{title}</span>
        <span className={cn("type-body-2", subClass ?? "text-text-secondary")}>
          {sub}
        </span>
      </span>
      {showChevron && (
        <CaretRight weight="bold" className="size-4 shrink-0 text-text-secondary" />
      )}
    </button>
  );
}

/* ── Your-journey timeline ──────────────────────────────────────────── */
type JourneyStep = {
  label: string;
  status: "done" | "ongoing";
  date?: string;
};

const JOURNEY: JourneyStep[] = [
  { label: "Documents", status: "done", date: "Done on Jan 10" },
  { label: "Catalogue", status: "done", date: "Done on Jan 16" },
  { label: "Website", status: "done", date: "Done on Jan 16" },
  { label: "Marketing", status: "done", date: "Done on Jan 16" },
  { label: "Launch", status: "ongoing" },
];

function JourneyTimeline({ onStep }: { onStep: () => void }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      {JOURNEY.map((s, i) => {
        const isLast = i === JOURNEY.length - 1;
        const done = s.status === "done";
        return (
          <div key={s.label} className="relative flex items-start gap-3 pb-3 last:pb-0">
            {/* connector to the next node */}
            {!isLast && (
              <span className="absolute bottom-0 left-3 top-7 w-0.5 -translate-x-1/2 rounded-full bg-brand-primary/25" />
            )}

            {/* node */}
            <span
              className={cn(
                "relative z-10 mt-1.5 grid size-6 shrink-0 place-items-center rounded-full",
                done
                  ? "bg-brand-primary text-white"
                  : "bg-white ring-2 ring-brand-primary"
              )}
            >
              {done ? (
                <Check weight="bold" className="size-3.5" />
              ) : (
                <span className="size-2.5 rounded-full bg-brand-primary" />
              )}
            </span>

            {/* step card */}
            <button
              type="button"
              onClick={onStep}
              className="flex flex-1 items-center justify-between gap-2 rounded-xl border border-border-divider p-3 text-left outline-none transition-colors active:bg-surface-muted"
            >
              <span className="flex flex-col gap-1.5">
                <span className="type-h3 text-text-primary">{s.label}</span>
                <span className="flex flex-wrap items-center gap-1.5">
                  <Pill tone={done ? "success" : "warning"} background>
                    {done ? "Completed" : "Ongoing"}
                  </Pill>
                  {s.date && (
                    <Pill tone="neutral" background>
                      {s.date}
                    </Pill>
                  )}
                </span>
              </span>
              <CaretRight
                weight="bold"
                className="size-4 shrink-0 text-text-secondary"
              />
            </button>
          </div>
        );
      })}

      <div className="mt-1">
        <InfoNote>
          Your launch date is calculated basis completion of each step and is
          subject to change.
        </InfoNote>
      </div>
    </div>
  );
}

/* ── Screen ─────────────────────────────────────────────────────────── */
export default function OBScreen() {
  const router = useRouter();
  const toChat = React.useCallback(() => router.push("/chat"), [router]);

  // iOS Safari `:active` press feedback needs a document touch listener.
  React.useEffect(() => {
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });
    return () => document.removeEventListener("touchstart", noop);
  }, []);

  return (
    <div className="bg-surface-app sm:flex sm:min-h-screen sm:items-center sm:justify-center sm:bg-neutral-200 sm:p-6">
      {/* Full-bleed on phones; framed on larger screens. */}
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-surface-app motion-safe:animate-screen-in sm:h-[852px] sm:w-[393px] sm:rounded-[44px] sm:shadow-2xl">
        {/* Header */}
        <div className="shrink-0 bg-surface-app pt-[env(safe-area-inset-top)]">
          <Header
            left={
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Open stories"
                  onClick={() => router.push("/stories")}
                  className="rounded-full outline-none transition-transform active:scale-95"
                >
                  <UserThumbnail src={AVATAR} story />
                </button>
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
          {/* Estimated go-live — hero status card */}
          <section className="space-y-3 rounded-2xl bg-white p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="type-caption text-text-secondary">
                Estimated go-live
              </span>
              <Pill tone="success" background>
                On track
              </Pill>
            </div>
            <p className="type-h1 text-text-primary">20th January</p>
            <div className="h-px bg-border-divider" />
            <div className="flex items-center justify-between gap-2">
              <span className="type-body-2 text-text-secondary">
                Last updated: Today 12:00 PM
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 text-[12px]"
                onClick={toChat}
              >
                Why this date?
              </Button>
            </div>
          </section>

          {/* Next step — prominent blue card */}
          <BlueCardBackground layer="front" className="gap-3">
            <div className="flex items-center justify-between type-caption text-white/75">
              <span>Next step</span>
              <span>Step 4/5</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <h2 className="type-h1 text-white">Launch · Approval pending</h2>
              <p className="type-body-1 text-white/90">
                Please review and approve the agreement. We&apos;re almost ready
                to go live with your marketing.
              </p>
            </div>
            <Button
              variant="secondary"
              size="md"
              className="mt-1 w-fit text-brand-primary"
              onClick={toChat}
            >
              View agreement
            </Button>
          </BlueCardBackground>

          {/* Recent conversation */}
          <section className="space-y-3">
            <SectionTitle
              icon={<ChatTeardropText weight="fill" />}
              title="Recent conversation"
              onViewAll={toChat}
            />
            <button
              type="button"
              onClick={toChat}
              className="block w-full text-left outline-none transition-transform active:scale-[0.99]"
            >
              <div className="space-y-2.5 rounded-2xl bg-white p-4">
                <p className="type-h3 text-text-primary">Jan 11, 11:50 AM</p>
                <p className="type-body-2 text-text-secondary">
                  Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum.
                </p>
                <InfoNote>This was discussed in the last conversation</InfoNote>
              </div>
            </button>
          </section>

          {/* Latest activity — pending items */}
          <section className="space-y-3">
            <SectionTitle
              icon={<ListChecks weight="fill" />}
              title="Latest activity"
              onViewAll={toChat}
            />
            <div className="rounded-2xl bg-white p-1.5">
              <ActivityRow
                icon={<User weight="bold" />}
                iconClass="bg-warning-light text-warning-default"
                title="You"
                sub="1 item pending"
                subClass="text-warning-default"
                showChevron
                onClick={toChat}
              />
              <div className="mx-2.5 h-px bg-border-divider" />
              <ActivityRow
                icon={<Smiley weight="bold" />}
                iconClass="bg-surface-app text-brand-primary"
                title="Shopdeck"
                sub="0 item pending"
                showChevron
                onClick={toChat}
              />
            </div>
          </section>

          {/* Recent updates — completed milestones */}
          <section className="space-y-3">
            <SectionTitle
              icon={<Sparkle weight="fill" />}
              title="Recent updates"
              onViewAll={toChat}
            />
            <div className="rounded-2xl bg-white p-1.5">
              <ActivityRow
                icon={<Sparkle weight="fill" />}
                iconClass="bg-accent-violet-light text-brand-primary"
                title="Logo generated"
                sub="Jan 14 · 10:40 AM"
                onClick={toChat}
              />
              <div className="mx-2.5 h-px bg-border-divider" />
              <ActivityRow
                icon={<ShieldCheck weight="fill" />}
                iconClass="bg-success-light text-success"
                title="Bank details verified"
                sub="Jan 14 · 10:40 AM"
                onClick={toChat}
              />
            </div>
          </section>

          {/* Your journey */}
          <section className="space-y-3">
            <SectionTitle
              icon={<Path weight="bold" />}
              title="Your journey"
              onViewAll={toChat}
            />
            <JourneyTimeline onStep={toChat} />
          </section>

          {/* Need help — callback */}
          <div className="flex items-center gap-3 rounded-2xl bg-white p-3">
            <UserThumbnail src={POC_AVATAR} size={44} />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="type-h3 text-text-primary">Need help?</span>
              <span className="type-body-2 text-text-secondary">
                Get a callback from{" "}
                <span className="font-medium text-text-primary">Arunabh</span>{" "}
                anytime
              </span>
            </div>
            <button
              type="button"
              aria-label="Request a callback"
              onClick={toChat}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-success text-white shadow-[0px_6px_16px_rgba(34,161,42,0.35)] outline-none transition-transform active:scale-95 [&_svg]:size-5"
            >
              <PhoneCall weight="fill" />
            </button>
          </div>
        </main>

        {/* Bottom nav */}
        <div className="shrink-0 bg-surface-app pb-[env(safe-area-inset-bottom)]">
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
