<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Preload custom font --}}
    <link rel="preload" href="/fonts/adelia_3/adelia.otf" as="font" type="font/woff2" crossorigin>
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="Amatelier" />
    <link rel="manifest" href="/site.webmanifest" />
    {{-- CSRF token for JS --}}
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- Detect system dark mode preference --}}
    <script>
        (function () {
            const appearance = '{{ $appearance ?? "system" }}';
            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style for background --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    <title inertia>{{ config('app.name', 'AMatelier') }}</title>

    {{-- Favicon --}}


    {{-- Ziggy routes --}}
    @routes

    {{-- Vite / React --}}
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])

    {{-- Inertia head --}}
    @inertiaHead
</head>

<body class="font-sans antialiased">
    {{-- Inertia root --}}
    @inertia

    {{-- Optional: Livewire scripts --}}
    @livewireScripts
</body>

</html>