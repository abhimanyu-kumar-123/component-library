"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type StepStatus = "done" | "current" | "goal" | "upcoming";
export type Step = { label: React.ReactNode; status: StepStatus };

/** A single node on the track. */
function StepNode({ status }: { status: StepStatus }) {
  if (status === "done") {
    return <span className="size-2 shrink-0 rounded-full bg-brand-primary" />;
  }
  if (status === "current") {
    return (
      <span className="size-2 shrink-0 rounded-full border border-brand-primary bg-white" />
    );
  }
  if (status === "goal") {
    return (
      <span className="grid size-2 shrink-0 place-items-center rounded-full border border-brand-primary bg-white">
        <span className="size-0.5 rounded-full bg-brand-primary" />
      </span>
    );
  }
  return (
    <span className="size-2 shrink-0 rounded-full border border-border-divider bg-white" />
  );
}

/** The line between two nodes — solid once traversed, dotted ahead. */
function Connector({ filled }: { filled: boolean }) {
  return filled ? (
    <span className="h-px flex-1 rounded-full bg-brand-primary" />
  ) : (
    <span className="h-0 flex-1 border-t border-dotted border-brand-primary/50" />
  );
}

type StepperProps = {
  /** Ordered milestones; a segment is solid up to the first non-`done` node. */
  steps: Step[];
  className?: string;
};

/**
 * Horizontal progress stepper (Figma `5190:5838`). Nodes: `done` (filled),
 * `current` (ring), `goal` (target), `upcoming` (grey ring). The connector into
 * each node is solid when the previous node is `done`, dotted otherwise.
 * Labels sit under the track. Use for a short go-live / onboarding journey.
 */
function Stepper({ steps, className }: StepperProps) {
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <div className="flex items-center gap-1">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            {i > 0 && <Connector filled={steps[i - 1].status === "done"} />}
            <StepNode status={s.status} />
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center justify-between type-caption text-text-secondary">
        {steps.map((s, i) => (
          <span key={i}>{s.label}</span>
        ))}
      </div>
    </div>
  );
}

export { Stepper };
