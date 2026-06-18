import figma from "@figma/code-connect";

import { SectionTitle } from "./section-title";

/** Code Connect — SectionTitle (Figma 4547:4923). Property names best-effort. */
figma.connect(
  SectionTitle,
  "https://www.figma.com/design/4PdQxX6BUGkJEJ1xQTAb37/Chat-UX?node-id=4547-4923",
  {
    props: {
      title: figma.string("Title"),
      subtext: figma.string("Subtext"),
    },
    example: ({ title, subtext }) => (
      <SectionTitle title={title} subtext={subtext} />
    ),
  }
);
