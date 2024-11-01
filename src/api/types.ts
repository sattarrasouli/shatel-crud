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
}
