import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { NAMES_CONSTANTS } from "../../components/constants";
import ErrorCard from "../../components/errorCard";
import PostCardDetails from "../../components/posts/card";
import CardWrapper from "../../components/posts/cardWrapper";
import Skeleton from "../../components/skeleton";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { usePostSearch } from "../../hooks/usePostSearch";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchPosts } from "../../store/slices/posts";

const POSTS_PER_PAGE = 10;

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { posts, loading, error, hasMore, currentPage } = useAppSelector(state => state.posts);

    useEffect(() => {
        if (posts.length === 0) {
            dispatch(fetchPosts({ page: 1, limit: POSTS_PER_PAGE }));
        }
    }, [dispatch, posts.length]);

    const loadMore = useCallback(() => {
        if (hasMore && loading !== 'pending') {
            dispatch(fetchPosts({
                page: currentPage + 1,
                limit: POSTS_PER_PAGE
            }));
        }
    }, [dispatch, currentPage, hasMore, loading]);

    const { loaderRef } = useInfiniteScroll({
        loading: loading === 'pending',
        hasMore,
        onLoadMore: loadMore,
    });

    const {
        searchTerm,
        setSearchTerm,
        filteredPosts
    } = usePostSearch(posts);

    if (error) return <ErrorCard title={NAMES_CONSTANTS.SOMETHING_WENT_WRONG} error={error} />;
    if (loading === "pending" && posts.length === 0) return <Skeleton count={4} />

    return (
        <div className="grid place-items-center relative w-full h-screen px-6">
            <CardWrapper title={NAMES_CONSTANTS.POST} search={true} setSearchTerm={setSearchTerm} searchTerm={searchTerm}>
                <div className="flex flex-col min-h-64">
                    {filteredPosts.map(post => (
                        <PostCardDetails post={post} key={post.id} />
                    ))}

                    <div ref={loaderRef} className="w-full py-4">
                        {loading === 'pending' &&
                            <div className="h-10 flex items-center justify-center mb-auto">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        }
                    </div>

                    {!hasMore && posts.length > 0 && (
                        <div className="text-center py-4 text-gray-500">
                            {NAMES_CONSTANTS.NO_MORE_POST_TO_LOAD}
                        </div>
                    )}
                </div>

                <div className="flex flex-row w-full mt-auto sticky bottom-2 right-0 left-0 justify-center">
                    <Link
                        to="/createPost"
                        className=' w-12 h-12 flex items-center justify-center bg-cyan-500 text-white rounded-full shadow-lg hover:bg-cyan-600 transition-colors'
                    >
                        <span className='text-2xl'>+</span>
                    </Link>
                </div>
            </CardWrapper>
        </div>
    );
};

export default HomePage;