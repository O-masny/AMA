"use client";

import Contact from "@/components/Widgets/Contact";
import Footer from "@/components/Widgets/Footer";
import Navigation from "@/components/Widgets/Nav";
import LoadingProvider from "./loading_provider";

const ContactPage: React.FC = () => {
    return (
        <LoadingProvider>
            <div className="min-h-screen bg-background text-foreground">
                <Navigation isReady={true} />

                <main className="relative z-20">
                    {/* Reuse the homepage Contact section as a standalone page */}
                    <Contact />
                </main>

                <Footer />
            </div>
        </LoadingProvider>
    );
};

export default ContactPage;
