import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts');
    return data;
});
export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
});
export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
    axios.delete(`/posts/${id}`);
});

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        tagFilter: (state, action) => {
            // state.posts.status = 'loading';
            // state.posts = state.posts.items.filter((post) => post.tags[0] === action.payload);
        },

    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.status = 'loaded';
            state.posts.items = action.payload;
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.status = 'error';
            state.posts.items = [];
        },
        [fetchTags.pending]: (state, action) => {
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.status = 'loaded';
            state.tags.items = action.payload;
        },
        [fetchTags.rejected]: (state) => {
            state.tags.status = 'error';
            state.tags.items = [];
        },
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter((post) => post._id !== action.meta.arg);
        },
    },
});

export const postsReducer = postsSlice.reducer;
export const { tagFilter } = postsSlice.actions;
