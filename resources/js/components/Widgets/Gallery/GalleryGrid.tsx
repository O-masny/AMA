"use client";

import { Artwork } from "@/components/data/artworks";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "@inertiajs/react";
import { motion, Variants } from "framer-motion";

interface GalleryGridProps {
    artworks: Artwork[];
}

const cardVariants: Variants = {
    hidden: (i: number) => ({
        opacity: 0,
        x: i % 2 === 0 ? -60 : 60,
        y: 30,
    }),
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" },
    }),
};

const GalleryGrid: React.FC<GalleryGridProps> = ({ artworks }) => {
    return (
        <section className="py-32 bg-background/95">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-heading md:text-display font-display font-bold text-center text-primary mb-20">
                    Kompletní kolekce
                </h2>

                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    {artworks.map((artwork, i) => (
                        <motion.div
                            key={artwork.id}
                            layout
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.2 }}
                            variants={cardVariants}
                            whileHover={{ scale: 1.03, y: -6 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="overflow-hidden"
                        >
                            <Link href={`/gallery/${artwork.id}`}>
                                <Card className="group h-full border-0 bg-card shadow-soft hover:shadow-xl transition-all duration-700">
                                    <div className="relative h-80 overflow-hidden">
                                        <motion.img
                                            src={`/storage/${artwork.image}`}
                                            alt={artwork.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            whileHover={{ rotate: 1 }}
                                            transition={{ type: "spring", stiffness: 150, damping: 15 }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                    <div className="p-6 flex flex-col justify-between h-56">
                                        <div>
                                            <h3 className="font-display font-bold text-title text-foreground mb-2 group-hover:text-primary transition-colors duration-500">
                                                {artwork.title}
                                            </h3>
                                            <p className="font-sans text-muted-foreground text-sm">
                                                {artwork.technique} • {artwork.dimensions}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center pt-4">
                                            <Badge>{artwork.category}</Badge>
                                            <span className="font-sans font-bold text-primary">
                                                {artwork.year}
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default GalleryGrid;
