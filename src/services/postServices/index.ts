import axiosInstance from "../../api/axiosInstance";
import { ENDPOINTS } from "../../api/endPoints";
import { Post } from "../../api/types";

export const PostService = {
    // Create
    createPost: (post: Omit<Post, 'id'>) =>
        axiosInstance.post<Post>(ENDPOINTS.POSTS.CREATE(), post),

    // Read
    getAllPosts: () =>
        axiosInstance.get<Post[]>(ENDPOINTS.POSTS.GET_ALL()),

    getPostById: (id: number) =>
        axiosInstance.get<Post>(ENDPOINTS.POSTS.GET_BY_ID(id)),

    // Update
    updatePost: (id: number, post: Partial<Post>) =>
        axiosInstance.put<Post>(ENDPOINTS.POSTS.UPDATE(id), post),

    // Partial Update
    patchPost: (id: number, post: Partial<Post>) =>
        axiosInstance.patch<Post>(ENDPOINTS.POSTS.UPDATE(id), post),

    // Delete
    deletePost: (id: number) =>
        axiosInstance.delete(ENDPOINTS.POSTS.DELETE(id)),
};
