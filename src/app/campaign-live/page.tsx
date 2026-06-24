"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, ListChecks } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { SectionCard } from "@/components/ui/section-card";
import { UserThumbnail } from "@/components/ui/user-thumbnail";
import { BottomNav } from "@/components/ui/bottom-nav";
import { CaretRight } from "@phosphor-icons/react";

const AVATAR = "https://i.pravatar.cc/120?img=47";
const POC_AVATAR = "https://i.pravatar.cc/120?img=12";

/* Learn the basics — same as after-live */
const BASICS = [
  { label: "Campaign", src: "/icons/learn/campaign.svg" },
  { label: "Strategy", src: "/icons/learn/strategy.svg" },
  { label: "Metrics", src: "/icons/learn/metrics.svg" },
  { label: "Scale up", src: "/icons/learn/scale-up.svg" },
  { label: "Creatives", src: "/icons/learn/creatives.svg" },
];

/* What next — same as after-live */
const STEPS = [
  { step: "STEP 1", title: "Start with your first campaign" },
  { step: "STEP 2", title: "Find the right product market fit" },
  { step: "STEP 3", title: "Optimise your reach" },
  { step: "STEP 4", title: "scale up or reset" },
];

function WhatNextTimeline({ onStep }: { onStep: () => void }) {
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
            <button
              type="button"
              onClick={onStep}
              className="flex flex-1 flex-col gap-1 rounded-xl bg-white p-3 text-left outline-none transition-colors active:bg-surface-muted"
            >
              <span className="type-caption text-text-secondary">{s.step}</span>
              <span className="type-h2 font-medium text-text-primary">{s.title}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default function CampaignLiveScreen() {
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

        {/* Scrollable content */}
        <main className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
          {/* Handover card — store is live */}
          <button
            type="button"
            onClick={toChat}
            className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left outline-none transition-transform active:scale-[0.99]"
          >
            <UserThumbnail src={POC_AVATAR} size={48} />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="type-h2 text-text-primary">Your store is live.</span>
              <span className="type-body-2 text-text-secondary">
                Anjali handed you over to{" "}
                <span className="font-semibold text-text-primary">Arunabh</span>, Growth
                Consultant
              </span>
            </div>
            <CaretRight weight="bold" className="size-4 shrink-0 text-text-secondary" />
          </button>

          {/* Campaign live card — replaces the blue marketing strategy card */}
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-5 text-center">
            {/* Icon circle */}
            <span className="grid size-[70px] place-items-center rounded-full bg-gradient-primary [&_svg]:size-8">
              <Check weight="bold" className="text-white" />
            </span>

            {/* Heading */}
            <div className="flex flex-col gap-1">
              <h2 className="type-h1 text-text-primary">
                Congratulations! Your 1st campaign is live
              </h2>
            </div>

            {/* Purple callout box */}
            <div className="w-full rounded-xl bg-accent-purple-light px-4 py-3">
              <p className="type-body-1 text-accent-purple text-center">
                We&apos;ll run it for a week, gather insights, and share what we learn — so
                the next campaign is even stronger. Watch this space.
              </p>
            </div>

            {/* CTA → marketing-live */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => router.push("/marketing-live")}
            >
              Ok, Notify Me
            </Button>
          </div>

          {/* Learn the basics */}
          <section className="space-y-3">
            <h2 className="type-h1 text-text-primary">Learn the basics</h2>
            <div className="-mx-4 flex gap-4 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {BASICS.map((b) => (
                <button
                  key={b.label}
                  type="button"
                  onClick={toChat}
                  className="flex shrink-0 flex-col items-center gap-2 outline-none transition-transform active:scale-95"
                >
                  <span className="grid size-14 place-items-center rounded-full bg-black ring-[1.5px] ring-brand-primary ring-offset-[3px] ring-offset-surface-app">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.src} alt="" className="size-8 object-contain" />
                  </span>
                  <span className="type-caption text-text-primary">{b.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* What next */}
          <SectionCard icon={<ListChecks weight="fill" />} title="What next" surface="glass">
            <WhatNextTimeline onStep={toChat} />
          </SectionCard>
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
