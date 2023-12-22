import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = [
  { id: 1, title: 'Post 1', description: 'Description of Post 1' },
  { id: 2, title: 'Post 2', description: 'Description of Post 2' },
  { id: 3, title: 'Post 3', description: 'Description of Post 3' },
];

const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
      addPosts: (state, action) => {
        state.push(...action.payload);
      },
      addPost: (state, action) => {
        const { id, title, description } = action.payload;
        state.push({ id, title, description });
      },
      updatePost: (state, action) => {
        const { id, title, description } = action.payload;
        const postIndex = state.findIndex((post) => post.id === id);
        if (postIndex !== -1) {
          state[postIndex].title = title;
          state[postIndex].description = description;
        }
      },
      deletePost: (state, action) => {
        const postId = action.payload;
        return state.filter((post) => post.id !== postId);
      },
    }
})

export const { addPosts, addPost, updatePost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;