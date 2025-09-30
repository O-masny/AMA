import { useEffect } from "react";

export function useLinkPrefetch() {
    useEffect(() => {
        const preloaded: Record<string, boolean> = {};

        const handlePointerEnter = (e: Event) => {
            const a = e.currentTarget as HTMLAnchorElement;
            if (!a || preloaded[a.href]) return;
            preloaded[a.href] = true;

            const link = document.createElement("link");
            const supportsPrefetch = link.relList?.supports?.("prefetch");
            link.rel = supportsPrefetch ? "prefetch" : "preload";
            link.as = "document";
            link.href = a.href;
            document.head.appendChild(link);
        };

        const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]');
        anchors.forEach((a) => a.addEventListener("pointerenter", handlePointerEnter));
        return () =>
            anchors.forEach((a) =>
                a.removeEventListener("pointerenter", handlePointerEnter)
            );
    }, []);
}
