"use client";

import { Artwork } from "@/components/data/artworks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/components/Widgets/Footer";
import { ScrollReveal } from "@/components/Widgets/ScrollAnimations";
import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Eye, EyeOff, Heart, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface PageProps {
    artwork: Artwork;
    artworks: Artwork[];
    [key: string]: any;
}

const Show: React.FC = () => {
    const { props } = usePage<PageProps>();
    const { artwork, artworks } = props;
    const { t } = useTranslation("common");

    const [showOverlay, setShowOverlay] = useState(true);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!artwork) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
                <div className="text-center">
                    <h1 className="text-4xl font-playfair font-bold text-primary mb-4">
                        {t("artwork.notFound")}
                    </h1>
                    <Link href="/gallery">
                        <Button variant="outline">{t("artwork.backToGallery")}</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const currentIndex = artworks.findIndex((a) => a.id === artwork.id);
    const previousArtwork =
        currentIndex > 0 ? artworks[currentIndex - 1] : artworks[artworks.length - 1];
    const nextArtwork =
        currentIndex < artworks.length - 1 ? artworks[currentIndex + 1] : artworks[0];

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            {/* HERO */}
            <section className="relative h-screen overflow-hidden">
                <button
                    onClick={() => window.history.back()}
                    className="absolute top-6 left-6 z-30 flex items-center gap-2 px-4 py-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">{t("artwork.back")}</span>
                </button>

                <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(/storage/${artwork.image})`,
                        transform: `translateY(${scrollY * 0.5}px)`,
                        filter: showOverlay ? "grayscale(100%) brightness(0.4)" : "none",
                        transition: "filter 0.7s ease, transform 0.2s ease-out",
                    }}
                />

                {showOverlay && (
                    <div className="absolute inset-0 bg-gradient-hero opacity-80 transition-opacity duration-700" />
                )}

                <div
                    className={`absolute inset-0 flex items-center justify-center text-center transition-opacity duration-700 ${showOverlay ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                >
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
                        <h1
                            className="text-6xl md:text-8xl font-playfair font-bold tracking-wide mb-6 text-primary-foreground"
                            style={{ transform: `translateY(${scrollY * -0.2}px)` }}
                        >
                            {artwork.title}
                        </h1>
                        <div className="w-32 h-0.5 bg-primary-foreground mx-auto" />
                    </motion.div>
                </div>

                {/* Toggle overlay button */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                    <button
                        onClick={() => setShowOverlay(!showOverlay)}
                        className="px-5 py-3 bg-black/60 rounded-full flex items-center gap-2 text-white hover:bg-black/80 transition"
                    >
                        {showOverlay ? (
                            <>
                                <EyeOff className="w-5 h-5" />
                                <span className="text-sm">{t("artwork.hideOverlay")}</span>
                            </>
                        ) : (
                            <>
                                <Eye className="w-5 h-5" />
                                <span className="text-sm">{t("artwork.showOverlay")}</span>
                            </>
                        )}
                    </button>
                </div>
            </section>

            {/* CONTENT */}
            <section className="relative overflow-hidden bg-gradient-subtle py-32">
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        {/* LEFT COLUMN */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="space-y-12"
                        >
                            <div>
                                <Badge variant="outline" className="border-primary text-primary mb-6 text-sm uppercase tracking-widest">
                                    {artwork.category}
                                </Badge>
                                <h1 className="text-6xl md:text-7xl font-playfair font-bold text-primary mb-8 leading-tight">
                                    {artwork.title}
                                </h1>
                                <p className="text-xl font-inter text-muted-foreground leading-relaxed max-w-2xl italic">
                                    {artwork.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                {[
                                    { label: t("artwork.technique"), value: artwork.technique },
                                    { label: t("artwork.dimensions"), value: artwork.dimensions },
                                    { label: t("artwork.year"), value: artwork.year },
                                    {
                                        label: t("artwork.availability"),
                                        value: artwork.available ? t("artwork.available") : t("artwork.sold"),
                                        color: artwork.available ? "text-green-600" : "text-red-600",
                                    },
                                ].map((info, idx) => (
                                    <motion.div
                                        key={info.label}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: idx * 0.2 }}
                                        className="p-6 bg-white/70 dark:bg-black/40 backdrop-blur-md rounded-2xl shadow-lg"
                                    >
                                        <h3 className="font-playfair font-bold text-lg mb-2">{info.label}</h3>
                                        <p className={`text-muted-foreground font-inter ${info.color || ""}`}>
                                            {info.value}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            {artwork.price && artwork.available && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                    className="p-8 bg-gradient-to-r from-primary/90 to-primary rounded-2xl shadow-xl text-white"
                                >
                                    <h3 className="font-playfair font-bold text-xl mb-2">{t("artwork.price")}</h3>
                                    <p className="font-bold text-3xl">{artwork.price}</p>
                                </motion.div>
                            )}

                            <div className="flex gap-4">
                                <Button size="lg" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                                    <Heart className="w-4 h-4 mr-2" />
                                    {t("artwork.addToFavorites")}
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                                >
                                    <Share2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>

                        {/* RIGHT COLUMN */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="relative rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <img
                                src={`/storage/${artwork.image}`}
                                alt={artwork.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {artwork.story && (
                <section className="py-32 bg-gradient-hero text-primary-foreground">
                    <div className="max-w-4xl mx-auto px-6">
                        <ScrollReveal>
                            <div className="text-center mb-16">
                                <h2 className="text-heading font-playfair font-bold">
                                    {t("artwork.storyTitle")}
                                </h2>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="up" delay={0.2}>
                            <Card className="p-12 bg-card shadow-artistic">
                                <p className="text-lg font-inter text-muted-foreground leading-relaxed text-center italic">
                                    “{artwork.story}”
                                </p>
                            </Card>
                        </ScrollReveal>
                    </div>
                </section>
            )}

            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-6">
                    <ScrollReveal>
                        <h2 className="text-heading font-playfair font-bold text-primary text-center mb-16">
                            {t("artwork.nextWorks")}
                        </h2>
                    </ScrollReveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[previousArtwork, nextArtwork].map((item, idx) => (
                            <motion.div key={item.id} whileHover={{ scale: 1.02, y: -8 }} transition={{ duration: 0.4 }}>
                                <Link href={`/gallery/${item.id}`}>
                                    <Card className="group overflow-hidden bg-card shadow-artistic hover:shadow-lg transition-all duration-500 cursor-pointer">
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={`/storage/${item.image}`}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className={`absolute top-4 ${idx === 0 ? "left-4" : "right-4"}`}>
                                                {idx === 0 ? (
                                                    <ChevronLeft className="w-6 h-6 text-white bg-black/50 rounded-full p-1" />
                                                ) : (
                                                    <ChevronRight className="w-6 h-6 text-white bg-black/50 rounded-full p-1" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="font-playfair font-bold text-xl mb-2">{item.title}</h3>
                                            <p className="text-muted-foreground text-sm">
                                                {idx === 0 ? t("artwork.previous") : t("artwork.next")}
                                            </p>
                                        </div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Show;
