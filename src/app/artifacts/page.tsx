"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CaretLeft, DownloadSimple, ShareNetwork } from "@phosphor-icons/react";

import { Header } from "@/components/ui/header";
import { RoundButton } from "@/components/ui/round-button";
import { SelectorPill } from "@/components/ui/selector-pill";
import { Button } from "@/components/ui/button";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import {
  ArtifactCard,
  ArtifactThumb,
  StorePageFull,
  type ArtifactStatus,
  type ArtifactType,
} from "@/components/ui/artifact-card";

type Artifact = {
  id: string;
  type: ArtifactType;
  name: string;
  time: string;
  status: ArtifactStatus;
  progress?: number;
};

const ARTIFACTS: Artifact[] = [
  { id: "brand", type: "website", name: "Brand Kit generation for festive", time: "10 min ago", status: "in-progress", progress: 60 },
  { id: "rto1", type: "report", name: "RTO report for last week", time: "10 min ago", status: "completed" },
  { id: "rto2", type: "report", name: "RTO report for last month", time: "1 hr ago", status: "completed" },
  { id: "site", type: "website", name: "Website creation", time: "10 min ago", status: "in-progress", progress: 45 },
  { id: "catalog", type: "catalog", name: "Festive catalog", time: "2 hr ago", status: "completed" },
  { id: "policy", type: "document", name: "Return policy doc", time: "yesterday", status: "in-progress", progress: 80 },
];

type Filter = "all" | "in-progress" | "completed";
const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "In-progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

export default function ArtifactsScreen() {
  const router = useRouter();
  const [filter, setFilter] = React.useState<Filter>("all");
  const [preview, setPreview] = React.useState<Artifact | null>(null);
  const toChat = React.useCallback(() => router.push("/chat"), [router]);

  const visible = ARTIFACTS.filter(
    (a) => filter === "all" || a.status === filter
  );

  return (
    <div className="bg-surface-app sm:flex sm:min-h-screen sm:items-center sm:justify-center sm:bg-neutral-200 sm:p-6">
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-surface-app motion-safe:animate-screen-in sm:h-[852px] sm:w-[393px] sm:rounded-[44px] sm:shadow-2xl">
        {/* Sticky header — standard app bar with centered title + white divider */}
        <div className="shrink-0 bg-surface-app pt-[env(safe-area-inset-top)]">
          <Header
            left={
              <RoundButton
                size="icon-md"
                aria-label="Back"
                onClick={() => router.push("/chat")}
              >
                <CaretLeft />
              </RoundButton>
            }
            center={<span className="type-h2 text-text-primary">Collections</span>}
          />
        </div>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-4 pb-6">
          {/* Quick filters */}
          <div className="flex items-center gap-2 py-3">
            {FILTERS.map((f) => (
              <SelectorPill
                key={f.value}
                selected={filter === f.value}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </SelectorPill>
            ))}
          </div>

          {/* Grid of uniform cards */}
          <div className="grid grid-cols-2 gap-3">
            {visible.map((a) => (
              <ArtifactCard key={a.id} {...a} onClick={() => setPreview(a)} />
            ))}
          </div>
        </main>

        {/* Artifact preview sheet */}
        <BottomSheet
          open={preview !== null}
          onOpenChange={(o) => !o && setPreview(null)}
          title={preview?.name}
          footer={
            <>
              <Button variant="secondary" size="icon-lg" aria-label="Share">
                <ShareNetwork />
              </Button>
              <Button variant="secondary" size="icon-lg" aria-label="Download">
                <DownloadSimple />
              </Button>
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={() => {
                  setPreview(null);
                  toChat();
                }}
              >
                Continue
              </Button>
            </>
          }
        >
          {preview && (
            /* large artifact preview — website/catalog fill a full page,
               reports/docs keep a framed aspect preview */
            <div className="overflow-hidden rounded-2xl border border-surface-muted bg-white">
              {preview.type === "website" || preview.type === "catalog" ? (
                <StorePageFull />
              ) : (
                <div className="aspect-[4/5] w-full">
                  <ArtifactThumb type={preview.type} size="lg" />
                </div>
              )}
            </div>
          )}
        </BottomSheet>
      </div>
    </div>
  );
}
