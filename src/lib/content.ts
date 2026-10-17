import atelier from "@/assets/foto-atelier.jpg.asset.json";
import bottega from "@/assets/foto-bottega-famiglia.jpg.asset.json";
import cortile from "@/assets/foto-cortile-palazzo.jpg.asset.json";
import studio from "@/assets/foto-imprenditore-studio.jpg.asset.json";
import firenze from "@/assets/foto-imprenditrice-firenze.jpg.asset.json";
import mani from "@/assets/foto-mani-artigiano.jpg.asset.json";
import still from "@/assets/foto-still-life.jpg.asset.json";
import type { T } from "./i18n";

export const photos = {
  atelier: atelier.url,
  bottega: bottega.url,
  cortile: cortile.url,
  studio: studio.url,
  firenze: firenze.url,
  mani: mani.url,
  still: still.url,
};

export const values: { title: T; text: T }[] = [
  { title: { it: "Persone", en: "People" }, text: { it: "Volti veri: imprenditori, manager, team. Mai foto di repertorio.", en: "Real faces: entrepreneurs, managers, teams. Never stock photos." } },
  { title: { it: "Prestigio discreto", en: "Quiet prestige" }, text: { it: "Sobrietà istituzionale, un solo accento di luce: l'oro.", en: "Institutional restraint, a single touch of light: gold." } },
  { title: { it: "Visione lunga", en: "Long view" }, text: { it: "Socio, non fondo: raccontiamo il percorso, non l'uscita.", en: "A partner, not a fund: we tell the journey, not the exit." } },
  { title: { it: "Nuova luce", en: "New light" }, text: { it: "Ogni impresa entrata nel gruppo diventa una storia da raccontare.", en: "Every company that joins the group becomes a story worth telling." } },
];

export type Person = { photo: string; alt: T; quote: T };
const name = "[Name Surname]";
export const personName = name;
export const personRole = "[Role · Company]";

export const people: Person[] = [
  { photo: photos.firenze, alt: { it: "Imprenditrice ritratta a Firenze, luce laterale", en: "Entrepreneur portrayed in Florence, side light" }, quote: { it: "Il lusso vero è il tempo che dedichi a fare bene le cose.", en: "True luxury is the time you spend doing things well." } },
  { photo: photos.bottega, alt: { it: "Una famiglia nella propria bottega artigiana", en: "A family in their artisan workshop" }, quote: { it: "Tre generazioni, una bottega.", en: "Three generations, one workshop." } },
  { photo: photos.studio, alt: { it: "Imprenditore nel suo studio", en: "Entrepreneur in his study" }, quote: { it: "Un'impresa cresce quando qualcuno ci crede ogni mattina.", en: "A company grows when someone believes in it every morning." } },
];

export const morePeople: Person[] = [
  { photo: photos.mani, alt: { it: "Mani di un artigiano al lavoro", en: "A craftsman's hands at work" }, quote: { it: "Le mani ricordano quello che la testa dimentica.", en: "Hands remember what the mind forgets." } },
  { photo: photos.atelier, alt: { it: "Atelier sartoriale in penombra", en: "Tailoring atelier in half-light" }, quote: { it: "Ogni misura è una conversazione.", en: "Every fitting is a conversation." } },
  { photo: photos.cortile, alt: { it: "Cortile di un palazzo storico italiano", en: "Courtyard of a historic Italian palazzo" }, quote: { it: "Costruiamo per chi verrà dopo di noi.", en: "We build for those who come after us." } },
];

export const series = ["Volti", "Le Persone di VNL", "Dietro la luce", "Il Nuovo Lusso", "VNL Perspective", "Nuova Luce"] as const;

export type Story = { slug: string; series: (typeof series)[number]; date: string; title: T; photo: string; alt: T };
export const stories: Story[] = [
  { slug: "made-to-measure", series: "Dietro la luce", date: "2026-09-18", title: { it: "Qui nasce un abito su misura. E un'idea di impresa.", en: "A made-to-measure suit is born here. So is an idea of business." }, photo: photos.atelier, alt: { it: "Atelier sartoriale con un abito in lavorazione", en: "Tailoring atelier with a suit in progress" } },
  { slug: "what-makes-a-company-precious", series: "Il Nuovo Lusso", date: "2026-08-27", title: { it: "Cosa rende preziosa un'impresa: cura, qualità, durata.", en: "What makes a company precious: care, quality, durability." }, photo: photos.mani, alt: { it: "Mani di un artigiano illuminate di lato", en: "A craftsman's hands lit from the side" } },
  { slug: "italy-and-the-gulf", series: "VNL Perspective", date: "2026-07-30", title: { it: "Italia e Golfo: perché investiamo nel lungo periodo.", en: "Italy and the Gulf: why we invest for the long term." }, photo: photos.cortile, alt: { it: "Cortile di un palazzo storico", en: "Courtyard of a historic palazzo" } },
  { slug: "faces-florence", series: "Volti", date: "2026-07-02", title: { it: "Un volto, una città, un mestiere.", en: "One face, one city, one craft." }, photo: photos.firenze, alt: { it: "Ritratto di un'imprenditrice a Firenze", en: "Portrait of an entrepreneur in Florence" } },
  { slug: "three-generations", series: "Le Persone di VNL", date: "2026-06-11", title: { it: "Tre generazioni, una bottega.", en: "Three generations, one workshop." }, photo: photos.bottega, alt: { it: "Famiglia di artigiani in bottega", en: "Family of artisans in their workshop" } },
  { slug: "the-first-day", series: "Nuova Luce", date: "2026-05-20", title: { it: "Il primo giorno nel gruppo.", en: "The first day in the group." }, photo: photos.still, alt: { it: "Natura morta di oggetti di bottega", en: "Still life of workshop objects" } },
];

export const companies: { photo: string; alt: T; sector: T; text: T }[] = [
  { photo: photos.atelier, alt: { it: "Atelier sartoriale", en: "Tailoring atelier" }, sector: { it: "Sartoria", en: "Tailoring" }, text: { it: "Una sartoria che misura il tempo in punti cuciti a mano.", en: "A tailor's house that measures time in hand-sewn stitches." } },
  { photo: photos.mani, alt: { it: "Mani al lavoro sul legno", en: "Hands working wood" }, sector: { it: "Artigianato", en: "Craftsmanship" }, text: { it: "Un laboratorio dove ogni pezzo porta la firma di chi lo fa.", en: "A workshop where every piece carries the signature of its maker." } },
  { photo: photos.bottega, alt: { it: "Bottega di famiglia", en: "Family workshop" }, sector: { it: "Manifattura", en: "Manufacturing" }, text: { it: "Una bottega di famiglia che cresce senza perdere le sue mani.", en: "A family workshop that grows without losing its hands." } },
  { photo: photos.still, alt: { it: "Oggetti in natura morta", en: "Objects in a still life" }, sector: { it: "Design", en: "Design" }, text: { it: "Oggetti pensati per durare più di una stagione.", en: "Objects designed to last longer than a season." } },
  { photo: photos.cortile, alt: { it: "Cortile di palazzo", en: "Palazzo courtyard" }, sector: { it: "Ospitalità", en: "Hospitality" }, text: { it: "Un palazzo che torna ad accogliere chi lo attraversa.", en: "A palazzo that welcomes its guests again." } },
  { photo: photos.firenze, alt: { it: "Imprenditrice in città", en: "Entrepreneur in the city" }, sector: { it: "Moda", en: "Fashion" }, text: { it: "Una maison nata in una città che insegna la misura.", en: "A house born in a city that teaches restraint." } },
];

export function fmtDate(d: string, lang: "it" | "en") {
  return new Date(d).toLocaleDateString(lang === "it" ? "it-IT" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
}

import ceramista from "@/assets/home-ceramista.jpg";
import calzolaio from "@/assets/home-calzolaio.jpg";
import cantina from "@/assets/home-cantina.jpg";
import orafo from "@/assets/home-orafo.jpg";

/** Home cover gallery: new portraits plus two client photos, so Home does not repeat the other pages. */
export const homePeople: Person[] = [
  { photo: ceramista, alt: { it: "Ceramista nella sua bottega, luce di finestra", en: "Ceramicist in her workshop, window light" }, quote: { it: "Ogni pezzo porta il segno di chi lo ha fatto.", en: "Every piece carries the mark of its maker." } },
  people[1]!,
  { photo: calzolaio, alt: { it: "Calzolaio al banco con una forma in legno", en: "Shoemaker at his bench holding a wooden last" }, quote: { it: "Una scarpa ben fatta accompagna una vita.", en: "A well-made shoe walks with you for a lifetime." } },
  { photo: cantina, alt: { it: "Vignaiola tra le botti di una cantina in pietra", en: "Winemaker among the barrels of a stone cellar" }, quote: { it: "Il vino insegna ad aspettare.", en: "Wine teaches you to wait." } },
  morePeople[0]!,
  { photo: orafo, alt: { it: "Orafo al lavoro con la lente su un anello", en: "Goldsmith working on a ring with a loupe" }, quote: { it: "La precisione è una forma di rispetto.", en: "Precision is a form of respect." } },
];
