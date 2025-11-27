"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Contact from "@/components/Widgets/Contact";
import Footer from "@/components/Widgets/Footer";
import Navigation from "@/components/Widgets/Nav";
import React from "react";
import { useTranslation } from "react-i18next";
import LoadingProvider from "./loading_provider";

const ContactPage: React.FC = () => {
    const { t } = useTranslation("common");
    return (
        <LoadingProvider>
            <div className="min-h-screen bg-background text-foreground">
                <Navigation isReady={true} />

                <main className="relative z-20">
                    {/* Reuse the homepage Contact section as a standalone page */}
                    {/* Breadcrumbs + contact */}
                    <div className="max-w-7xl mx-auto px-6 pt-6">
                        <Breadcrumbs items={[{ label: t("nav.home", "Domů"), href: "/" }, { label: t("nav.contact", "Kontakt") }]} />
                    </div>
                    <Contact standalone />
                </main>

                <Footer />
            </div>
        </LoadingProvider>
    );
};

export default ContactPage;
