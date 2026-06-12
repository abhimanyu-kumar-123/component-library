"use client";

import { GalleryView, REGISTRY } from "@/app/page";

/**
 * Shareable component gallery for the team — the same library *without* the
 * internal "AI Design OS" layer. The full `/` gallery remains the source of truth.
 */
const SHARED = REGISTRY.filter((e) => e.slug !== "ai-design-os");

export default function ComponentsShare() {
  return <GalleryView entries={SHARED} label="Components" />;
}
