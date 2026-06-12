"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Bank,
  CaretRight,
  ChatTeardropText,
  CheckCircle,
  Globe,
  IdentificationCard,
  PhoneCall,
  Path,
  RocketLaunch,
  Storefront,
  Target,
  UploadSimple,
} from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Header } from "@/components/ui/header";
import { UserThumbnail } from "@/components/ui/user-thumbnail";
import { BottomNav } from "@/components/ui/bottom-nav";
import { ActionDeck, type ActionCard } from "@/components/ui/action-deck";
import { SectionTitle } from "@/components/ui/section-title";
import {
  Card,
  CardBody,
  CardCaption,
  CardDescription,
  CardIcon,
  CardTitle,
} from "@/components/ui/card";

const AVATAR = "https://i.pravatar.cc/120?img=47";

/* Pending onboarding actions — blocking the website go-live. */
const ACTION_CARDS: ActionCard[] = [
  {
    icon: <UploadSimple weight="bold" />,
    title: "Upload Document",
    desc: "Submit your GST & business proof so we can verify your store and take your website live.",
    time: "3 Days ago",
  },
  {
    icon: <Bank weight="bold" />,
    title: "Add bank account",
    desc: "Link a bank account to receive payouts. Orders can’t be settled until this is done.",
    time: "2 Days ago",
  },
  {
    icon: <IdentificationCard weight="bold" />,
    title: "Verify your identity",
    desc: "Complete KYC with your PAN so Shopdeck can finish onboarding and unlock go-live.",
    time: "Today",
  },
];

/* ── Section header — thin wrapper over the library SectionTitle ────── */
function SectionHeader({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return <SectionTitle icon={icon} title={children} />;
}

/* ── Journey timeline ───────────────────────────────────────────────── */
type Step = {
  icon: React.ReactNode;
  label: string;
  note: string;
  status: "done" | "current" | "todo";
};

const JOURNEY: Step[] = [
  {
    icon: <CheckCircle weight="fill" />,
    label: "Onboarding",
    note: "Completed",
    status: "done",
  },
  {
    icon: <Globe weight="bold" />,
    label: "Website Setup",
    note: "In review · documents pending",
    status: "current",
  },
  {
    icon: <Storefront weight="bold" />,
    label: "Catalog",
    note: "Add & price your products",
    status: "todo",
  },
  {
    icon: <RocketLaunch weight="bold" />,
    label: "Go Live",
    note: "Your website goes live",
    status: "todo",
  },
];

function JourneyTimeline({ onStep }: { onStep: () => void }) {
  return (
    <div className="rounded-[24px] bg-white p-4">
      {JOURNEY.map((s, i) => {
        const isLast = i === JOURNEY.length - 1;
        return (
          <button
            key={s.label}
            type="button"
            onClick={onStep}
            className="relative flex w-full items-center gap-3 pb-5 text-left outline-none last:pb-0 active:opacity-80"
          >
            {/* connector to the next node */}
            {!isLast && (
              <span
                className={cn(
                  "absolute left-[16px] top-8 bottom-0 w-0.5 -translate-x-1/2 rounded-full",
                  s.status === "done" ? "bg-brand-primary" : "bg-[#dfe3ec]"
                )}
              />
            )}

            {/* node */}
            <span
              className={cn(
                "relative z-10 grid size-8 shrink-0 place-items-center rounded-full [&_svg]:size-4",
                s.status === "done" && "bg-brand-primary text-white",
                s.status === "current" &&
                  "bg-white text-brand-primary ring-2 ring-brand-primary",
                s.status === "todo" &&
                  "border border-[#dfe3ec] bg-white text-text-secondary"
              )}
            >
              {s.icon}
            </span>

            {/* label + note */}
            <span className="flex flex-1 flex-col">
              <span
                className={cn(
                  "text-[14px] leading-5",
                  s.status === "todo"
                    ? "font-medium text-text-secondary"
                    : "font-semibold text-text-primary"
                )}
              >
                {s.label}
              </span>
              <span
                className={cn(
                  "type-body-2",
                  s.status === "current"
                    ? "text-brand-primary"
                    : "text-text-secondary"
                )}
              >
                {s.note}
              </span>
            </span>

            <CaretRight
              weight="bold"
              className="size-4 shrink-0 text-text-secondary"
            />
          </button>
        );
      })}
    </div>
  );
}

/* ── Screen ─────────────────────────────────────────────────────────── */
export default function OnboardingScreen() {
  const router = useRouter();
  // Every L2 action on this screen continues the conversation in chat.
  const toChat = React.useCallback(() => router.push("/chat"), [router]);

  return (
    <div className="bg-surface-app sm:flex sm:min-h-screen sm:items-center sm:justify-center sm:bg-neutral-200 sm:p-6">
      {/* Full-bleed on phones (100dvh + safe areas); framed on larger screens. */}
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-surface-app motion-safe:animate-screen-in sm:h-[852px] sm:w-[393px] sm:rounded-[44px] sm:shadow-2xl">
        {/* Header */}
        <div className="shrink-0 bg-surface-app pt-[env(safe-area-inset-top)]">
          <Header
            left={
              <div className="flex items-center gap-2">
                <UserThumbnail src={AVATAR} />
                <div className="flex flex-col">
                  <span className="type-h2 text-text-primary">
                    Hi Rohit,
                  </span>
                  <span className="text-[12px] leading-[14px] text-text-secondary">
                    Let&apos;s get you live
                  </span>
                </div>
              </div>
            }
          />
        </div>

        {/* Scrollable content */}
        <main className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
          {/* Recap: the onboarding call */}
          <section className="space-y-4">
            <SectionHeader icon={<ChatTeardropText weight="fill" />}>
              Recent activity
            </SectionHeader>
            <button
              type="button"
              onClick={toChat}
              className="block w-full text-left outline-none active:scale-[0.99]"
            >
              <Card variant="white">
                <CardIcon>
                  <PhoneCall weight="bold" />
                </CardIcon>
                <CardBody>
                  <CardCaption>Onboarding call · Today</CardCaption>
                  <CardTitle>Call done with Shopdeck POC</CardTitle>
                  <CardDescription>
                    We reviewed your store setup. Next step: upload your documents.
                  </CardDescription>
                </CardBody>
                <CaretRight
                  weight="bold"
                  className="mt-0.5 size-4 shrink-0 text-text-secondary"
                />
              </Card>
            </button>
          </section>

          {/* Pending actions — same rotating stack deck as the home screen */}
          <section className="space-y-4">
            <SectionHeader icon={<Target weight="fill" />}>
              Action needed
            </SectionHeader>
            <ActionDeck
              cards={ACTION_CARDS}
              viewLabel="View Pending List"
              onContinue={toChat}
              onView={toChat}
            />
          </section>

          {/* Pending journey before the website goes live */}
          <section className="space-y-4">
            <SectionHeader icon={<Path weight="bold" />}>
              Your journey to go live
            </SectionHeader>
            <JourneyTimeline onStep={toChat} />
          </section>
        </main>

        {/* Bottom nav */}
        <div className="shrink-0 bg-surface-app pb-[env(safe-area-inset-bottom)]">
          <BottomNav
            onHome={() => router.push("/home")}
            onSearchClick={toChat}
            onAction={toChat}
          />
        </div>
      </div>
    </div>
  );
}
