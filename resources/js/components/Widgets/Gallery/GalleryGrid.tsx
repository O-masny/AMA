import { Artwork } from "@/components/data/artworks";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FadeInStagger } from "@/components/Widgets/ScrollAnimations";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";

interface GalleryGridProps {
    artworks: Artwork[];
}

const hoverCardVariant = {
    hover: { scale: 1.03, y: -6 },
};

const GalleryGrid: React.FC<GalleryGridProps> = ({ artworks }) => {
    return (
        <section className="py-32 bg-background/95">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-5xl md:text-6xl font-playfair font-bold text-center text-primary mb-20">
                    Kompletní kolekce
                </h2>

                {/* FadeInStagger nyní přijímá i jednoho potomka */}
                <FadeInStagger staggerDelay={0.1}>
                    {/*
                      Zabalíme jednotlivé cards přímo, protože FadeInStagger očekává pole,
                      ale ReactNode je kompatibilní i s jediným elementem
                    */}
                    {artworks.map((artwork) => (
                        <motion.div
                            key={artwork.id}
                            variants={hoverCardVariant}
                            whileHover="hover"
                            className="overflow-hidden"
                        >
                            <Link href={`/gallery/${artwork.id}`}>
                                <Card className="group h-full border-0 bg-card shadow-soft hover:shadow-xl transition-all duration-700">
                                    <div className="relative h-80 overflow-hidden">
                                        <img
                                            src={`/storage/${artwork.image}`}
                                            alt={artwork.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                    <div className="p-6 flex flex-col justify-between h-56">
                                        <div>
                                            <h3 className="font-playfair font-bold text-2xl text-foreground mb-2">{artwork.title}</h3>
                                            <p className="font-inter text-muted-foreground text-sm">{artwork.technique} • {artwork.dimensions}</p>
                                        </div>
                                        <div className="flex justify-between items-center pt-4">
                                            <Badge>{artwork.category}</Badge>
                                            <span className="font-inter font-bold text-primary">{artwork.year}</span>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </FadeInStagger>
            </div>
        </section>
    );
};

export default GalleryGrid;
