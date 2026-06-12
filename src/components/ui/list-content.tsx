import * as React from "react";
import { PlayCircle } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

type TableRow = { label: string; value: string };

type ListContentProps = {
  /** `text` paragraph · `image` row (last tile = video) · `table` rows. */
  variant: "text" | "image" | "table";
  className?: string;
  /** text variant */
  children?: React.ReactNode;
  /** image variant — up to 3 image URLs; the last is treated as a video. */
  images?: string[];
  /** table variant — label / value rows separated by dividers. */
  rows?: TableRow[];
};

/** Body content used inside a ListCard. */
function ListContent({
  variant,
  className,
  children,
  images = [],
  rows = [],
}: ListContentProps) {
  if (variant === "text") {
    return (
      <p
        data-slot="list-content"
        className={cn(
          "w-full text-[12px] font-normal leading-normal text-text-secondary",
          className
        )}
      >
        {children}
      </p>
    );
  }

  if (variant === "image") {
    return (
      <div data-slot="list-content" className={cn("flex w-full gap-2", className)}>
        {images.map((src, i) => (
          <div
            key={i}
            className="relative h-[60px] min-w-0 flex-1 overflow-hidden rounded-lg"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="size-full object-cover" />
            {i === images.length - 1 && (
              <span className="absolute inset-0 grid place-items-center bg-black/50 text-white">
                <PlayCircle weight="fill" className="size-4" />
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      data-slot="list-content"
      className={cn(
        "flex w-full flex-col gap-3 rounded-lg bg-white p-3",
        className
      )}
    >
      {rows.map((r, i) => (
        <React.Fragment key={i}>
          {i > 0 && <div className="h-px w-full bg-neutral-200/70" />}
          <div className="flex items-center justify-between gap-2 type-body-2 text-text-secondary">
            <span className="font-normal">{r.label}</span>
            <span className="whitespace-nowrap font-medium">{r.value}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export { ListContent };
