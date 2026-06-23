"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  CaretRight,
  ChartBar,
  Globe,
  LightbulbFilament,
  Quotes,
  Target,
  Truck,
  Warning,
} from "@phosphor-icons/react";

const RadarLoader = dynamic(
  () => import("@/components/radar-loader").then((m) => m.RadarLoader),
  { ssr: false }
);

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { Switch } from "@/components/ui/switch";
import { Dropdown } from "@/components/ui/dropdown";
import { UserThumbnail } from "@/components/ui/user-thumbnail";
import { BottomNav } from "@/components/ui/bottom-nav";
import { BlueCardBackground } from "@/components/ui/blue-card-background";
import { ActionDeck } from "@/components/ui/action-deck";
import { SectionTitle } from "@/components/ui/section-title";
import { DataCard } from "@/components/ui/data-card";
import { CollapsibleCard } from "@/components/ui/collapsible-card";
import { ListCard, ListCardButton } from "@/components/ui/list-card";
import { ShopdeckLogo } from "@/components/brand-logos";
import { GoogleEmptyState } from "@/components/google-empty-state";

const AVATAR = "https://i.pravatar.cc/120?img=47";

const ACTION_CARDS = [
  {
    icon: <Globe weight="bold" />,
    title: "Domain Setup – Action Required!",
    desc: "You haven't secured your domain yet, devikatextile.in is still waiting for confirmation at ₹412.",
    time: "3 Days ago",
  },
  {
    icon: <ChartBar weight="bold" />,
    title: "Low fund alert",
    desc: "Please add funds to Meta to ensure marketing is not stopping.",
    time: "3 Days ago",
  },
  {
    icon: <Truck weight="bold" />,
    title: "Pickups delayed in 2 zones",
    desc: "Carrier SLAs slipped in UP & Bihar. Confirm the backup courier to keep dispatch on track.",
    time: "1 Day ago",
  },
];

const PROBLEMS = [
  "RTO doubled with no dimensional",
  "Warehouse dispatch slowed sharply",
  "Spend efficiency collapsed after Adenium price hike forced a pivot to fruit tree products",
];

export default function MarketingLiveScreen() {
  const router = useRouter();
  const toChat = React.useCallback(() => router.push("/chat"), [router]);
  const [period, setPeriod] = React.useState("today");
  const [metric, setMetric] = React.useState("meta");
  const [weeklyChannel, setWeeklyChannel] = React.useState("meta");

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
          {/* Performance — marketing in progress, metrics pending */}
          <section className="space-y-3">
            {/* Marketing-in-progress banner */}
            <div className="flex items-center gap-3 rounded-2xl border border-white bg-white p-3">
              <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-surface-app text-brand-primary">
                <RadarLoader />
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="type-h2 text-text-primary">Marketing in progress</span>
                <span className="type-body-2 text-text-secondary">
                  Your metrics will appear automatically once data starts coming in.
                </span>
              </div>
            </div>

            {/* period + channel */}
            <div className="flex items-center gap-2">
              <Dropdown
                className="w-[130px] shrink-0"
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

            {/* metrics — placeholders until data arrives. Google overlays the
                empty state; metrics keep the height so the section never jumps. */}
            <div className="relative">
              <div
                className={cn("space-y-2", metric === "google" && "invisible")}
                aria-hidden={metric === "google"}
              >
                <div className="grid grid-cols-2 gap-2">
                  <DataCard type="single" metrics={[{ label: "Orders placed", value: "--" }]} />
                  <DataCard type="single" metrics={[{ label: "Revenue", value: "--" }]} />
                </div>
                <DataCard
                  type="double"
                  metrics={[
                    { label: "Normal spends", value: "₹700L", cap: "/ ₹1k", progress: { pct: 60 } },
                    { label: "CPP/ROAS spends", value: "₹500", cap: "/ ₹1k", progress: { pct: 25, tone: "green" } },
                  ]}
                />
                <div className="grid grid-cols-2 gap-2">
                  <DataCard type="single" metrics={[{ label: "Visitors", value: "--" }]} />
                  <DataCard type="single" metrics={[{ label: "CPO", value: "--" }]} />
                </div>
              </div>

              {metric === "google" && (
                <GoogleEmptyState onCta={toChat} className="absolute inset-0" />
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
                <h2 className="type-h2 text-text-primary">Action Needed (10)</h2>
              </div>
              <Button variant="ghost" onClick={toChat}>
                View all
                <CaretRight />
              </Button>
            </div>
            <ActionDeck
              cards={ACTION_CARDS}
              viewLabel="View Pending List"
              onContinue={toChat}
              onView={toChat}
            />
          </section>

          {/* Weekly Strategy */}
          <section className="space-y-3">
            <SectionTitle icon={<LightbulbFilament weight="fill" />} title="Weekly Strategy" />
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
              <GoogleEmptyState onCta={toChat} />
            ) : (
              <>
            {/* Problem identified */}
            <div className="flex flex-col gap-3 rounded-2xl border border-surface-muted bg-white p-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 type-caption text-warning-default [&_svg]:size-3">
                  <Warning weight="fill" />
                  Problem Identified
                </span>
                <span className="text-[10px] leading-[14px] text-text-secondary">
                  2 June 2026
                </span>
              </div>
              <ul className="flex flex-col">
                {PROBLEMS.map((p, i) => (
                  <li
                    key={i}
                    className={cn(
                      "flex items-start gap-2 py-2 type-body-1 text-text-primary",
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
              <p className="type-body-1 text-white">
                Prioritise high-AOV, low-RTO growth by retargeting proven audiences,
                refining 35+ targeting, and elevating creative (UGC + best-seller
                banners), while sustaining AOV via benchmark-aligned pricing.
              </p>
            </BlueCardBackground>

            {/* Strategy collapsible */}
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
                tone="pending"
                status="Pending · on you"
                title="Identified Optimisation: Find historical audiences that have worked the best with high AOV jewellery products and market on them"
                actions={<ListCardButton variant="primary">Got it</ListCardButton>}
              />
            </CollapsibleCard>
              </>
            )}
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
