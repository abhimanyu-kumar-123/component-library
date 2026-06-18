"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CaretLeft,
  Storefront,
  Receipt,
  MapPin,
  Truck,
} from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { RoundButton } from "@/components/ui/round-button";
import { SectionTitle } from "@/components/ui/section-title";
import { TextField, SelectField } from "@/components/ui/text-field";
import { Checkbox } from "@/components/ui/checkbox";

/* Indian states for the structured pickup-address dropdown. */
const STATES = [
  { label: "Andhra Pradesh", value: "AP" },
  { label: "Delhi", value: "DL" },
  { label: "Gujarat", value: "GJ" },
  { label: "Karnataka", value: "KA" },
  { label: "Maharashtra", value: "MH" },
  { label: "Rajasthan", value: "RJ" },
  { label: "Tamil Nadu", value: "TN" },
  { label: "Uttar Pradesh", value: "UP" },
  { label: "West Bengal", value: "WB" },
];

/* A valid GSTIN is 15 chars: 2 digits + 5 letters + 4 digits + 1 letter + 1
 * alnum + Z + 1 alnum. Loose check — empty is allowed (no inline error). */
const GSTIN_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}Z[0-9A-Z]{1}$/;

export default function StoreSettingsScreen() {
  const router = useRouter();
  const goBack = React.useCallback(() => router.back(), [router]);

  // ── Form state ──────────────────────────────────────────────────────
  const [storeName, setStoreName] = React.useState("Devika Textiles");
  const [gstin, setGstin] = React.useState("27ABCDE1234F1Z5");
  const [addressLine, setAddressLine] = React.useState(
    "Shop 14, MG Road, Andheri West"
  );
  const [city, setCity] = React.useState("Mumbai");
  const [state, setState] = React.useState("MH");
  const [pincode, setPincode] = React.useState("400058");
  const [cod, setCod] = React.useState(true);
  const [submitted, setSubmitted] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  // ── Validation (only surfaced after a save attempt) ─────────────────
  const storeNameError =
    submitted && storeName.trim().length === 0
      ? "Store name is required"
      : undefined;

  const gstinError =
    submitted && gstin.trim().length > 0 && !GSTIN_RE.test(gstin.trim().toUpperCase())
      ? "Enter a valid 15-digit GSTIN"
      : undefined;

  const addressError =
    submitted && addressLine.trim().length === 0
      ? "Pickup address is required"
      : undefined;

  const pincodeError =
    submitted && !/^[0-9]{6}$/.test(pincode.trim())
      ? "Enter a 6-digit pincode"
      : undefined;

  const isValid =
    !storeNameError && !gstinError && !addressError && !pincodeError;

  function handleSave() {
    setSubmitted(true);
    setSaved(false);
    const ok =
      storeName.trim().length > 0 &&
      addressLine.trim().length > 0 &&
      /^[0-9]{6}$/.test(pincode.trim()) &&
      (gstin.trim().length === 0 ||
        GSTIN_RE.test(gstin.trim().toUpperCase()));
    if (ok) setSaved(true);
  }

  // iOS Safari only fires CSS `:active` press states when a document touch
  // listener exists. This empty listener enables them.
  React.useEffect(() => {
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });
    return () => document.removeEventListener("touchstart", noop);
  }, []);

  return (
    <div className="bg-surface-app sm:flex sm:min-h-screen sm:items-center sm:justify-center sm:bg-neutral-200 sm:p-6">
      {/* Full-bleed on phones; framed on larger screens. */}
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-surface-app motion-safe:animate-screen-in sm:h-[852px] sm:w-[393px] sm:rounded-[44px] sm:shadow-2xl">
        {/* Header — back nav + centered title, padded below the status bar */}
        <div className="shrink-0 bg-surface-app pt-[env(safe-area-inset-top)]">
          <Header
            left={
              <RoundButton size="icon-md" aria-label="Go back" onClick={goBack}>
                <CaretLeft weight="bold" />
              </RoundButton>
            }
            center={
              <span className="type-h1 text-text-primary">Store settings</span>
            }
          />
        </div>

        {/* Scrollable content */}
        <main className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
          {/* Store profile */}
          <section className="space-y-3">
            <SectionTitle
              icon={<Storefront weight="fill" />}
              title="Store profile"
              subtext="How buyers see your store"
            />
            <div className="rounded-2xl bg-white p-4">
              <TextField
                label="Store name"
                placeholder="e.g. Devika Textiles"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                error={storeNameError}
              />
            </div>
          </section>

          {/* Tax / compliance */}
          <section className="space-y-3">
            <SectionTitle
              icon={<Receipt weight="fill" />}
              title="Tax details"
              subtext="Used on your invoices"
            />
            <div className="rounded-2xl bg-white p-4">
              <TextField
                label="GST number"
                placeholder="15-digit GSTIN"
                hint="15-digit GSTIN, e.g. 27ABCDE1234F1Z5"
                value={gstin}
                onChange={(e) => setGstin(e.target.value.toUpperCase())}
                error={gstinError}
                autoCapitalize="characters"
                maxLength={15}
              />
            </div>
          </section>

          {/* Pickup address */}
          <section className="space-y-3">
            <SectionTitle
              icon={<MapPin weight="fill" />}
              title="Pickup address"
              subtext="Where couriers collect orders"
            />
            <div className="space-y-4 rounded-2xl bg-white p-4">
              <TextField
                label="Address line"
                placeholder="Shop / building, street, area"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                error={addressError}
              />
              <TextField
                label="City"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <SelectField
                label="State"
                placeholder="Select state"
                options={STATES}
                value={state}
                onValueChange={setState}
              />
              <TextField
                label="Pincode"
                placeholder="6-digit pincode"
                inputMode="numeric"
                value={pincode}
                onChange={(e) =>
                  setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                error={pincodeError}
                maxLength={6}
              />
            </div>
          </section>

          {/* Fulfilment preferences */}
          <section className="space-y-3">
            <SectionTitle
              icon={<Truck weight="fill" />}
              title="Fulfilment"
              subtext="Payment options at checkout"
            />
            <button
              type="button"
              onClick={() => setCod((v) => !v)}
              className="flex w-full items-center justify-between gap-3 rounded-2xl bg-white p-4 text-left outline-none transition-colors active:bg-surface-muted"
            >
              <span className="flex min-w-0 flex-col gap-1">
                <span className="type-body-1 text-text-primary">
                  Accept Cash on Delivery
                </span>
                <span className="type-body-2 text-text-secondary">
                  Let buyers pay in cash when their order arrives
                </span>
              </span>
              <Checkbox
                checked={cod}
                onCheckedChange={setCod}
                aria-label="Accept Cash on Delivery"
                tabIndex={-1}
                className="pointer-events-none shrink-0"
              />
            </button>
          </section>

          {saved && isValid && (
            <p className="type-body-2 text-success">Store settings saved.</p>
          )}
        </main>

        {/* Sticky footer — Cancel (secondary) + Save (single primary CTA) */}
        <div className="shrink-0 border-t border-white bg-white pb-[env(safe-area-inset-bottom)]">
          <div className="flex items-center gap-3 px-4 py-3">
            <Button
              variant="secondary"
              size="lg"
              className="flex-1"
              onClick={goBack}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
