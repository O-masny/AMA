import { Artwork } from "@/components/data/artworks";
import { Card } from "@/components/ui/card";
import { HorizontalScroll } from "@/components/Widgets/ScrollAnimations";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";

interface FeaturedArtworksProps {
    artworks: Artwork[];
}

const FeaturedArtworks: React.FC<FeaturedArtworksProps> = ({ artworks }) => {
    return (
        <HorizontalScroll className="bg-background/95 section--sm">
            {artworks.map((artwork) => (
                <motion.div
                    key={artwork.id}
                    className="flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[40vw] h-[70vh] mx-6"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                >
                    <Link href={`/gallery/${artwork.id}`}>
                        <Card className="group h-full overflow-hidden border-0 bg-card shadow-artistic hover:shadow-xl transition-all duration-700">
                            <div className="relative h-3/4 overflow-hidden">
                                <img
                                    src={`/storage/${artwork.image}`}
                                    alt={artwork.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <h3 className="font-display font-bold text-title mb-2">{artwork.title}</h3>
                                    <p className="font-sans text-sm opacity-90">{artwork.description}</p>
                                </div>
                            </div>
                            <div className="p-8 h-1/4 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-display font-bold text-title text-foreground mb-2">{artwork.title}</h3>
                                    <p className="font-sans text-muted-foreground text-sm">{artwork.technique} • {artwork.dimensions}</p>
                                </div>
                                <div className="flex justify-between items-center pt-4">
                                    <span className="bg-art-lavender text-foreground px-3 py-1 rounded-full text-xs font-sans font-medium">{artwork.category}</span>
                                    <span className="font-sans font-bold text-primary text-lg">{artwork.year}</span>
                                </div>
                            </div>
                        </Card>
                    </Link>
                </motion.div>
            ))}
        </HorizontalScroll>
    );
};

export default FeaturedArtworks;
