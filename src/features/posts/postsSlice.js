import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (id) => {
  const response = await axios.get(`${API_URL}/posts/${id}`);
  return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (postData) => {
  const response = await axios.post(`${API_URL}/posts`, { post: postData });
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    selectedPost: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearSelectedPost(state) {
      state.selectedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchPostById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
