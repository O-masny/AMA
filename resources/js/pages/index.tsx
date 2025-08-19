import { useState } from "react";
import { Artwork } from "@/components/data/artworks";
import About from "@/components/Widgets/About";
import Contact from "@/components/Widgets/Contact";
import Exhibitions from "@/components/Widgets/Exhibitions";
import Footer from "@/components/Widgets/Footer";
import Gallery from "@/components/Widgets/Gallery";
import Hero from "@/components/Widgets/Hero";
import Navigation from "@/components/Widgets/Nav";
import { SplashScreen } from "./splash";

interface IndexProps {
    featuredArtworks: Artwork[];
}

const Index = ({ featuredArtworks }: IndexProps) => {
    const [showSplash, setShowSplash] = useState(true);

    return (
        <div className="min-h-screen relative">
            {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

            <Navigation />
            <main className={`${showSplash ? "pointer-events-none" : ""}`}>
                <Hero />
                <Gallery featuredArtworks={featuredArtworks} />
                <Exhibitions />
                <About />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default Index;
