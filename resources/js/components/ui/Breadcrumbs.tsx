"use client";

import { Link } from "@inertiajs/react";

type Crumb = {
    label: string;
    href?: string;
};

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
    if (!items || items.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center text-sm text-muted-foreground gap-2">
                {items.map((it, idx) => (
                    <li key={idx} className="flex items-center">
                        {it.href ? (
                            <Link href={it.href} className="text-foreground underline underline-offset-2">
                                {it.label}
                            </Link>
                        ) : (
                            <span className="text-foreground">{it.label}</span>
                        )}
                        {idx < items.length - 1 && <span className="mx-2 opacity-60">/</span>}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
