import { getTranslations } from "next-intl/server";
import { LegalShell } from "@/components/legal/LegalShell";

const LAST_UPDATED = "June 2, 2026";

export async function generateMetadata() {
  const t = await getTranslations("legal");
  return { title: `${t("terms")} — Mimi` };
}

export default async function TermsPage() {
  const t = await getTranslations("legal");

  return (
    <LegalShell title={t("terms")} lastUpdated={LAST_UPDATED}>
      <p>
        Welcome to Mimi (&ldquo;Mimi,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). Mimi is a personal
        English-learning tool that turns YouTube videos into shadowing practice and drills grammar
        patterns, collocations, and prepositions. By creating an account or using the service, you
        agree to these Terms.
      </p>

      <h2>1. Accounts</h2>
      <p>
        You are responsible for your account and for keeping your password secure. Provide a valid
        email and accurate registration details. You must be old enough to form a binding contract
        in your jurisdiction.
      </p>

      <h2>2. Acceptable use</h2>
      <ul>
        <li>Do not use Mimi for anything unlawful, or attempt to disrupt or reverse-engineer the service.</li>
        <li>Do not share your account or use automated means to overload the service.</li>
        <li>You are responsible for the content (video URLs, recordings, notes) you submit.</li>
      </ul>

      <h2>3. Third-party content (YouTube)</h2>
      <p>
        Mimi retrieves subtitles and metadata for the videos you choose. You are responsible for
        ensuring your use of any third-party content complies with that platform&rsquo;s terms and
        with applicable copyright law. Mimi is intended for personal study only.
      </p>

      <h2>4. Subscriptions and billing</h2>
      <p>
        Mimi offers a free tier and a paid &ldquo;Pro&rdquo; plan. Payments are processed by
        third-party platforms — for the web, a payment processor; on mobile, Apple App Store or
        Google Play in-app purchase. Subscriptions renew until cancelled. Cancellations and refunds
        are handled according to the rules of the platform you purchased through. Your plan grants
        access only while it is active.
      </p>

      <h2>5. No warranty</h2>
      <p>
        Mimi is provided &ldquo;as is,&rdquo; without warranties of any kind. AI-generated
        translations, glosses, and feedback may contain errors and are study aids, not authoritative
        references.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Mimi is not liable for indirect, incidental, or
        consequential damages, or for any loss of data, arising from your use of the service.
      </p>

      <h2>7. Termination and account deletion</h2>
      <p>
        You may delete your account at any time from Settings; deletion removes your account data and
        the recordings and progress associated with it. We may suspend accounts that violate these
        Terms.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may update these Terms. Material changes will be reflected by the &ldquo;Last updated&rdquo;
        date above; continued use after a change means you accept the revised Terms.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about these Terms: <a href="mailto:showep12@gmail.com">showep12@gmail.com</a>.
      </p>
    </LegalShell>
  );
}
