import { Artwork } from "./artworks";

export type Exhibition = {
    id: number;
    title: string;
    gallery: string;
    date: string;
    location: string;
    description: string;
    visitors?: string;
    galleries: Artwork[];
};
export
    interface ExhibitionsProps {
    exhibitions: Exhibition[];
}
export
    interface ExhibitionProps {
    exhibition: Exhibition;
}
