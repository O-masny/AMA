import { MagneticButton } from "@/components/magnetic-button";
import { Button } from "@/components/ui/button";
import React from "react";

type CTAButtonProps = {
    children: React.ReactNode;
    href?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
};

export default function CTAButton({ children, href, type = "button", disabled, className = "" }: CTAButtonProps) {
    const base = `w-full rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold py-4 text-xl shadow-lg hover:shadow-xl transition-all ${className}`;

    // use MagneticButton for links (anchors) to preserve magnetic behavior
    if (href) {
        return (
            <MagneticButton href={href} className={base}>
                {children}
            </MagneticButton>
        );
    }

    // otherwise use standard Button for forms
    return (
        <Button type={type} disabled={disabled} className={base}>
            {children}
        </Button>
    );
}
