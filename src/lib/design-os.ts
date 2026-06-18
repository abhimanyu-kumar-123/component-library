/**
 * ════════════════════════════════════════════════════════════════════════
 *  AI DESIGN OPERATING SYSTEM — machine-readable manifest
 * ════════════════════════════════════════════════════════════════════════
 *
 *  This turns the *visual* component library into a system an AI can REASON
 *  about. It encodes the four intelligence layers on top of the raw inventory:
 *
 *    1. Component Intelligence — when to use / avoid each component, priority,
 *       emotional tone, what it pairs with.
 *    2. Pattern Library — proven compositions (which components + which layout).
 *    3. Layout Rules Engine — layout archetypes with explicit rules.
 *    4. Token System — the only allowed spacing / radius / shadow / colour /
 *       type / gradient values. AI must NEVER invent these.
 *
 *  Pipeline this enables:
 *    Product intent → pick layout archetype → pick pattern → assemble from
 *    components (obeying their intelligence) → style only with tokens →
 *    production-ready, consistent UI.
 *
 *  Source of truth. Rendered live in the gallery ("AI Design OS") and
 *  summarised for the model in AGENTS.md.
 */

/* ── 1. COMPONENT INTELLIGENCE LAYER ─────────────────────────────────── */

export type Priority = "high" | "medium" | "low";

export type ComponentIntel = {
  /** Matches the gallery slug / component file. */
  slug: string;
  name: string;
  /** What this component is *for* (one line). */
  purpose: string;
  /** Choose it when… */
  useWhen: string[];
  /** Reach for something else when… */
  avoidWhen: string[];
  /** Visual weight in a layout. high = anchors the screen. */
  priority: Priority;
  /** The feeling it should evoke — guides copy + placement. */
  emotionalTone: string[];
  /** Components it commonly composes with. */
  pairsWith?: string[];
};

export const COMPONENTS: ComponentIntel[] = [
  {
    slug: "button",
    name: "Button",
    purpose: "Trigger an action or move a flow forward.",
    useWhen: ["The single main action on a screen", "Submitting a form", "Confirming in a sheet", "On-dark surfaces use the on-dark / on-dark-secondary variants (e.g. ActionDeck)"],
    avoidWhen: ["Navigating between screens (use RoundButton/Header)", "Inline text links", "on-dark variants on a light background (use primary/secondary)"],
    priority: "high",
    emotionalTone: ["confident", "clear"],
    pairsWith: ["BottomSheet", "ListCard", "SectionTitle"],
  },
  {
    slug: "round-button",
    name: "RoundButton",
    purpose: "Icon-only action in toolbars, headers and sheets.",
    useWhen: ["Header/back/close actions", "Compact icon-only controls"],
    avoidWhen: ["A primary text CTA (use Button)"],
    priority: "medium",
    emotionalTone: ["quiet", "utilitarian"],
    pairsWith: ["Header", "BottomNav", "BottomSheet"],
  },
  {
    slug: "section-title",
    name: "SectionTitle",
    purpose: "Label and group a section of content.",
    useWhen: ["Above every home/onboarding section", "When a section needs a 'View all' CTA"],
    avoidWhen: ["As the page title (use Header center)"],
    priority: "high",
    emotionalTone: ["organised", "calm"],
    pairsWith: ["ActionDeck", "Card", "ListCard", "ArtifactCard"],
  },
  {
    slug: "pill",
    name: "Pill",
    purpose: "Show status, category or a count as a small badge.",
    useWhen: ["Status (in-progress/completed)", "Type/category tag", "Risk/severity"],
    avoidWhen: ["Clickable filters (use SelectorPill)", "Long text"],
    priority: "medium",
    emotionalTone: ["informative", "calm"],
    pairsWith: ["ArtifactCard", "CollapsibleCard", "Card"],
  },
  {
    slug: "selector-pill",
    name: "SelectorPill",
    purpose: "Toggle a quick filter on a glass surface.",
    useWhen: ["Quick filters above a grid/list", "Single- or multi-select chips"],
    avoidWhen: ["Primary actions", "Showing static status (use Pill)"],
    priority: "low",
    emotionalTone: ["light", "responsive"],
    pairsWith: ["ArtifactCard"],
  },
  {
    slug: "dropdown",
    name: "Dropdown",
    purpose: "Compact glass selector/filter in a header or toolbar.",
    useWhen: ["Filter a list (date range, segment)", "Toolbar selector"],
    avoidWhen: ["A form field (use SelectField)"],
    priority: "medium",
    emotionalTone: ["lightweight"],
    pairsWith: ["Header", "Switch"],
  },
  {
    slug: "switch",
    name: "Switch",
    purpose: "Switch between 2–3 mutually exclusive views.",
    useWhen: ["Tab-like view switch (Chat/Activity)", "A small set of modes"],
    avoidWhen: ["Many options (use SelectField)", "An on/off setting"],
    priority: "medium",
    emotionalTone: ["efficient", "calm"],
    pairsWith: ["Header"],
  },
  {
    slug: "text-field",
    name: "TextField / SelectField",
    purpose: "Collect typed or selected input in a form.",
    useWhen: ["Forms, KYC, settings", "Anything the user must fill in"],
    avoidWhen: ["Filtering (use Dropdown/SelectorPill)"],
    priority: "high",
    emotionalTone: ["trustworthy", "clear"],
    pairsWith: ["BottomSheet", "Button", "SectionTitle"],
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    purpose: "Toggle a single boolean choice (opt-in / agree / multi-select).",
    useWhen: ["Consent / agree toggles", "Multi-select option lists", "A standalone yes/no in a form"],
    avoidWhen: ["Mutually-exclusive choices (use RadioGroup)", "Segmented either/or (use Switch)"],
    priority: "low",
    emotionalTone: ["clear", "trustworthy"],
    pairsWith: ["TextField", "RadioGroup", "BottomSheet"],
  },
  {
    slug: "radio-group",
    name: "RadioGroup",
    purpose: "Pick exactly one option from a short list.",
    useWhen: ["Single-select within a form", "2–5 mutually-exclusive options"],
    avoidWhen: ["Multi-select (use Checkbox)", "Filtering (use SelectorPill)", "Many options (use SelectField)"],
    priority: "low",
    emotionalTone: ["clear"],
    pairsWith: ["TextField", "Checkbox", "BottomSheet"],
  },
  {
    slug: "toggle",
    name: "Toggle",
    purpose: "Flip a single on/off setting inline (pill track + sliding knob).",
    useWhen: ["A binary on/off preference in settings/forms", "Cash-on-delivery, notifications, store visibility"],
    avoidWhen: ["Choosing between 2–3 views (use Switch)", "Multi-select (use Checkbox)", "Single-select from a list (use RadioGroup)"],
    priority: "low",
    emotionalTone: ["effortless", "clear"],
    pairsWith: ["SectionTitle", "TextField"],
  },
  {
    slug: "bottom-sheet",
    name: "BottomSheet",
    purpose: "A focused task, form or preview without leaving the screen.",
    useWhen: ["Quick form", "Preview + confirm", "Contextual actions"],
    avoidWhen: ["Full screen navigation (use a route)", "Trivial confirmations"],
    priority: "high",
    emotionalTone: ["focused", "calm"],
    pairsWith: ["TextField", "SelectField", "Button", "RoundButton"],
  },
  {
    slug: "artifact-card",
    name: "ArtifactCard",
    purpose: "Represent a generated AI artifact and its progress.",
    useWhen: ["Artifacts / collections grid", "Encouraging resume/continue"],
    avoidWhen: ["Generic content cards (use Card)"],
    priority: "medium",
    emotionalTone: ["encouraging", "momentum"],
    pairsWith: ["Pill", "SelectorPill", "BottomSheet"],
  },
  {
    slug: "data-card",
    name: "DataCard",
    purpose: "Present one or more KPIs/metrics on a glass surface.",
    useWhen: ["Performance metrics (orders, GMV, spends)", "Single / double / triple metric tiles", "Customer star ratings"],
    avoidWhen: ["Long tabular data", "Narrative content (use Card)"],
    priority: "high",
    emotionalTone: ["informative", "confident"],
    pairsWith: ["ProgressBar", "Pill", "SectionTitle", "Switch"],
  },
  {
    slug: "progress-bar",
    name: "ProgressBar",
    purpose: "Show completion or budget consumption as a light→solid gradient bar.",
    useWhen: ["Budget / spend usage", "Step or goal completion", "Inside a DataCard metric"],
    avoidWhen: ["Indeterminate loading without a value", "Ratings (use DataCard ratings)"],
    priority: "low",
    emotionalTone: ["informative"],
    pairsWith: ["DataCard"],
  },
  {
    slug: "stepper",
    name: "Stepper",
    purpose: "Show progress across a few ordered milestones on a horizontal track.",
    useWhen: ["Go-live / onboarding progress", "A 3–5 step linear journey toward a goal"],
    avoidWhen: ["A long task list (use a vertical timeline of cards)", "A single percentage (use ProgressBar)"],
    priority: "low",
    emotionalTone: ["reassuring", "momentum"],
    pairsWith: ["Pill", "SectionTitle"],
  },
  {
    slug: "action-deck",
    name: "ActionDeck",
    purpose: "Surface a rotating stack of priority notifications with a clear next step.",
    useWhen: ["'Action Needed' on home/onboarding", "A small set of urgent items"],
    avoidWhen: ["A long, browsable list (use a feed of Cards)"],
    priority: "high",
    emotionalTone: ["urgent-but-calm", "motivating"],
    pairsWith: ["SectionTitle", "Card", "Pill"],
  },
  {
    slug: "card",
    name: "Card (blue / white)",
    purpose: "Surface a notification (blue, stacked) or an activity item (white).",
    useWhen: ["Activity feed item", "Notification deck", "Icon + content row"],
    avoidWhen: ["Artifacts (use ArtifactCard)", "Form sections"],
    priority: "medium",
    emotionalTone: ["informative"],
    pairsWith: ["BlueCardBackground", "Pill", "Button"],
  },
  {
    slug: "blue-card-background",
    name: "BlueCardBackground",
    purpose: "A decorative blue gradient surface for a prominent, high-priority card.",
    useWhen: ["The single hero / next-step card on a screen", "Strategy summary highlight", "Stacked notification deck (back / middle / front)"],
    avoidWhen: ["Routine content (use Card white)", "More than one focal card per screen"],
    priority: "high",
    emotionalTone: ["premium", "focal"],
    pairsWith: ["Button", "Pill", "Card"],
  },
  {
    slug: "collapsible-card",
    name: "CollapsibleCard",
    purpose: "Group tasks under an expandable strategy header.",
    useWhen: ["Weekly strategy", "Grouped multi-step work"],
    avoidWhen: ["A single standalone item (use ListCard)"],
    priority: "medium",
    emotionalTone: ["organised"],
    pairsWith: ["ListCard", "ListContent", "Pill"],
  },
  {
    slug: "list-card",
    name: "ListCard",
    purpose: "A task/strategy item with a status header and action row.",
    useWhen: ["Pending/ongoing tasks", "Steps inside a strategy"],
    avoidWhen: ["Notifications (use Card)"],
    priority: "medium",
    emotionalTone: ["actionable"],
    pairsWith: ["ListContent", "CollapsibleCard"],
  },
  {
    slug: "section-card",
    name: "SectionCard",
    purpose: "A glass card with the section title inset in its header, wrapping related content.",
    useWhen: ["A self-contained section block (Recent conversation, Your journey)", "When the title belongs inside the card, not above it"],
    avoidWhen: ["A header above separate cards (use SectionTitle)", "A single metric (use DataCard)"],
    priority: "medium",
    emotionalTone: ["organised", "contained"],
    pairsWith: ["Pill", "InfoNote", "SectionTitle"],
  },
  {
    slug: "callback-bar",
    name: "CallbackBar",
    purpose: "Offer a one-tap callback from a human POC, pinned at the bottom of a screen.",
    useWhen: ["Onboarding help ('Call <POC>')", "An assistance prompt floating above the nav"],
    avoidWhen: ["Mid-content rows (use Card)", "Anything not pinned directly above BottomNav"],
    priority: "low",
    emotionalTone: ["reassuring", "supportive"],
    pairsWith: ["BottomNav"],
  },
  {
    slug: "info-note",
    name: "InfoNote",
    purpose: "A calm, muted inline aside (Info icon + secondary text) under a card/section.",
    useWhen: ["A passive contextual note ('This was discussed…')", "A subtle 'why' under a value or list"],
    avoidWhen: ["Warnings/errors (use a Pill / field error)", "Primary content"],
    priority: "low",
    emotionalTone: ["calm", "informative"],
    pairsWith: ["SectionTitle", "Stepper", "Card"],
  },
  {
    slug: "list-content",
    name: "ListContent",
    purpose: "The body of a ListCard — text, an image/media row, or a key/value table.",
    useWhen: ["Inside a ListCard", "Showing AWBs, price tables, or media tied to a task"],
    avoidWhen: ["Standalone (it always lives inside a ListCard)"],
    priority: "low",
    emotionalTone: ["informative"],
    pairsWith: ["ListCard", "CollapsibleCard"],
  },
  {
    slug: "strategy-card",
    name: "StrategyCard",
    purpose: "Summarise a channel strategy with stats and a schedule.",
    useWhen: ["Home strategy summary", "Channel performance recap"],
    avoidWhen: ["Generic cards"],
    priority: "low",
    emotionalTone: ["confident"],
  },
  {
    slug: "header",
    name: "Header",
    purpose: "Top app-bar: identity, back, title and screen actions.",
    useWhen: ["Top of every screen"],
    avoidWhen: ["Inline section labels (use SectionTitle)"],
    priority: "high",
    emotionalTone: ["stable"],
    pairsWith: ["RoundButton", "Switch", "UserThumbnail"],
  },
  {
    slug: "bottom-nav",
    name: "BottomNav",
    purpose: "Primary navigation + 'ask anything' entry point.",
    useWhen: ["Home and main browsing screens"],
    avoidWhen: ["Modal / single-task flows"],
    priority: "medium",
    emotionalTone: ["accessible"],
  },
  {
    slug: "chat-bar",
    name: "ChatBar",
    purpose: "Compose and send a chat message.",
    useWhen: ["The chat screen input"],
    avoidWhen: ["Forms (use TextField)"],
    priority: "high",
    emotionalTone: ["inviting"],
  },
  {
    slug: "chat-bubble",
    name: "ChatBubble",
    purpose: "Show one chat message (AI or user).",
    useWhen: ["A conversation thread"],
    avoidWhen: ["Notifications (use Card)"],
    priority: "medium",
    emotionalTone: ["conversational"],
  },
  {
    slug: "report-chip",
    name: "ReportChip",
    purpose: "Inline report/file attachment delivered inside an AI chat bubble.",
    useWhen: [
      "AI finished generating a report from chat",
      "Linking a chat message to its Collections artifact",
    ],
    avoidWhen: ["Generic links (use a ghost Button)", "Status badges (use Pill)"],
    priority: "medium",
    emotionalTone: ["accomplished", "tangible"],
    pairsWith: ["ChatBubble", "BottomSheet", "ArtifactCard"],
  },
  {
    slug: "user-thumbnail",
    name: "UserThumbnail",
    purpose: "Represent a person or brand as an avatar.",
    useWhen: ["Header identity", "Story ring entry point"],
    avoidWhen: ["Decorative imagery"],
    priority: "low",
    emotionalTone: ["personal"],
  },
];

/* ── 2. PATTERN LIBRARY LAYER ────────────────────────────────────────── */

export type Pattern = {
  name: string;
  intent: string;
  /** Layout archetype it lives in (see LAYOUT_RULES). */
  layout: string;
  /** Components, in composition order. */
  components: string[];
  notes?: string;
};

export const PATTERNS: Pattern[] = [
  {
    name: "Mobile screen scaffold",
    intent: "Every screen's skeleton.",
    layout: "*",
    components: ["frame", "Header", "main (scroll)", "BottomNav | sticky footer"],
    notes:
      "Outer: bg + sm-only centering. Frame: relative h-[100dvh] overflow-hidden, sm:h-[852px] sm:w-[393px] sm:rounded-[44px]. Header + nav are shrink-0 with safe-area padding; main is flex-1 overflow-y-auto.",
  },
  {
    name: "Home section",
    intent: "A labelled, scannable block in a feed.",
    layout: "mobile_home_feed",
    components: ["SectionTitle", "content (cards / deck / list)"],
    notes: "SectionTitle on top, 24px between sections, 12px between cards.",
  },
  {
    name: "Action Needed deck",
    intent: "Drive attention + continuation on urgent items.",
    layout: "mobile_home_feed",
    components: ["SectionTitle", "ActionDeck"],
    notes: "One primary 'Continue' CTA; cards rotate; route the CTA to chat.",
  },
  {
    name: "Form in a sheet",
    intent: "Collect a few inputs without leaving context.",
    layout: "modal_sheet",
    components: ["BottomSheet", "TextField / SelectField ×N", "Button footer (secondary + primary)"],
    notes: "Label-on-top fields, 16px field gap, single primary CTA.",
  },
  {
    name: "Artifacts grid",
    intent: "Browse generated artifacts and resume them.",
    layout: "mobile_grid",
    components: ["Header", "SelectorPill filters", "grid of ArtifactCard", "BottomSheet preview"],
    notes: "2-col uniform grid, 12px gap; tap a card → preview sheet → Continue.",
  },
  {
    name: "Notification deck",
    intent: "A stacked deck of notifications with depth.",
    layout: "mobile_home_feed",
    components: ["BlueCardBackground (back/middle)", "Card (blue, front)"],
  },
  {
    name: "Strategy list",
    intent: "Grouped, expandable multi-step work.",
    layout: "mobile_home_feed",
    components: ["CollapsibleCard", "ListCard", "ListContent", "Pill"],
  },
  {
    name: "Conversation",
    intent: "Two-party chat with a composer.",
    layout: "mobile_conversational",
    components: ["Header (Switch center)", "ChatBubble ×N", "ChatBar (sticky)"],
  },
];

/* ── 3. LAYOUT RULES ENGINE ──────────────────────────────────────────── */

export type LayoutRule = {
  type: string;
  description: string;
  rules: string[];
};

/** Rules that apply to EVERY mobile screen. */
export const GLOBAL_LAYOUT_RULES: string[] = [
  "16px horizontal padding (px-4) on content",
  "24px between sections (space-y-6); 12px between sibling cards (gap-3)",
  "Exactly one primary (gradient) CTA visible per screen",
  "Max 2 hierarchy levels inside a single card",
  "Sticky Header with a white divider; bottom interaction is sticky",
  "Respect safe-area insets (top + bottom)",
  "Style only with tokens — never invent spacing, radius, shadow or colour",
];

export const LAYOUT_RULES: LayoutRule[] = [
  {
    type: "mobile_conversational",
    description: "Chat-style screen built around a single thread + composer.",
    rules: [
      "Single primary CTA",
      "Bottom-sticky interaction (ChatBar)",
      "Max 2 hierarchy levels",
      "16px horizontal padding",
      "Messages cap at 80% width",
    ],
  },
  {
    type: "mobile_home_feed",
    description: "Scrollable feed of labelled sections (home / onboarding).",
    rules: [
      "Each section starts with a SectionTitle",
      "24px section spacing, 12px card gap",
      "White cards on the surface-app background",
      "Sticky Header + BottomNav",
    ],
  },
  {
    type: "mobile_form",
    description: "Data entry — standalone or inside a sheet.",
    rules: [
      "Label-on-top fields, 16px field gap",
      "Group related fields; one section = one decision",
      "Footer = secondary + single primary",
      "Inline validation, never a blocking alert",
    ],
  },
  {
    type: "mobile_grid",
    description: "Browsable 2-column grid of uniform cards.",
    rules: [
      "2 columns, 12px gap, uniform card size",
      "Quick filters (SelectorPill) directly under the header",
      "Tap a card → detail/preview sheet",
    ],
  },
  {
    type: "modal_sheet",
    description: "Bottom sheet overlaying the current screen.",
    rules: [
      "Floats 4px off the left/right/bottom; grows up to 4px from the top",
      "Sticky header (grabber + back/close) and sticky footer",
      "Body scrolls below the header — content never overlaps the close",
      "Footer = secondary + single primary",
    ],
  },
];

/* ── 4. TOKEN SYSTEM ─────────────────────────────────────────────────── */
/* AI must NEVER invent these. Everything resolves to a token. */

export const TOKENS = {
  spacing: {
    rule: "Use only this step scale (Tailwind units). No arbitrary px gaps.",
    scale: {
      "1 (4px)": "tight — icon ↔ label",
      "2 (8px)": "intra-group",
      "2.5 (10px)": "card inner padding (compact)",
      "3 (12px)": "card gap / grid gap",
      "4 (16px)": "screen gutter (px-4), card padding",
      "5 (20px)": "comfortable block padding",
      "6 (24px)": "section spacing",
    },
  },
  radius: {
    rule: "Map element → radius. No arbitrary radii except the frame/sheet.",
    scale: {
      "rounded-md (6px)": "pills / small chips",
      "rounded-lg (8px)": "inputs, buttons, footer buttons",
      "rounded-xl (12px)": "thumbnails, inner tiles",
      "rounded-2xl (16px)": "cards",
      "rounded-3xl (24px)": "large / feature cards, section blocks",
      "rounded-[20px]": "bottom sheet",
      "rounded-[44px]": "phone frame",
      "rounded-full": "pills, avatars, round buttons",
    },
  },
  shadow: {
    rule: "Use the elevation utilities, not arbitrary box-shadows.",
    scale: {
      "shadow-glass": "glass pills / buttons — 0 10 20 /.1",
      "shadow-card": "resting white card — 0 10 20 /.05",
      "shadow-lift": "hover lift — 0 14 28 /.08",
      "shadow-sheet": "bottom sheet — 0 0 70 /.1",
      "shadow-inset-glass": "glass top sheen — inset 0 1 1 white/.5",
    },
  },
  color: {
    rule: "Use the colour tokens (see AGENTS.md). Never hardcode hexes.",
    tokens: [
      "text-primary", "text-secondary", "brand-primary",
      "surface-app", "surface-muted", "border-divider",
      "success / success-light / success-soft",
      "danger / danger-light / danger-soft",
      "warning-default / warning-light / warning-amber",
      "accent-teal", "accent-violet / accent-violet-light",
    ],
  },
  typography: {
    rule: "Use the type-* utilities (Geist). Never set ad-hoc font sizes.",
    scale: {
      "type-h1": "SemiBold 20/24",
      "type-h2": "SemiBold 16/20",
      "type-h3": "Medium 13/18",
      "type-body-1": "Regular 13/18",
      "type-body-2": "Regular 12/16",
      "type-caption": "Medium 10/14 UPPERCASE",
    },
  },
  gradient: {
    rule: "Use the gradient utilities.",
    scale: {
      "bg-gradient-primary": "#4066f1 → #5b7df4 (primary actions)",
      "bg-gradient-grey-dark": "#1d2025 → #3c3f45 (dark surfaces)",
      "bg-gradient-grey-light": "#e8ebf9 → #f8f9ff",
      "bg-gradient-ice": "#f6fcff → #d9f4ff",
    },
  },
} as const;

/** The reasoning pipeline this manifest enables, for display. */
export const PIPELINE = [
  "Product intent",
  "Pick a layout archetype (Layout Rules Engine)",
  "Pick a pattern (Pattern Library)",
  "Assemble from components (obey Component Intelligence)",
  "Style only with tokens (Token System)",
  "Production-ready, consistent UI",
];
