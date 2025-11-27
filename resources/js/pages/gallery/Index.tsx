"use client"

import { Artwork } from "@/components/data/artworks";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CTAButton from "@/components/ui/CTAButton";
import Footer from "@/components/Widgets/Footer";
import CategoryFilter from "@/components/Widgets/Gallery/Filter";
import GalleryGrid from "@/components/Widgets/Gallery/GalleryGrid";
import HeroSection from "@/components/Widgets/Gallery/HeroSection";
import Navigation from "@/components/Widgets/Nav";
import { usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation("common");

    // selectedCategory comes from server or defaults to 'Vše'
    const selectedCategoryFromServer = (props as any).selectedCategory || 'Vše';
    const pagination = (props as any).pagination || { current_page: 1, last_page: 1 };
    const [selectedCategory, setSelectedCategory] = useState<string>(selectedCategoryFromServer);

    // client-side managed list beginning with server-provided first page
    const [artworksList, setArtworksList] = useState<any[]>(artworks || []);
    const [currentPage, setCurrentPage] = useState<number>(pagination.current_page || 1);
    const [lastPage, setLastPage] = useState<number>(pagination.last_page || 1);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [loadError, setLoadError] = useState<string | null>(null);

    const sentinelRef = useRef<HTMLDivElement | null>(null);

    // auto-load when sentinel becomes visible
    useEffect(() => {
        if (!sentinelRef.current) return;
        const el = sentinelRef.current;
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !loadingMore && currentPage < lastPage) {
                    // trigger same logic as the button
                    (async () => {
                        setLoadingMore(true);
                        setLoadError(null);
                        try {
                            const nextPage = currentPage + 1;
                            const res = await fetch(`/gallery/more?page=${nextPage}&category=${encodeURIComponent(selectedCategory)}`);
                            if (!res.ok) throw new Error('Chyba při načítání');
                            const data = await res.json();
                            setArtworksList((s) => [...s, ...(data.items || [])]);
                            setCurrentPage(data.pagination.current_page || nextPage);
                            setLastPage(data.pagination.last_page || lastPage);
                        } catch (e: any) {
                            setLoadError(e.message || 'Network error');
                        } finally {
                            setLoadingMore(false);
                        }
                    })();
                }
            });
        }, { rootMargin: '200px' });

        obs.observe(el);
        return () => obs.disconnect();
    }, [sentinelRef.current, loadingMore, currentPage, lastPage, selectedCategory]);

    return (
        <LoadingProvider>
            <div className="min-h-screen bg-background text-foreground">
                <Navigation isReady={true} />

                {/* HERO */}
                <div className="max-w-7xl mx-auto px-6 pt-6">
                    <Breadcrumbs items={[{ label: t("nav.home", "Domů"), href: "/" }, { label: t("gallery.title", "Galerie") }]} />
                </div>
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

                <GalleryGrid artworks={artworksList} />

                {/* Infinite scroll / Load more */}
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {loadError && <div className="text-sm text-destructive mb-4">{loadError}</div>}

                    <div className="flex items-center justify-center">
                        <CTAButton
                            onClick={async () => {
                                if (loadingMore || currentPage >= lastPage) return;
                                setLoadingMore(true);
                                setLoadError(null);
                                try {
                                    const nextPage = currentPage + 1;
                                    const res = await fetch(`/gallery/more?page=${nextPage}&category=${encodeURIComponent(selectedCategory)}`);
                                    if (!res.ok) throw new Error('Chyba při načítání');
                                    const data = await res.json();
                                    setArtworksList((s) => [...s, ...(data.items || [])]);
                                    setCurrentPage(data.pagination.current_page || nextPage);
                                    setLastPage(data.pagination.last_page || lastPage);
                                } catch (e: any) {
                                    setLoadError(e.message || 'Network error');
                                } finally {
                                    setLoadingMore(false);
                                }
                            }}
                            disabled={loadingMore || currentPage >= lastPage}
                            className=""
                        >
                            {loadingMore ? 'Načítám…' : currentPage >= lastPage ? 'Nic víc' : 'Načíst další'}
                        </CTAButton>
                    </div>

                    {/* sentinel for auto-load */}
                    <div ref={sentinelRef} className="mt-6" />
                </div>

                <Footer />
            </div>
        </LoadingProvider>
    );
};

export default Index;
