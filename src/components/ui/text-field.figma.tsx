import figma from "@figma/code-connect";

import { TextField } from "./text-field";

/** Code Connect — TextField (Figma 4586:931). Property names best-effort. */
figma.connect(
  TextField,
  "https://www.figma.com/design/4PdQxX6BUGkJEJ1xQTAb37/Chat-UX?node-id=4586-931",
  {
    props: {
      label: figma.string("Label"),
      hint: figma.string("Hint"),
    },
    example: ({ label, hint }) => <TextField label={label} hint={hint} />,
  }
);
