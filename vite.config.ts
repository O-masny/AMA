import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        base: mode === 'production' ? '/build/' : '/',
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './resources/js'),
                '@assets': path.resolve(__dirname, './resources/assets'),
            },
        },
        build: {
            outDir: 'public/build',
            emptyOutDir: true,
            rollupOptions: {
                input: {
                    main: path.resolve(__dirname, 'resources/js/app.tsx'),
                },
            },
        },
        server: {
            host: '127.0.0.1',
            port: 5173,
        },
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                refresh: true,
            }),
            react(),
            tailwindcss(),
        ],
    };
});
