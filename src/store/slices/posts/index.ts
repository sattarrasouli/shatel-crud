import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post, PostsState } from '../../../api/types';
import { PostService } from '../../../services/postServices';
import { toast } from 'react-toastify';
import { NAMES_CONSTANTS } from '../../../components/constants';

const initialState: PostsState = {
    posts: [],
    currentPost: null,
    loading: 'idle',
    error: null,
};

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await PostService.getAllPosts();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch posts');
        }
    }
);

export const fetchPostById = createAsyncThunk(
    'posts/fetchPostById',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await PostService.getPostById(id);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch post');
        }
    }
);

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (postData: Omit<Post, 'id'>, { rejectWithValue }) => {
        try {
            const response = await PostService.createPost(postData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create post');
        }
    }
);

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async ({ id, postData }: { id: number, postData: Partial<Post> }, { rejectWithValue }) => {
        try {
            const response = await PostService.updatePost(id, postData);
            if (response.status === 200) {
                toast(NAMES_CONSTANTS.ITEM_UPDATED_SUCCESSFULLY, { type: 'success' })
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update post');
        }
    }
);

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await PostService.deletePost(id);
            if (response.status === 200) {
                toast(NAMES_CONSTANTS.ITEM_REMOVED_SUCCESSFULLY, { type: 'success' })
            }
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete post');
        }
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        resetCurrentPost: (state) => {
            state.currentPost = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch All Posts
            .addCase(fetchPosts.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload as string;
            })

            // Fetch Post By ID
            .addCase(fetchPostById.pending, (state, action) => {
                state.loading = "pending";
            })

            .addCase(fetchPostById.fulfilled, (state, action) => {
                state.loading = "succeeded"
                state.currentPost = action.payload;
            })

            .addCase(fetchPostById.rejected, (state, action) => {
                state.loading = "failed"
                state.error = action.payload as string;
            })
            // Create Post
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.unshift(action.payload);
            })

            // Update Post
            .addCase(updatePost.pending, (state, action) => {
                state.loading = 'processing'
            })

            .addCase(updatePost.fulfilled, (state, action) => {
                state.loading = 'succeeded'
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })

            .addCase(updatePost.rejected, (state, action) => {
                state.loading = 'failed'
            })

            // Delete Post
            .addCase(deletePost.pending, (state, action) => {
                state.loading = 'processing'
                state.posts = state.posts.filter(post => post.id !== action.payload);
            })

            .addCase(deletePost.fulfilled, (state, action) => {
                state.loading = 'succeeded'
                state.posts = state.posts.filter(post => post.id !== action.payload);
            })

            .addCase(deletePost.rejected, (state, action) => {
                state.loading = 'failed'
                state.posts = state.posts.filter(post => post.id !== action.payload);
            })
    },
});

export const { resetCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;