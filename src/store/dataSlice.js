import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async function(){
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = await response.json();
      return posts;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    posts: [],
    loading: 'idle',
    error: null,
    selectedPosts: [],
  },
  reducers: {
    setSelectedPosts: (state, action) => {
      state.selectedPosts = action.payload;
    },
    addSelectedPost: (state, action) => {
      state.selectedPosts.push(action.payload);
    },
    removeSelectedPost: (state, action) => {
      state.selectedPosts = state.selectedPosts.filter(postId => postId !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      })
  }
});

export const { addSelectedPost, removeSelectedPost } = dataSlice.actions;
export default dataSlice.reducer;
