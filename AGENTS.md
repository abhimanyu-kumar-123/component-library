# Design System

A shadcn-style component library (Next.js 16 + React 19 + Tailwind v4 + Base UI),
with components synced 1:1 from Figma (Chat UX).

## AI Design Operating System — READ THIS BEFORE BUILDING UI
This is not just a component inventory; it is a system you must reason with. The
machine-readable source of truth is **[src/lib/design-os.ts](src/lib/design-os.ts)**
(rendered live as the **AI Design OS** gallery entry). When asked to build/compose
any screen or UI, follow this pipeline:

**Product intent → pick a Layout archetype → pick a Pattern → assemble Components (obey their intelligence) → style ONLY with tokens → production-ready UI.**

1. **Component Intelligence** — every component in `design-os.ts` declares `purpose`,
   `useWhen`, `avoidWhen`, `priority`, `emotionalTone`, `pairsWith`. Pick components by
   *intent*, not by looks. Don't use a component listed under another's `avoidWhen`.
2. **Pattern Library** — prefer a ready composition from `PATTERNS` (e.g. *Mobile screen
   scaffold*, *Home section*, *Action Needed deck*, *Form in a sheet*, *Artifacts grid*,
   *Strategy list*, *Conversation*) over assembling from scratch.
3. **Layout Rules Engine** — pick a `LAYOUT_RULES` archetype (`mobile_conversational`,
   `mobile_home_feed`, `mobile_form`, `mobile_grid`, `modal_sheet`) and obey its rules
   **plus** the global rules: **px-4 gutters · 24px section spacing (space-y-6) · 12px
   card gap (gap-3) · exactly one primary gradient CTA per screen · max 2 hierarchy
   levels per card · sticky header with white divider · safe-area insets.**
4. **Token System — NEVER invent spacing, radius, shadow or colour.** Use the scales:
   - **Spacing** (Tailwind units): `1`=4 (icon↔label) · `2`=8 · `2.5`=10 (compact card pad) · `3`=12 (card/grid gap) · `4`=16 (gutter, card pad) · `5`=20 · `6`=24 (section).
   - **Radius:** `rounded-md` chips · `rounded-lg` inputs/buttons · `rounded-xl` thumbnails · `rounded-2xl` cards · `rounded-3xl` feature cards · `rounded-[20px]` sheet · `rounded-[44px]` frame · `rounded-full` pills/avatars.
   - **Shadow utilities:** `shadow-glass` · `shadow-card` · `shadow-lift` (hover) · `shadow-sheet` · `shadow-inset-glass`. (Defined in globals.css — don't write arbitrary box-shadows.)
   - **Colour / Type / Gradient:** the token classes + `type-*` utilities below.

   When you add or change a component, **update its entry in `design-os.ts`** so the
   intelligence stays in sync with reality.

   **Single source of truth & guardrails.** `src/lib/design-os.ts` is the **canonical**
   manifest; `AGENTS.md` (this file) and the gallery `REGISTRY` in `src/app/page.tsx`
   are views of it and must not contradict it. Two checks enforce this:
   - `npm run check:design-os` — **blocking**, runs automatically on `prebuild`. Every
     `src/components/ui/*.tsx` must have a matching `slug` in **both** `design-os.ts`
     (`COMPONENTS`) and the gallery `REGISTRY`. Add a component → register it in both.
   - `npm run check:tokens` — **report-only** (for now). Flags raw `#hex` and arbitrary
     `shadow-[…]` that bypass the token system; promote them to a token / named shadow
     utility, or allow-list intentional one-offs in `scripts/check-tokens.mjs`.
   - `npm run check` runs both.

## Conventions
- Components live in `src/components/ui/` and follow the **shadcn "base" pattern**
  (Base UI `useRender` + `cva` variants). Style: `base` (see `components.json`).
- Use the `cn()` helper from `@/lib/utils` to compose classes.
- **Icons:** always use **Phosphor Icons** (`@phosphor-icons/react`) — e.g.
  `MagnifyingGlass`, `CaretRight`, `ChatTeardropText`, `Warning`. If Phosphor
  lacks an icon, fall back to a similar-style icon from Iconify
  (https://icon-sets.iconify.design/). Phosphor weights: `thin` · `light` ·
  `regular` (default) · `bold` · `fill` · `duotone`.
- **Never use emojis** in any design/UI until explicitly asked. Use an icon instead.
- **Brand logos:** full-colour brand marks (`GoogleLogo`, `MetaLogo`) live in `@/components/brand-logos` — use these for channel indicators (e.g. StrategyCard), not the monochrome Phosphor versions.
- Design tokens are CSS variables in `src/app/globals.css`, exposed to Tailwind via
  `@theme inline` (e.g. `text-text-primary`, `bg-accent-violet-light`, `ring-accent-violet-light`).
- Font is **Geist** (matches Figma), wired in `src/app/layout.tsx`.
- Add more shadcn components with: `npx shadcn@latest add <component>`.

## Button — `@/components/ui/button`
```tsx
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";

<Button>Primary</Button>                         // variant="primary" size="md" (defaults)
<Button variant="secondary" size="lg">Save</Button>
<Button size="sm"><ThumbsUp />Like</Button>      // icon + text
<Button size="icon-md" aria-label="Like"><ThumbsUp /></Button>  // icon only
<Button disabled>Disabled</Button>
<Button render={<a href="/x" />}>As link</Button> // polymorphic via Base UI render prop
```
- `variant`: `primary` (indigo gradient, teal inner stroke) · `secondary` (glass white, dark text) · `ghost` (transparent, brand-blue text, link-style) · `destructive` (solid `danger` red, white text/icon — mirrors primary) · `destructive-secondary` (white glass, red text + red icon — mirrors secondary). Destructive variants support every `size` + with/without icon, like the others. Figma node `4803:8461`.
- `size`: `lg` · `md` (default) · `sm` · `icon-lg` · `icon-md` · `icon-sm`
- **Rule:** the `ghost` variant always renders at `lg` size — any `size` prop passed to a ghost button is ignored.
- States (default / hover / disabled) are handled with Tailwind state variants — no `state` prop needed.
- Touch press triggers haptic feedback (`navigator.vibrate`, Android) + an `active:` press state; opt out with `haptic={false}`.
- Source of truth: Figma file `4PdQxX6BUGkJEJ1xQTAb37`, node `4267:5147`.

## Other components (`@/components/ui/*`)
All synced from the same Figma file (node `4267:4841`). Glass surfaces use `bg-white/50` + white border + `shadow-[0px_10px_20px_rgba(0,0,0,0.1)]`.

- **`Switch`** — segmented toggle with a gradient active pill.
  `<Switch options={[{label,value},…]} defaultValue="…" onValueChange={fn} />`
- **`SelectorPill`** — glass filter pill; `selected` swaps the border to brand-primary, hover → solid white. Has haptics.
  `<SelectorPill selected={isOn} onClick={…}>Action Needed</SelectorPill>`
- **`Pill`** — status pill / badge (caption-style). **Rules: pill labels are ALWAYS UPPERCASE** (enforced in the component) **and pill icons are ALWAYS outline** (`weight="regular"` — applies to the default WarningCircle and any custom `icon` you pass). Use `Pill` for any small status badge so this stays consistent. `tone`: `neutral` | `success` | `danger` | `warning`; `surface`: `light` (default) | `dark` (soft light-on-dark text + `bg-black/30`); `background` (default `true`, filled) and `icon` (`true` → WarningCircle, or a custom node). Generalizes the blue card's `CardBadge`.
  `<Pill tone="warning" icon>Go live risk</Pill>` · `<Pill surface="dark" tone="success" background={false}>Done</Pill>`
- **`Dropdown`** — glass pill that opens a menu of options (click-outside + Esc to close). Controlled (`value`) or uncontrolled (`defaultValue`). Default leading icon = `CalendarBlank`.
  `<Dropdown options={[{label,value},…]} defaultValue="…" onValueChange={fn} />`
- **`Checkbox`** (`@/components/ui/checkbox`) — **circular** checkbox (Figma `4809:9693`): grey ring → `brand-primary` fill + white `Check` when selected. Controlled (`checked`) or uncontrolled (`defaultChecked`), optional clickable `label`, `disabled`.
  `<Checkbox label="I have a GST number" checked={v} onCheckedChange={fn} />`
- **`RadioGroup`** (+ `Radio`) (`@/components/ui/radio-group`) — single-select radio list (Figma `4809:9694`): grey ring → `brand-primary` ring + center dot. Controlled (`value`) / uncontrolled (`defaultValue`); per-option `disabled`. `Radio` is the standalone circle.
  `<RadioGroup value={v} onValueChange={fn} options={[{label,value,disabled?},…]} />`
- **`TextField` / `SelectField`** (`@/components/ui/text-field`) — white bordered **form** inputs with a top `label`, optional `hint` (Info icon) or `error` (red border + WarningCircle message). Border states: resting `border-divider` → hover/focus/open `brand-primary` → error `danger`. `TextField` is a real `<input>` (all input props); `SelectField` is a labelled dropdown with `options` (controlled/uncontrolled, click-outside + Esc). Use these for forms; use `Dropdown` for the glass filter pill.
  `<TextField label="GSTIN" hint="15-digit" />` · `<SelectField label="Type" options={[…]} onValueChange={fn} />`
- **`RoundButton`** — glass button; `selected` = gradient pill; hover + haptics. Sizes: `md` / `lg` (text pills) and `icon-md` / `icon-lg` (square, icon-only). Use an `icon-*` size for icon-only buttons.
  `<RoundButton size="icon-lg" selected><Search /></RoundButton>` · `<RoundButton size="md"><Search />Strategy: 3</RoundButton>`
- **`UserThumbnail`** — circular avatar; `story` shows the brand ring. `<UserThumbnail src={url} story size={36} />`
- **`SectionTitle`** — section header row: white icon circle (default `Target`) + `title` (type-h2), optional `subtext` (type-body-2), and an optional CTA. Pass `onViewAll` for the built-in ghost "View all" + caret, or `action` for a custom right slot. Use one above each home/onboarding section.
  `<SectionTitle icon={<Stack weight="fill" />} title="Daily marketing" subtext="…" onViewAll={fn} />`
- **`ProgressBar`** (`@/components/ui/progress-bar`) — slim progress bar (Figma `4909:4892`): grey `border-divider` track + light→solid gradient fill. `tone`: `orange` (default) | `blue` | `red` | `green`; `value` 0–100.
  `<ProgressBar tone="red" value={86} />`
- **`DataCard`** (`@/components/ui/data-card`) — data-representation metric surface (Figma `4909:5126`). `type`: `single` (one metric) · `double` (two metrics split by a divider) · `triple` (three centered metrics) · `ratings` (star row). Each `DataMetric` = `{ label, value, cap?, delta?:{value,tone}, progress?:{pct,tone}, icon? }`; `cap` (e.g. "/ ₹5.0 L") shows when there's no `delta`. `delta` = green/red pill; `progress` uses `ProgressBar` (tones `orange` | `blue` | `red` | `green`). Ratings: `rating`, `outOf`, `ratingLabel`, `ratingNote`.
  `<DataCard type="double" metrics={[{label,value,progress:{pct:48}},{label,value,delta:{value:"15%"}}]} />`
- **`ArtifactCard`** — a uniform card for the **Collections** panel (`/artifacts`). Every card is the same structure (fixed-aspect type-specific CSS preview thumbnail — `report`/`document` → spreadsheet mock · `website`/`catalog`/`brand-kit` → storefront mock — + `name` + `time`), so the layout never shifts. **`completed`** cards are clean/passive (no extra UI). **`ongoing`** (blue `brand-primary` + DotsThreeCircle) and **`action-needed`** (orange `warning-default` + Lightning) cards overlay a solid status pill on the thumbnail (so height stays identical). Type previews: `report` → spreadsheet · `document` → text lines · `website`/`catalog`/`brand-kit` → storefront. Tapping (`onClick`) opens the **preview sheet** (`BottomSheet`: Share + Download `RoundButton` + Continue). The Collections screen has **no filter pills** — calm, scannable, completed-by-default. Entry point: the `SquaresFour` icon in the chat header → `/artifacts`.
  `<ArtifactCard type="website" name="Website creation" time="10 min ago" status="in-progress" progress={45} onClick={openPreview} />`
- **`BottomSheet`** — modal sheet sliding up from the bottom (`open` / `onOpenChange`, Esc + scrim-tap to close). Floats 4px off the left/right/bottom edges and grows up to 4px from the top (full page), after which the body scrolls while the **header (grabber + back/close) and footer stay sticky**. Glass close (X) + optional back (`onBack`) round buttons, optional `title`/`titleIcon` (renders a `SectionTitle`) + `description`, scrollable `children` body, and a footer (`secondaryLabel`/`primaryLabel` + `onSecondary`/`onPrimary`, or a custom `footer`). Renders into the nearest `relative` ancestor — the mobile frame already is `relative`, so place it inside the frame.
  `<BottomSheet open={open} onOpenChange={setOpen} title="…" description="…" primaryLabel="Continue" onPrimary={fn}>…</BottomSheet>`
- **`Header`** — app-bar shell with `left` / `center` / `right` slots (`center` is absolutely centered). Compose home / back / switch layouts.
- **`BottomNav`** — mobile bar: gradient home button + glass "Ask anything…" search pill + trailing action.
- **`ChatBar`** (+ `ChatIconButton`) — chat input bar on a white→ice-blue gradient: add button + text input + voice/call ice-blue icon buttons. Hover/focus → solid white; haptics. When the field has text the call button becomes a gradient **send** button (PaperPlaneRight) → fires `onSubmit`. Works controlled (`value`) or uncontrolled.
- **`ChatBubble`** — message bubble; `variant`: `ai` (light gradient, top-left tail, optional `header` sender row) | `user` (dark gradient, white text, top-right tail, `read` double-tick). Caps at `max-w-[80%]`. Props: `time`, `read`, `header`.
- **`ReportChip`** (`@/components/ui/report-chip`) — inline report/file attachment rendered as the children of an AI `ChatBubble` (Figma `4929:11765`): a white XLS-icon box + filename (`report.xls`). The AI posts it when a report-generation request ("Generate report for last 3 months", "Create quarterly sales report", "Prepare analytics summary") completes — see `src/app/chat/page.tsx` (`isReportRequest` / `generateReport`). On completion: (1) registers a `report` artifact via `addGeneratedArtifact` in **`@/lib/artifacts-store`** (localStorage + change event) so it shows as the newest card on `/artifacts`; (2) glows the header **Collections** icon for 15s with the soft red breathing `animate-artifact-glow` (icon fills + turns `danger`, then eases back to black). Tapping the chip — or the report card in Collections — opens the report preview `BottomSheet`.
  `<ChatBubble variant="ai"><ReportChip name="report.xls" onClick={openSheet} /></ChatBubble>`
- **`BlueCardBackground`** — decorative blue gradient surface; `layer`: `back` | `middle` | `front`. Stack three for a notification deck.
- **`Card`** — notification/activity card; `variant`: `blue` (gradient, white text, stacked) | `white` (white surface, icon box + content column). Parts adapt to the variant via context. Subparts: `CardIcon` (white icon box), `CardBody` (white content column), `CardHeader`, `CardTitle`, `CardCaption` (10px caption/time), `CardDescription`, `CardMeta` (blue badge+time row), `CardFooter` (white action+warning row), `CardBadge` (amber pill), `CardWarning` (inline orange warning), `CardActions`, `CardButton` (`outline` | `glass`). White card's primary action reuses `<Button variant="primary">`.

- **`ListContent`** — body for a ListCard; `variant`: `text` | `image` (row of tiles, last = video) | `table` (`rows={[{label,value}]}`).
- **`ListCard`** (+ `ListCardButton`) — grey card with a status header (`tone`: `pending` amber / `ongoing` brand), optional `content` (a ListContent), and an `actions` CTA row. `ListCardButton` `variant`: `glass` | `primary`.
- **`CollapsibleCard`** — strategy card; collapsed shows title + summary `badges` (`success`/`brand`), expanded reveals its `children` (ListCards). Controlled (`open`) or uncontrolled (`defaultOpen`). Composes ListCard + ListContent.
- **`StrategyCard`** — strategy summary card: `summary` line + leading icon (default Meta logo), an amber `detail` highlight box with `stats` (label/value, split by a divider), and a `footnote` + `time` schedule row.
- **`ActionDeck`** — rotating "wheel" of stacked blue notification cards (the Action Needed deck). Tap a back card, swipe vertically (mobile), or scroll (desktop) to rotate the deck forward; back cards peek out + darken with depth, front card fills the content width. Built on the blue `Card` parts.
  `<ActionDeck cards={[{icon,title,desc,time,badge?},…]} viewLabel="View Pending List" onContinue={(i)=>…} onView={(i)=>…} />` — `viewLabel` optional (omit it to show only the primary `Continue` CTA). Used on both `/home` and `/onboarding`.

The live component gallery (sidebar list + preview + code) is the home page, [src/app/page.tsx](src/app/page.tsx). The first gallery entry, **Design Tokens**, renders the full type scale / palette / gradients.

## Design tokens — ALWAYS use these (source of truth: Figma node `4547:4844`)
Defined as CSS variables + Tailwind utilities in [src/app/globals.css](src/app/globals.css). Never hardcode these hexes — use the token/utility.

**Typography (Geist)** — composable utilities (set font/size/line-height only; add a colour separately):
- `type-h1` — SemiBold 20/24 · `type-h2` — SemiBold 16/20 · `type-h3` — Medium 13/18
- `type-body-1` — Regular 13/18 · `type-body-2` — Regular 12/16 · `type-caption` — Medium 10/14 UPPERCASE

**Colours** (Tailwind classes): `text-primary` (#1d2025) · `text-secondary` (#7e8592) · `brand-primary` (#4764cd) · `surface-app` (#eff2fa, "primary-light") · `surface-muted` (#f2f2f5) · `border-divider` (#e5e5ea) · `success` (#22a12a) / `success-light` (#e3f3e2) · `danger` (#f44336) / `danger-light` (#ffe6e6) · `warning-default` (#e08a2d, "orange") / `warning-light` (#fef3c6) · `warning-amber` (#ffb300) · `accent-teal` (#87e6ed).

**Gradients** (utility classes): `bg-gradient-primary` (#4066f1→#5b7df4) · `bg-gradient-grey-dark` (#1d2025→#3c3f45) · `bg-gradient-grey-light` (#e8ebf9→#f8f9ff) · `bg-gradient-ice` (#f6fcff→#d9f4ff).

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
