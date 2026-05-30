"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import { PawPrint, Heart } from "lucide-react";

// Reusable data structure — add more profiles here to grow the roster.
const adoptionAnimals = [
  {
    id: "luna",
    name: "luna",
    species: "cat",
    image: "/images/shelter/gallery-tuxedo-cat.webp",
    adopted: false,
  },
  {
    id: "rex",
    name: "rex",
    species: "dog",
    image: "/images/shelter/gallery-dog-walk.webp",
    adopted: false,
  },
  {
    id: "milo",
    name: "milo",
    species: "cat",
    image: "/images/shelter/gallery-fluffy-cat.webp",
    adopted: true,
  },
  {
    id: "buddy",
    name: "buddy",
    species: "dog",
    image: "/images/shelter/gallery-shelter-dog.webp",
    adopted: false,
  },
  {
    id: "kira",
    name: "kira",
    species: "cat",
    image: "/images/shelter/gallery-cat-tree.webp",
    adopted: false,
  },
  {
    id: "snowball",
    name: "snowball",
    species: "cat",
    image: "/images/shelter/gallery-white-cat.webp",
    adopted: true,
  },
  {
    id: "pepper",
    name: "pepper",
    species: "cat",
    image: "/images/shelter/gallery-cat-perch.webp",
    adopted: false,
  },
  {
    id: "daisy",
    name: "daisy",
    species: "cat",
    image: "/images/shelter/gallery-lounging-cat.webp",
    adopted: false,
  },
  {
    id: "shadow",
    name: "shadow",
    species: "cat",
    image: "/images/shelter/gallery-gate-cat.webp",
    adopted: true,
  },
  {
    id: "bella",
    name: "bella",
    species: "cat",
    image: "/images/shelter/gallery-portrait-cat.webp",
    adopted: false,
  },
];

export default function AdoptionSection() {
  const t = useTranslations("homePage.adoptionSection");

  return (
    <section id="adoption" className="bg-[#fbf8ff] px-5 py-24 text-[#19131f] sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-[#8b5fc7]">
              {t("sectionLabel")}
            </p>
            <h2 className="text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
              {t("title")}
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-8 text-[#2d2139]/58">
            {t("descriptiveText")}
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {adoptionAnimals.map((animal) => (
              <AdoptionCard key={animal.id} animal={animal} translations={t} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

interface AdoptionCardProps {
  animal: (typeof adoptionAnimals)[number];
  translations: ReturnType<typeof useTranslations<"homePage.adoptionSection">>;
}

function AdoptionCard({ animal, translations }: AdoptionCardProps) {
  const speciesLabel =
    animal.species === "dog"
      ? translations(`speciesDog`)
      : translations(`speciesCat`);

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_16px_60px_rgba(91,53,133,0.08)] ring-1 ring-[#e7dbf6] transition-shadow duration-300 hover:shadow-[0_24px_80px_rgba(91,53,133,0.15)] ${
        animal.adopted ? "opacity-80" : ""
      }`}
      style={{ minHeight: "22rem" }}
    >
      {/* Photo area */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={animal.image}
          alt={`${animal.name} ${animal.species}`}
          fill
          className={`object-cover transition duration-700 group-hover:scale-[1.04] ${
            animal.adopted ? "grayscale-[0.3]" : ""
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Species badge — top left */}
        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#8b5fc7] backdrop-blur">
          <PawPrint className="h-3 w-3" />
          {speciesLabel}
        </span>

        {/* Adopted corner ribbon overlay */}
        {animal.adopted && (
          <div
            className="absolute right-0 top-0 z-10 overflow-hidden"
            aria-label="Adopted"
          >
            <div className="relative h-12 w-12">
              {/* Triangle ribbon */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#8b5fc7] to-[#6b3fa7] text-[0.55rem] font-bold uppercase tracking-wider text-white"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-end",
                }}
              >
                <span
                  className="flex items-center gap-0.5 pr-1 pt-1"
                  style={{ fontSize: "9px" }}
                >
                  <Heart className="h-2.5 w-2.5" />
                </span>
              </div>
            </div>
            {/* Adopted text bar under ribbon */}
            <div className="absolute right-0 top-10 whitespace-nowrap rounded-l-md bg-gradient-to-r from-[#8b5fc7]/95 to-[#6b3fa7]/95 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm shadow-md">
              {translations("adoptedBadge")}
            </div>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#19131f]">
          {translations(`animals.${animal.id}.name`)}
        </h3>
        <p className="mt-2 flex-1 leading-7 text-[#2d2139]/62">
          {translations.raw(`animals.${animal.id}.description`) as string}
        </p>

        {/* CTA / Status */}
        <div className="mt-4 border-t border-[#e7dbf6] pt-4">
          {animal.adopted ? (
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b5fc7]/80">
              <Heart className="h-4 w-4 fill-[#8b5fc7] text-[#8b5fc7]" />
              {translations("adoptedStatus")}
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f2e9ff] px-5 py-2 text-sm font-semibold text-[#8b5fc7] transition hover:bg-[#8b5fc7] hover:text-white">
              <Heart className="h-4 w-4" />
              {translations("availableCta")}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
