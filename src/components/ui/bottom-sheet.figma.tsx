import figma from "@figma/code-connect";

import { BottomSheet } from "./bottom-sheet";

/** Code Connect — BottomSheet (Figma 4626:1015). Property names best-effort. */
figma.connect(
  BottomSheet,
  "https://www.figma.com/design/4PdQxX6BUGkJEJ1xQTAb37/Chat-UX?node-id=4626-1015",
  {
    props: {
      title: figma.string("Title"),
      description: figma.string("Description"),
    },
    example: ({ title, description }) => (
      <BottomSheet
        open
        onOpenChange={() => {}}
        title={title}
        description={description}
        primaryLabel="Continue"
      >
        {/* sheet body */}
      </BottomSheet>
    ),
  }
);
