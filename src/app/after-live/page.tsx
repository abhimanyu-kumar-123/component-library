"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { CaretRight, ListChecks, Megaphone } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";

const RadarLoader = dynamic(
  () => import("@/components/radar-loader").then((m) => m.RadarLoader),
  { ssr: false }
);
import { SectionCard } from "@/components/ui/section-card";
import { UserThumbnail } from "@/components/ui/user-thumbnail";
import { BottomNav } from "@/components/ui/bottom-nav";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { SelectField, TextField } from "@/components/ui/text-field";
import { SelectorPill } from "@/components/ui/selector-pill";

const AVATAR = "https://i.pravatar.cc/120?img=47";
const POC_AVATAR = "https://i.pravatar.cc/120?img=12";

/* Marketing-strategy card — product images + campaign targeting stats. */
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

/* Learn the basics — coloured marks on dark circles (Iconly bulk SVGs). */
const BASICS = [
  { label: "Campaign", src: "/icons/learn/campaign.svg" },
  { label: "Strategy", src: "/icons/learn/strategy.svg" },
  { label: "Metrics", src: "/icons/learn/metrics.svg" },
  { label: "Scale up", src: "/icons/learn/scale-up.svg" },
  { label: "Creatives", src: "/icons/learn/creatives.svg" },
];

/* What next — go-forward roadmap (same rail pattern as before-live's journey). */
const STEPS = [
  { step: "STEP 1", title: "Start with your first campaign" },
  { step: "STEP 2", title: "Find the right product market fit" },
  { step: "STEP 3", title: "Optimise your reach" },
  { step: "STEP 4", title: "scale up or reset" },
];

/* ── Review Strategy sheet ── */
const STEP_TITLES = [
  "Who buys from you?",
  "What you want to target",
  "Proposed creatives",
] as const;

const STEP_CTAS = ["Next", "Next", "Looks good to me"] as const;

const BUYER_OPTIONS = [
  { label: "Woman", value: "woman" },
  { label: "Man", value: "man" },
  { label: "Both", value: "both" },
];

const AGE_OPTIONS = Array.from({ length: 46 }, (_, i) => {
  const v = String(18 + i);
  return { label: v, value: v };
});

const CITY_OPTIONS = [
  { label: "Tier 1", value: "tier1" },
  { label: "Tier 2", value: "tier2" },
  { label: "Tier 3", value: "tier3" },
];

const PRODUCT_OPTIONS = [
  { label: "Bandhani Kurta", value: "bandhani-kurta" },
  { label: "Anarkali Suit", value: "anarkali-suit" },
  { label: "Lehenga Choli", value: "lehenga-choli" },
];

const INTERESTS_OPTIONS = [
  { label: "Ethnic wear, festivals, gifting, weddings", value: "ethnic-wear" },
  { label: "Casual wear, streetwear", value: "casual-wear" },
  { label: "Home décor, kitchenware", value: "home-decor" },
];

const PRICE_OPTIONS = [
  { label: "₹500 - ₹700", value: "500-700" },
  { label: "₹700 - ₹800", value: "700-800" },
  { label: "₹800 - ₹1000", value: "800-1000" },
];

const CREATIVES = [
  {
    title: "Lifestyle image - festival occasion",
    desc: "Woman wearing Kurta, warm background",
  },
  {
    title: "Product close-up + price callout",
    desc: "Clean shot, 7849 badge overlay",
  },
  {
    title: "Review / social proof",
    desc: "Screenshot of a customer review",
  },
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

export default function AfterLiveScreen() {
  const router = useRouter();
  const toChat = React.useCallback(() => router.push("/chat"), [router]);

  /* Review Strategy multi-step sheet */
  const [reviewOpen, setReviewOpen] = React.useState(false);
  const [reviewStep, setReviewStep] = React.useState<1 | 2 | 3>(1);
  /* Card swap state: 'strategy' → 'exiting' → 'congrats' */
  const [cardState, setCardState] = React.useState<"strategy" | "exiting" | "congrats">("strategy");

  // Step 1 — Who buys from you?
  const [buyer, setBuyer] = React.useState("woman");
  const [ageFrom, setAgeFrom] = React.useState("25");
  const [ageTo, setAgeTo] = React.useState("35");
  const [cities, setCities] = React.useState<string[]>(["tier2", "tier3"]);
  const [buyerNote, setBuyerNote] = React.useState("");

  // Step 2 — What you want to target
  const [heroProduct, setHeroProduct] = React.useState("bandhani-kurta");
  const [keyInterests, setKeyInterests] = React.useState("ethnic-wear");
  const [priceRange, setPriceRange] = React.useState("700-800");

  const toggleCity = (c: string) =>
    setCities((cur) => (cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c]));

  const handleReviewPrimary = () => {
    if (reviewStep < 3) {
      setReviewStep((s) => (s + 1) as 2 | 3);
    } else {
      // 1. Close sheet
      setReviewOpen(false);
      setReviewStep(1);
      // 2. After sheet exits, scroll to top so card is in view, then swap
      setTimeout(() => {
        document.querySelector("main")?.scrollTo({ top: 0 });
        setCardState("exiting"); // blue card plays card-swap-out (180ms)
        setTimeout(() => {
          setCardState("congrats"); // white card plays card-swap-in (280ms)
          // 3. Signal campaign-live to skip its screen-in (card already visible)
          if (typeof window !== "undefined") {
            sessionStorage.setItem("card-transition", "1");
          }
          setTimeout(() => router.push("/campaign-live"), 320);
        }, 180);
      }, 380);
    }
  };

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

          {/* Card slot — fixed height so neither card causes layout shift.
              Both cards are absolute inset-0; height is set to the white card's
              natural size (328px) so the surrounding content never moves. */}
          {/* Card slot — both cards absolute inset-0 inside a fixed-height
              container so the surrounding content never shifts. Height matches
              the blue card's natural compact size (264px). */}
          <div className="relative min-h-[490px]">

            {/* Blue marketing-strategy card — new Figma 6045:7705 design.
                Card uses no global px so the carousel can break out full-bleed. */}
            {cardState !== "congrats" && (
              <div className={cn(
                "absolute inset-0 flex flex-col rounded-2xl bg-gradient-strategy text-white",
                cardState === "exiting" && "motion-safe:animate-card-swap-out"
              )}>
                {/* Title + subtitle — px-3 pt-3 */}
                <div className="flex flex-col gap-2 px-3 pt-3">
                  <div className="flex items-center gap-1 [&_svg]:size-4">
                    <Megaphone weight="regular" />
                    <span className="type-h2 font-medium text-white">Marketing strategy</span>
                  </div>
                  <p className="type-body-2 text-white/70">
                    Based on previous input we have created your first marketing strategy.
                  </p>
                </div>

                {/* Products label — px-3 */}
                <div className="px-3 pb-2 pt-3">
                  <span className="text-[13px] font-medium leading-[18px] text-white">
                    Products for campaign
                  </span>
                </div>

                {/* Full-bleed horizontal carousel — -mx-4 breaks out to screen edges.
                    Fixed h-[170px] + overflow-y-hidden prevents vertical scroll leaking. */}
                <div className="-mx-4 h-[170px] touch-pan-x overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="flex h-full gap-3 px-4">
                    {CAMPAIGN_PRODUCTS.map((src, i) => (
                      <div
                        key={i}
                        className="relative h-[170px] w-[140px] shrink-0 overflow-hidden rounded-xl border border-white/30 bg-white shadow-md"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover object-top"
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white to-transparent" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Campaign will target + stats + button — px-3 pb-3 */}
                <div className="flex flex-col gap-2 px-3 pb-3 pt-3">
                  <span className="text-[13px] font-medium leading-[18px] text-white">
                    Campaign will target
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {CAMPAIGN_STATS.map((s) => (
                      <div key={s.label} className="flex flex-col rounded-lg bg-white/10 p-3">
                        <span className="type-caption text-white/60">{s.label}</span>
                        <span className="text-[13px] font-medium leading-[18px] text-white">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="on-dark"
                    size="md"
                    className="w-full"
                    onClick={() => { setReviewStep(1); setReviewOpen(true); }}
                  >
                    Review Strategy
                  </Button>
                </div>
              </div>
            )}

            {/* White congratulations card — Radar loader, same 264px height */}
            {cardState !== "strategy" && (
              <div className={cn(
                "absolute inset-0 flex flex-col items-center justify-between rounded-2xl bg-white p-5 text-center pointer-events-none",
                cardState === "congrats" && "motion-safe:animate-card-swap-in"
              )}>
                <span className="grid size-14 shrink-0 overflow-hidden rounded-full bg-surface-app">
                  <RadarLoader />
                </span>
                <h2 className="type-h1 text-text-primary">
                  Congratulations! Your 1st campaign is live
                </h2>
                <div className="w-full rounded-xl bg-accent-purple-light px-4 py-3">
                  <p className="type-body-1 text-accent-purple text-center">
                    We&apos;ll run it for a week, gather insights, and share what we learn.
                  </p>
                </div>
                <Button variant="primary" size="md" className="w-full" disabled>
                  Ok, Notify Me
                </Button>
              </div>
            )}
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

        {/* ── Review Strategy — 3-step sheet ───────────────────────────── */}
        <BottomSheet
          open={reviewOpen}
          onOpenChange={(open) => {
            if (!open) {
              setReviewOpen(false);
              setReviewStep(1);
            }
          }}
          onBack={
            reviewStep === 1
              ? () => { setReviewOpen(false); setReviewStep(1); }
              : () => setReviewStep((s) => (s - 1) as 1 | 2)
          }
          primaryLabel={STEP_CTAS[reviewStep - 1]}
          onPrimary={handleReviewPrimary}
        >
          {/* Step 1 — Who buys from you? */}
          {reviewStep === 1 && (
            <div className="flex flex-col gap-4">
              <h2 className="type-h1 text-text-primary">{STEP_TITLES[0]}</h2>
              <SelectField
                label="Primary buyer"
                options={BUYER_OPTIONS}
                value={buyer}
                onValueChange={setBuyer}
              />

              <div className="flex flex-col gap-1.5">
                <span className="type-body-2 text-text-secondary">Age range</span>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <SelectField
                      options={AGE_OPTIONS}
                      value={ageFrom}
                      onValueChange={setAgeFrom}
                    />
                  </div>
                  <div className="flex-1">
                    <SelectField
                      options={AGE_OPTIONS}
                      value={ageTo}
                      onValueChange={setAgeTo}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="type-body-2 text-text-secondary">Target city</span>
                <div className="flex gap-2">
                  {CITY_OPTIONS.map((c) => (
                    <SelectorPill
                      key={c.value}
                      selected={cities.includes(c.value)}
                      onClick={() => toggleCity(c.value)}
                    >
                      {c.label}
                    </SelectorPill>
                  ))}
                </div>
              </div>

              <TextField
                label="Anything unique about your buyers?"
                placeholder="e.g. repeat buyers, gifting season spikes."
                value={buyerNote}
                onChange={(e) => setBuyerNote(e.target.value)}
              />
            </div>
          )}

          {/* Step 2 — What you want to target */}
          {reviewStep === 2 && (
            <div className="flex flex-col gap-4">
              <h2 className="type-h1 text-text-primary">{STEP_TITLES[1]}</h2>
              <SelectField
                label="Hero product"
                options={PRODUCT_OPTIONS}
                value={heroProduct}
                onValueChange={setHeroProduct}
              />
              <SelectField
                label="Key interests & occasions"
                options={INTERESTS_OPTIONS}
                value={keyInterests}
                onValueChange={setKeyInterests}
              />
              <SelectField
                label="Price range"
                options={PRICE_OPTIONS}
                value={priceRange}
                onValueChange={setPriceRange}
              />
            </div>
          )}

          {/* Step 3 — Proposed creatives */}
          {reviewStep === 3 && (
            <div className="flex flex-col gap-3">
              <h2 className="type-h1 text-text-primary">{STEP_TITLES[2]}</h2>
              {CREATIVES.map((c) => (
                <div
                  key={c.title}
                  className="flex items-center gap-3 rounded-2xl bg-white p-3"
                >
                  <span className="size-12 shrink-0 rounded-xl bg-surface-muted" />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="type-h3 text-text-primary">{c.title}</span>
                    <span className="type-body-2 text-text-secondary">{c.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </BottomSheet>
      </div>
    </div>
  );
}
