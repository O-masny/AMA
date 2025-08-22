import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import { AppWrapper } from './app-wraper';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/**/*.tsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<AppWrapper App={App} pageProps={props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();
