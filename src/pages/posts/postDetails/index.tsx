import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NAMES_CONSTANTS } from '../../../components/constants';
import PostCardDetails from '../../../components/posts/card';
import CardWrapper from '../../../components/posts/cardWrapper';
import Skeleton from '../../../components/skeleton';
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

    if (loading === 'pending') return <Skeleton count={1} />;
    if (error) return <div>{NAMES_CONSTANTS.SOMETHING_WENT_WRONG}: {error}</div>;
    if (!currentPost) return <div>{NAMES_CONSTANTS.NO_POST_FOUND}</div>;

    return (
        <div className='grid place-items-center w-full h-screen px-6'>
            <CardWrapper title={NAMES_CONSTANTS.DETAILS}>
                <PostCardDetails visibleButtons={false} post={currentPost} />
            </CardWrapper>
        </div>
    );
};

export default PostDetailPage;