import * as React from "react";

import { cn } from "@/lib/utils";

type HeaderProps = React.ComponentProps<"header"> & {
  left?: React.ReactNode;
  /** Absolutely centered content (e.g. a title or a Switch). */
  center?: React.ReactNode;
  right?: React.ReactNode;
};

/**
 * Top app-bar shell. Surface + bottom divider, with three slots.
 * `center` is optically centered regardless of the width of `left`/`right`.
 *
 * Compose the Figma variants:
 *  - home:        <Header left={<UserBlock/>} right={<RoundButton/>} />
 *  - with back:   <Header left={<RoundButton/>} center="Title" right={<RoundButton/>} />
 *  - with switch: <Header left={<RoundButton/>} center={<Switch/>} right={<RoundButton/>} />
 */
function Header({ left, center, right, className, ...props }: HeaderProps) {
  return (
    <header
      data-slot="header"
      className={cn(
        "relative flex w-full items-center justify-between border-b border-white bg-surface-app px-4 py-3",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-2">{left}</div>

      {center != null && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center type-h2 text-text-primary [&_*]:pointer-events-auto">
          {center}
        </div>
      )}

      <div className="flex min-w-0 items-center gap-2">{right}</div>
    </header>
  );
}

export { Header };
