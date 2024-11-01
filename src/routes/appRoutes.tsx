import React from 'react';
import {
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import PostDetailPage from '../pages/posts/postDetails';
import HomePage from '../pages/posts';
import EditPostPage from '../pages/posts/editPost';
import CreatePost from '../pages/posts/createPost';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<PostDetailPage />} />
            <Route path="/editPost/:id" element={<EditPostPage />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;