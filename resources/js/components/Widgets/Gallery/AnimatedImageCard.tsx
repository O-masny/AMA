"use client";

import { motion } from "framer-motion";
import { Artwork } from "@/components/data/artworks";

interface AnimatedImageCardProps {
    art: Artwork;
    delay?: number;
}

const AnimatedImageCard: React.FC<AnimatedImageCardProps> = ({ art, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true, amount: 0.3 }}
        className="w-64 h-96 rounded-2xl overflow-hidden shadow-lg"
    >
        <img
            src={`/storage/${art.image}`}
            alt={art.title}
            className="w-full h-full object-cover"
        />
    </motion.div>
);

export default AnimatedImageCard;
