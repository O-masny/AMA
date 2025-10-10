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
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: "automatic",
    },
    build: {
        outDir: 'public/build',
        manifest: true,
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "resources/js"), // <— DŮLEŽITÉ
            "ziggy-js": resolve(__dirname, "vendor/tightenco/ziggy"),
        },
    },
});
