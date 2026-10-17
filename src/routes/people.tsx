import { createFileRoute } from "@tanstack/react-router";
import { morePeople, people, photos } from "@/lib/content";
import { ClosingBand, FeaturedPeople, meta } from "@/components/site/blocks";
import { CoverGallery, Manifesto, TorchHero } from "@/components/site/experience";

export const Route = createFileRoute("/people")({
  head: () => meta("People · Vita Nova Lux", "Entrepreneurs, managers and teams of the companies growing with Vita Nova Lux."),
  component: People,
});

function People() {
  return (
    <>
      <TorchHero
        photo={photos.bottega}
        alt={{ en: "Father and daughter in the family workshop", it: "Padre e figlia nella bottega di famiglia" }}
        eyebrow={{ en: "The people of VNL", it: "Le persone di VNL" }}
        title={{ en: "People before numbers.", it: "Le persone prima dei numeri." }}
        lead={{ en: "Real faces, real voices. They are the ones who make the company.", it: "Volti veri, voci vere. Sono loro a fare l'impresa." }}
      />
      <CoverGallery people={[...people, ...morePeople]} eyebrow={{ en: "Faces", it: "Volti" }} title={{ en: "Six covers, six companies.", it: "Sei copertine, sei imprese." }} />
      <FeaturedPeople people={people} eyebrow={{ en: "In their words", it: "Con le loro parole" }} title={{ en: "The faces behind the companies.", it: "I volti dietro le imprese." }} />
      <Manifesto
        text={{ en: "A company grows when someone believes in it every morning.", it: "Un'impresa cresce quando qualcuno ci crede ogni mattina." }}
        name={{ en: "[Name Surname]", it: "[Nome Cognome]" }}
        role={{ en: "[Role · Company]", it: "[Ruolo · Impresa]" }}
      />
      <ClosingBand />
    </>
  );
}
