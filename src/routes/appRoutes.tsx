import React from 'react';
import {
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import PostDetailPage from '../pages/posts/postDetails';
import HomePage from '../pages/posts';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<PostDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;