"use client";
import { Artwork } from "@/components/data/artworks";

interface HeroSectionProps {
    artworks?: Artwork[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ artworks = [] }) => {
    const hero = artworks?.[0];

    if (!hero) {
        return (
            <section className="relative h-[56vh] md:h-[72vh] flex items-center justify-center bg-neutral-900">
                <h1 className="text-heading md:text-display font-bold text-white">Žádná díla nejsou k dispozici</h1>
            </section>
        );
    }

    return (
        <section className="relative h-[56vh] md:h-[72vh] overflow-hidden bg-black">
            <div className="absolute inset-0">
                <img src={`/storage/${hero.image}`} alt={hero.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col justify-center items-center text-center px-6">
                <h1 className="huge-display font-display font-extrabold text-white leading-tight">GALERIE</h1>
                <p className="mt-4 text-body md:text-title text-white/80 max-w-2xl">Vstup do vizuálního prostoru, kde obrazy ožívají.</p>
            </div>
        </section>
    );
};

export default HeroSection;
