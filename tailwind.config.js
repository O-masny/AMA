/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.jsx',
        './resources/**/*.ts',
        './resources/**/*.tsx',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)'],
                display: ['var(--font-display)'],
                signature: ['var(--font-signature)'],
            },
            colors: {
                primary: 'hsl(var(--primary))',
                card: 'hsl(var(--card))',
                'card-foreground': 'hsl(var(--card-foreground))',
                popover: 'hsl(var(--popover))',
                'popover-foreground': 'hsl(var(--popover-foreground))',
                success: 'hsl(var(--success))',
                'success-foreground': 'hsl(var(--success-foreground))',
                error: 'hsl(var(--error))',
                'error-foreground': 'hsl(var(--error-foreground))',
                'primary-foreground': 'hsl(var(--primary-foreground))',
                secondary: 'hsl(var(--secondary))',
                'secondary-foreground': 'hsl(var(--secondary-foreground))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                muted: 'hsl(var(--muted))',
                'muted-foreground': 'hsl(var(--muted-foreground))',
                accent: 'hsl(var(--accent))',
                'accent-foreground': 'hsl(var(--accent-foreground))',
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
            },
            fontSize: {
                display: ['var(--fs-display)', { lineHeight: 'var(--lh-display)' }],
                heading: ['var(--fs-heading)', { lineHeight: 'var(--lh-heading)' }],
                title: ['var(--fs-title)', { lineHeight: 'var(--lh-title)' }],
                body: ['var(--fs-body)', { lineHeight: 'var(--lh-body)' }],
                label: ['var(--fs-label)', { lineHeight: 'var(--lh-label)' }],
            },
            spacing: {
                'container-gap': 'clamp(1rem, 2vw, 2.5rem)'
            }
        },
    },
    plugins: [],
}
