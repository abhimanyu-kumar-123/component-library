"use client";

import * as React from "react";
import {
  type Icon,
  Globe,
  Lightning,
  MetaLogo,
  PhoneCall,
  Warning,
} from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { SelectorPill } from "@/components/ui/selector-pill";
import {
  Card,
  CardBody,
  CardCaption,
  CardDescription,
  CardFooter,
  CardHeader,
  CardIcon,
  CardTitle,
  CardWarning,
} from "@/components/ui/card";

type Activity = {
  id: number;
  icon: Icon;
  time: string;
  title: string;
  meta: string;
  desc: string;
  action?: boolean;
};

const FILTERS = ["Action Needed", "Strategy", "Tasks", "Cals", "Others"];

const TODAY: Activity[] = [
  {
    id: 1,
    icon: Globe,
    time: "02:00 PM",
    title: "Catalogue updated",
    meta: "12 products • Requested by GC Anshika Singh",
    desc: "Approve updated COGS to improve campaign optimisation",
    action: true,
  },
  {
    id: 2,
    icon: MetaLogo,
    time: "02:00 PM",
    title: "Meta budget exhausted",
    meta: "12 products • Requested by GC Anshika Singh",
    desc: "Approve updated COGS to improve campaign optimisation",
    action: true,
  },
  {
    id: 3,
    icon: PhoneCall,
    time: "02:00 PM",
    title: "Call connected",
    meta: "12 products • Requested by GC Anshika Singh",
    desc: "Approve updated COGS to improve campaign optimisation",
    action: false,
  },
];

const YESTERDAY: Activity[] = [
  {
    id: 4,
    icon: Lightning,
    time: "02:00 PM",
    title: "Strategy updated",
    meta: "by Anshika Singh",
    desc: "Approve updated COGS to improve campaign optimisation",
    action: true,
  },
];

function ActivityCard({ item }: { item: Activity }) {
  const Glyph = item.icon;
  return (
    <Card variant="white">
      <CardIcon>
        <Glyph />
      </CardIcon>
      <CardBody>
        <CardHeader>
          <CardCaption>{item.time}</CardCaption>
          <CardTitle>{item.title}</CardTitle>
          <CardCaption>{item.meta}</CardCaption>
        </CardHeader>
        <CardDescription>{item.desc}</CardDescription>
        {item.action && (
          <CardFooter>
            <Button variant="primary" size="md">
              Review &amp; Approve
            </Button>
            <CardWarning>
              <Warning weight="fill" />
              GO LIVE RISK
            </CardWarning>
          </CardFooter>
        )}
      </CardBody>
    </Card>
  );
}

/** Activity feed shown on the chat screen's "Activity" tab. */
export function ActivityFeed() {
  const [filter, setFilter] = React.useState(FILTERS[0]);

  return (
    <>
      {/* Filter pills — fixed sub-header, horizontally scrollable */}
      <div className="shrink-0 bg-surface-app">
        <div className="flex gap-2 overflow-x-auto px-4 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTERS.map((f) => (
            <SelectorPill
              key={f}
              selected={f === filter}
              onClick={() => setFilter(f)}
              className="shrink-0"
            >
              {f}
            </SelectorPill>
          ))}
        </div>
      </div>

      {/* Feed */}
      <main className="flex flex-1 flex-col gap-3 overflow-y-auto bg-surface-app px-4 pb-6 pt-1">
        {TODAY.map((a) => (
          <ActivityCard key={a.id} item={a} />
        ))}

        <div className="flex justify-center py-1">
          <span className="rounded-full bg-white px-3 py-1 text-[10px] font-medium leading-[14px] text-text-secondary shadow-[0px_2px_8px_rgba(0,0,0,0.05)]">
            Yesterday
          </span>
        </div>

        {YESTERDAY.map((a) => (
          <ActivityCard key={a.id} item={a} />
        ))}
      </main>
    </>
  );
}
