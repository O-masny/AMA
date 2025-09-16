"use client"

import { Artwork } from "@/components/data/artworks";
import Footer from "@/components/Widgets/Footer";
import CategoryFilter from "@/components/Widgets/Gallery/Filter";
import GalleryGrid from "@/components/Widgets/Gallery/GalleryGrid";
import HeroSection from "@/components/Widgets/Gallery/HeroSection";
import OutroSection from "@/components/Widgets/Gallery/OutroSection";
import Navigation from "@/components/Widgets/Nav";
import { usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState } from "react";
import LoadingProvider from "../loading_provider";

interface PageProps {
    artworks: Artwork[];
    categories?: string[] | null; // ← povolíme null i undefined
    [key: string]: any;
}

function useFilteredArtworks(artworks: Artwork[], selectedCategory: string) {
    return selectedCategory === "Vše"
        ? artworks
        : artworks.filter((a) => a.category === selectedCategory);
}

const Index: React.FC = () => {
    const { props } = usePage<PageProps>();
    const { artworks, categories } = props;

    const [selectedCategory, setSelectedCategory] = useState<string>("Vše");
    const filteredArtworks = useFilteredArtworks(artworks, selectedCategory);

    return (
        <LoadingProvider>
            <div className="min-h-screen bg-background text-foreground">
                <Navigation isReady={true} />

                {/* HERO */}
                <HeroSection artworks={artworks} />

                {/* IMMERSIVE SCROLL SECTIONS */}
                {artworks.slice(0, 4).map((art) => (
                    <section
                        key={art.id}
                        className="h-screen relative flex items-center justify-center overflow-hidden"
                    >
                        <motion.img
                            src={`/storage/${art.image}`}
                            alt={art.title}
                            initial={{ scale: 1.1, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <motion.h2
                            initial={{ y: 80, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative z-10 text-5xl md:text-7xl font-bold text-white mix-blend-difference"
                        >
                            {art.title}
                        </motion.h2>
                    </section>
                ))}

                {/* FILTER + GRID */}
                <CategoryFilter
                    categories={categories ?? []} // ← fallback na prázdné pole
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                <GalleryGrid artworks={filteredArtworks} />

                {/* OUTRO + FOOTER */}
                <OutroSection />
                <Footer />
            </div>
        </LoadingProvider>
    );
};

export default Index;
