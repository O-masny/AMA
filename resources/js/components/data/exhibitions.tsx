export type Exhibition = {
    id: number;
    title: string;
    gallery: string;
    date: string;
    location: string;
    description: string;
    visitors?: string;
    images: { id: number; image: string; caption?: string }[];
};
export
    interface ExhibitionsProps {
    exhibitions: Exhibition[];
}