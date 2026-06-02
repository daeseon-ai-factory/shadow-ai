import { getTranslations } from "next-intl/server";
import { LegalShell } from "@/components/legal/LegalShell";

const LAST_UPDATED = "June 2, 2026";

export async function generateMetadata() {
  const t = await getTranslations("legal");
  return { title: `${t("privacy")} — Mimi` };
}

export default async function PrivacyPage() {
  const t = await getTranslations("legal");

  return (
    <LegalShell title={t("privacy")} lastUpdated={LAST_UPDATED}>
      <p>
        This policy explains what Mimi collects, why, and your choices. Mimi is a personal
        English-learning tool and collects only what it needs to run.
      </p>

      <h2>1. What we collect</h2>
      <ul>
        <li><strong>Account</strong> — your email, display name, and a securely hashed password.</li>
        <li><strong>Your content</strong> — the video clips, subtitle ranges, notes, and audio recordings you create.</li>
        <li><strong>Learning data</strong> — drill progress, review schedules, and streaks.</li>
        <li><strong>Billing status</strong> — your plan and its validity date. We never see or store your card details; those stay with the payment platform.</li>
      </ul>

      <h2>2. How we use it</h2>
      <p>
        To provide the service: authenticate you, store your clips and progress, schedule reviews,
        and apply your plan. We do not sell your personal data.
      </p>

      <h2>3. Third parties</h2>
      <ul>
        <li><strong>YouTube</strong> — we fetch subtitles and metadata for the videos you choose.</li>
        <li><strong>AI providers (Google Gemini / Anthropic Claude)</strong> — the text of a clip you submit is sent to generate its translation, gloss, and feedback. Results are cached so the same clip is not re-sent.</li>
        <li><strong>Payment platforms</strong> — a web payment processor, or Apple / Google for in-app purchases, which inform us only of your entitlement.</li>
        <li><strong>Hosting</strong> — cloud infrastructure providers that run the service.</li>
      </ul>

      <h2>4. Storage and security</h2>
      <p>
        Passwords are hashed with bcrypt; sessions use signed tokens that can be revoked. Traffic is
        encrypted in transit. No system is perfectly secure, but we take reasonable measures to
        protect your data.
      </p>

      <h2>5. Your rights and deletion</h2>
      <p>
        You can delete your account from Settings at any time. Deletion removes your account, your
        recordings, and your learning data. You may also contact us to request access to or
        correction of your data.
      </p>

      <h2>6. Children</h2>
      <p>
        Mimi is not directed at children under 13 (or the minimum age in your jurisdiction) and we do
        not knowingly collect their data.
      </p>

      <h2>7. International transfer</h2>
      <p>
        Mimi is operated from and hosted in North America. By using it you understand your data may
        be processed in Canada and the United States.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may update this policy; material changes are reflected by the &ldquo;Last updated&rdquo;
        date above.
      </p>

      <h2>9. Contact</h2>
      <p>
        Privacy questions: <a href="mailto:showep12@gmail.com">showep12@gmail.com</a>.
      </p>
    </LegalShell>
  );
}
