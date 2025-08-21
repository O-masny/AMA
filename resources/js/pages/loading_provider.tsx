import { router } from '@inertiajs/core';
import { useEffect, useState } from 'react';
import LoadingScreen from './loading';

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // .on vrací unsubscribe funkci
        const stopStart = router.on('start', () => setLoading(true));
        const stopFinish = router.on('finish', () => setLoading(false));

        return () => {
            stopStart();
            stopFinish();
        };
    }, []);

    return (
        <>
            <LoadingScreen isActive={loading} />
            {children}
        </>
    );
}
