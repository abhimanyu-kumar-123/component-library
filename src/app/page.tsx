"use client";

import * as React from "react";
import {
  type Icon,
  ArrowUpRight,
  Bell,
  CaretLeft,
  CaretRight,
  ChartBar,
  ChatTeardropText,
  Check,
  Clock,
  Gear,
  ListChecks,
  Globe,
  Heart,
  House,
  MagnifyingGlass,
  NotePencil,
  PaperPlaneTilt,
  Plus,
  Sparkle,
  Star,
  Target,
  ThumbsUp,
  Trash,
  User,
  Warning,
  X,
} from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RoundButton } from "@/components/ui/round-button";
import { Dropdown } from "@/components/ui/dropdown";
import { SelectorPill } from "@/components/ui/selector-pill";
import { Pill } from "@/components/ui/pill";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";
import { RadioGroup } from "@/components/ui/radio-group";
import { DataCard } from "@/components/ui/data-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Stepper } from "@/components/ui/stepper";
import { InfoNote } from "@/components/ui/info-note";
import { CallbackBar } from "@/components/ui/callback-bar";
import { SectionCard } from "@/components/ui/section-card";
import { SectionTitle } from "@/components/ui/section-title";
import { TextField, SelectField } from "@/components/ui/text-field";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { ArtifactCard } from "@/components/ui/artifact-card";
import { ActionDeck } from "@/components/ui/action-deck";
import { ReportChip } from "@/components/ui/report-chip";
import { UserThumbnail } from "@/components/ui/user-thumbnail";
import { BottomNav } from "@/components/ui/bottom-nav";
import { ChatBar } from "@/components/ui/chat-bar";
import { ListContent } from "@/components/ui/list-content";
import { ListCard, ListCardButton } from "@/components/ui/list-card";
import { CollapsibleCard } from "@/components/ui/collapsible-card";
import { StrategyCard } from "@/components/ui/strategy-card";
import { GoogleLogo, MetaLogo } from "@/components/brand-logos";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { Header } from "@/components/ui/header";
import { BlueCardBackground } from "@/components/ui/blue-card-background";
import {
  Card,
  CardActions,
  CardBadge,
  CardBody,
  CardButton,
  CardCaption,
  CardDescription,
  CardFooter,
  CardHeader,
  CardIcon,
  CardMeta,
  CardTitle,
  CardWarning,
} from "@/components/ui/card";
import { AiBadge } from "@/components/icons";
import { cn } from "@/lib/utils";
import {
  COMPONENTS,
  PATTERNS,
  LAYOUT_RULES,
  GLOBAL_LAYOUT_RULES,
  TOKENS,
  PIPELINE,
} from "@/lib/design-os";

const AVATAR = "https://i.pravatar.cc/120?img=47";

// A sample of the Phosphor set — the icons used across this design system,
// plus common ones. Full library: https://phosphoricons.com
const ICONS: { Icon: Icon; name: string }[] = [
  { Icon: MagnifyingGlass, name: "MagnifyingGlass" },
  { Icon: CaretLeft, name: "CaretLeft" },
  { Icon: CaretRight, name: "CaretRight" },
  { Icon: House, name: "House" },
  { Icon: Globe, name: "Globe" },
  { Icon: ChartBar, name: "ChartBar" },
  { Icon: ChatTeardropText, name: "ChatTeardropText" },
  { Icon: Target, name: "Target" },
  { Icon: ArrowUpRight, name: "ArrowUpRight" },
  { Icon: Warning, name: "Warning" },
  { Icon: ThumbsUp, name: "ThumbsUp" },
  { Icon: Bell, name: "Bell" },
  { Icon: Gear, name: "Gear" },
  { Icon: User, name: "User" },
  { Icon: Plus, name: "Plus" },
  { Icon: Check, name: "Check" },
  { Icon: X, name: "X" },
  { Icon: Heart, name: "Heart" },
  { Icon: Star, name: "Star" },
  { Icon: NotePencil, name: "NotePencil" },
  { Icon: PaperPlaneTilt, name: "PaperPlaneTilt" },
  { Icon: Sparkle, name: "Sparkle" },
  { Icon: Trash, name: "Trash" },
];

function SectionCardDemo() {
  const JOURNEY = [
    { label: "Documents", done: true },
    { label: "Catalog", done: true },
    { label: "Launch", done: false },
  ];
  return (
    <div className="flex w-full max-w-[340px] flex-col gap-4">
      {/* white-body variant — Recent conversation */}
      <SectionCard icon={<ChatTeardropText weight="fill" />} title="Recent conversation">
        <div className="flex flex-col gap-2.5">
          <Pill tone="neutral" background={false} icon={<Clock />}>
            Jan 11, 11:50AM
          </Pill>
          <p className="type-body-1 text-text-primary">
            Porem ipsum dolor sit amet, consectetur elit. Nunc vulputate libero.
          </p>
          <InfoNote>This was discussed in the last conversation</InfoNote>
        </div>
      </SectionCard>

      {/* glass-body variant — Your journey */}
      <SectionCard icon={<ListChecks weight="fill" />} title="Your journey" surface="glass">
        <div className="flex flex-col gap-2">
          {JOURNEY.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between gap-2 rounded-xl bg-white p-3"
            >
              <span className="flex flex-col gap-1">
                <span className="type-caption text-text-secondary">Jun 15</span>
                <span className="flex items-center gap-2">
                  <span className="type-h2 text-text-primary">{s.label}</span>
                  <Pill tone={s.done ? "success" : "neutral"} background>
                    {s.done ? "Completed" : "Ongoing"}
                  </Pill>
                </span>
              </span>
              <CaretRight weight="bold" className="size-3 text-text-secondary" />
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function CallbackBarDemo() {
  return (
    <div className="w-full max-w-[360px] pt-6">
      {/* Floats above the nav (rounded top, upward shadow). Shown over a faux nav. */}
      <CallbackBar
        src="https://i.pravatar.cc/120?img=12"
        title="Call Anirudh"
        description="for any kind of assistance during onboarding"
      />
      <div className="h-14 w-full border-t border-white bg-surface-app" />
    </div>
  );
}

function InfoNoteDemo() {
  return (
    <div className="w-full max-w-[340px]">
      <InfoNote>This was discussed in the last conversation</InfoNote>
    </div>
  );
}

function StepperDemo() {
  return (
    <div className="w-full max-w-[320px] rounded-2xl border border-white bg-white/50 p-3">
      <Stepper
        steps={[
          { label: "12 Jun", status: "done" },
          { label: "15 Jun", status: "current" },
          { label: "30 Jun", status: "goal" },
        ]}
      />
    </div>
  );
}

function ProgressBarDemo() {
  return (
    <div className="flex w-full max-w-[280px] flex-col gap-4">
      <ProgressBar tone="green" value={53} />
      <ProgressBar tone="orange" value={53} />
      <ProgressBar tone="red" value={86} />
      <ProgressBar tone="blue" value={53} />
    </div>
  );
}

function DataCardDemo() {
  return (
    <div className="flex w-full max-w-[360px] flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <DataCard
          type="single"
          metrics={[
            { label: "Orders placed", value: "500", cap: "/ ₹5.0 L", progress: { pct: 53 } },
          ]}
        />
        <DataCard
          type="single"
          metrics={[
            { label: "Orders placed", value: "500", delta: { value: "15%" } },
          ]}
        />
      </div>
      <DataCard
        type="double"
        metrics={[
          { label: "Normal spends", value: "₹2.4L", cap: "/ ₹5.0 L", progress: { pct: 48 } },
          { label: "CPP/ROAS spends", value: "₹6.4L", cap: "/ ₹5.0 L", progress: { pct: 100, tone: "red" } },
        ]}
      />
      <DataCard
        type="double"
        metrics={[
          { label: "Normal spends", value: "₹2.4L", delta: { value: "15%" } },
          { label: "CPP/ROAS spends", value: "₹6.4L", delta: { value: "15%" } },
        ]}
      />
      <DataCard
        type="triple"
        metrics={[
          { label: "Label", value: "₹2.4L" },
          { label: "Label", value: "₹2.4L" },
          { label: "Label", value: "₹2.4L" },
        ]}
      />
      <DataCard
        type="ratings"
        rating={3.2}
        ratingLabel="Customer ratings"
        ratingNote="Last 15 days"
      />
    </div>
  );
}

function CheckboxDemo() {
  const [items, setItems] = React.useState({ gst: true, terms: false });
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-6">
        <Checkbox defaultChecked={false} aria-label="Unchecked" />
        <Checkbox defaultChecked aria-label="Checked" />
        <Checkbox defaultChecked disabled aria-label="Disabled checked" />
      </div>
      <Checkbox
        checked={items.gst}
        onCheckedChange={(v) => setItems((s) => ({ ...s, gst: v }))}
        label="I have a GST number"
      />
      <Checkbox
        checked={items.terms}
        onCheckedChange={(v) => setItems((s) => ({ ...s, terms: v }))}
        label="Agree to terms & conditions"
      />
    </div>
  );
}

function RadioDemo() {
  const [value, setValue] = React.useState("sole");
  return (
    <RadioGroup
      value={value}
      onValueChange={setValue}
      options={[
        { label: "Sole proprietor", value: "sole" },
        { label: "Private limited", value: "pvt" },
        { label: "Partnership", value: "partner" },
        { label: "Not registered yet", value: "none", disabled: true },
      ]}
    />
  );
}

function ToggleDemo() {
  const [cod, setCod] = React.useState(true);
  const [notify, setNotify] = React.useState(false);
  return (
    <div className="flex w-full max-w-[320px] flex-col gap-4">
      <Toggle checked={cod} onCheckedChange={setCod} label="Accept Cash on Delivery" />
      <Toggle checked={notify} onCheckedChange={setNotify} label="Order notifications" />
      <Toggle defaultChecked disabled label="Store live (locked)" />
    </div>
  );
}

function SelectorPillDemo() {
  const filters = ["Action Needed", "Resolved", "Snoozed", "All"];
  const [active, setActive] = React.useState("Action Needed");
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {filters.map((f) => (
        <SelectorPill
          key={f}
          selected={f === active}
          onClick={() => setActive(f)}
        >
          {f}
        </SelectorPill>
      ))}
    </div>
  );
}

/* ── AI Design Operating System — renders the design-os manifest ─────── */
const PRIORITY_STYLE = {
  high: "text-brand-primary",
  medium: "text-text-primary",
  low: "text-text-secondary",
} as const;

function Layer({
  n,
  title,
  subtitle,
  children,
}: {
  n: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gradient-primary text-[11px] font-semibold text-white">
          {n}
        </span>
        <h3 className="type-h2 text-text-primary">{title}</h3>
      </div>
      <p className="-mt-1 type-body-2 text-text-secondary">{subtitle}</p>
      {children}
    </section>
  );
}

function DesignOSDemo() {
  return (
    <div className="flex w-full max-w-[760px] flex-col gap-9">
      {/* Pipeline */}
      <div className="flex flex-col gap-2 rounded-3xl bg-gradient-grey-light p-5">
        <span className="type-caption text-text-secondary">Reasoning pipeline</span>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {PIPELINE.map((step, i) => (
            <React.Fragment key={step}>
              <span
                className={cn(
                  "type-h3",
                  i === 0 || i === PIPELINE.length - 1
                    ? "text-brand-primary"
                    : "text-text-primary"
                )}
              >
                {step}
              </span>
              {i < PIPELINE.length - 1 && (
                <CaretRight weight="bold" className="size-3 text-text-secondary" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 1. Component Intelligence */}
      <Layer
        n={1}
        title="Component Intelligence"
        subtitle="When to use / avoid each component, its priority and emotional tone."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {COMPONENTS.map((c) => (
            <div
              key={c.slug}
              className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-card"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="type-h3 text-text-primary">{c.name}</span>
                <span className={cn("type-caption", PRIORITY_STYLE[c.priority])}>
                  {c.priority}
                </span>
              </div>
              <p className="type-body-2 text-text-secondary">{c.purpose}</p>
              <div className="flex flex-col gap-1 pt-1">
                <p className="type-body-2 text-success">
                  ✓ {c.useWhen.join(" · ")}
                </p>
                <p className="type-body-2 text-danger">
                  ✕ {c.avoidWhen.join(" · ")}
                </p>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {c.emotionalTone.map((t) => (
                  <Pill key={t} tone="neutral">
                    {t}
                  </Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Layer>

      {/* 2. Pattern Library */}
      <Layer
        n={2}
        title="Pattern Library"
        subtitle="Proven compositions — which components, in which layout."
      >
        <div className="flex flex-col gap-2">
          {PATTERNS.map((p) => (
            <div key={p.name} className="rounded-2xl bg-white p-4 shadow-card">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="type-h3 text-text-primary">{p.name}</span>
                <span className="type-caption text-brand-primary">{p.layout}</span>
              </div>
              <p className="pt-0.5 type-body-2 text-text-secondary">{p.intent}</p>
              <p className="pt-1.5 type-body-2 text-text-primary">
                {p.components.join("  →  ")}
              </p>
            </div>
          ))}
        </div>
      </Layer>

      {/* 3. Layout Rules Engine */}
      <Layer
        n={3}
        title="Layout Rules Engine"
        subtitle="Explicit layout intelligence — the biggest fix for inconsistent AI UI."
      >
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <span className="type-caption text-text-secondary">Global rules (every screen)</span>
          <ul className="mt-2 flex flex-col gap-1">
            {GLOBAL_LAYOUT_RULES.map((r) => (
              <li key={r} className="type-body-2 text-text-primary">• {r}</li>
            ))}
          </ul>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {LAYOUT_RULES.map((l) => (
            <div key={l.type} className="rounded-2xl bg-white p-4 shadow-card">
              <span className="type-h3 text-brand-primary">{l.type}</span>
              <p className="pt-0.5 type-body-2 text-text-secondary">{l.description}</p>
              <ul className="mt-2 flex flex-col gap-1">
                {l.rules.map((r) => (
                  <li key={r} className="type-body-2 text-text-primary">• {r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Layer>

      {/* 4. Token System */}
      <Layer
        n={4}
        title="Token System"
        subtitle="The only allowed values. AI never invents spacing, radius, shadow or colour."
      >
        <div className="grid gap-2 sm:grid-cols-2">
          {Object.entries(TOKENS).map(([group, def]) => (
            <div key={group} className="rounded-2xl bg-white p-4 shadow-card">
              <span className="type-h3 capitalize text-text-primary">{group}</span>
              <p className="pt-0.5 type-body-2 text-text-secondary">{def.rule}</p>
              <div className="mt-2 flex flex-col gap-1">
                {Object.entries(
                  ("scale" in def
                    ? def.scale
                    : "tokens" in def
                      ? Object.fromEntries(
                          (def.tokens as readonly string[]).map((t) => [t, ""])
                        )
                      : {}) as Record<string, string>
                ).map(([k, v]) => (
                  <div key={k} className="flex gap-2 type-body-2">
                    <code className="shrink-0 text-brand-primary">{k}</code>
                    {v && <span className="text-text-secondary">{v}</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Layer>
    </div>
  );
}

/* ── Design-token reference (Figma node 4547:4844) ──────────────────── */
const TYPE_SCALE = [
  { cls: "type-h1", label: "Header 1", spec: "Geist SemiBold · 20 / 24" },
  { cls: "type-h2", label: "Header 2", spec: "Geist SemiBold · 16 / 20" },
  { cls: "type-h3", label: "Header 3", spec: "Geist Medium · 13 / 18" },
  { cls: "type-body-1", label: "Body 1", spec: "Geist Regular · 13 / 18" },
  { cls: "type-body-2", label: "Body 2", spec: "Geist Regular · 12 / 16" },
  { cls: "type-caption", label: "Captions", spec: "Geist Medium · 10 / 14 · UPPER" },
];

const SWATCHES = [
  { cls: "bg-brand-primary", name: "primary", hex: "#4764cd" },
  { cls: "bg-surface-app", name: "primary-light", hex: "#eff2fa" },
  { cls: "bg-success", name: "green", hex: "#22a12a" },
  { cls: "bg-success-light", name: "green-light", hex: "#e3f3e2" },
  { cls: "bg-danger", name: "red", hex: "#f44336" },
  { cls: "bg-danger-light", name: "red-light", hex: "#ffe6e6" },
  { cls: "bg-warning-default", name: "orange", hex: "#e08a2d" },
  { cls: "bg-warning-light", name: "orange-light", hex: "#fef3c6" },
  { cls: "bg-text-primary", name: "text-primary", hex: "#1d2025" },
  { cls: "bg-text-secondary", name: "text-secondary", hex: "#7e8592" },
  { cls: "bg-surface-muted", name: "grey-light-bg", hex: "#f2f2f5" },
  { cls: "bg-border-divider", name: "divider", hex: "#e5e5ea" },
];

const GRADIENTS = [
  { cls: "bg-gradient-primary", name: "primary", hex: "#4066f1 → #5b7df4" },
  { cls: "bg-gradient-grey-dark", name: "grey-dark", hex: "#1d2025 → #3c3f45" },
  { cls: "bg-gradient-grey-light", name: "grey-light", hex: "#e8ebf9 → #f8f9ff" },
  { cls: "bg-gradient-ice", name: "ice", hex: "#f6fcff → #d9f4ff" },
];

function FoundationsDemo() {
  return (
    <div className="flex w-full flex-col gap-8 text-left">
      {/* Typography */}
      <div className="flex flex-col gap-3">
        <p className="type-caption text-text-secondary">Typography · Geist</p>
        <div className="flex flex-col gap-2">
          {TYPE_SCALE.map((t) => (
            <div key={t.cls} className="flex items-baseline justify-between gap-4">
              <span className={cn(t.cls, "text-text-primary")}>{t.label}</span>
              <span className="type-body-2 shrink-0 text-text-secondary">
                {t.spec}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Colours */}
      <div className="flex flex-col gap-3">
        <p className="type-caption text-text-secondary">Colours</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {SWATCHES.map((s) => (
            <div key={s.name} className="flex items-center gap-2">
              <span
                className={cn(
                  "size-9 shrink-0 rounded-lg border border-border-divider",
                  s.cls
                )}
              />
              <span className="flex min-w-0 flex-col">
                <span className="type-body-2 truncate text-text-primary">
                  {s.name}
                </span>
                <span className="text-[10px] leading-[14px] text-text-secondary">
                  {s.hex}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Gradients */}
      <div className="flex flex-col gap-3">
        <p className="type-caption text-text-secondary">Gradients</p>
        <div className="grid grid-cols-2 gap-3">
          {GRADIENTS.map((g) => (
            <div key={g.name} className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "h-12 w-full rounded-xl border border-border-divider",
                  g.cls
                )}
              />
              <span className="type-body-2 text-text-primary">{g.name}</span>
              <span className="text-[10px] leading-[14px] text-text-secondary">
                {g.hex}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const PILL_TONES = ["neutral", "success", "danger", "warning"] as const;

function PillDemo() {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="type-caption text-text-secondary">Light surface</p>
        <div className="flex flex-wrap items-center gap-2">
          {PILL_TONES.map((t) => (
            <Pill key={t} tone={t} icon>
              {t}
            </Pill>
          ))}
          {PILL_TONES.map((t) => (
            <Pill key={`${t}-nb`} tone={t} background={false}>
              {t}
            </Pill>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-2xl bg-[linear-gradient(103deg,#1d4ed8_0%,#5e8ef6_100%)] p-3">
        <p className="type-caption text-white/70">Dark surface</p>
        <div className="flex flex-wrap items-center gap-2">
          {PILL_TONES.map((t) => (
            <Pill key={t} surface="dark" tone={t} icon>
              {t}
            </Pill>
          ))}
          {PILL_TONES.map((t) => (
            <Pill key={`${t}-nb`} surface="dark" tone={t} icon background={false}>
              {t}
            </Pill>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActionDeckDemo() {
  return (
    <div className="w-full max-w-[360px]">
      <ActionDeck
        cards={[
          {
            icon: <Globe weight="bold" />,
            title: "Domain setup needed",
            desc: "Confirm devikatextile.in at ₹412 to take your store live.",
            time: "3 days ago",
          },
          {
            icon: <ChartBar weight="bold" />,
            title: "Ad budget nearly exhausted",
            desc: "Meta spend is at 92% of today's cap — approve a top-up.",
            time: "Today",
          },
          {
            icon: <Warning weight="bold" />,
            title: "Pickups delayed in 2 zones",
            desc: "Confirm the backup courier to keep dispatch on track.",
            time: "1 day ago",
          },
        ]}
        viewLabel="View Pending List"
      />
    </div>
  );
}

function ArtifactCardDemo() {
  return (
    <div className="grid w-full max-w-[360px] grid-cols-2 gap-3">
      <ArtifactCard
        type="website"
        name="Brand Kit for festive"
        time="10 min ago"
        status="ongoing"
      />
      <ArtifactCard
        type="website"
        name="Website creation"
        time="10 min ago"
        status="action-needed"
      />
      <ArtifactCard
        type="report"
        name="RTO report for last week"
        time="1 hr ago"
        status="completed"
      />
      <ArtifactCard
        type="document"
        name="Return policy doc"
        time="yesterday"
        status="completed"
      />
    </div>
  );
}

function ReportChipDemo() {
  return (
    <div className="flex w-full max-w-[300px] flex-col items-start gap-2 rounded-2xl rounded-tl-[2px] bg-[linear-gradient(103deg,#e8ebf9_0%,#f8f9ff_100%)] p-3">
      <ReportChip name="report.xls" onClick={() => {}} />
      <span className="self-end text-[10px] leading-[14px] text-text-secondary">
        8:00AM
      </span>
    </div>
  );
}

function BottomSheetDemo() {
  const [mode, setMode] = React.useState<null | "back" | "plain">(null);
  const close = () => setMode(null);
  const sectionOpts = [
    { label: "Hero banner", value: "hero" },
    { label: "Product grid", value: "grid" },
    { label: "Footer", value: "footer" },
  ];
  return (
    <div className="relative h-[500px] w-full max-w-[360px] overflow-hidden rounded-[28px] border border-neutral-200 bg-surface-app">
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <Button variant="primary" size="lg" onClick={() => setMode("back")}>
          With back button
        </Button>
        <Button variant="secondary" size="lg" onClick={() => setMode("plain")}>
          Without back button
        </Button>
      </div>

      <BottomSheet
        open={mode !== null}
        onOpenChange={(o) => !o && close()}
        titleIcon={<Globe weight="fill" />}
        title="Reference website"
        description="What do you want to pick from your reference website"
        onBack={mode === "back" ? close : undefined}
        secondaryLabel="Cancel"
        primaryLabel="Continue"
        onPrimary={close}
        onSecondary={close}
      >
        {/* enough fields to overflow → body scrolls, header + footer stick */}
        <SelectField label="Section" placeholder="Select" options={sectionOpts} />
        <SelectField label="Style" placeholder="Select" options={sectionOpts} />
        <TextField label="Page URL" placeholder="https://…" />
        <SelectField label="Layout" placeholder="Select" options={sectionOpts} />
        <TextField label="Notes" placeholder="Type here" />
        <SelectField label="Priority" placeholder="Select" options={sectionOpts} />
      </BottomSheet>
    </div>
  );
}

function TextFieldDemo() {
  return (
    <div className="grid w-full max-w-[640px] grid-cols-1 gap-5 sm:grid-cols-2">
      <TextField label="Store name" placeholder="Type here" />
      <SelectField
        label="Business type"
        placeholder="Select"
        options={[
          { label: "Sole proprietor", value: "sole" },
          { label: "Private limited", value: "pvt" },
          { label: "Partnership", value: "partner" },
        ]}
      />
      <TextField
        label="GSTIN"
        defaultValue="29ABCDE1234F1Z5"
        hint="15-digit GST number"
      />
      <TextField
        label="Pincode"
        defaultValue="11001"
        error="Enter a valid 6-digit pincode"
      />
    </div>
  );
}

function SectionTitleDemo() {
  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl bg-surface-app p-4">
      <SectionTitle title="Action needed" onViewAll={() => {}} />
      <SectionTitle
        title="Daily marketing"
        subtext="3 adjustments since this morning"
        onViewAll={() => {}}
      />
      <SectionTitle title="Your journey to go live" />
    </div>
  );
}

type Entry = {
  slug: string;
  name: string;
  description: string;
  preview: React.ReactNode;
  code: string;
};

export const REGISTRY: Entry[] = [
  {
    slug: "ai-design-os",
    name: "AI Design OS",
    description:
      "The intelligence layers that turn this library into a system an AI can reason about: Component Intelligence (when to use/avoid), a Pattern Library, a Layout Rules Engine, and a strict Token System. Source of truth: src/lib/design-os.ts (summarised for the model in AGENTS.md).",
    preview: <DesignOSDemo />,
    code: `// src/lib/design-os.ts — machine-readable manifest
import { COMPONENTS, PATTERNS, LAYOUT_RULES, TOKENS } from "@/lib/design-os";

// Component Intelligence — every component carries:
{
  purpose: "Trigger an action or move a flow forward.",
  useWhen: ["The single main action on a screen", "Submitting a form"],
  avoidWhen: ["Navigating between screens", "Inline text links"],
  priority: "high",
  emotionalTone: ["confident", "clear"],
  pairsWith: ["BottomSheet", "ListCard"],
}

// Pipeline:
// Product intent → layout archetype → pattern → components → tokens → UI`,
  },
  {
    slug: "foundations",
    name: "Design Tokens",
    description:
      "Typography scale, colour palette, and gradients — the source of truth (Figma node 4547:4844). Use the type-* / bg-gradient-* utilities and colour tokens.",
    preview: <FoundationsDemo />,
    code: `/* globals.css — tokens + utilities */

/* Typography (Geist) */
<h1 className="type-h1">Header 1</h1>      {/* 20 / 24 semibold */}
<h2 className="type-h2">Header 2</h2>      {/* 16 / 20 semibold */}
<p  className="type-h3">Header 3</p>       {/* 13 / 18 medium   */}
<p  className="type-body-1">Body 1</p>     {/* 13 / 18 regular  */}
<p  className="type-body-2">Body 2</p>     {/* 12 / 16 regular  */}
<p  className="type-caption">Caption</p>   {/* 10 / 14 medium · UPPER */}

/* Colours */
text-text-primary  text-text-secondary
bg-brand-primary   bg-surface-app   bg-surface-muted
text-success / bg-success-light     text-danger / bg-danger-light
text-warning-default / bg-warning-light     border-border-divider

/* Gradients */
<div className="bg-gradient-primary" />     {/* #4066f1 → #5b7df4 */}
<div className="bg-gradient-grey-dark" />   {/* #1d2025 → #3c3f45 */}
<div className="bg-gradient-grey-light" />  {/* #e8ebf9 → #f8f9ff */}
<div className="bg-gradient-ice" />         {/* #f6fcff → #d9f4ff */}`,
  },
  {
    slug: "button",
    name: "Button",
    description: "Primary / secondary actions in three sizes, with haptics.",
    preview: (
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="primary" size="lg">
          Primary
        </Button>
        <Button variant="secondary" size="lg">
          Secondary
        </Button>
        <Button variant="primary" size="md">
          <ThumbsUp />
          With icon
        </Button>
        <Button variant="secondary" size="sm">
          Small
        </Button>
        <Button variant="ghost">
          View all
          <CaretRight />
        </Button>
        <Button variant="primary" size="lg" disabled>
          Disabled
        </Button>
      </div>
    ),
    code: `import { Button } from "@/components/ui/button";

<Button variant="primary" size="lg">Primary</Button>
<Button variant="secondary" size="lg">Secondary</Button>
<Button variant="ghost">View all<CaretRight /></Button>  {/* always lg */}
<Button size="md"><ThumbsUp />With icon</Button>
<Button size="sm">Small</Button>
<Button disabled>Disabled</Button>`,
  },
  {
    slug: "destructive-button",
    name: "Destructive Button",
    description:
      "The danger-token Button for delete/remove. Two styles — destructive (solid red) and destructive-secondary (white glass, red text + red icon) — across all Button sizes, with or without an icon.",
    preview: (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="destructive" size="lg">
            <Trash />
            Delete
          </Button>
          <Button variant="destructive" size="md">
            Delete
          </Button>
          <Button variant="destructive" size="sm">
            <Trash />
            Delete
          </Button>
          <Button variant="destructive" size="icon-md" aria-label="Delete">
            <Trash />
          </Button>
          <Button variant="destructive" size="lg" disabled>
            Delete
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="destructive-secondary" size="lg">
            <Trash />
            Delete
          </Button>
          <Button variant="destructive-secondary" size="md">
            Delete
          </Button>
          <Button variant="destructive-secondary" size="sm">
            <Trash />
            Delete
          </Button>
          <Button
            variant="destructive-secondary"
            size="icon-md"
            aria-label="Delete"
          >
            <Trash />
          </Button>
          <Button variant="destructive-secondary" size="lg" disabled>
            Delete
          </Button>
        </div>
      </div>
    ),
    code: `import { Button } from "@/components/ui/button";
import { Trash } from "@phosphor-icons/react";

{/* Solid red (mirrors primary) */}
<Button variant="destructive" size="lg"><Trash />Delete</Button>
<Button variant="destructive" size="md">Delete</Button>
<Button variant="destructive" size="sm"><Trash />Delete</Button>
<Button variant="destructive" size="icon-md" aria-label="Delete"><Trash /></Button>

{/* White glass, red text + red icon (mirrors secondary) */}
<Button variant="destructive-secondary" size="lg"><Trash />Delete</Button>
<Button variant="destructive-secondary" size="icon-md"><Trash /></Button>`,
  },
  {
    slug: "switch",
    name: "Switch",
    description: "Segmented toggle with a gradient active pill.",
    preview: (
      <Switch
        options={[
          { label: "Chat", value: "chat" },
          { label: "Activity", value: "activity" },
        ]}
        defaultValue="activity"
      />
    ),
    code: `import { Switch } from "@/components/ui/switch";

<Switch
  options={[
    { label: "Chat", value: "chat" },
    { label: "Activity", value: "activity" },
  ]}
  defaultValue="activity"
  onValueChange={(v) => console.log(v)}
/>`,
  },
  {
    slug: "dropdown",
    name: "Dropdown",
    description:
      "Glass pill that opens a menu of options. Trigger turns solid white when open; the caret flips.",
    preview: (
      <Dropdown
        options={[
          { label: "Today", value: "today" },
          { label: "This Week", value: "this-week" },
          { label: "This Month", value: "this-month" },
        ]}
        defaultValue="this-week"
      />
    ),
    code: `import { Dropdown } from "@/components/ui/dropdown";

<Dropdown
  options={[
    { label: "Today", value: "today" },
    { label: "This Week", value: "this-week" },
    { label: "This Month", value: "this-month" },
  ]}
  defaultValue="this-week"
  onValueChange={(v) => console.log(v)}
/>`,
  },
  {
    slug: "selector-pill",
    name: "Selector Pill",
    description:
      "Glass filter pill. The selected pill gets a brand-primary border; hover turns it solid white.",
    preview: <SelectorPillDemo />,
    code: `import { SelectorPill } from "@/components/ui/selector-pill";

const [active, setActive] = useState("Action Needed");

{filters.map((f) => (
  <SelectorPill key={f} selected={f === active} onClick={() => setActive(f)}>
    {f}
  </SelectorPill>
))}`,
  },
  {
    slug: "progress-bar",
    name: "Progress Bar",
    description:
      "Slim progress bar (Figma 4909:4892) — a grey track with a light→solid gradient fill in four tones: orange, blue, red, green.",
    preview: <ProgressBarDemo />,
    code: `import { ProgressBar } from "@/components/ui/progress-bar";

<ProgressBar tone="green" value={53} />
<ProgressBar tone="orange" value={53} />
<ProgressBar tone="red" value={86} />
<ProgressBar tone="blue" value={53} />`,
  },
  {
    slug: "section-card",
    name: "Section Card",
    description:
      "A glass card with the section title inset in its header (Figma 5304:968) — icon + title (+ optional View all) over a body. surface=\"white\" gives an inner white panel (Recent conversation); surface=\"glass\" keeps it transparent for cards-on-glass (Your journey). Use SectionTitle instead when the header sits above separate cards.",
    preview: <SectionCardDemo />,
    code: `import { SectionCard } from "@/components/ui/section-card";

<SectionCard icon={<ChatTeardropText />} title="Recent conversation" onViewAll={fn}>
  {/* body */}
</SectionCard>

<SectionCard icon={<ListChecks />} title="Your journey" surface="glass">
  {/* step cards on the glass surface */}
</SectionCard>`,
  },
  {
    slug: "callback-bar",
    name: "Callback Bar",
    description:
      "A 'Call <POC>' help bar (Figma 5284:1003) — avatar + title + subtitle + green Phone button. Layout rule: ALWAYS full screen width and floats directly above BottomNav with NO gap (rounded top corners only, flat bottom, upward shadow). Render it as the first child of the fixed bottom region, immediately before BottomNav.",
    preview: <CallbackBarDemo />,
    code: `import { CallbackBar } from "@/components/ui/callback-bar";

// Fixed bottom region — CallbackBar floats directly above BottomNav (no gap):
<div className="shrink-0 pb-[env(safe-area-inset-bottom)]">
  <CallbackBar
    src={pocAvatar}
    title="Call Anirudh"
    description="for any kind of assistance during onboarding"
    onCall={callPoc}
  />
  <BottomNav … />
</div>`,
  },
  {
    slug: "info-note",
    name: "Info Note",
    description:
      "A calm, muted inline aside — a grey rounded box with a leading Info icon + secondary text. Use under a card/section for a passive contextual note; not for warnings/errors.",
    preview: <InfoNoteDemo />,
    code: `import { InfoNote } from "@/components/ui/info-note";

<InfoNote>This was discussed in the last conversation</InfoNote>`,
  },
  {
    slug: "stepper",
    name: "Stepper",
    description:
      "Horizontal progress stepper (Figma 5190:5838) for a short go-live / onboarding journey. Nodes: done (filled) · current (ring) · goal (target) · upcoming (grey). The connector into a node is solid when the previous node is done, dotted ahead. Labels sit under the track.",
    preview: <StepperDemo />,
    code: `import { Stepper } from "@/components/ui/stepper";

<Stepper
  steps={[
    { label: "12 Jun", status: "done" },
    { label: "15 Jun", status: "current" },
    { label: "30 Jun", status: "goal" },
  ]}
/>`,
  },
  {
    slug: "data-card",
    name: "Data Card",
    description:
      "Data-representation metric surface (Figma 4909:5126) with four layouts — single, double (split), triple (split), and ratings — plus an optional green/red delta pill and an orange progress bar.",
    preview: <DataCardDemo />,
    code: `import { DataCard } from "@/components/ui/data-card";

<DataCard type="single" metrics={[
  { label: "Orders placed", value: "500", cap: "/ ₹5.0 L", progress: { pct: 53 } },
]} />
<DataCard type="single" metrics={[
  { label: "Orders placed", value: "500", delta: { value: "15%" } },
]} />

<DataCard type="double" metrics={[
  { label: "Normal spends", value: "₹2.4L", cap: "/ ₹5.0 L", progress: { pct: 48 } },
  { label: "CPP/ROAS spends", value: "₹6.4L", progress: { pct: 100, tone: "red" } },
]} />

<DataCard type="triple" metrics={[
  { label: "Label", value: "₹2.4L" }, …×3
]} />

<DataCard type="ratings" rating={3.2} ratingNote="Last 15 days" />`,
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    description:
      "Circular checkbox — grey ring → brand-primary fill + white check when selected. Controlled or uncontrolled, with an optional clickable label.",
    preview: <CheckboxDemo />,
    code: `import { Checkbox } from "@/components/ui/checkbox";

<Checkbox defaultChecked />
<Checkbox label="I have a GST number"
  checked={value} onCheckedChange={setValue} />
<Checkbox defaultChecked disabled />`,
  },
  {
    slug: "radio-group",
    name: "Radio Group",
    description:
      "Single-select radio list — grey ring → brand-primary ring + center dot. Controlled or uncontrolled; supports per-option disabled.",
    preview: <RadioDemo />,
    code: `import { RadioGroup } from "@/components/ui/radio-group";

<RadioGroup
  value={value}
  onValueChange={setValue}
  options={[
    { label: "Sole proprietor", value: "sole" },
    { label: "Private limited", value: "pvt" },
    { label: "Not registered yet", value: "none", disabled: true },
  ]}
/>`,
  },
  {
    slug: "toggle",
    name: "Toggle",
    description:
      "iOS-style on/off toggle — a pill track with a sliding white knob (brand-gradient track when on, grey when off). For a single binary setting; use Switch for 2–3 view options and Checkbox for multi-select. Controlled or uncontrolled, optional label, disabled.",
    preview: <ToggleDemo />,
    code: `import { Toggle } from "@/components/ui/toggle";

<Toggle
  checked={cod}
  onCheckedChange={setCod}
  label="Accept Cash on Delivery"
/>`,
  },
  {
    slug: "pill",
    name: "Pill",
    description:
      "Status pill / badge — 4 semantic tones (neutral / success / danger / warning) on a light or dark surface, with optional filled background + WarningCircle icon.",
    preview: <PillDemo />,
    code: `import { Pill } from "@/components/ui/pill";

<Pill tone="success">Live</Pill>                 // light, filled (default)
<Pill tone="warning" icon>Go live risk</Pill>    // + WarningCircle
<Pill tone="neutral" background={false}>Draft</Pill>

// dark surfaces (e.g. on a blue card) use soft, light-on-dark text:
<Pill surface="dark" tone="danger" icon>Failed</Pill>
<Pill surface="dark" tone="success" background={false}>Done</Pill>`,
  },
  {
    slug: "round-button",
    name: "Round Button",
    description: "Glass icon button with an optional label and selected state.",
    preview: (
      <div className="flex flex-wrap items-center gap-4">
        <RoundButton size="icon-lg" aria-label="Search">
          <MagnifyingGlass />
        </RoundButton>
        <RoundButton size="icon-md" aria-label="Search">
          <MagnifyingGlass />
        </RoundButton>
        <RoundButton size="lg" className="gap-2">
          <MagnifyingGlass />
          Strategy: 3
        </RoundButton>
        <RoundButton size="icon-lg" selected aria-label="Search">
          <MagnifyingGlass />
        </RoundButton>
      </div>
    ),
    code: `import { RoundButton } from "@/components/ui/round-button";

<RoundButton size="icon-lg"><MagnifyingGlass /></RoundButton>        {/* icon only */}
<RoundButton size="icon-md"><MagnifyingGlass /></RoundButton>
<RoundButton size="lg"><MagnifyingGlass />Strategy: 3</RoundButton>  {/* icon + label */}
<RoundButton size="icon-lg" selected><MagnifyingGlass /></RoundButton>`,
  },
  {
    slug: "user-thumbnail",
    name: "User Thumbnail",
    description: "Circular avatar with an optional brand “story” ring.",
    preview: (
      <div className="flex items-center gap-4">
        <UserThumbnail src={AVATAR} story alt="With story" />
        <UserThumbnail src={AVATAR} alt="Without story" />
        <UserThumbnail src={AVATAR} story size={56} alt="Large" />
      </div>
    ),
    code: `import { UserThumbnail } from "@/components/ui/user-thumbnail";

<UserThumbnail src="/avatar.jpg" story />      {/* brand ring */}
<UserThumbnail src="/avatar.jpg" />            {/* plain */}
<UserThumbnail src="/avatar.jpg" story size={56} />`,
  },
  {
    slug: "artifact-card",
    name: "Artifact Card",
    description:
      "A uniform card for the Collections panel. Same structure across states (type preview thumbnail + name + time), so the layout never shifts. completed = clean/passive; ongoing (blue) and action-needed (orange) overlay a solid status pill on the thumbnail. Types: report (table) / document (text) / website-catalog-brand-kit (storefront). Tapping opens the preview sheet.",
    preview: <ArtifactCardDemo />,
    code: `import { ArtifactCard } from "@/components/ui/artifact-card";

<ArtifactCard
  type="website"            // report | website | catalog | brand-kit | document
  name="Website creation"
  time="10 min ago"
  status="action-needed"    // ongoing | action-needed | completed
  onClick={() => openPreviewSheet()}
/>`,
  },
  {
    slug: "action-deck",
    name: "Action Deck",
    description:
      "A rotating 'wheel' of stacked blue notification cards (the Action Needed deck). Tap a back card, swipe vertically (mobile), or scroll (desktop) to rotate forward; back cards peek out + darken with depth. Used on /home and /onboarding. Pass viewLabel to show a secondary 'View' CTA alongside Continue.",
    preview: <ActionDeckDemo />,
    code: `import { ActionDeck } from "@/components/ui/action-deck";

<ActionDeck
  cards={[
    { icon: <Globe />, title: "Domain setup needed", desc: "…", time: "3 days ago" },
    { icon: <ChartBar />, title: "Ad budget low", desc: "…", time: "Today" },
  ]}
  viewLabel="View Pending List"   // optional — omit to show only Continue
  onContinue={(i) => …}
  onView={(i) => …}
/>`,
  },
  {
    slug: "report-chip",
    name: "Report Chip",
    description:
      "Inline report attachment shown inside an AI chat bubble (Figma 4929:11765) — a white XLS-icon box + filename. Posted when the AI finishes generating a report; tapping it opens the report preview sheet. The matching artifact is registered in Collections and the header Collections icon glows for 15s.",
    preview: <ReportChipDemo />,
    code: `import { ReportChip } from "@/components/ui/report-chip";

// Inside an AI ChatBubble (variant="ai")
<ChatBubble variant="ai" time="Now" header={<>…Shopdeck</>}>
  <ReportChip name="report.xls" onClick={() => openReportSheet()} />
</ChatBubble>`,
  },
  {
    slug: "bottom-sheet",
    name: "Bottom Sheet",
    description:
      "Modal sheet that slides up from the bottom. Grabber handle, glass back/close buttons, optional SectionTitle + description, scrollable body, and a Secondary/Primary footer. Renders inside the nearest `relative` ancestor (the mobile frame).",
    preview: <BottomSheetDemo />,
    code: `import { BottomSheet } from "@/components/ui/bottom-sheet";

const [open, setOpen] = useState(false);

<BottomSheet
  open={open}
  onOpenChange={setOpen}
  titleIcon={<Globe weight="fill" />}
  title="Reference website"
  description="What do you want to pick from your reference website"
  onBack={() => …}              // optional back button (top-left)
  secondaryLabel="Cancel"
  primaryLabel="Continue"
  onPrimary={() => setOpen(false)}
>
  <SelectField label="Section" options={[…]} />
  <SelectField label="Style" options={[…]} />
</BottomSheet>`,
  },
  {
    slug: "text-field",
    name: "Text Field",
    description:
      "Form input — labelled TextField (text) + SelectField (dropdown). Resting / hover (dark border) / focus (brand border) / filled / error states, with an optional info hint or red error message.",
    preview: <TextFieldDemo />,
    code: `import { TextField, SelectField } from "@/components/ui/text-field";

<TextField label="Store name" placeholder="Type here" />
<TextField label="GSTIN" hint="15-digit GST number" />
<TextField label="Pincode" error="Enter a valid 6-digit pincode" />

<SelectField
  label="Business type"
  placeholder="Select"
  options={[
    { label: "Sole proprietor", value: "sole" },
    { label: "Private limited", value: "pvt" },
  ]}
  onValueChange={(v) => console.log(v)}
/>`,
  },
  {
    slug: "section-title",
    name: "Section Title",
    description:
      "Section header: white icon circle (default Target) + title, optional subtext, and an optional ghost “View all” CTA. Used above every home / onboarding section.",
    preview: <SectionTitleDemo />,
    code: `import { SectionTitle } from "@/components/ui/section-title";
import { Stack } from "@phosphor-icons/react";

<SectionTitle title="Action needed" onViewAll={() => …} />
<SectionTitle
  icon={<Stack weight="fill" />}
  title="Daily marketing"
  subtext="3 adjustments since this morning"
  onViewAll={() => …}
/>
<SectionTitle title="Your journey to go live" />          {/* no CTA */}
<SectionTitle title="Custom" action={<Button …>Manage</Button>} />`,
  },
  {
    slug: "header",
    name: "Header",
    description: "App-bar shell with left / center / right slots. Three layouts.",
    preview: (
      <div className="flex w-full max-w-[360px] flex-col gap-4">
        <Header
          className="rounded-xl"
          left={
            <div className="flex items-center gap-2">
              <UserThumbnail src={AVATAR} story />
              <div className="flex flex-col">
                <span className="text-[16px] font-semibold leading-5">
                  Hi Rohit,
                </span>
                <span className="text-[12px] leading-[14px] text-text-secondary">
                  devikatextiles.com
                </span>
              </div>
            </div>
          }
          right={
            <RoundButton size="md" className="gap-2">
              <MagnifyingGlass />
              Strategy: 3
            </RoundButton>
          }
        />
        <Header
          className="rounded-xl"
          left={
            <RoundButton size="icon-md" aria-label="Back">
              <CaretLeft />
            </RoundButton>
          }
          center="Header"
          right={
            <RoundButton size="icon-md" aria-label="Search">
              <MagnifyingGlass />
            </RoundButton>
          }
        />
        <Header
          className="rounded-xl"
          left={
            <RoundButton size="icon-md" aria-label="Back">
              <CaretLeft />
            </RoundButton>
          }
          center={
            <Switch
              options={[
                { label: "Chat", value: "chat" },
                { label: "Activity", value: "activity" },
              ]}
              defaultValue="activity"
            />
          }
          right={
            <RoundButton size="icon-md" aria-label="Search">
              <MagnifyingGlass />
            </RoundButton>
          }
        />
      </div>
    ),
    code: `import { Header } from "@/components/ui/header";

{/* home */}
<Header left={<UserBlock />} right={<RoundButton size="md"><MagnifyingGlass />Strategy: 3</RoundButton>} />

{/* with back */}
<Header
  left={<RoundButton size="icon-md"><CaretLeft /></RoundButton>}
  center="Header"
  right={<RoundButton size="icon-md"><MagnifyingGlass /></RoundButton>}
/>

{/* with switch */}
<Header
  left={<RoundButton size="icon-md"><CaretLeft /></RoundButton>}
  center={<Switch options={tabs} defaultValue="activity" />}
  right={<RoundButton size="icon-md"><MagnifyingGlass /></RoundButton>}
/>`,
  },
  {
    slug: "bottom-nav",
    name: "Bottom Nav",
    description: "Mobile bottom bar — home, glass search pill, trailing action.",
    preview: (
      <div className="w-full max-w-[360px] overflow-hidden rounded-xl">
        <BottomNav />
      </div>
    ),
    code: `import { BottomNav } from "@/components/ui/bottom-nav";

<BottomNav
  placeholder="Ask anything..."
  onHome={() => {}}
  onAction={() => {}}
  onValueChange={(v) => console.log(v)}
/>`,
  },
  {
    slug: "chat-bar",
    name: "Chat Bar",
    description:
      "Chat input bar — add button, text field, voice / call actions. Type something and the call button becomes a gradient send button.",
    preview: (
      <div className="w-full max-w-[360px] overflow-hidden rounded-xl">
        <ChatBar />
      </div>
    ),
    code: `import { ChatBar } from "@/components/ui/chat-bar";

<ChatBar
  placeholder="Ask about your business..."
  onAdd={() => {}}
  onMic={() => {}}
  onCall={() => {}}
  onValueChange={(v) => console.log(v)}
  onSubmit={(v) => console.log("send:", v)} // call button → send when typing
/>`,
  },
  {
    slug: "chat-bubble",
    name: "Chat Bubble",
    description:
      "Message bubble — ai (light) / user (dark) variants. Caps at 80% of the width.",
    preview: (
      <div className="flex w-full max-w-[360px] flex-col gap-4">
        <ChatBubble
          variant="ai"
          time="8:00AM"
          header={
            <>
              <AiBadge className="size-5" />
              <span>Shopdeck</span>
              <UserThumbnail src={AVATAR} size={20} className="p-0" alt="Anshika" />
              <span>Anshika</span>
            </>
          }
        >
          Here&rsquo;s a quick summary of your store&rsquo;s performance today.
        </ChatBubble>
        <ChatBubble variant="user" time="8:00AM" read>
          Great, show me the pending actions.
        </ChatBubble>
      </div>
    ),
    code: `import { ChatBubble } from "@/components/ui/chat-bubble";

{/* AI message */}
<ChatBubble variant="ai" time="8:00AM" header={<><AiBadge />Shopdeck</>}>
  Here's a quick summary of your store's performance today.
</ChatBubble>

{/* User message (read = muted double-tick) */}
<ChatBubble variant="user" time="8:00AM" read>
  Great, show me the pending actions.
</ChatBubble>`,
  },
  {
    slug: "card",
    name: "Card",
    description: "Notification / activity card — blue (gradient) and white variants.",
    preview: (
      <div className="flex w-full max-w-[328px] flex-col gap-4">
        <Card variant="blue">
          <CardHeader>
            <CardTitle>
              <Globe weight="bold" />
              Domain Setup – Action Required!
            </CardTitle>
            <CardDescription>
              You haven&rsquo;t secured your domain yet, devikatextile.in is
              still waiting for confirmation at ₹412.
            </CardDescription>
            <CardMeta>
              <CardBadge>
                <Warning weight="fill" />
                GO LIVE RISK
              </CardBadge>
              <span>3 Days ago</span>
            </CardMeta>
          </CardHeader>
          <CardActions>
            <CardButton variant="outline">View Pending List</CardButton>
            <CardButton variant="glass">Continue</CardButton>
          </CardActions>
        </Card>

        <Card variant="white">
          <CardIcon>
            <Globe />
          </CardIcon>
          <CardBody>
            <CardHeader>
              <CardCaption>02:00 PM</CardCaption>
              <CardTitle>Catalogue updated</CardTitle>
              <CardCaption>12 products • Requested by GC Anshika Singh</CardCaption>
            </CardHeader>
            <CardDescription>
              Approve updated COGS to improve campaign optimisation
            </CardDescription>
            <CardFooter>
              <Button variant="primary" size="md">
                Review &amp; Approve
              </Button>
              <CardWarning>
                <Warning weight="fill" />
                GO LIVE RISK
              </CardWarning>
            </CardFooter>
          </CardBody>
        </Card>
      </div>
    ),
    code: `import {
  Card, CardIcon, CardBody, CardHeader, CardTitle,
  CardCaption, CardDescription, CardFooter, CardWarning,
} from "@/components/ui/card";

{/* white activity card */}
<Card variant="white">
  <CardIcon><Globe /></CardIcon>
  <CardBody>
    <CardHeader>
      <CardCaption>02:00 PM</CardCaption>
      <CardTitle>Catalogue updated</CardTitle>
      <CardCaption>12 products • Requested by GC Anshika Singh</CardCaption>
    </CardHeader>
    <CardDescription>Approve updated COGS to improve campaign optimisation</CardDescription>
    <CardFooter>
      <Button variant="primary" size="md">Review & Approve</Button>
      <CardWarning><Warning weight="fill" />GO LIVE RISK</CardWarning>
    </CardFooter>
  </CardBody>
</Card>`,
  },
  {
    slug: "blue-card-background",
    name: "Blue Card Background",
    description: "Decorative gradient surface with back / middle / front layers — a notification deck.",
    preview: (
      <div className="relative h-[220px] w-[320px]">
        <BlueCardBackground
          layer="back"
          className="absolute left-1/2 top-0 h-[168px] w-[244px] -translate-x-1/2"
        />
        <BlueCardBackground
          layer="middle"
          className="absolute left-1/2 top-6 h-[168px] w-[282px] -translate-x-1/2"
        />
        <BlueCardBackground
          layer="front"
          className="absolute left-1/2 top-12 h-[168px] w-[320px] -translate-x-1/2"
        />
      </div>
    ),
    code: `import { BlueCardBackground } from "@/components/ui/blue-card-background";

{/* stacked notification deck — narrower cards sit higher behind */}
<div className="relative h-[220px] w-[320px]">
  <BlueCardBackground layer="back"   className="absolute left-1/2 top-0  w-[244px] -translate-x-1/2" />
  <BlueCardBackground layer="middle" className="absolute left-1/2 top-6  w-[282px] -translate-x-1/2" />
  <BlueCardBackground layer="front"  className="absolute left-1/2 top-12 w-[320px] -translate-x-1/2" />
</div>`,
  },
  {
    slug: "icons",
    name: "Phosphor Icons",
    description:
      "The project icon set. Always use Phosphor — never emojis. Full library at phosphoricons.com.",
    preview: (
      <div className="w-full">
        <div className="mb-4 rounded-lg border border-[#ffe6b3] bg-[#fff8e8] px-3 py-2 text-[12px] leading-relaxed text-[#8a6d1f]">
          <strong>Rule:</strong> use Phosphor Icons everywhere — never emojis
          (unless explicitly asked). If Phosphor lacks an icon, fall back to a
          similar-style icon from Iconify.
        </div>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
          {ICONS.map(({ Icon, name }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-1.5 rounded-lg border border-neutral-200 bg-white p-3 text-text-primary"
            >
              <Icon className="size-6" />
              <span className="w-full truncate text-center text-[10px] text-neutral-500">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    code: `// Always Phosphor — never emojis (until explicitly asked).
import { MagnifyingGlass, CaretRight, Warning } from "@phosphor-icons/react";

<MagnifyingGlass />
<Warning weight="fill" />     {/* weights: thin·light·regular·bold·fill·duotone */}
<CaretRight weight="bold" />

// Fallback when Phosphor lacks an icon → Iconify (match the style):
// https://icon-sets.iconify.design/`,
  },
  {
    slug: "colourful-icons",
    name: "Colourful Icons",
    description:
      "Full-colour brand logos (keep their brand colours). Used as channel indicators, e.g. in Strategy Card.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        {[
          { Logo: GoogleLogo, name: "GoogleLogo" },
          { Logo: MetaLogo, name: "MetaLogo" },
        ].map(({ Logo, name }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 rounded-lg border border-neutral-200 bg-white p-4 text-text-primary"
          >
            <span className="grid size-9 place-items-center rounded-lg bg-[#f2f2f5] [&_svg]:size-5">
              <Logo />
            </span>
            <span className="text-[10px] text-neutral-500">{name}</span>
          </div>
        ))}
      </div>
    ),
    code: `import { GoogleLogo, MetaLogo } from "@/components/brand-logos";

<GoogleLogo className="size-5" />
<MetaLogo className="size-5" />`,
  },
  {
    slug: "list-content",
    name: "List Content",
    description:
      "Body content for a ListCard — text, an image row (last tile = video), or a label/value table.",
    preview: (
      <div className="flex w-full max-w-[300px] flex-col gap-4">
        <ListContent
          variant="image"
          images={[
            "https://picsum.photos/seed/ls1/200/120",
            "https://picsum.photos/seed/ls2/200/120",
            "https://picsum.photos/seed/ls3/200/120",
          ]}
        />
        <ListContent
          variant="table"
          rows={[
            { label: "Pillow Set (2pc)", value: "₹340 → ₹375" },
            { label: "Cotton Bedsheet Queen", value: "₹850 → ₹920" },
            { label: "Duvet Cover King", value: "₹1,200 → ₹1,340" },
          ]}
        />
        <ListContent variant="text">
          Approve updated COGS to improve campaign optimisation
        </ListContent>
      </div>
    ),
    code: `import { ListContent } from "@/components/ui/list-content";

<ListContent variant="image" images={[a, b, c]} />   {/* last = video */}
<ListContent variant="table" rows={[{ label, value }, …]} />
<ListContent variant="text">Approve updated COGS…</ListContent>`,
  },
  {
    slug: "list-card",
    name: "List Card",
    description:
      "Grey card: status header (pending / ongoing) + optional content + CTA buttons.",
    preview: (
      <div className="flex w-full max-w-[304px] flex-col gap-3">
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
        <ListCard tone="ongoing" status="Ongoing" title="Restart paused Meta campaigns" />
      </div>
    ),
    code: `import { ListCard, ListCardButton } from "@/components/ui/list-card";

<ListCard
  tone="pending"
  status="Pending · on you"
  title="Dispatch 9 expired AWBs on priority"
  content={<ListContent variant="table" rows={rows} />}
  actions={
    <>
      <ListCardButton variant="glass">Learn More</ListCardButton>
      <ListCardButton variant="primary">Approve</ListCardButton>
    </>
  }
/>`,
  },
  {
    slug: "collapsible-card",
    name: "Collapsible Card",
    description:
      "Strategy card that expands to reveal its ListCards. Built from List Card + List Content.",
    preview: (
      <CollapsibleCard
        className="max-w-[328px]"
        strategy="Strategy 1"
        title="Reducing Cancellations"
        badges={[
          { label: "Done: 1", tone: "success" },
          { label: "Ongoing: 1", tone: "brand" },
        ]}
        defaultOpen
      >
        <ListCard tone="ongoing" status="Ongoing" title="Restart paused Meta campaigns" />
        <ListCard
          tone="pending"
          status="Pending · on you"
          title="Dispatch 9 expired AWBs on priority"
          content={
            <ListContent
              variant="image"
              images={[
                "https://picsum.photos/seed/cc1/200/120",
                "https://picsum.photos/seed/cc2/200/120",
                "https://picsum.photos/seed/cc3/200/120",
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
    ),
    code: `import { CollapsibleCard } from "@/components/ui/collapsible-card";
import { ListCard, ListCardButton } from "@/components/ui/list-card";
import { ListContent } from "@/components/ui/list-content";

<CollapsibleCard
  strategy="Strategy 1"
  title="Reducing Cancellations"
  badges={[{ label: "Done: 1", tone: "success" }, { label: "Ongoing: 1", tone: "brand" }]}
  defaultOpen
>
  <ListCard tone="ongoing" status="Ongoing" title="Restart paused Meta campaigns" />
  <ListCard
    tone="pending"
    status="Pending · on you"
    title="Dispatch 9 expired AWBs on priority"
    content={<ListContent variant="image" images={[a, b, c]} />}
    actions={<><ListCardButton variant="glass">Learn More</ListCardButton><ListCardButton variant="primary">Approve</ListCardButton></>}
  />
</CollapsibleCard>`,
  },
  {
    slug: "strategy-card",
    name: "Strategy Card",
    description:
      "Strategy summary card with an amber action highlight (stats) and a schedule note.",
    preview: (
      <StrategyCard
        className="max-w-[328px]"
        summary="CPP is higher since morning for Meta, so we acted fast and rebalanced"
        detail="Campaign scaled down 3, Scaled up 2, paused 2, Restarted 2"
        stats={[
          { label: "Budget increased by", value: "₹12k" },
          { label: "Estimated spends today", value: "₹15k – ₹15k" },
        ]}
        footnote="Next analysis scheduled for 12:00 AM"
        time="11:00 AM"
      />
    ),
    code: `import { StrategyCard } from "@/components/ui/strategy-card";

<StrategyCard
  summary="CPP is higher since morning for Meta, so we acted fast and rebalanced"
  detail="Campaign scaled down 3, Scaled up 2, paused 2, Restarted 2"
  stats={[
    { label: "Budget increased by", value: "₹12k" },
    { label: "Estimated spends today", value: "₹15k – ₹15k" },
  ]}
  footnote="Next analysis scheduled for 12:00 AM"
  time="11:00 AM"
  onDetailClick={() => {}}
/>`,
  },
];

/**
 * Gallery view. Renders a sidebar of `entries` + the selected entry's preview/code.
 * Used by `/` (full, with AI Design OS) and `/components` (shareable, without it).
 */
export function GalleryView({
  entries,
  label = "Components",
}: {
  entries: Entry[];
  label?: string;
}) {
  const [active, setActive] = React.useState(entries[0].slug);
  const entry = entries.find((e) => e.slug === active) ?? entries[0];

  return (
    <div className="flex min-h-screen bg-white text-text-primary">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 overflow-y-auto border-r border-neutral-200 px-4 py-6 sm:block">
        <p className="px-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">
          {label}
        </p>
        <nav className="mt-3 flex flex-col gap-0.5">
          {entries.map((e) => (
            <button
              key={e.slug}
              onClick={() => setActive(e.slug)}
              className={cn(
                "rounded-md px-3 py-2 text-left text-sm transition-colors",
                e.slug === active
                  ? "bg-neutral-100 font-medium text-text-primary"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-text-primary"
              )}
            >
              {e.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-10">
        {/* mobile selector */}
        <div className="mb-6 flex flex-wrap gap-2 sm:hidden">
          {entries.map((e) => (
            <button
              key={e.slug}
              onClick={() => setActive(e.slug)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs",
                e.slug === active
                  ? "border-neutral-300 bg-neutral-100 font-medium"
                  : "border-neutral-200 text-neutral-500"
              )}
            >
              {e.name}
            </button>
          ))}
        </div>

        <h1 className="text-2xl font-semibold">{entry.name}</h1>
        <p className="mt-1.5 text-sm text-neutral-500">{entry.description}</p>

        {/* Preview */}
        <div className="mt-6 flex min-h-[220px] items-center justify-center rounded-xl border border-neutral-200 bg-[#f5f5f5] p-8">
          {entry.preview}
        </div>

        {/* Code */}
        <pre className="mt-4 overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-[13px] leading-relaxed text-neutral-100">
          <code>{entry.code}</code>
        </pre>
      </main>
    </div>
  );
}

/** Primary source of truth — full gallery including the AI Design OS layer. */
export default function Home() {
  return <GalleryView entries={REGISTRY} />;
}
