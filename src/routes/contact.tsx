import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useLang } from "@/lib/i18n";
import { Eyebrow, meta, PageHero } from "@/components/site/blocks";

export const Route = createFileRoute("/contact")({
  head: () => meta("Contact · Vita Nova Lux", "Have a company to grow? Let's talk. Write to Vita Nova Lux."),
  component: Contact,
});

function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const field = "mt-3 w-full border-0 border-b border-line-strong bg-transparent px-0 py-3 text-[18px] text-ink transition-colors duration-200 focus:border-ink focus:outline-none";
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <>
      <PageHero
        eyebrow={{ en: "Contact", it: "Contatti" }}
        title={{ en: "Let's talk.", it: "Parliamone." }}
        lead={{ en: "Tell us about your company. We will reply in person.", it: "Raccontaci la tua impresa. Ti rispondiamo noi, di persona." }}
      />
      <section className="section-xl bg-surface">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {sent ? (
              <div role="status" className="border-t-2 border-gold pt-8">
                <h2 className="t-statement">{t({ en: "Thank you, we have received your message.", it: "Grazie, abbiamo ricevuto il tuo messaggio." })}</h2>
                <p className="t-lead mt-6 text-ink-muted">{t({ en: "We will reply soon.", it: "Ti risponderemo presto." })}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-10">
                <div className="grid gap-10 md:grid-cols-2">
                  <label className="t-label font-medium">{t({ en: "Name", it: "Nome" })}<input required name="name" autoComplete="name" className={field} /></label>
                  <label className="t-label font-medium">{t({ en: "Company", it: "Impresa" })}<input name="company" autoComplete="organization" className={field} /></label>
                </div>
                <label className="t-label font-medium">Email<input required type="email" name="email" autoComplete="email" className={field} /></label>
                <label className="t-label font-medium">{t({ en: "Message", it: "Messaggio" })}<textarea required name="message" rows={5} className={field} /></label>
                <label className="flex items-start gap-3 t-label text-ink-muted">
                  <input required type="checkbox" className="mt-0.5 h-5 w-5 accent-[var(--ink)]" />
                  {t({ en: "I have read the privacy notice and consent to the processing of my data.", it: "Ho letto l'informativa privacy e acconsento al trattamento dei miei dati." })}
                </label>
                <div><button type="submit" className="btn btn-primary">{t({ en: "Send", it: "Invia" })}</button></div>
              </form>
            )}
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <Eyebrow>{t({ en: "Where we are", it: "Dove siamo" })}</Eyebrow>
            <p className="t-statement mt-6">Vita Nova Lux S.r.l.</p>
            <p className="t-lead mt-4 text-ink-muted">{t({ en: "[address to be added]", it: "[indirizzo da inserire]" })}</p>
          </aside>
        </div>
      </section>
    </>
  );
}
