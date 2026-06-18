import figma from "@figma/code-connect";

import { ProgressBar } from "./progress-bar";

/** Code Connect — ProgressBar (Figma 4909:4892). `value` is data-driven in code. */
figma.connect(
  ProgressBar,
  "https://www.figma.com/design/4PdQxX6BUGkJEJ1xQTAb37/Chat-UX?node-id=4909-4892",
  {
    props: {
      tone: figma.enum("Tone", {
        Orange: "orange",
        Blue: "blue",
        Red: "red",
        Green: "green",
      }),
    },
    example: ({ tone }) => <ProgressBar value={53} tone={tone} />,
  }
);
