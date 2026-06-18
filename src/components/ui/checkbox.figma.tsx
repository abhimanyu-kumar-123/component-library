import figma from "@figma/code-connect";

import { Checkbox } from "./checkbox";

/** Code Connect — Checkbox (Figma 4809:9693). Property names best-effort. */
figma.connect(
  Checkbox,
  "https://www.figma.com/design/4PdQxX6BUGkJEJ1xQTAb37/Chat-UX?node-id=4809-9693",
  {
    props: {
      label: figma.string("Label"),
      checked: figma.boolean("Selected"),
    },
    example: ({ label, checked }) => <Checkbox label={label} checked={checked} />,
  }
);
