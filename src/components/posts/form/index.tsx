import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpin from '../../loadingSpin';
import { NAMES_CONSTANTS } from '../../constants';

interface PostFormProps {
    formData: {
        title: string;
        body: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    loading: string;
    submitText: string;
    cancelText: string;
    titleLabel: string;
    contentLabel: string;
}

const PostForm: React.FC<PostFormProps> = ({
    formData,
    handleChange,
    handleSubmit,
    loading,
    submitText,
    cancelText,
    titleLabel,
    contentLabel
}) => {
    const navigate = useNavigate();

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                >
                    {titleLabel}
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border focus:outline-none"
                />
            </div>

            <div>
                <label
                    htmlFor="body"
                    className="block text-sm font-medium text-gray-700"
                >
                    {contentLabel}
                </label>
                <textarea
                    id="body"
                    name="body"
                    rows={6}
                    value={formData.body}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border focus:outline-none resize-none"
                />
            </div>

            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {cancelText}
                </button>
                <button
                    type="submit"
                    disabled={loading === 'idle'}
                    className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${loading === 'idle'
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                        }`}
                >
                    {loading === 'processing' ? (
                        <>
                            <LoadingSpin />
                            {NAMES_CONSTANTS.SAVING}
                        </>
                    ) : submitText}
                </button>
            </div>
        </form>
    );
};

export default PostForm;
