"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, X } from "@phosphor-icons/react";

type Story = {
  title: string;
  subtitle: string;
  desc: string;
  stat: string;
  statNote: string;
  from: string;
  to: string;
  glow: string;
};

const STORIES: Story[] = [
  {
    title: "Best order day this month",
    subtitle: "Monday hit 500 orders",
    desc: "Tighten targeting, refresh creatives, and scale spend in a controlled way to increase conversions, and gather enough data for stable optimisation.",
    stat: "+ 30%",
    statNote: "vs day average",
    from: "#bcc4d9",
    to: "#eff1f9",
    glow: "#c9d6f2",
  },
  {
    title: "Fastest delivery week",
    subtitle: "Avg 1.8 days to deliver",
    desc: "Logistics are running ahead of schedule — keep stock topped up so the momentum holds through the festive window.",
    stat: "+ 22%",
    statNote: "vs last week",
    from: "#bcd9cb",
    to: "#eef9f1",
    glow: "#cdeede",
  },
  {
    title: "Highest revenue day",
    subtitle: "Sunday crossed ₹4.2L",
    desc: "Top SKUs drove the spike. Reinvest the winnings into your best campaigns to compound the gains next week.",
    stat: "+ 41%",
    statNote: "vs day average",
    from: "#d9c4d6",
    to: "#f9eef6",
    glow: "#eecde6",
  },
];

const DURATION = 5000;

export default function StoriesScreen() {
  const router = useRouter();
  const [index, setIndex] = React.useState(0);

  const close = React.useCallback(() => router.push("/home"), [router]);

  // Auto-advance; close after the last story.
  React.useEffect(() => {
    const t = window.setTimeout(() => {
      if (index < STORIES.length - 1) setIndex(index + 1);
      else close();
    }, DURATION);
    return () => window.clearTimeout(t);
  }, [index, close]);

  function next() {
    if (index < STORIES.length - 1) setIndex(index + 1);
    else close();
  }
  function prev() {
    setIndex((i) => Math.max(0, i - 1));
  }

  const story = STORIES[index];

  return (
    <div className="bg-neutral-200 sm:flex sm:min-h-screen sm:items-center sm:justify-center sm:p-6">
      <div
        className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-gradient-to-b motion-safe:animate-screen-in sm:h-[852px] sm:w-[393px] sm:rounded-[44px]"
        style={{ backgroundImage: `linear-gradient(to bottom, ${story.from}, ${story.to})` }}
      >
        {/* Decorative glow */}
        <div
          className="pointer-events-none absolute -left-32 top-4 size-[460px] rounded-full opacity-60 blur-2xl"
          style={{ background: `radial-gradient(circle, ${story.glow} 0%, transparent 70%)` }}
        />

        {/* Tap zones (left = prev, right = next) */}
        <button
          type="button"
          aria-label="Previous"
          onClick={prev}
          className="absolute inset-y-0 left-0 z-10 w-1/3 outline-none"
        />
        <button
          type="button"
          aria-label="Next"
          onClick={next}
          className="absolute inset-y-0 right-0 z-10 w-2/3 outline-none"
        />

        {/* Top bar: progress segments + close */}
        <div className="relative z-20 shrink-0 px-3 pt-[calc(env(safe-area-inset-top)+8px)]">
          <div className="flex gap-1">
            {STORIES.map((_, i) => (
              <span
                key={i}
                className="h-1 flex-1 overflow-hidden rounded-full bg-black/10"
              >
                <span
                  key={`${i}-${index}`}
                  className="block h-full rounded-full bg-text-primary/80"
                  style={
                    i < index
                      ? { width: "100%" }
                      : i === index
                        ? { animation: "var(--animate-story-fill)" }
                        : { width: "0%" }
                  }
                />
              </span>
            ))}
          </div>

          <div className="flex justify-end py-2">
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="grid size-9 place-items-center rounded-full border border-white bg-white/50 text-text-primary shadow-[0px_4px_20px_rgba(0,0,0,0.1)] outline-none active:scale-95 [&_svg]:size-4"
            >
              <X weight="bold" />
            </button>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative z-0 flex flex-1 items-center justify-center px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/story-image.png"
            alt=""
            className="size-[320px] max-w-none object-contain"
          />
        </div>

        {/* Text + stat */}
        <div className="relative z-0 flex shrink-0 flex-col gap-6 px-8 pb-[calc(env(safe-area-inset-bottom)+32px)]">
          <div className="flex flex-col gap-3">
            <h1 className="text-[40px] font-semibold leading-[40px] text-text-primary">
              {story.title}
            </h1>
            <p className="text-[20px] font-medium leading-6 text-brand-primary">
              {story.subtitle}
            </p>
            <p className="type-body-1 text-text-secondary">
              {story.desc}
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full bg-white/50 py-2 pl-2 pr-9">
            <span className="grid size-8 place-items-center rounded-3xl bg-white text-text-primary [&_svg]:size-4">
              <ArrowUpRight weight="bold" />
            </span>
            <p className="text-[16px] leading-5 text-text-primary">
              <span className="font-semibold">{story.stat} </span>
              <span className="font-normal">{story.statNote}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
