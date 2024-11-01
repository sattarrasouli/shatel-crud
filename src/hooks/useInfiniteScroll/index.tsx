import { useEffect, useRef, useCallback, useState } from 'react';

interface UseInfiniteScrollOptions {
    loading: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
    rootMargin?: string;
    threshold?: number;
}

export const useInfiniteScroll = ({
    loading,
    hasMore,
    onLoadMore,
    rootMargin = '20px',
    threshold = 0.1
}: UseInfiniteScrollOptions) => {
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && hasMore && !loading) {
                onLoadMore();
            }
        },
        [hasMore, loading, onLoadMore]
    );

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin,
            threshold,
        });

        const currentLoaderRef = loaderRef.current;
        if (currentLoaderRef) {
            observer.observe(currentLoaderRef);
        }

        return () => {
            if (currentLoaderRef) {
                observer.unobserve(currentLoaderRef);
            }
        };
    }, [handleObserver, rootMargin, threshold]);

    return { loaderRef };
};