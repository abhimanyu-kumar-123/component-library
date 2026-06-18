import figma from "@figma/code-connect";

import { Button } from "./button";

/**
 * Code Connect — Button.
 * Figma property names (Variant/Size/Label) are best-effort, authored from the
 * code props + the Figma node. Verify exact names on the first publish
 * (`npm run figma:connect:dry`). Requires an Org/Enterprise Dev seat.
 */
figma.connect(
  Button,
  "https://www.figma.com/design/4PdQxX6BUGkJEJ1xQTAb37/Chat-UX?node-id=4267-5147",
  {
    props: {
      label: figma.string("Label"),
      variant: figma.enum("Variant", {
        Primary: "primary",
        Secondary: "secondary",
        Ghost: "ghost",
        Destructive: "destructive",
        "Destructive Secondary": "destructive-secondary",
      }),
      size: figma.enum("Size", {
        Large: "lg",
        Medium: "md",
        Small: "sm",
      }),
    },
    example: ({ label, variant, size }) => (
      <Button variant={variant} size={size}>
        {label}
      </Button>
    ),
  }
);
