import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.tsx"],
            ssr: "resources/js/ssr.tsx",
            refresh: true,
            // ↓ PŘIDEJ TOTO - řekni pluginu o .vite/ adresáři
            buildDirectory: 'build',
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: "automatic",
    },
    build: {
        manifest: '.vite/manifest.json', // ← Explicitně nastav cestu
        outDir: 'public/build',
        emptyOutDir: true,
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        hmr: {
            host: 'localhost',
            protocol: 'ws',
            port: 5173,
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "resources/js"),
            "ziggy-js": resolve(__dirname, "vendor/tightenco/ziggy"),
        },
    },
});