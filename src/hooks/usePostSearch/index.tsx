import { useMemo, useState } from 'react';
import { Post } from '../../api/types';
import { useDebounce } from '../useDebounce';

export const usePostSearch = (posts: Post[]) => {
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const filteredPosts = useMemo(() => {
        if (!debouncedSearchTerm) return posts;

        return posts.filter(post =>
            post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
    }, [posts, debouncedSearchTerm]);

    return {
        searchTerm,
        setSearchTerm,
        filteredPosts
    };
};