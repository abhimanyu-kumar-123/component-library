# Figma Code Connect

Maps Figma components → these React components so designers get the real
component + props (not a screenshot) in Figma Dev Mode, and prototypes start
from real code. This is Pillar 2 of the design-system roadmap (design ↔ code
round-trip).

## Status

⚠️ **Authored, not yet published.** Code Connect requires a **Dev seat on a
Figma Organization or Enterprise plan** (current seat: Pro). Once a Dev seat is
available:

```bash
export FIGMA_ACCESS_TOKEN=<token>
npm run figma:connect:dry   # validate the mappings (no publish)
npm run figma:connect       # publish to the Figma library
```

`figma:connect:dry` will also confirm the **Figma property names** in each
`*.figma.tsx` (`Variant`, `Size`, `Label`, `Selected`, `Tone`, etc.). They were
authored best-effort from the code props; fix any mismatches the dry run reports.

## How it's set up

- **`figma.config.json`** — `parser: react`, includes `src/components/ui/**/*.figma.tsx`,
  and rewrites snippet imports to the `@/components/ui/*` alias.
- **`*.figma.tsx`** — colocated with each component; uses `figma.connect()`.
- **tsconfig** excludes `**/*.figma.tsx` so they're never bundled by Next or
  type-checked by the app build (they're tooling, not app code).
- **`@figma/code-connect`** is a devDependency.

## Mapped components

| Component    | Figma node   | File                          |
| ------------ | ------------ | ----------------------------- |
| Button       | `4267:5147`  | `button.figma.tsx`            |
| Checkbox     | `4809:9693`  | `checkbox.figma.tsx`          |
| RadioGroup   | `4809:9694`  | `radio-group.figma.tsx`       |
| ProgressBar  | `4909:4892`  | `progress-bar.figma.tsx`      |
| ReportChip   | `4929:11765` | `report-chip.figma.tsx`       |
| SectionTitle | `4547:4923`  | `section-title.figma.tsx`     |
| TextField    | `4586:931`   | `text-field.figma.tsx`        |
| BottomSheet  | `4626:1015`  | `bottom-sheet.figma.tsx`      |

Figma file: `4PdQxX6BUGkJEJ1xQTAb37` (Chat UX).

## Adding a new mapping

1. Create `src/components/ui/<name>.figma.tsx`.
2. `figma.connect(<Component>, "<figma-url-with-node-id>", { props, example })`.
3. Map Figma props with `figma.string / figma.enum / figma.boolean / figma.instance`.
4. `npm run figma:connect:dry` to validate, then `npm run figma:connect`.
