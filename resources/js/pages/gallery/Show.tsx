import { Artwork } from "@/components/data/artworks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/components/Widgets/Footer";
import Navigation from "@/components/Widgets/Nav";
import { ScrollReveal } from "@/components/Widgets/ScrollAnimations";
import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Eye, EyeOff, Heart, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

interface PageProps {
    artwork: Artwork;
    artworks: Artwork[];
    [key: string]: any;
}

const Show: React.FC = () => {
    const { props } = usePage<PageProps>();
    const { artwork, artworks } = props;
    const [showOverlay, setShowOverlay] = useState(true);

    if (!artwork) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
                <div className="text-center">
                    <h1 className="text-4xl font-playfair font-bold text-primary mb-4">Dílo nenalezeno</h1>
                    <Link href="/gallery">
                        <Button variant="outline">Zpět do galerie</Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Scroll Y
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prev / Next
    const currentIndex = artworks.findIndex((a) => a.id === artwork.id);
    const previousArtwork = currentIndex > 0 ? artworks[currentIndex - 1] : artworks[artworks.length - 1];
    const nextArtwork = currentIndex < artworks.length - 1 ? artworks[currentIndex + 1] : artworks[0];

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <Navigation />

            {/* HERO */}
            <section className="relative h-screen overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(/storage/${artwork.image})`,
                        transform: `translateY(${scrollY * 0.5}px)`,
                        filter: showOverlay ? "grayscale(100%) brightness(0.4)" : "none",
                        transition: "filter 0.7s ease, transform 0.2s ease-out",
                    }}
                />

                {showOverlay && <div className="absolute inset-0 bg-gradient-hero opacity-80 transition-opacity duration-700" />}

                <div
                    className={`absolute inset-0 flex items-center justify-center text-center transition-opacity duration-700 ${showOverlay ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                >
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <h1
                            className="text-6xl md:text-8xl font-playfair font-bold tracking-wide mb-6 text-primary-foreground"
                            style={{ transform: `translateY(${scrollY * -0.2}px)` }}
                        >
                            {artwork.title}
                        </h1>
                        <div className="w-32 h-0.5 bg-primary-foreground mx-auto" />
                    </motion.div>
                </div>

                <button
                    onClick={() => setShowOverlay(!showOverlay)}
                    className="absolute bottom-6 right-6 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition"
                    aria-label="Přepnout overlay"
                >
                    {showOverlay ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
            </section>

            {/* CONTENT */}
            <section className="pt-20 pb-20 relative overflow-hidden bg-gradient-subtle">
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <Link href="/gallery">
                            <Button variant="ghost" className="mb-8 hover:bg-accent transition-colors duration-300">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Zpět do galerie
                            </Button>
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="space-y-8"
                        >
                            <div>
                                <Badge variant="outline" className="border-primary text-primary mb-4">
                                    {artwork.category}
                                </Badge>
                                <h1 className="text-display font-playfair font-bold text-primary mb-4 leading-tight">{artwork.title}</h1>
                                <p className="text-xl font-inter text-muted-foreground leading-relaxed">{artwork.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-playfair font-bold text-lg mb-2">Technika</h3>
                                    <p className="text-muted-foreground">{artwork.technique}</p>
                                </div>
                                <div>
                                    <h3 className="font-playfair font-bold text-lg mb-2">Rozměry</h3>
                                    <p className="text-muted-foreground">{artwork.dimensions}</p>
                                </div>
                                <div>
                                    <h3 className="font-playfair font-bold text-lg mb-2">Rok vzniku</h3>
                                    <p className="text-muted-foreground">{artwork.year}</p>
                                </div>
                                <div>
                                    <h3 className="font-playfair font-bold text-lg mb-2">Dostupnost</h3>
                                    <p className={`font-medium ${artwork.available ? "text-green-600" : "text-red-600"}`}>
                                        {artwork.available ? "Dostupné" : "Prodáno"}
                                    </p>
                                </div>
                            </div>

                            {artwork.price && artwork.available && (
                                <div className="p-6 bg-card rounded-lg shadow-artistic">
                                    <h3 className="font-playfair font-bold text-xl mb-2">Cena</h3>
                                    <p className="font-bold text-2xl text-primary">{artwork.price}</p>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <Button size="lg" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                                    <Heart className="w-4 h-4 mr-2" />
                                    Přidat do oblíbených
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
                    </div>
                </div>
            </section>

            {/* STORY */}
            {artwork.story && (
                <section className="py-32 bg-gradient-hero text-primary-foreground">
                    <div className="max-w-4xl mx-auto px-6">
                        <ScrollReveal>
                            <div className="text-center mb-16">
                                <h2 className="text-heading font-playfair font-bold">Příběh díla</h2>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="up" delay={0.2}>
                            <Card className="p-12 bg-card shadow-artistic">
                                <p className="text-lg font-inter text-muted-foreground leading-relaxed text-center italic">
                                    "{artwork.story}"
                                </p>
                            </Card>
                        </ScrollReveal>
                    </div>
                </section>
            )}

            {/* NEXT / PREV */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-6">
                    <ScrollReveal>
                        <h2 className="text-heading font-playfair font-bold text-primary text-center mb-16">Další díla</h2>
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
                                                {idx === 0 ? "Předchozí dílo" : "Další dílo"}
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
