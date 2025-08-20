import { Artwork } from "@/components/data/artworks";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Footer from "@/components/Widgets/Footer";
import Navigation from "@/components/Widgets/Nav";
import { FadeInStagger, HorizontalScroll, ScrollReveal } from "@/components/Widgets/ScrollAnimations";
import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

interface PageProps {
    artworks: Artwork[];
    categories: string[];
    [key: string]: any;
}

const Index: React.FC = () => {
    const { props } = usePage<PageProps>();
    const { artworks, categories } = props;

    const [selectedCategory, setSelectedCategory] = useState<string>("Vše");

    // Optimalizovaný filtr s useMemo
    const filteredArtworks = useMemo(() => {
        return selectedCategory === "Vše"
            ? artworks
            : artworks.filter((artwork) => artwork.category === selectedCategory);
    }, [selectedCategory, artworks]);

    // Motion varianty pro jednotné animace
    const fadeUpVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const hoverCardVariant = {
        hover: { scale: 1.02, y: -8 },
    };

    return (
        <div className="min-h-screen">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-hero opacity-10">
                <div className="max-w-7xl mx-auto px-6">
                    <ScrollReveal>
                        <div className="text-center">
                            <motion.h1
                                className="text-hero font-playfair font-black text-primary leading-none mb-6"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            >
                                GALERIE
                            </motion.h1>
                            <motion.p
                                className="text-xl font-inter text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                                variants={fadeUpVariant}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                Kolekce uměleckých děl zachycující různé období a styly mé tvorby.
                                Každé dílo má svůj příběh a jedinečnou cestu k divákovi.
                            </motion.p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-16 bg-gradient-subtle">
                <div className="max-w-7xl mx-auto px-6">
                    <ScrollReveal direction="up" delay={0.2}>
                        <div className="flex flex-wrap justify-center gap-4 mb-16">
                            {categories.map((category, index) => (
                                <motion.button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-8 py-4 rounded-full font-inter font-medium text-lg transition-all duration-500 ${selectedCategory === category
                                        ? "bg-primary text-primary-foreground shadow-soft scale-110"
                                        : "bg-card text-card-foreground hover:bg-art-rose hover:text-foreground hover:scale-105"
                                        }`}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    {category}
                                </motion.button>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Featured Horizontal Scroll */}
            <HorizontalScroll className="bg-background">
                {filteredArtworks.slice(0, 3).map((artwork) => (
                    <motion.div
                        key={artwork.id}
                        className="flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[40vw] h-[70vh] mx-8"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link href={`/gallery/${artwork.id}`}>
                            <Card className="group h-full overflow-hidden border-0 bg-card shadow-artistic hover:shadow-lg transition-all duration-700">
                                <div className="relative h-3/4 overflow-hidden">
                                    <img
                                        src={`/storage/${artwork.image}`}
                                        alt={artwork.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <h3 className="font-playfair font-bold text-2xl mb-2">{artwork.title}</h3>
                                        <p className="font-inter text-sm opacity-90">{artwork.description}</p>
                                    </div>
                                </div>
                                <div className="p-8 h-1/4 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-playfair font-bold text-2xl text-foreground mb-2">
                                            {artwork.title}
                                        </h3>
                                        <p className="font-inter text-muted-foreground text-sm">
                                            {artwork.technique} • {artwork.dimensions}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center pt-4">
                                        <Badge variant="secondary" className="bg-art-lavender text-foreground">
                                            {artwork.category}
                                        </Badge>
                                        <span className="font-inter font-bold text-primary text-lg">
                                            {artwork.year}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </HorizontalScroll>

            {/* Main Gallery Grid */}
            <section className="py-32 bg-gradient-subtle">
                <div className="max-w-7xl mx-auto px-6">
                    <ScrollReveal>
                        <h2 className="text-display font-playfair font-bold text-primary text-center mb-20">
                            Kompletní kolekce
                        </h2>
                    </ScrollReveal>

                    <FadeInStagger staggerDelay={0.15}>
                        [<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredArtworks.map((artwork, index) => (
                                <motion.div
                                    key={artwork.id}
                                    className={`${index % 4 === 0 ? "lg:transform lg:translate-y-8" :
                                        index % 4 === 1 ? "lg:transform lg:-translate-y-4" :
                                            index % 4 === 2 ? "lg:transform lg:translate-y-6" :
                                                "lg:transform lg:-translate-y-2"
                                        }`}
                                    variants={hoverCardVariant}
                                    whileHover="hover"
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                >
                                    <Link href={`/gallery/${artwork.id}`}>
                                        <Card className="group overflow-hidden border-0 bg-card shadow-artistic hover:shadow-lg transition-all duration-700 cursor-pointer">
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={`/storage/${artwork.image}`}
                                                    alt={artwork.title}
                                                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <h3 className="font-playfair font-bold text-xl mb-1">{artwork.title}</h3>
                                                    <p className="font-inter text-sm">{artwork.description}</p>
                                                </div>
                                                {!artwork.available && (
                                                    <div className="absolute top-4 right-4">
                                                        <Badge variant="destructive" className="bg-red-500 text-white">
                                                            Prodáno
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="font-playfair font-bold text-xl text-foreground mb-2">
                                                            {artwork.title}
                                                        </h3>
                                                        <p className="font-inter text-muted-foreground text-sm mb-2">
                                                            {artwork.technique}
                                                        </p>
                                                        <p className="font-inter text-muted-foreground text-xs">
                                                            {artwork.dimensions}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="bg-art-lavender text-foreground px-3 py-1 rounded-full text-xs font-inter font-medium mb-2 block">
                                                            {artwork.year}
                                                        </span>
                                                        {artwork.price && artwork.available && (
                                                            <span className="font-inter font-bold text-primary text-sm">
                                                                {artwork.price}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="pt-3 border-t border-border">
                                                    <Badge variant="outline" className="border-primary text-primary">
                                                        {artwork.category}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>]
                    </FadeInStagger>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Index;
