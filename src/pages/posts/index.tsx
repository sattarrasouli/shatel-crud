import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchPosts } from '../../store/slices/posts';
import PostCardDetails from '../../components/posts/card';
import Skeleton from '../../components/skeleton';
import CardWrapper from '../../components/posts/cardWrapper';
import { NAMES_CONSTANTS } from '../../components/constants';
import ErrorCard from '../../components/errorCard';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { posts, loading, error } = useAppSelector(state => state.posts);

    useEffect(() => {
        if (posts.length === 0) {
            dispatch(fetchPosts());
        }
    }, [dispatch, posts]);

    if (loading === 'pending') return <Skeleton count={3} />;
    if (error) return <ErrorCard title={NAMES_CONSTANTS.SOMETHING_WENT_WRONG} error={error} />;

    return (
        <div className='grid place-items-center w-full h-screen px-6'>
            <CardWrapper title={NAMES_CONSTANTS.POST}>
                {posts.map(post => (
                    <PostCardDetails post={post} key={post.id} />
                ))}
                <Link to="/createPost" className='sticky bottom-3 right-0 left-0 w-full text-center'>
                    <span className='text-4xl bg-white text-cyan-500 shadow-2xl rounded-full px-4 '>+</span>
                </Link>
            </CardWrapper>
        </div>
    );
};

export default HomePage;
