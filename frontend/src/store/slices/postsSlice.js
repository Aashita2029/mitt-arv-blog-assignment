import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null
};

// Helper function to convert Firebase Timestamp to string
const formatTimestamp = (timestamp) => {
  if (timestamp && timestamp.toDate) {
    return timestamp.toDate().toISOString();
  }
  // Handle cases where timestamp might already be a string or null/undefined
  return timestamp;
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload.map(post => ({
        ...post,
        createdAt: formatTimestamp(post.createdAt),
        updatedAt: formatTimestamp(post.updatedAt),
      }));
      state.loading = false;
      state.error = null;
    },
    setCurrentPost: (state, action) => {
      state.currentPost = {
        ...action.payload,
        createdAt: formatTimestamp(action.payload.createdAt),
        updatedAt: formatTimestamp(action.payload.updatedAt),
      };
      state.loading = false;
      state.error = null;
    },
    addPost: (state, action) => {
       const newPost = {
        ...action.payload,
        createdAt: formatTimestamp(action.payload.createdAt),
        updatedAt: formatTimestamp(action.payload.updatedAt),
      };
      state.posts.unshift(newPost);
    },
    updatePost: (state, action) => {
      const updatedPost = {
        ...action.payload,
        createdAt: formatTimestamp(action.payload.createdAt),
        updatedAt: formatTimestamp(action.payload.updatedAt),
      };
      const index = state.posts.findIndex(post => post.id === updatedPost.id);
      if (index !== -1) {
        state.posts[index] = updatedPost;
      }
      if (state.currentPost?.id === updatedPost.id) {
        state.currentPost = updatedPost;
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
      if (state.currentPost?.id === action.payload) {
        state.currentPost = null;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  setPosts,
  setCurrentPost,
  addPost,
  updatePost,
  deletePost,
  setLoading,
  setError
} = postsSlice.actions;

export default postsSlice.reducer; 