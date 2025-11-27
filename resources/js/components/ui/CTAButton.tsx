import { MagneticButton } from "@/components/magnetic-button";
import { Button } from "@/components/ui/button";
import React from "react";

type CTAButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    href?: string;
    className?: string;
};

export default function CTAButton({ children, href, className = "", ...rest }: CTAButtonProps) {
    const baseCommon = `cta-fill bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-lg shadow-lg hover:shadow-xl transition-all`;

    const linkClass = `inline-block ${baseCommon} py-3 px-6 ${className}`;

    // For button usage we avoid conflicting vertical sizing by removing the
    // fixed padding that would conflict with Button's `h-` size. We also set
    // `h-auto` so the Button's height utility (e.g. h-10) is overridden and
    // the text has room — this prevents the label clipping issue.
    const buttonClass = `inline-flex ${baseCommon} h-auto py-3 px-6 ${className}`;

    // use MagneticButton for links (anchors) to preserve magnetic behavior
    if (href) {
        return (
            <MagneticButton href={href} className={linkClass} style={{ borderRadius: 0 }} {...(rest as any)}>
                <span className="cta-label">{children}</span>
            </MagneticButton>
        );
    }

    // otherwise use standard Button for actions/forms
    return (
        <Button size="lg" className={buttonClass} style={{ borderRadius: 0 }} {...(rest as any)}>
            <span className="cta-label">{children}</span>
        </Button>
    );
}
