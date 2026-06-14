"use client";

import { useState, useMemo, useCallback } from "react";
import Hero from "@/components/hero";
import GallerySection from "@/components/gallery-section";
import InterstitialSection from "@/components/interstitial-section";
import DetailModal from "@/components/detail-modal";
import ReadMorePanel from "@/components/read-more-panel";
import { galleryItems, GalleryItem } from "@/data/gallery";
import { interstitials } from "@/data/interstitials";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Home() {
  const randomizedItems = useMemo(() => shuffleArray(galleryItems), []);
  const [modalItem, setModalItem] = useState<GalleryItem | null>(null);
  const [readMoreItem, setReadMoreItem] = useState<GalleryItem | null>(null);

  const handleOpenModal = useCallback((item: GalleryItem) => {
    setModalItem(item);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalItem(null);
  }, []);

  const handleReadMore = useCallback((item: GalleryItem) => {
    setReadMoreItem(item);
  }, []);

  const handleCloseReadMore = useCallback(() => {
    setReadMoreItem(null);
  }, []);

  const sections = useMemo(() => {
    const result: Array<
      | { type: "gallery"; item: GalleryItem; index: number }
      | { type: "interstitial"; data: (typeof interstitials)[number] }
    > = [];
    let interstitialIdx = 0;

    randomizedItems.forEach((item, i) => {
      result.push({ type: "gallery", item, index: i });

      if ((i + 1) % 5 === 0 && interstitialIdx < interstitials.length) {
        result.push({
          type: "interstitial",
          data: interstitials[interstitialIdx],
        });
        interstitialIdx++;
      }
    });

    return result;
  }, [randomizedItems]);

  let galleryCounter = 0;

  return (
    <main>
      <Hero />
      {sections.map((section) => {
        if (section.type === "interstitial") {
          return (
            <InterstitialSection key={section.data.id} data={section.data} />
          );
        }
        galleryCounter++;
        return (
          <GallerySection
            key={section.item.id}
            item={section.item}
            index={galleryCounter - 1}
            total={randomizedItems.length}
            onOpenModal={handleOpenModal}
            onReadMore={handleReadMore}
          />
        );
      })}
      <footer className="flex h-[50vh] items-center justify-center">
        <p className="text-center text-sm uppercase tracking-[0.3em] text-neutral-300">
          Barranquilla, Colombia
        </p>
      </footer>

      {modalItem && (
        <DetailModal item={modalItem} onClose={handleCloseModal} />
      )}
      {readMoreItem && (
        <ReadMorePanel item={readMoreItem} onClose={handleCloseReadMore} />
      )}
    </main>
  );
}
