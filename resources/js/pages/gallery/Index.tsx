"use client"

import { Artwork } from "@/components/data/artworks";
import Footer from "@/components/Widgets/Footer";
import CategoryFilter from "@/components/Widgets/Gallery/Filter";
import GalleryGrid from "@/components/Widgets/Gallery/GalleryGrid";
import HeroSection from "@/components/Widgets/Gallery/HeroSection";
import OutroSection from "@/components/Widgets/Gallery/OutroSection";
import Navigation from "@/components/Widgets/Nav";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
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

    // selectedCategory comes from server or defaults to 'Vše'
    const selectedCategoryFromServer = (props as any).selectedCategory || 'Vše';
    const pagination = (props as any).pagination || { current_page: 1, last_page: 1 };
    const [selectedCategory, setSelectedCategory] = useState<string>(selectedCategoryFromServer);
    const pagedArtworks = artworks; // server provides current page items
    const totalPages = pagination.last_page || 1;
    const currentPage = pagination.current_page || 1;

    return (
        <LoadingProvider>
            <div className="min-h-screen bg-background text-foreground">
                <Navigation isReady={true} />

                {/* HERO */}
                <HeroSection artworks={artworks} />

                {/* Featured strip (simplified) */}
                <section className="relative py-8 md:py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {artworks.slice(0, 4).map((art) => (
                                <div key={art.id} className="relative overflow-hidden rounded-2xl h-56">
                                    <img src={`/storage/${art.image}`} alt={art.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                                        <div>
                                            <div className="text-sm text-white/90">{art.title}</div>
                                            <div className="text-xs text-white/70">{art.technique}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* FILTER + GRID */}
                <CategoryFilter
                    categories={categories ?? []} // ← fallback na prázdné pole
                    selectedCategory={selectedCategory}
                    setSelectedCategory={(cat) => {
                        // navigate server-side when category changes
                        setSelectedCategory(cat);
                        window.location.href = `/gallery?category=${encodeURIComponent(cat)}`;
                    }}
                />

                <GalleryGrid artworks={pagedArtworks} />

                {/* Pagination controls (server-side links) */}
                {totalPages > 1 && (
                    <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-center gap-3">
                        <Link
                            href={`/gallery?page=${Math.max(1, currentPage - 1)}&category=${encodeURIComponent(selectedCategory)}`}
                            className={`px-4 py-2 bg-card text-foreground rounded-none ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            ← Předchozí
                        </Link>

                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <Link
                                    key={i}
                                    href={`/gallery?page=${i + 1}&category=${encodeURIComponent(selectedCategory)}`}
                                    className={`px-3 py-2 ${currentPage === i + 1 ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground'} rounded-none`}
                                >
                                    {i + 1}
                                </Link>
                            ))}
                        </div>

                        <Link
                            href={`/gallery?page=${Math.min(totalPages, currentPage + 1)}&category=${encodeURIComponent(selectedCategory)}`}
                            className={`px-4 py-2 bg-card text-foreground rounded-none ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            Další →
                        </Link>
                    </div>
                )}

                {/* OUTRO + FOOTER */}
                <OutroSection />
                <Footer />
            </div>
        </LoadingProvider>
    );
};

export default Index;
