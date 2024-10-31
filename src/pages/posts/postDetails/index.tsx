import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store';
import { fetchPostById } from '../../../store/slices/posts';

const PostDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { currentPost, loading, error } = useAppSelector(state => state.posts);

    useEffect(() => {
        if (id) {
            dispatch(fetchPostById(parseInt(id, 10)));
        }
    }, [id, dispatch]);

    if (loading === 'pending') return <div>Loading post...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!currentPost) return <div>No post found</div>;

    return (
        <div>
            <Link to="/">Back to Posts</Link>
            <h1>{currentPost.title}</h1>
            <p>{currentPost.body}</p>
            <p>User ID: {currentPost.userId}</p>
        </div>
    );
};

export default PostDetailPage;