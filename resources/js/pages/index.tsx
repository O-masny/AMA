"use client";

import { Artwork } from "@/components/data/artworks";
import Footer from "@/components/Widgets/Footer";
import CategoryFilter from "@/components/Widgets/Gallery/Filter";
import GalleryGrid from "@/components/Widgets/Gallery/GalleryGrid";
import HeroSection from "@/components/Widgets/Gallery/HeroSection";
import OutroSection from "@/components/Widgets/Gallery/OutroSection";
import ScrollingColumns from "@/components/Widgets/Gallery/ScrollingColumns";
import Navigation from "@/components/Widgets/Nav";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import LoadingProvider from "./loading_provider";


interface PageProps {
    artworks: Artwork[];
    categories: string[];
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
                <HeroSection artworks={artworks} />
                <ScrollingColumns artworks={artworks} />
                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                <GalleryGrid artworks={filteredArtworks} />
                <OutroSection />
                <Footer />
            </div>
        </LoadingProvider>
    );
};

export default Index;
