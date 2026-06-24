import { Link } from "@/i18n/navigation";

export async function generateMetadata() {
  return { title: "Support — Mimi" };
}

const SUPPORT_EMAIL = "showep12@gmail.com";

// Screens live in /public/screenshots (copied from the App Store submission build).
const SCREENS: { src: string; caption: string }[] = [
  { src: "/screenshots/shot-1.jpeg", caption: "Shadow any YouTube video, line by line." },
  { src: "/screenshots/shot-8.jpeg", caption: "Adjust playback speed and loop a section to drill it." },
  { src: "/screenshots/shot-3.jpeg", caption: "Speaking practice — respond to a situation in English." },
  { src: "/screenshots/shot-4.jpeg", caption: "Word-by-word notes for every clip." },
  { src: "/screenshots/shot-7.jpeg", caption: "Build-the-order drills reinforce sentence structure." },
  { src: "/screenshots/shot-5.jpeg", caption: "Spaced-repetition review brings clips back at the right time." },
  { src: "/screenshots/shot-2.jpeg", caption: "Your personal library of videos and clips." },
  { src: "/screenshots/shot-6.jpeg", caption: "Track your streak, clips, and mastery." },
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is Mimi?",
    a: "Mimi is an English shadowing app. You import a YouTube video, the app breaks the captions into lines and clips, and you practice by listening, repeating (shadowing), speaking, and reviewing — with word-by-word translation notes and spaced-repetition review.",
  },
  {
    q: "Does Mimi cost anything?",
    a: "No. Every feature is free to use. There is no in-app purchase, no subscription, and no paid content. The “FREE” label in the app is simply an informational status badge for your account.",
  },
  {
    q: "How do I import a video?",
    a: "Open the Library tab, tap “+ Import a video,” and paste a YouTube link. Mimi fetches the captions and prepares the clips for you.",
  },
  {
    q: "How do I delete my account?",
    a: "Open the Me / Settings tab, scroll to “Delete account,” enter your password, and confirm. This permanently removes your account, recordings, and learning data.",
  },
  {
    q: "I found a bug or have a question.",
    a: (
      <>
        Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and we’ll get back to you. Please
        include your account email and a short description of what happened.
      </>
    ),
  },
];

export default function SupportPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-12">
      <header className="space-y-1">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">
          ← Back to home
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Mimi Support</h1>
        <p className="text-sm text-muted-foreground">
          Help, answers, and how to get in touch.
        </p>
      </header>

      <section className="rounded-lg border bg-card p-4 text-sm">
        <h2 className="mb-1 text-base font-semibold">Contact us</h2>
        <p className="text-foreground/90">
          Questions, bug reports, or feedback? Email{" "}
          <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
          . We typically reply within 1–2 business days.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold">Frequently asked questions</h2>
        <dl className="space-y-4 text-sm">
          {FAQ.map(({ q, a }) => (
            <div key={q} className="space-y-1">
              <dt className="font-medium text-foreground">{q}</dt>
              <dd className="text-foreground/80 [&_a]:underline">{a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold">A quick tour</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {SCREENS.map(({ src, caption }) => (
            <figure key={src} className="space-y-2">
              {/* Static screenshots from the production build; plain img keeps it config-free. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={caption}
                className="w-full rounded-lg border bg-muted"
                loading="lazy"
              />
              <figcaption className="text-xs text-muted-foreground">{caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer className="mt-4 flex gap-4 border-t pt-4 text-sm text-muted-foreground">
        <Link href="/terms" className="hover:underline">Terms of Service</Link>
        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
        <Link href="/support" className="hover:underline">Support</Link>
      </footer>
    </main>
  );
}
