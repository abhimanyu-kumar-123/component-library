"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ChartBar,
  Clock,
  Globe,
  LightbulbFilament,
  Quotes,
  Target,
  Truck,
  Warning,
} from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Header } from "@/components/ui/header";
import { UserThumbnail } from "@/components/ui/user-thumbnail";
import { RoundButton } from "@/components/ui/round-button";
import { Dropdown } from "@/components/ui/dropdown";
import { Switch } from "@/components/ui/switch";
import { SectionTitle } from "@/components/ui/section-title";
import { Pill } from "@/components/ui/pill";
import { ActionDeck } from "@/components/ui/action-deck";
import { CollapsibleCard } from "@/components/ui/collapsible-card";
import { ListCard, ListCardButton } from "@/components/ui/list-card";
import { DataCard } from "@/components/ui/data-card";
import { BottomNav } from "@/components/ui/bottom-nav";
import { GoogleEmptyState } from "@/components/google-empty-state";
import { GoogleLogo, MetaLogoWhite, ShopdeckLogo } from "@/components/brand-logos";

const AVATAR = "https://i.pravatar.cc/120?img=47";

/* ── Action Needed deck content ──────────────────────────────────────── */
const ACTION_CARDS = [
  {
    icon: <Globe weight="bold" />,
    title: "Low fund alert",
    desc: "Please add funds to Meta to ensure marketing is not stopping.",
    time: "3 Days ago",
    badge: "PROFITABILITY RISK",
  },
  {
    icon: <Truck weight="bold" />,
    title: "Pickups delayed in 2 zones",
    desc: "Carrier SLAs slipped in UP & Bihar. Confirm the backup courier to keep dispatch on track.",
    time: "1 Day ago",
    badge: "DISPATCH RISK",
  },
  {
    icon: <ChartBar weight="bold" />,
    title: "Ad budget nearly exhausted",
    desc: "Meta spend is at 92% of today's cap. Approve a top-up to avoid pausing your best campaigns.",
    time: "Today",
    badge: "PROFITABILITY RISK",
  },
];

const PROBLEMS = ["Marketing Spiked", "RTO Always Bad", "Margins too low"];

/* ── Screen ──────────────────────────────────────────────────────────── */
export default function HitsHomeScreen() {
  const router = useRouter();
  const toChat = React.useCallback(() => router.push("/chat"), [router]);
  const strategyRef = React.useRef<HTMLDivElement>(null);
  // "Got it" acknowledgements — once tapped, the CTA disables (no navigation).
  const [acked, setAcked] = React.useState({ s1: false, s2: false });
  // Performance channel — Meta splits spends; Overall/Google show one Spends card.
  const [segment, setSegment] = React.useState("meta");
  // Time period — deltas only show for "This Week", never "Today".
  const [period, setPeriod] = React.useState("today");
  const showDelta = period !== "today";
  // Weekly Strategy channel — Google shows the "not started" empty state.
  const [strategySeg, setStrategySeg] = React.useState("meta");

  return (
    <div className="bg-surface-app sm:flex sm:min-h-screen sm:items-center sm:justify-center sm:bg-neutral-200 sm:p-6">
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-surface-app motion-safe:animate-screen-in sm:h-[852px] sm:w-[393px] sm:rounded-[44px] sm:shadow-2xl">
        {/* Header (library) */}
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
                  <span className="type-body-2 text-text-secondary">
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
                  strategyRef.current?.scrollIntoView({
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
                className="w-[120px] shrink-0"
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
                value={segment}
                onValueChange={setSegment}
              />
            </div>

            {/* Metrics with the Google empty state overlaid — the metrics
                always define the height, so the section never fluctuates. */}
            <div className="relative">
              <div
                className={cn(
                  "flex flex-col gap-3",
                  segment === "google" && "invisible"
                )}
                aria-hidden={segment === "google"}
              >
                <div className="grid grid-cols-2 gap-3">
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
                        label: "Revenue",
                        value: "₹2.4L",
                        delta: showDelta ? { value: "12%" } : undefined,
                      },
                    ]}
                  />
                </div>

                {/* Spends — Meta splits Normal + CPP/ROAS; else a single card. */}
                {segment === "meta" ? (
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

                <div className="grid grid-cols-2 gap-3">
                  <DataCard
                    type="single"
                    metrics={[
                      {
                        label: "Visitors",
                        value: "1.2L",
                        delta: showDelta ? { value: "15%" } : undefined,
                      },
                    ]}
                  />
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
                </div>

                {/* Customer ratings — only for the This Week timeframe. */}
                {period === "this-week" && (
                  <DataCard
                    type="ratings"
                    rating={3.2}
                    ratingLabel="Customer ratings"
                    ratingNote="Last 15 days"
                  />
                )}
              </div>

              {segment === "google" && (
                <GoogleEmptyState onCta={toChat} className="absolute inset-0" />
              )}
            </div>
          </section>

          {/* Action Needed — interactive rotating deck */}
          <section className="space-y-3">
            <SectionTitle
              icon={<Target weight="fill" />}
              title="Action Needed (10)"
              onViewAll={toChat}
            />
            <ActionDeck cards={ACTION_CARDS} onContinue={toChat} />
          </section>

          {/* Weekly Strategy */}
          <section ref={strategyRef} className="space-y-3">
            <SectionTitle
              icon={<LightbulbFilament weight="fill" />}
              title="Weekly Strategy"
            />
            <Switch
              className="w-full"
              options={[
                { label: "Meta", value: "meta" },
                { label: "Google", value: "google" },
              ]}
              value={strategySeg}
              onValueChange={setStrategySeg}
            />

            {strategySeg === "google" ? (
              <GoogleEmptyState onCta={toChat} />
            ) : (
              <>
            {/* Problem identified */}
            <div className="flex flex-col gap-3 rounded-2xl bg-white p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1 type-caption text-warning-default [&_svg]:size-3">
                  <Warning weight="regular" />
                  Problem identified
                </span>
                <span className="flex items-center gap-1 type-caption text-text-secondary [&_svg]:size-3">
                  <Clock weight="regular" />
                  2 June 2026
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {PROBLEMS.map((p) => (
                  <Pill key={p} tone="danger">
                    {p}
                  </Pill>
                ))}
              </div>
            </div>

            {/* Strategy summary */}
            <div className="flex flex-col gap-2 rounded-2xl bg-gradient-primary p-4">
              <span className="flex items-center gap-1.5 type-caption text-white/80 [&_svg]:size-4">
                <Quotes weight="fill" />
                Strategy summary
              </span>
              <p className="type-body-1 text-white">
                Tighten targeting, refresh creatives, and scale spend in a
                controlled way to improve efficiency, increase conversions, and
                gather enough data for stable optimization.
              </p>
            </div>

            {/* Strategies — interactive collapsibles */}
            <CollapsibleCard
              strategy="Strategy 1"
              title="Reducing Cancellations"
              defaultOpen
            >
              <ListCard
                tone="pending"
                status="Pending · on you"
                title="Identified Optimisation: Find historical audiences that have worked the best with high AOV jewellery products and market on them"
                actions={
                  <ListCardButton
                    variant="primary"
                    className="px-5"
                    disabled={acked.s1}
                    onClick={() => setAcked((a) => ({ ...a, s1: true }))}
                  >
                    Got it
                  </ListCardButton>
                }
              />
            </CollapsibleCard>

            <CollapsibleCard
              strategy="Strategy 2"
              title="Optimising Meta's Marketing"
              defaultOpen
            >
              <ListCard
                tone="pending"
                status="Pending · on you"
                title="Hygiene Fix: Build UGC videos for the next 5 products"
                actions={
                  <ListCardButton
                    variant="primary"
                    className="px-5"
                    disabled={acked.s2}
                    onClick={() => setAcked((a) => ({ ...a, s2: true }))}
                  >
                    Got it
                  </ListCardButton>
                }
              />
            </CollapsibleCard>
              </>
            )}
          </section>

          {/* Keep Growing */}
          <div className="flex flex-col items-center gap-2 pb-2 pt-4">
            <p
              className="text-center text-[40px] font-bold leading-[50px] text-[#B6BBC6]"
              style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
            >
              Keep Growing
            </p>
            <ShopdeckLogo className="h-5 w-auto" />
          </div>
        </main>

        {/* Footer (library) */}
        <div className="shrink-0 bg-surface-app pb-[env(safe-area-inset-bottom)]">
          <BottomNav onHome={() => router.push("/home")} onSearchClick={toChat} onAction={toChat} />
        </div>
      </div>
    </div>
  );
}
