import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NAMES_CONSTANTS } from '../../../components/constants';
import ErrorCard from '../../../components/errorCard';
import PostForm from '../../../components/posts/form';
import Skeleton from '../../../components/skeleton';
import { useAppDispatch, useAppSelector } from '../../../store';
import { fetchPostById, updatePost } from '../../../store/slices/posts';

const EditPostPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { currentPost, loading, error } = useAppSelector(state => state.posts);

    const [formData, setFormData] = useState({
        title: '',
        body: ''
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchPostById(parseInt(id)));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (currentPost) {
            setFormData({
                title: currentPost.title,
                body: currentPost.body
            });
        }
    }, [currentPost]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id && currentPost) {
            try {
                await dispatch(updatePost({
                    id: parseInt(id),
                    postData: {
                        id: parseInt(id),
                        title: formData.title,
                        body: formData.body,
                        userId: currentPost.userId
                    }
                })).unwrap();
                navigate('/');
            } catch (err) {
                console.error('Failed to update post:', err);
            }
        }
    };

    if (loading == 'pending') return <Skeleton count={1} />

    if (error) return <ErrorCard title={NAMES_CONSTANTS.SOMETHING_WENT_WRONG} error={error as string} />

    return (
        <div className="grid place-items-center w-full h-screen px-6">
            <div className="w-full max-w-xl">
                <div className="bg-white shadow-sm rounded-lg bg-white bg-opacity-70 backdrop-blur-md">
                    <div className="px-4 py-5 sm:p-6">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                            {NAMES_CONSTANTS.EDIT_POST}
                        </h1>

                        <PostForm
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            loading={loading}
                            submitText={NAMES_CONSTANTS.SAVE_CHANGES}
                            cancelText={NAMES_CONSTANTS.CANCEL}
                            titleLabel={NAMES_CONSTANTS.TITLE}
                            contentLabel={NAMES_CONSTANTS.CONTENT}
                        />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default EditPostPage;