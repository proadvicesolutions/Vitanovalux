import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useLang } from "@/lib/i18n";
import { meta, PageHero } from "@/components/site/blocks";

export const Route = createFileRoute("/contatti")({
  head: () => meta("Contatti · Vita Nova Lux", "Hai un'impresa da far crescere? Parliamone. Scrivi a Vita Nova Lux."),
  component: Contact,
});

function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const field = "mt-2 w-full rounded-sm border border-line-strong bg-surface-raised px-4 py-3 text-ink";
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <>
      <PageHero eyebrow={{ it: "Contatti", en: "Contact" }} title={{ it: "Parliamone.", en: "Let's talk." }} lead={{ it: "Raccontaci la tua impresa. Ti rispondiamo noi, di persona.", en: "Tell us about your company. We will reply in person." }} />
      <section className="section-y">
        <div className="container-site grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          {sent ? (
            <div role="status" className="rounded-sm border-t-2 border-gold bg-surface-raised p-8">
              <h2 className="t-h2">{t({ it: "Grazie, abbiamo ricevuto il tuo messaggio.", en: "Thank you, we have received your message." })}</h2>
              <p className="mt-4 text-ink-muted">{t({ it: "Ti risponderemo presto.", en: "We will reply soon." })}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-6 prose-w">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="t-label font-medium">{t({ it: "Nome", en: "Name" })}<input required name="name" autoComplete="name" className={field} /></label>
                <label className="t-label font-medium">{t({ it: "Impresa", en: "Company" })}<input name="company" autoComplete="organization" className={field} /></label>
              </div>
              <label className="t-label font-medium">Email<input required type="email" name="email" autoComplete="email" className={field} /></label>
              <label className="t-label font-medium">{t({ it: "Messaggio", en: "Message" })}<textarea required name="message" rows={6} className={field} /></label>
              <label className="flex items-start gap-3 t-label text-ink-muted">
                <input required type="checkbox" className="mt-0.5 h-5 w-5 accent-[var(--ink)]" />
                {t({ it: "Ho letto l'informativa privacy e acconsento al trattamento dei miei dati.", en: "I have read the privacy notice and consent to the processing of my data." })}
              </label>
              <div><button type="submit" className="btn btn-primary">{t({ it: "Invia", en: "Send" })}</button></div>
            </form>
          )}
          <aside className="border-t border-line pt-6">
            <p className="eyebrow">{t({ it: "Dove siamo", en: "Where we are" })}</p>
            <p className="t-lead mt-4">Vita Nova Lux S.r.l.</p>
            <p className="mt-2 text-ink-muted">{t({ it: "[indirizzo da inserire]", en: "[address to be added]" })}</p>
          </aside>
        </div>
      </section>
    </>
  );
}
