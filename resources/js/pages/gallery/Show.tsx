import { artworks } from "@/components/data/artworks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/components/Widgets/Footer";
import Navigation from "@/components/Widgets/Nav";
import { Parallax, ScrollReveal } from "@/components/Widgets/ScrollAnimations";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Share2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

const GalleryShow = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const artwork = artworks.find(a => a.id === id);
    const currentIndex = artworks.findIndex(a => a.id === id);

    const previousArtwork = currentIndex > 0 ? artworks[currentIndex - 1] : artworks[artworks.length - 1];
    const nextArtwork = currentIndex < artworks.length - 1 ? artworks[currentIndex + 1] : artworks[0];

    if (!artwork) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-playfair font-bold text-primary mb-4">Dílo nenalezeno</h1>
                    <Button onClick={() => navigate('/gallery')} variant="outline">
                        Zpět do galerie
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <Parallax speed={0.3}>
                    <div className="absolute inset-0 gradient-hero opacity-10"></div>
                </Parallax>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/gallery')}
                            className="mb-8 hover:bg-art-rose transition-colors duration-300"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Zpět do galerie
                        </Button>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Image Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative group">
                                <img
                                    src={artwork.image}
                                    alt={artwork.title}
                                    className="w-full h-[70vh] object-cover rounded-3xl shadow-artistic"
                                />
                                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-art-rose rounded-full opacity-60 blur-xl"></div>
                                <div className="absolute -top-8 -left-8 w-24 h-24 bg-art-lavender rounded-full opacity-40 blur-lg"></div>
                            </div>
                        </motion.div>

                        {/* Content Section */}
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
                                <h1 className="text-display font-playfair font-bold text-primary mb-4 leading-tight">
                                    {artwork.title}
                                </h1>
                                <p className="text-xl font-inter text-muted-foreground leading-relaxed">
                                    {artwork.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-playfair font-bold text-lg text-foreground mb-2">Technika</h3>
                                    <p className="font-inter text-muted-foreground">{artwork.technique}</p>
                                </div>
                                <div>
                                    <h3 className="font-playfair font-bold text-lg text-foreground mb-2">Rozměry</h3>
                                    <p className="font-inter text-muted-foreground">{artwork.dimensions}</p>
                                </div>
                                <div>
                                    <h3 className="font-playfair font-bold text-lg text-foreground mb-2">Rok vzniku</h3>
                                    <p className="font-inter text-muted-foreground">{artwork.year}</p>
                                </div>
                                <div>
                                    <h3 className="font-playfair font-bold text-lg text-foreground mb-2">Dostupnost</h3>
                                    <p className={`font-inter font-medium ${artwork.available ? 'text-green-600' : 'text-red-600'}`}>
                                        {artwork.available ? 'Dostupné' : 'Prodáno'}
                                    </p>
                                </div>
                            </div>

                            {artwork.price && artwork.available && (
                                <div className="p-6 bg-art-cream rounded-2xl">
                                    <h3 className="font-playfair font-bold text-xl text-foreground mb-2">Cena</h3>
                                    <p className="font-inter font-bold text-2xl text-primary">{artwork.price}</p>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                                    <Heart className="w-4 h-4 mr-2" />
                                    Přidat do oblíbených
                                </Button>
                                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                                    <Share2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            {artwork.story && (
                <section className="py-32 bg-gradient-subtle">
                    <div className="max-w-4xl mx-auto px-6">
                        <ScrollReveal>
                            <div className="text-center mb-16">
                                <h2 className="text-heading font-playfair font-bold text-primary mb-6">
                                    Příběh díla
                                </h2>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={0.2}>
                            <Card className="p-12 bg-card border-0 shadow-soft">
                                <p className="text-lg font-inter text-muted-foreground leading-relaxed text-center italic">
                                    "{artwork.story}"
                                </p>
                            </Card>
                        </ScrollReveal>
                    </div>
                </section>
            )}

            {/* Navigation to other artworks */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-6">
                    <ScrollReveal>
                        <h2 className="text-heading font-playfair font-bold text-primary text-center mb-16">
                            Další díla
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Previous Artwork */}
                        <motion.div
                            whileHover={{ scale: 1.02, y: -8 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Link to={`/gallery/${previousArtwork.id}`}>
                                <Card className="group overflow-hidden border-0 bg-card shadow-artistic hover:shadow-lg transition-all duration-500 cursor-pointer">
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={previousArtwork.image}
                                            alt={previousArtwork.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <ChevronLeft className="w-6 h-6 text-white bg-black/50 rounded-full p-1" />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-playfair font-bold text-xl text-foreground mb-2">
                                            {previousArtwork.title}
                                        </h3>
                                        <p className="font-inter text-muted-foreground text-sm">
                                            Předchozí dílo
                                        </p>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>

                        {/* Next Artwork */}
                        <motion.div
                            whileHover={{ scale: 1.02, y: -8 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Link to={`/gallery/${nextArtwork.id}`}>
                                <Card className="group overflow-hidden border-0 bg-card shadow-artistic hover:shadow-lg transition-all duration-500 cursor-pointer">
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={nextArtwork.image}
                                            alt={nextArtwork.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 right-4">
                                            <ChevronRight className="w-6 h-6 text-white bg-black/50 rounded-full p-1" />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-playfair font-bold text-xl text-foreground mb-2">
                                            {nextArtwork.title}
                                        </h3>
                                        <p className="font-inter text-muted-foreground text-sm">
                                            Následující dílo
                                        </p>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default GalleryShow;