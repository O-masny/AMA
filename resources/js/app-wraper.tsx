// AppWrapper.tsx
import React from "react";
import { useLenis } from "./hooks/use-lenis";

interface AppWrapperProps {
    App: React.ComponentType<any>;
    pageProps: any;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ App, pageProps }) => {
    useLenis(); // hook je nyní bezpečně uvnitř komponenty
    return <App {...pageProps} />;
};
