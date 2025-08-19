import { Artwork } from "@/components/data/artworks"; // typ pro TS
import { Card } from "@/components/ui/card";
import { FadeInStagger, ScrollReveal } from "@/components/Widgets/ScrollAnimations";
import { Link } from "@inertiajs/react";

interface GalleryProps {
    featuredArtworks: Artwork[];
}

const Gallery = ({ featuredArtworks }: GalleryProps) => {
    return (
        <section id="gallery" className="py-32 bg-gradient-subtle">
            <div className="max-w-7xl mx-auto px-6">
                <ScrollReveal>
                    <div className="text-center mb-20">
                        <h2 className="text-display font-playfair font-bold text-primary mb-6">
                            Galerie
                        </h2>
                        <p className="text-xl font-inter text-muted-foreground max-w-2xl mx-auto mb-8">
                            Kolekce děl zachycující různé období a styly mé tvorby
                        </p>
                        <Link
                            href="/gallery"
                            className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105"
                        >
                            Zobrazit celou galerii
                        </Link>
                    </div>
                </ScrollReveal>

                <FadeInStagger staggerDelay={0.15}>
                    {[
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredArtworks.map((artwork, index) => (
                                <Link key={artwork.id} href={`/gallery/${artwork.id}`}>
                                    <Card
                                        className={`group overflow-hidden border-0 bg-card shadow-artistic hover:shadow-lg transition-all duration-500 cursor-pointer ${index % 3 === 0
                                            ? "lg:transform lg:translate-y-8"
                                            : index % 3 === 1
                                                ? "lg:transform lg:-translate-y-4"
                                                : ""
                                            }`}
                                    >
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={`/storage/${artwork.image}`}
                                                alt={artwork.title}
                                                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <h3 className="font-playfair font-bold text-xl mb-1">
                                                    {artwork.title}
                                                </h3>
                                                <p className="font-inter text-sm">{artwork.description}</p>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-playfair font-bold text-xl text-foreground mb-2">
                                                        {artwork.title}
                                                    </h3>
                                                    <p className="font-inter text-muted-foreground text-sm mb-3">
                                                        {artwork.description}
                                                    </p>
                                                </div>
                                                <span className="bg-art-lavender text-foreground px-3 py-1 rounded-full text-xs font-inter font-medium">
                                                    {artwork.year}
                                                </span>
                                            </div>
                                            <div className="pt-3 border-t border-border">
                                                <span className="text-primary font-inter font-medium text-sm">
                                                    {artwork.category}
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>,
                    ]}
                </FadeInStagger>
            </div>
        </section>
    );
};

export default Gallery;
