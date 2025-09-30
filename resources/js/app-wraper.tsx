"use client";

import i18n from "@/src/i18n/lib/i18n"; // podle cesty k tvému i18n souboru
import React from "react";
import { I18nextProvider } from "react-i18next";
import { useLenis } from "./hooks/use-lenis";

interface AppWrapperProps {
    App: React.ComponentType<any>;
    pageProps: any;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ App, pageProps }) => {
    useLenis(); // smooth scrolling hook

    return (
        <I18nextProvider i18n={i18n}>
            <App {...pageProps} />
        </I18nextProvider>
    );
};
