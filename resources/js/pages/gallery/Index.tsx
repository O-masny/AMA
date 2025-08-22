import { Artwork } from "@/components/data/artworks";
import Footer from "@/components/Widgets/Footer";
import FeaturedArtworks from "@/components/Widgets/Gallery/FeatureArtworks";
import CategoryFilter from "@/components/Widgets/Gallery/Filter";
import GalleryGrid from "@/components/Widgets/Gallery/GalleryGrid";
import Navigation from "@/components/Widgets/Nav";
import { usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import LoadingProvider from "../loading_provider";


interface PageProps {
    artworks: Artwork[];
    categories: string[];
    [key: string]: any;
}

const Index: React.FC = () => {
    const { props } = usePage<PageProps>();
    const { artworks, categories } = props;

    const [selectedCategory, setSelectedCategory] = useState<string>("Vše");

    // Optimalizované filtrování
    const filteredArtworks = useMemo(() => {
        return selectedCategory === "Vše"
            ? artworks
            : artworks.filter((artwork) => artwork.category === selectedCategory);
    }, [selectedCategory, artworks]);

    return (
        <LoadingProvider>
            <div className="min-h-screen bg-background text-foreground">
                <Navigation />
                <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-900 opacity-70 animate-gradient-xy"></div>
                    <div className="relative z-10 px-6 max-w-5xl">
                        <motion.h1
                            className="text-6xl md:text-8xl lg:text-9xl font-playfair font-black text-white leading-tight mb-6"
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                            GALERIE
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-2xl text-white/80 font-inter max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                        >
                            Kolekce uměleckých děl zachycující různé období a styly mé tvorby. Každé dílo má svůj příběh a jedinečnou cestu k divákovi.
                        </motion.p>

                        <motion.div
                            className="mt-12 animate-bounce text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1 }}
                        >
                            ↓
                        </motion.div>
                    </div>
                </section>

                {/* Category Filter */}
                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                {/* Featured Horizontal Scroll */}
                <FeaturedArtworks artworks={filteredArtworks.slice(0, 3)} />

                {/* Main Gallery Grid */}
                <GalleryGrid artworks={filteredArtworks} />

                <Footer />
            </div>
        </LoadingProvider>
    );
};

export default Index;
