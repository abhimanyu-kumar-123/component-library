import figma from "@figma/code-connect";

import { ReportChip } from "./report-chip";

/** Code Connect — ReportChip (Figma 4929:11765). */
figma.connect(
  ReportChip,
  "https://www.figma.com/design/4PdQxX6BUGkJEJ1xQTAb37/Chat-UX?node-id=4929-11765",
  {
    props: {
      name: figma.string("File name"),
    },
    example: ({ name }) => <ReportChip name={name} />,
  }
);
