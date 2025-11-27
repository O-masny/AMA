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
    const base = `inline-block cta-fill bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold py-3 px-6 text-lg shadow-lg hover:shadow-xl transition-all ${className}`;

    // use MagneticButton for links (anchors) to preserve magnetic behavior
    if (href) {
        return (
            <MagneticButton href={href} className={base} style={{ borderRadius: 0 }}>
                <span className="cta-label">{children}</span>
            </MagneticButton>
        );
    }

    // otherwise use standard Button for forms
    return (
        <Button type={type} disabled={disabled} className={base} style={{ borderRadius: 0 }}>
            <span className="cta-label">{children}</span>
        </Button>
    );
}
