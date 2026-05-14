"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/AnimatedSection";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";

type AnimalStatus = "available" | "pending" | "adopted";
type AnimalSpecies = "cat" | "dog" | "kitten";

interface Animal {
  id: number;
  name: string;
  species: AnimalSpecies;
  age: string;
  status: AnimalStatus;
  description: string;
  image: string;
}

const animals: Animal[] = [
  {
    id: 1,
    name: "Luna",
    species: "cat",
    age: "2 years",
    status: "available",
    description:
      "A gentle soul who loves afternoon naps and window watching. Luna is great with children and other cats.",
    image: "/images/cats1.jpg",
  },
  {
    id: 2,
    name: "Milo",
    species: "cat",
    age: "3 years",
    status: "adopted",
    description:
      "Milo was the first to greet every visitor. He found his forever home and now rules a sunny balcony in Jeddah.",
    image: "/images/cats2.jpg",
  },
  {
    id: 3,
    name: "Oliver",
    species: "cat",
    age: "1 year",
    status: "pending",
    description:
      "Playful and curious, Oliver enjoys puzzle toys and chasing shadows. A perfect companion for an active household.",
    image: "/images/cats3.jpg",
  },
  {
    id: 4,
    name: "Simba",
    species: "cat",
    age: "4 years",
    status: "available",
    description:
      "Simba is a calm, dignified gentleman who enjoys quiet evenings and gentle head scratches. Great for a relaxed home.",
    image: "/images/cats4.jpg",
  },
  {
    id: 5,
    name: "Buddy",
    species: "dog",
    age: "2 years",
    status: "available",
    description:
      "Buddy is a loyal friend who loves morning walks and car rides. He knows basic commands and is eager to please.",
    image: "/images/dogs1.jpg",
  },
  {
    id: 6,
    name: "Daisy",
    species: "dog",
    age: "3 years",
    status: "adopted",
    description:
      "Daisy was shy when she arrived but blossomed into a confident, loving dog. She now lives happily with a family in Paris.",
    image: "/images/dogs2.jpg",
  },
  {
    id: 7,
    name: "Mochi",
    species: "kitten",
    age: "4 months",
    status: "available",
    description:
      "Mochi is a tiny ball of energy who purrs the moment you pick her up. She would love a home with another playful friend.",
    image: "/images/kittens1.jpg",
  },
  {
    id: 8,
    name: "Pepper",
    species: "kitten",
    age: "5 months",
    status: "pending",
    description:
      "Pepper is adventurous and brave. She was found behind a bakery and has since become the shelter's little explorer.",
    image: "/images/kittens2.jpg",
  },
];

const filters = [
  { key: "all", labelKey: "filterAll" },
  { key: "cat", labelKey: "filterCats" },
  { key: "dog", labelKey: "filterDogs" },
  { key: "kitten", labelKey: "filterKittens" },
  { key: "available", labelKey: "filterAvailable" },
  { key: "adopted", labelKey: "filterAdopted" },
] as const;

function statusBadgeClasses(status: AnimalStatus) {
  switch (status) {
    case "available":
      return "bg-emerald-100 text-emerald-800";
    case "pending":
      return "bg-amber-100 text-amber-800";
    case "adopted":
      return "bg-gray-200 text-gray-600";
  }
}

function statusLabel(t: any, status: AnimalStatus) {
  switch (status) {
    case "available":
      return t("statusAvailable");
    case "pending":
      return t("statusPending");
    case "adopted":
      return t("statusAdopted");
  }
}

export default function AdoptPageClient() {
  const t = useTranslations("adopt");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredAnimals = animals.filter((animal) => {
    if (activeFilter === "all") return true;
    if (
      activeFilter === "available" ||
      activeFilter === "adopted" ||
      activeFilter === "pending"
    ) {
      return animal.status === activeFilter;
    }
    return animal.species === activeFilter;
  });

  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative bg-emerald-700 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/cats1.jpg"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
            <AnimatedSection>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                {t("heroTitle")}
              </h1>
              <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto">
                {t("heroSubtitle")}
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="bg-[#f5f0e8] border-b border-[#e7e0d5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AnimatedSection>
              <div className="flex flex-wrap gap-3 justify-center">
                {filters.map((filter) => {
                  const isActive = activeFilter === filter.key;
                  return (
                    <button
                      key={filter.key}
                      onClick={() => setActiveFilter(filter.key)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-emerald-700 text-white shadow-md"
                          : "bg-white text-[#4b5563] hover:bg-emerald-50 border border-[#e7e0d5]"
                      }`}
                    >
                      {t(filter.labelKey)}
                    </button>
                  );
                })}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Animal Grid */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerContainer
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              staggerDelay={0.08}
            >
              {filteredAnimals.map((animal) => (
                <StaggerItem key={animal.id}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group bg-[#f5f0e8] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={animal.image}
                        alt={animal.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClasses(
                            animal.status
                          )}`}
                        >
                          {statusLabel(t, animal.status)}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-[#1f1f1f]">
                          {animal.name}
                        </h3>
                        <span className="text-sm text-[#4b5563] capitalize">
                          {animal.species === "kitten"
                            ? t("speciesKitten")
                            : animal.species === "cat"
                            ? t("speciesCat")
                            : t("speciesDog")}
                        </span>
                      </div>
                      <p className="text-sm text-[#4b5563] mb-3">
                        {animal.age}
                      </p>
                      <p className="text-sm text-[#4b5563] leading-relaxed line-clamp-3">
                        {animal.description}
                      </p>
                      {animal.status === "available" && (
                        <Link
                          href="/contact"
                          className="mt-4 inline-block w-full text-center px-4 py-2 rounded-lg bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition-colors"
                        >
                          {t("cardCta")}
                        </Link>
                      )}
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {filteredAnimals.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[#4b5563] text-lg">
                  {t("noResults")}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Apply CTA */}
        <section className="bg-[#fffcf8] py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1f1f1f] mb-4">
                {t("applyCtaTitle")}
              </h2>
              <p className="text-lg text-[#4b5563] mb-8 max-w-2xl mx-auto">
                {t("applyCtaDesc")}
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 rounded-xl bg-emerald-700 text-white text-lg font-semibold hover:bg-emerald-800 transition-colors shadow-md"
              >
                {t("applyButton")}
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </main>
    </>
  );
}
