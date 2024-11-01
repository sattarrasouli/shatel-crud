export interface Post {
    id?: number;
    title: string;
    body: string;
    userId: number;
}

export interface PostsState {
    posts: Post[];
    currentPost: Post | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed' | 'processing';
    error: string | null;
    total: number;
    currentPage: number;
    totalPages: number;
    hasMore: boolean;
}

export interface PaginationParams {
    page: number;
    limit: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}


export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    currentPage: number;
    totalPages: number;
    hasMore: boolean;
}