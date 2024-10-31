import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchPosts } from '../../store/slices/posts';
import PostCardDetails from '../../components/posts/card';
import Skeleton from '../../components/skeleton';
import CardWrapper from '../../components/posts/cardWrapper';
import { NAMES_CONSTANTS } from '../../components/constants';

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { posts, loading, error } = useAppSelector(state => state.posts);

    useEffect(() => {
        if (posts.length === 0) {
            dispatch(fetchPosts());
        }
    }, [dispatch, posts]);

    if (loading === 'pending') return <Skeleton count={3} />;
    if (error) return <div>{NAMES_CONSTANTS.SOMETHING_WENT_WRONG}: {error}</div>;

    return (
        <div className='grid place-items-center w-full h-screen px-6'>
            <CardWrapper title={NAMES_CONSTANTS.POST}>
                {posts.map(post => (
                    <PostCardDetails post={post} key={post.id} />
                ))}
            </CardWrapper>
        </div>
    );
};

export default HomePage;
