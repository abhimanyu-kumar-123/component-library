import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Design System — Button",
  description: "Button component synced from Figma (Chat UX)",
  appleWebApp: {
    capable: true,
    title: "Home",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Lock the scale so iOS Safari can't auto-zoom when focusing a <16px input.
  maximumScale: 1,
  userScalable: false,
  // Let content extend into the Dynamic Island / home-indicator regions so
  // env(safe-area-inset-*) is usable on iPhone.
  viewportFit: "cover",
  themeColor: "#eff2fa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
