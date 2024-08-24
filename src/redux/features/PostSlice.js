import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getPost = createAsyncThunk("post/getPost", async ({ id }) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
    res.json()
  );
});
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ id }) => {
    return (
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
      {
        methode: "DELETE",
      }.then((res) => res.json())
    );
  }
);
export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ values }) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: values.title,
        body: values.body,
      }),
    }).then((res) => res.json());
  }
);
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ id, title, body }) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
      }),
    }).then((res) => res.json());
  }
);
const PostSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    post: [],
    error: null,
    body: "",
    edit: false,
  },
  reducers: {
    setEdit: (state, action) => {
      state.body = action.payload.body;
      state.edit = action.payload.edit;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPost.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = [action.payload];
      }),
      builder.addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      }),
      builder.addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = [action.payload];
      }),
      builder.addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder.addCase(updatePost.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = [action.payload];
      }),
      builder.addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setEdit } = PostSlice.actions;
export default PostSlice.reducer;
