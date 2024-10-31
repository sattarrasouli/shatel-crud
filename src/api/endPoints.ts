export const ENDPOINTS = {
    POSTS: {
        BASE: '/posts',
        GET_ALL: () => '/posts',
        GET_BY_ID: (id: number) => `/posts/${id}`,
        CREATE: () => '/posts',
        UPDATE: (id: number) => `/posts/${id}`,
        DELETE: (id: number) => `/posts/${id}`,
    },
};