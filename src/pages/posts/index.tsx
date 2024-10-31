import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchPosts } from '../../store/slices/posts';


const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { posts, loading, error } = useAppSelector(state => state.posts);

    useEffect(() => {
        // Redirect to first post if no posts are loaded
        if (posts.length === 0) {
            dispatch(fetchPosts());
        }
    }, [dispatch, posts]);

    // useEffect(() => {
    //     // Automatically redirect to the first post when posts are loaded
    //     if (posts.length > 0) {
    //         navigate(`/post/${posts[0].id}`);
    //     }
    // }, [posts, navigate]);

    if (loading === 'pending') return <div>Loading posts...</div>;
    if (error) return <div>Error: {error}</div>;
    console.log("error", error);

    return (
        <div>
            <h1>Posts</h1>
            {posts.map(post => (
                <div key={post.id}>
                    <Link to={`/post/${post.id}`}>
                        {post.title}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default HomePage;
