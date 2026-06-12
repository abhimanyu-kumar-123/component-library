import * as React from "react";

import { cn } from "@/lib/utils";

type UserThumbnailProps = React.ComponentProps<"span"> & {
  src: string;
  alt?: string;
  /** Show the brand-colored "story" ring. Defaults to false. */
  story?: boolean;
  /** Diameter in px (the outer ring). Defaults to 36. */
  size?: number;
};

/**
 * Circular avatar with an optional "story" ring.
 * - story:   brand-primary ring
 * - default: white ring
 */
function UserThumbnail({
  src,
  alt = "",
  story = false,
  size = 36,
  className,
  ...props
}: UserThumbnailProps) {
  return (
    <span
      data-slot="user-thumbnail"
      className={cn(
        "inline-block shrink-0 rounded-full p-[2px]",
        story ? "bg-brand-primary" : "bg-white",
        className
      )}
      style={{ width: size, height: size }}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={cn(
          "block size-full rounded-full object-cover",
          // white gap between the brand ring and the image
          story && "border-2 border-white"
        )}
      />
    </span>
  );
}

export { UserThumbnail };
