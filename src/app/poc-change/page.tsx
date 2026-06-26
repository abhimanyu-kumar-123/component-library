"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  ListChecks,
  Megaphone,
} from "@phosphor-icons/react";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { SectionCard } from "@/components/ui/section-card";
import { UserThumbnail } from "@/components/ui/user-thumbnail";
import { BottomNav } from "@/components/ui/bottom-nav";
import { cn } from "@/lib/utils";

const RadarLoader = dynamic(
  () => import("@/components/radar-loader").then((m) => m.RadarLoader),
  { ssr: false }
);

const AVATAR = "https://i.pravatar.cc/120?img=47";
const POC_AVATAR = "https://i.pravatar.cc/120?img=12";

const CAMPAIGN_PRODUCTS = [
  "/images/campaign/product-1.jpg",
  "/images/campaign/product-2.jpg",
  "/images/campaign/product-3.jpg",
];

const CAMPAIGN_STATS = [
  { label: "Audience", value: "Woman, Age 25-30" },
  { label: "City", value: "Tier 2 and 3" },
  { label: "Key interests", value: "Wedding, Festivals" },
  { label: "Price range", value: "₹700 - ₹800" },
];

const BASICS = [
  { label: "Campaign", src: "/icons/learn/campaign.svg" },
  { label: "Strategy", src: "/icons/learn/strategy.svg" },
  { label: "Metrics", src: "/icons/learn/metrics.svg" },
  { label: "Scale up", src: "/icons/learn/scale-up.svg" },
  { label: "Creatives", src: "/icons/learn/creatives.svg" },
];

const STEPS = [
  { step: "STEP 1", title: "Start with your first campaign" },
  { step: "STEP 2", title: "Spend planned as ₹1,000 daily" },
  { step: "STEP 3", title: "Find the right product market fit" },
  { step: "STEP 4", title: "Optimise your reach" },
  { step: "STEP 5", title: "scale up or reset" },
];

function WhatNextTimeline() {
  return (
    <div className="flex flex-col">
      {STEPS.map((s, i) => {
        const isLast = i === STEPS.length - 1;
        return (
          <div key={s.step} className="relative flex items-start gap-3 pb-2 last:pb-0">
            <div className="relative flex w-3.5 shrink-0 justify-center self-stretch">
              {!isLast && (
                <span className="absolute -bottom-7 left-1/2 top-9 w-0.5 -translate-x-1/2 rounded-full bg-brand-primary" />
              )}
              <span className="relative z-10 mt-6 block size-2 rounded-full bg-brand-primary" />
            </div>
            <div className="flex flex-1 flex-col gap-1 rounded-xl bg-white p-3">
              <span className="type-caption text-text-secondary">{s.step}</span>
              <span className="type-h2 font-medium text-text-primary">{s.title}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function PocChangeScreen() {
  const router = useRouter();
  const toChat = React.useCallback(() => router.push("/chat"), [router]);

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

        {/* Background content — same as after-live, non-interactive (pointer-events-none) */}
        <div className="pointer-events-none flex-1 overflow-hidden">
          <div className="space-y-6 px-4 py-4">
            {/* Handover card */}
            <div className="flex w-full items-center gap-3 rounded-2xl bg-white p-3">
              <UserThumbnail src={POC_AVATAR} size={48} />
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="type-h2 text-text-primary">Your store is live.</span>
                <span className="type-body-2 text-text-secondary">
                  Anjali handed you over to{" "}
                  <span className="font-semibold text-text-primary">Arunabh</span>, Growth Consultant
                </span>
              </div>
            </div>

            {/* Marketing strategy blue card */}
            <div className="relative w-full rounded-2xl bg-gradient-strategy p-4 text-white">
              <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl bg-gradient-strategy">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: "url('/images/card-texture.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    mixBlendMode: "overlay",
                    opacity: 0.7,
                  }}
                />
              </div>
              <div className="relative z-[1] flex flex-col gap-3 text-white">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 [&_svg]:size-4">
                    <Megaphone weight="regular" />
                    <span className="text-[16px] font-medium leading-5 text-white">Marketing strategy</span>
                  </div>
                  <p className="text-[12px] leading-[1.35] text-white/70">
                    Based on previous input we have created your first marketing strategy.
                  </p>
                </div>
                {/* Products */}
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] font-medium leading-[18px] text-white">Products for campaign</span>
                  <div className="-ml-[32px] w-[calc(100%+64px)] overflow-x-hidden">
                    <div className="flex gap-2 px-[32px]">
                      {CAMPAIGN_PRODUCTS.map((src, i) => (
                        <div key={i} className="relative h-[170px] w-[140px] shrink-0 overflow-hidden rounded-xl bg-white">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={src} alt="" className="block h-full w-full object-cover object-top" />
                          <div className="absolute bottom-0 left-0 right-0 h-9 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Stats */}
                <div className="flex flex-col gap-2 pt-1">
                  <span className="text-[13px] font-medium leading-[18px] text-white">Campaign will target</span>
                  <div className="flex gap-2">
                    {CAMPAIGN_STATS.slice(0, 2).map((s) => (
                      <div key={s.label} className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-lg bg-white/10 p-3">
                        <span className="text-[10px] font-medium uppercase leading-[14px] text-white/60">{s.label}</span>
                        <span className="text-[13px] font-medium leading-[18px] text-white whitespace-nowrap">{s.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {CAMPAIGN_STATS.slice(2).map((s) => (
                      <div key={s.label} className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-lg bg-white/10 p-3">
                        <span className="text-[10px] font-medium uppercase leading-[14px] text-white/60">{s.label}</span>
                        <span className="text-[13px] font-medium leading-[18px] text-white whitespace-nowrap">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="h-9 w-full rounded-lg bg-white text-[13px] font-medium text-[#1d2025]">
                  Review Strategy
                </button>
              </div>
            </div>

            {/* Learn the basics */}
            <section className="space-y-3">
              <h2 className="type-h2 text-text-primary">Learn the basics</h2>
              <div className="flex gap-4 py-2">
                {BASICS.map((b) => (
                  <div key={b.label} className="flex shrink-0 flex-col items-center gap-2">
                    <span className="grid size-14 place-items-center rounded-full bg-black ring-[1.5px] ring-brand-primary ring-offset-[3px] ring-offset-surface-app">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={b.src} alt="" className="size-8 object-contain" />
                    </span>
                    <span className="type-caption text-text-primary">{b.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* What next */}
            <SectionCard icon={<ListChecks weight="fill" />} title="What next" surface="glass">
              <WhatNextTimeline />
            </SectionCard>
          </div>
        </div>

        {/* ── Gradient overlay — fades background content to white ── */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[15%] bg-gradient-to-b from-transparent via-white/60 to-white" />

        {/* ── POC change notification — pinned above the bottom nav ── */}
        <div className="absolute inset-x-5 bottom-[calc(73px+env(safe-area-inset-bottom)+8px)] z-10 flex flex-col gap-3">
          <CheckCircle weight="fill" className="size-[70px] text-success" />
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <h2 className="type-h2 text-text-primary">Congrats! Your store is live.</h2>
              <p className="type-body-2 text-text-secondary">
                Anjali handed you over to{" "}
                <span className="font-medium text-text-primary">Arunabh Singh,</span>{" "}
                Growth Consultant
              </p>
            </div>
            <UserThumbnail src={POC_AVATAR} size={48} className="shrink-0" />
          </div>
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => router.push("/after-live")}
          >
            TAP TO DISMISS
          </Button>
        </div>

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
