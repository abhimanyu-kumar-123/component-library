import figma from "@figma/code-connect";

import { RadioGroup } from "./radio-group";

/** Code Connect — RadioGroup (Figma 4809:9694). Options are data-driven in code. */
figma.connect(
  RadioGroup,
  "https://www.figma.com/design/4PdQxX6BUGkJEJ1xQTAb37/Chat-UX?node-id=4809-9694",
  {
    example: () => (
      <RadioGroup
        defaultValue="a"
        options={[
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" },
        ]}
      />
    ),
  }
);
