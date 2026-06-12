import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-white bg-white/60 p-8 shadow-[0px_5px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm">
        <div className="flex flex-col gap-1.5 text-center">
          <h1 className="text-xl font-semibold text-text-primary">
            Welcome back
          </h1>
          <p className="text-sm text-neutral-500">
            Log in to your account to continue.
          </p>
        </div>

        <form className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-[13px] font-medium text-text-primary"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="h-10 rounded-lg border border-neutral-200 bg-white px-3 text-[13px] text-text-primary outline-none transition-shadow placeholder:text-neutral-400 focus-visible:ring-[3px] focus-visible:ring-accent-violet-light"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-[13px] font-medium text-text-primary"
              >
                Password
              </label>
              <Link
                href="#"
                className="text-[12px] text-neutral-500 hover:text-text-primary"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="h-10 rounded-lg border border-neutral-200 bg-white px-3 text-[13px] text-text-primary outline-none transition-shadow placeholder:text-neutral-400 focus-visible:ring-[3px] focus-visible:ring-accent-violet-light"
            />
          </div>

          <Button type="submit" variant="primary" size="lg" className="mt-2 w-full">
            Log in
          </Button>

          <div className="flex items-center gap-3 py-1">
            <span className="h-px flex-1 bg-neutral-200" />
            <span className="text-[12px] text-neutral-400">or</span>
            <span className="h-px flex-1 bg-neutral-200" />
          </div>

          <Button variant="secondary" size="lg" className="w-full">
            Continue with Google
          </Button>
        </form>

        <p className="mt-6 text-center text-[13px] text-neutral-500">
          Don&apos;t have an account?{" "}
          <Link href="#" className="font-medium text-text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
