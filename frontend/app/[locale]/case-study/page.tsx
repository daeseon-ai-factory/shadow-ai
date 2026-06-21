"use client";

import { useQuery } from "@tanstack/react-query";
import { Link } from "@/i18n/navigation";
import { healthApi } from "@/lib/api/health";

/**
 * Public, recruiter-facing case study for Mimi. Unlike /learn (private study notes), this page is
 * meant to be linked from a portfolio: it shows the live product, a browser demo, the system
 * architecture, and the engineering decisions behind it — in English, mobile-first. The backend
 * "live" pill is a real health check so the page proves the system is actually running.
 */

const GITHUB = "https://github.com/Daeseon-AI-Factory/shadow-ai";
const TESTFLIGHT = "https://testflight.apple.com/join/3YJtQwnP";

const STACK = [
  "Spring Boot 3 (Java 21)",
  "PostgreSQL",
  "React Native (Expo SDK 56)",
  "Next.js 16",
  "TypeScript",
  "Gemini · OpenAI · Claude",
  "Docker · Caddy",
  "Terraform",
  "EAS Build / Submit",
  "yt-dlp + POToken",
];

const ARCH = [
  {
    layer: "Clients",
    detail:
      "iOS app (React Native / Expo) shipped to the App Store, plus a Next.js web app — both built from one npm-workspaces monorepo with a shared @shadow-ai/core package (API client, types, spaced-repetition logic).",
  },
  {
    layer: "Backend",
    detail:
      "Spring Boot 3 / Java 21, layered as api → application → domain → infrastructure. JWT auth, per-user data isolation, OpenAPI-documented, rate-limited. SM-2 spaced repetition computed server-side.",
  },
  {
    layer: "AI",
    detail:
      "A CompositeAiClient with provider fallback: Gemini → OpenAI → Claude. If one provider errors or rate-limits, the next takes over, so sentence mining and the scenario grader degrade gracefully instead of failing.",
  },
  {
    layer: "Ingestion",
    detail:
      "YouTube transcript pipeline using yt-dlp plus a bgutil POToken provider sidecar — the workaround for datacenter-IP token gating that otherwise returns a silent empty transcript on a cloud box.",
  },
  {
    layer: "Infra",
    detail:
      "Dockerised (backend + Postgres + Caddy auto-TLS + POToken provider), provisioned with Terraform. Survived a full cloud migration (AWS → NCP) without losing user data.",
  },
];

const HIGHLIGHTS = [
  {
    title: "Provider-fallback AI, not a single vendor",
    body:
      "Tying the core learning loop to one LLM vendor is a single point of failure and a pricing trap. The composite client tries Gemini first (cheapest for this workload), then OpenAI, then Claude — chosen per call, with the failure swallowed so the user never sees a dead drill.",
  },
  {
    title: "Shipped end-to-end to the App Store",
    body:
      "Not a demo repo — a real binary in App Store review. The release is one script: health-check the prod backend, type-check, export the bundle, EAS cloud build with auto-incremented build number, and auto-submit to TestFlight via the App Store Connect API.",
  },
  {
    title: "Debugged an invisible failure (POToken)",
    body:
      "Transcripts imported fine locally but came back empty (200 OK, 0 bytes) on the server. Root cause: YouTube gates datacenter IPs behind a proof-of-origin token. Fixed with a free yt-dlp + POToken sidecar in the same container instead of a paid proxy.",
  },
  {
    title: "Migrated clouds without downtime drama",
    body:
      "Moved the whole stack between providers with Terraform-managed infra and a build → push → apply → swap runbook — the kind of operational work that doesn't show in a UI but is exactly what a backend role is hiring for.",
  },
];

function Pill({ tone, children }: { tone: "live" | "review" | "beta"; children: React.ReactNode }) {
  const map = {
    live: "bg-emerald-500/12 text-emerald-600 ring-emerald-500/25",
    review: "bg-amber-500/12 text-amber-600 ring-amber-500/25",
    beta: "bg-sky-500/12 text-sky-600 ring-sky-500/25",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${map[tone]}`}>
      {children}
    </span>
  );
}

export default function CaseStudyPage() {
  const health = useQuery({
    queryKey: ["health", "case-study"],
    queryFn: () => healthApi.get(),
    refetchInterval: 30_000,
  });
  const backendUp = health.data?.status === "UP";

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:py-14">
      {/* Hero */}
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div
            aria-hidden
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] text-2xl text-white shadow-sm"
            style={{ background: "linear-gradient(135deg,#3AB6FF,#208AEF)" }}
          >
            🎧
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Mimi — English Shadowing</h1>
            <p className="text-sm text-muted-foreground">Learn English from the YouTube you already watch.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Pill tone="review">● App Store — in review</Pill>
          <Pill tone="beta">● TestFlight beta — live</Pill>
          <Pill tone="live">
            <span className={`inline-block h-2 w-2 rounded-full ${backendUp ? "bg-emerald-500" : "bg-zinc-400"}`} />
            {health.isPending ? "checking backend…" : backendUp ? "production backend — live" : "backend unreachable"}
          </Pill>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <Link href="/" className="rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground active:scale-[0.99]">
            Try it in your browser →
          </Link>
          <a href={TESTFLIGHT} target="_blank" rel="noreferrer" className="rounded-xl border px-4 py-2.5 text-sm font-semibold active:scale-[0.99]">
            Install via TestFlight
          </a>
          <a href={GITHUB} target="_blank" rel="noreferrer" className="rounded-xl border px-4 py-2.5 text-sm font-semibold active:scale-[0.99]">
            Source on GitHub
          </a>
        </div>
      </header>

      {/* What it is */}
      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-bold">What it is</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Mimi turns any YouTube video into an English-shadowing and sentence-mining workout. You clip a line, the
          backend mines it with AI (translation, word-order chunks, vocabulary, a real-world scenario), and a spaced-
          repetition queue brings it back at the right time. You shadow it out loud and get a lenient AI grade on what
          you actually said — built for developers and knowledge workers, with friction removed at every step.
        </p>
      </section>

      {/* Demo */}
      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-bold">See it run</h2>
        <p className="text-sm text-muted-foreground">
          No iPhone needed — the{" "}
          <Link href="/" className="font-semibold text-primary underline underline-offset-2">
            web version
          </Link>{" "}
          runs the same flow in the browser. The iOS build adds native haptics, recording, and on-device speech.
        </p>
        <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed text-center text-xs text-muted-foreground">
          screen recording goes here — drop a 20–30s clip of the clip → mine → review loop
        </div>
      </section>

      {/* Architecture */}
      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-bold">How it&apos;s built</h2>
        <div className="space-y-2.5">
          {ARCH.map((a) => (
            <div key={a.layer} className="rounded-2xl border p-4">
              <div className="text-sm font-bold">{a.layer}</div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering highlights */}
      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-bold">Engineering decisions</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {HIGHLIGHTS.map((h) => (
            <div key={h.title} className="rounded-2xl border p-4">
              <div className="text-sm font-bold">{h.title}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{h.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-bold">Stack</h2>
        <div className="flex flex-wrap gap-2">
          {STACK.map((s) => (
            <span key={s} className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium">
              {s}
            </span>
          ))}
        </div>
      </section>

      <footer className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-6 text-sm">
        <Link href="/" className="font-semibold text-primary">
          Live web app
        </Link>
        <a href={TESTFLIGHT} target="_blank" rel="noreferrer" className="font-semibold text-primary">
          TestFlight
        </a>
        <a href={GITHUB} target="_blank" rel="noreferrer" className="font-semibold text-primary">
          GitHub
        </a>
        <span className="text-muted-foreground">· Built by Daeseon Yoo</span>
      </footer>
    </main>
  );
}
