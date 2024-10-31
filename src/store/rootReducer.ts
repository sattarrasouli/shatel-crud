import { combineReducers } from '@reduxjs/toolkit';
import postsReducer from './slices/posts/index';

const rootReducer = combineReducers({
    posts: postsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;