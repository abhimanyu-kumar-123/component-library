"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  CaretRight,
  ChartBar,
  ChatTeardropText,
  Clock,
  Globe,
  LightbulbFilament,
  Quotes,
  Stack,
  Star,
  Target,
  Trophy,
  Truck,
  Warning,
} from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { Switch } from "@/components/ui/switch";
import { RoundButton } from "@/components/ui/round-button";
import { Dropdown } from "@/components/ui/dropdown";
import { UserThumbnail } from "@/components/ui/user-thumbnail";
import { BottomNav } from "@/components/ui/bottom-nav";
import { BlueCardBackground } from "@/components/ui/blue-card-background";
import { ActionDeck } from "@/components/ui/action-deck";
import { SectionTitle } from "@/components/ui/section-title";
import { DataCard } from "@/components/ui/data-card";
import { GoogleEmptyState } from "@/components/google-empty-state";
import { StrategyCard } from "@/components/ui/strategy-card";
import { CollapsibleCard } from "@/components/ui/collapsible-card";
import { ListCard, ListCardButton } from "@/components/ui/list-card";
import { ListContent } from "@/components/ui/list-content";
import { GoogleLogo, MetaLogoWhite, ShopdeckLogo } from "@/components/brand-logos";

const AVATAR = "https://i.pravatar.cc/120?img=47";

/* ── Screen-specific bits (not library components) ─────────────────── */

function SectionHeader({
  icon,
  title,
  right,
}: {
  icon: React.ReactNode;
  title: string;
  right?: React.ReactNode;
}) {
  return <SectionTitle icon={icon} title={title} action={right} />;
}

/** Metric tile without a delta — used in Logistics Tracking. */
function MetricStat({
  label,
  value,
  cap,
  note,
}: {
  label: string;
  value: string;
  cap?: string;
  note?: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-white bg-white p-3">
      <div className="flex items-center justify-between">
        <span className="truncate type-caption text-text-secondary">
          {label}
        </span>
        <ChatTeardropText className="size-4 shrink-0 text-text-secondary/60" />
      </div>
      <div className="flex items-end gap-1">
        <span className="type-h1 text-text-primary">
          {value}
        </span>
        {cap && (
          <span className="text-[10px] leading-[17px] text-text-secondary">
            {cap}
          </span>
        )}
      </div>
      {note && (
        <span className="text-[10px] font-medium leading-[14px] text-success">
          {note}
        </span>
      )}
    </div>
  );
}

const opportunityChip = {
  brand: "bg-accent-violet-light text-brand-primary",
  violet: "bg-[#efe3fd] text-[#7c3aed]",
} as const;

function OpportunityCard({
  chip,
  chipTone,
  title,
  desc,
}: {
  chip: string;
  chipTone: "brand" | "violet";
  title: string;
  desc: string;
}) {
  return (
    <div className="flex w-[200px] shrink-0 flex-col gap-3 rounded-2xl bg-white p-4">
      <span
        className={cn(
          "inline-flex w-fit items-center rounded-md px-2 py-1 type-caption",
          opportunityChip[chipTone]
        )}
      >
        {chip}
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-[13px] font-medium leading-5 text-text-primary">
          {title}
        </p>
        <p className="type-body-2 text-text-secondary">
          {desc}
        </p>
      </div>
      <button
        type="button"
        className="flex items-center gap-1 text-[12px] font-medium text-brand-primary outline-none [&_svg]:size-3"
      >
        Know more
        <CaretRight weight="bold" />
      </button>
    </div>
  );
}

function SummaryCard() {
  return (
    <div className="flex w-[224px] shrink-0 flex-col gap-3 rounded-2xl bg-gradient-to-b from-[#bcc4d9] to-[#eff1f9] p-4">
      <div className="flex h-[120px] items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/story-image.png"
          alt=""
          className="h-full w-auto max-w-none object-contain"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="type-h2 text-text-primary">
          Best order day this month
        </p>
        <p className="type-h3 text-text-primary">
          Monday hit 500 orders
        </p>
        <p className="type-body-2 text-text-secondary">
          Tighten targeting, refresh creatives, and scale spend in a controlled
          way to increase conversions.
        </p>
      </div>
      <span className="inline-flex w-fit items-center gap-1 rounded-full bg-surface-app px-3 py-1.5 text-[12px] font-medium text-text-primary [&_svg]:size-3">
        <ArrowUpRight weight="bold" className="text-success" />
        + 30% vs day average
      </span>
    </div>
  );
}

const ACTION_CARDS = [
  {
    icon: <Globe weight="bold" />,
    title: "Domain Setup – Action Required!",
    desc: "You haven’t secured your domain yet, devikatextile.in is still waiting for confirmation at ₹412.",
    time: "3 Days ago",
  },
  {
    icon: <Truck weight="bold" />,
    title: "Pickups delayed in 2 zones",
    desc: "Carrier SLAs slipped in UP & Bihar. Confirm the backup courier to keep today’s dispatch on track.",
    time: "1 Day ago",
  },
  {
    icon: <ChartBar weight="bold" />,
    title: "Ad budget nearly exhausted",
    desc: "Meta spend is at 92% of today’s cap. Approve a top-up to avoid pausing your best campaigns.",
    time: "Today",
  },
];

/* ── Screen ────────────────────────────────────────────────────────── */

export default function HomeScreen() {
  const router = useRouter();
  const [metric, setMetric] = React.useState("meta");
  // Weekly Strategy channel — Google shows the "not started" empty state.
  const [weeklyChannel, setWeeklyChannel] = React.useState("meta");
  // Time period — deltas only show for "This Week", never "Today".
  const [period, setPeriod] = React.useState("today");
  const showDelta = period !== "today";
  const weeklyRef = React.useRef<HTMLElement>(null);

  // iOS Safari only fires CSS `:active` (press) states on tap when a touch
  // listener exists on the document. This empty listener enables them.
  React.useEffect(() => {
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });
    return () => document.removeEventListener("touchstart", noop);
  }, []);

  return (
    <div className="bg-surface-app sm:flex sm:min-h-screen sm:items-center sm:justify-center sm:bg-neutral-200 sm:p-6">
      {/* Full-bleed on phones (100dvh + safe areas); framed on larger screens. */}
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-surface-app sm:h-[852px] sm:w-[393px] sm:rounded-[44px] sm:shadow-2xl">
        {/* Header — fixed, padded below the Dynamic Island / status bar */}
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
                <span className="type-h2 text-text-primary">
                  Hi Rohit,
                </span>
                <span className="text-[12px] leading-[14px] text-text-secondary">
                  devikatextiles.com
                </span>
              </div>
            </div>
          }
            right={
              <RoundButton
                size="md"
                className="gap-2"
                aria-label="Strategy"
                onClick={() =>
                  weeklyRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
              >
                <span className="flex items-center">
                  <span className="grid size-5 place-items-center rounded-full bg-black ring-[1.5px] ring-white [&_svg]:size-3">
                    <GoogleLogo />
                  </span>
                  <span className="-ml-2 grid size-5 place-items-center rounded-full bg-[#0866ff] ring-[1.5px] ring-white [&_svg]:size-3">
                    <MetaLogoWhite />
                  </span>
                </span>
                Strategy: 3
              </RoundButton>
            }
          />
        </div>

        {/* Scrollable content */}
        <main className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
          {/* Performance */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Dropdown
                className="w-[140px] shrink-0"
                options={[
                  { label: "Today", value: "today" },
                  { label: "This Week", value: "this-week" },
                ]}
                value={period}
                onValueChange={setPeriod}
              />
              <Switch
                className="min-w-0 flex-1 [&_[role=tab]]:px-2"
                options={[
                  { label: "Overall", value: "overall" },
                  { label: "Meta", value: "meta" },
                  { label: "Google", value: "google" },
                ]}
                value={metric}
                onValueChange={setMetric}
              />
            </div>

            <div className="relative">
              <div
                className={cn(
                  "space-y-2",
                  metric === "google" && "invisible"
                )}
                aria-hidden={metric === "google"}
              >
              <div className="grid grid-cols-2 gap-2">
                <DataCard
                  type="single"
                  metrics={[
                    {
                      label: "Orders placed",
                      value: "500",
                      delta: showDelta ? { value: "15%" } : undefined,
                    },
                  ]}
                />
                <DataCard
                  type="single"
                  metrics={[
                    {
                      label: "Projected GMV",
                      value: "₹2.4L",
                      delta: showDelta ? { value: "12%" } : undefined,
                    },
                  ]}
                />
              </div>

              {/* Spends — splits into two blocks on the Meta tab */}
              {metric === "meta" ? (
                <DataCard
                  type="double"
                  metrics={[
                    { label: "Normal spends", value: "₹2.4L", cap: "/ ₹5.0 L", progress: { pct: 48 } },
                    { label: "CPP/ROAS spends", value: "₹6.4L", cap: "/ ₹5.0 L", progress: { pct: 100, tone: "red" } },
                  ]}
                />
              ) : (
                <DataCard
                  type="single"
                  metrics={[
                    { label: "Spends", value: "₹2.4L", cap: "/ ₹5.0 L", progress: { pct: 50 } },
                  ]}
                />
              )}

              <div className="grid grid-cols-2 gap-2">
                <DataCard
                  type="single"
                  metrics={[
                    {
                      label: "CPO",
                      value: "₹640",
                      delta: showDelta ? { value: "₹20", tone: "down" } : undefined,
                    },
                  ]}
                />
                <DataCard
                  type="single"
                  metrics={[
                    {
                      label: "Last week profit",
                      value: "12%",
                      delta: showDelta ? { value: "15%" } : undefined,
                    },
                  ]}
                />
              </div>
              </div>

              {metric === "google" && (
                <GoogleEmptyState
                  onCta={() => router.push("/chat")}
                  className="absolute inset-0"
                />
              )}
            </div>
          </section>

          {/* Action Needed */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-full bg-white text-text-primary [&_svg]:size-4">
                  <Target weight="fill" />
                </span>
                <h2 className="type-h2 text-text-primary">
                  Action Needed (10)
                </h2>
              </div>
              <Button
                variant="ghost"
                onClick={() => router.push("/chat?tab=activity")}
              >
                View all
                <CaretRight />
              </Button>
            </div>

            {/* Card wheel */}
            <ActionDeck
              cards={ACTION_CARDS}
              viewLabel="View Pending List"
              onContinue={() => router.push("/chat")}
              onView={() => router.push("/chat")}
            />
          </section>

          {/* Daily Marketing Adjustments */}
          <section className="space-y-3">
            <SectionHeader
              icon={<Stack weight="fill" />}
              title="Daily Marketing Adjustments"
            />
            <div className="space-y-2">
              <StrategyCard
                summary="CPP is higher since morning for Meta, so we acted fast and rebalanced"
                detail="Campaign scaled down 3, Scaled up 2, paused 2, Restarted 2"
                stats={[
                  { label: "Budget increased by", value: "₹12k" },
                  { label: "Estimated spends today", value: "₹15k – ₹15k" },
                ]}
                footnote="Next analysis scheduled for 12:00 AM"
                time="11:00 AM"
              />
              <StrategyCard
                icon={<GoogleLogo />}
                summary="CPP is higher since morning for Google, so we acted fast and rebalanced"
                detail="Campaign scaled down 3, Scaled up 2, paused 2, Restarted 2"
                stats={[
                  { label: "Budget increased by", value: "₹12k" },
                  { label: "Estimated spends today", value: "₹15k – ₹15k" },
                ]}
                footnote="Next analysis scheduled for 12:00 AM"
                time="11:00 AM"
              />
            </div>
          </section>

          {/* Weekly Strategy */}
          <section ref={weeklyRef} className="scroll-mt-3 space-y-3">
            <SectionHeader
              icon={<LightbulbFilament weight="fill" />}
              title="Weekly Strategy"
            />
            <Switch
              className="w-full [&_[role=tab]]:px-2"
              options={[
                { label: "Meta", value: "meta" },
                { label: "Google", value: "google" },
              ]}
              value={weeklyChannel}
              onValueChange={setWeeklyChannel}
            />

            {weeklyChannel === "google" ? (
              <GoogleEmptyState onCta={() => router.push("/chat")} />
            ) : (
              <>
            {/* Problem identified */}
            <div className="flex flex-col gap-3 rounded-2xl bg-white p-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 type-caption text-warning-default [&_svg]:size-3">
                  <Warning weight="fill" />
                  Problem Identified
                </span>
                <span className="flex items-center gap-1 text-[10px] leading-[14px] text-text-secondary [&_svg]:size-3">
                  <Clock />
                  2 June 2026
                </span>
              </div>
              <ul className="flex flex-col">
                {[
                  "RTO doubled with no dimensional",
                  "Warehouse dispatch slowed sharply",
                  "Spend efficiency collapsed after Adenium price hike forced a pivot to fruit tree products",
                ].map((p, i) => (
                  <li
                    key={i}
                    className={cn(
                      "flex items-start gap-2 py-2 text-[13px] leading-5 text-text-primary",
                      i > 0 && "border-t border-neutral-100"
                    )}
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-text-secondary" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Strategy summary */}
            <BlueCardBackground layer="front" className="min-h-0 gap-2">
              <span className="flex items-center gap-1 type-caption text-white/80 [&_svg]:size-3">
                <Quotes weight="fill" />
                Strategy Summary
              </span>
              <p className="text-[13px] font-normal leading-5 text-white">
                Tighten targeting, refresh creatives, and scale spend in a
                controlled way to improve efficiency, increase conversions, and
                gather enough data for stable optimization.
              </p>
            </BlueCardBackground>

            {/* Strategy collapsibles */}
            <CollapsibleCard
              strategy="Strategy 1"
              title="Reducing Cancellations"
              badges={[
                { label: "Done: 1", tone: "success" },
                { label: "Ongoing: 1", tone: "brand" },
              ]}
              defaultOpen
            >
              <ListCard
                tone="ongoing"
                status="Ongoing"
                title="Restart paused Meta campaigns"
              />
              <ListCard
                tone="pending"
                status="Pending · on you"
                title="Dispatch 9 expired AWBs on priority"
                content={
                  <ListContent
                    variant="image"
                    images={[
                      "https://picsum.photos/seed/aw1/200/120",
                      "https://picsum.photos/seed/aw2/200/120",
                      "https://picsum.photos/seed/aw3/200/120",
                    ]}
                  />
                }
                actions={
                  <>
                    <ListCardButton variant="glass">Learn More</ListCardButton>
                    <ListCardButton variant="primary">Approve</ListCardButton>
                  </>
                }
              />
              <ListCard
                tone="pending"
                status="Pending · on you"
                title="Dispatch 9 expired AWBs on priority"
                content={
                  <ListContent
                    variant="table"
                    rows={[
                      { label: "Pillow Set (2pc)", value: "₹340 → ₹375" },
                      { label: "Cotton Bedsheet Queen", value: "₹850 → ₹920" },
                      { label: "Duvet Cover King", value: "₹1,200 → ₹1,340" },
                    ]}
                  />
                }
                actions={
                  <>
                    <ListCardButton variant="glass">Learn More</ListCardButton>
                    <ListCardButton variant="primary">Approve</ListCardButton>
                  </>
                }
              />
            </CollapsibleCard>

            <CollapsibleCard
              strategy="Strategy 2"
              title="Reducing Cancellations"
              badges={[
                { label: "Done: 1", tone: "success" },
                { label: "Ongoing: 1", tone: "brand" },
              ]}
            >
              <ListCard
                tone="ongoing"
                status="Ongoing"
                title="Restart paused Meta campaigns"
              />
              <ListCard
                tone="pending"
                status="Pending · on you"
                title="Dispatch 9 expired AWBs on priority"
                content={
                  <ListContent
                    variant="image"
                    images={[
                      "https://picsum.photos/seed/aw1/200/120",
                      "https://picsum.photos/seed/aw2/200/120",
                      "https://picsum.photos/seed/aw3/200/120",
                    ]}
                  />
                }
                actions={
                  <>
                    <ListCardButton variant="glass">Learn More</ListCardButton>
                    <ListCardButton variant="primary">Approve</ListCardButton>
                  </>
                }
              />
              <ListCard
                tone="pending"
                status="Pending · on you"
                title="Dispatch 9 expired AWBs on priority"
                content={
                  <ListContent
                    variant="table"
                    rows={[
                      { label: "Pillow Set (2pc)", value: "₹340 → ₹375" },
                      { label: "Cotton Bedsheet Queen", value: "₹850 → ₹920" },
                      { label: "Duvet Cover King", value: "₹1,200 → ₹1,340" },
                    ]}
                  />
                }
                actions={
                  <>
                    <ListCardButton variant="glass">Learn More</ListCardButton>
                    <ListCardButton variant="primary">Approve</ListCardButton>
                  </>
                }
              />
            </CollapsibleCard>
              </>
            )}
          </section>

          {/* Logistics Tracking */}
          <section className="space-y-3">
            <SectionHeader
              icon={<Truck weight="fill" />}
              title="Logistics Tracking"
              right={
                <Button variant="ghost">
                  View more
                  <CaretRight />
                </Button>
              }
            />
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <MetricStat label="Orders PPH" value="50" />
                <MetricStat label="Pickups done today" value="500" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <MetricStat
                  label="NDR attempts"
                  value="200"
                  note="Shopdeck Driven: 100"
                />
                <MetricStat
                  label="Delivered today"
                  value="200"
                  cap="/500"
                  note="NDR Delivered: 100"
                />
              </div>
            </div>
          </section>

          {/* Opportunities for You */}
          <section className="space-y-3">
            <SectionHeader
              icon={<Star weight="fill" />}
              title="Opportunities for You"
            />
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <OpportunityCard
                chip="Growth"
                chipTone="brand"
                title="Scale Google Search"
                desc="Top SKUs converting 1.6× better — lift budget to ₹2.5L/day."
              />
              <OpportunityCard
                chip="Festival Prep"
                chipTone="violet"
                title="Prep for festive spike"
                desc="12-day window from 22 Jan — stock + creative briefs ready."
              />
            </div>
          </section>

          {/* Milestones */}
          <section className="flex flex-col gap-4 rounded-[24px] bg-[linear-gradient(160deg,#4f6ef0_0%,#3f63ef_100%)] px-4 py-5">
            <div className="flex items-center gap-2 text-white">
              <span className="grid size-8 place-items-center rounded-full bg-white/20 [&_svg]:size-4">
                <Trophy weight="fill" />
              </span>
              <h2 className="type-h2">Milestones</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {[0, 1, 2].map((i) => (
                <SummaryCard key={i} />
              ))}
            </div>
          </section>

          {/* Keep Growing */}
          <section className="flex flex-col items-center gap-3 py-6 text-center">
            <p
              className="text-center text-[40px] font-bold leading-[50px] text-[#B6BBC6]"
              style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
            >
              Keep Growing
            </p>
            <ShopdeckLogo className="h-5 w-auto" />
          </section>
        </main>

        {/* Bottom nav — fixed, padded above the home indicator */}
        <div className="shrink-0 bg-surface-app pb-[env(safe-area-inset-bottom)]">
          <BottomNav onSearchClick={() => router.push("/chat")} />
        </div>
      </div>
    </div>
  );
}
