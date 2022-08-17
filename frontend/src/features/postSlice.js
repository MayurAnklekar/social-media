import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPostService,
  deletePostService,
  fetchPostsService,
  likePostService,
  commentPostService,
} from "../services/postServices";
import { showAlert } from "./modalSlice";
const initialState = {
  allPosts: { posts: [], page: 0 },
  userPosts: { posts: [], page: 0 },
  singlePost: {},
};

export const setPosts = createAsyncThunk(
  "post/set",
  async (props, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    const data = await fetchPostsService();
    if (!data) return rejectWithValue();
    dispatch(postSlice.actions.setAllPosts(data));
    return;
  }
);

export const addPost = createAsyncThunk("post/add", async (props, thunkAPI) => {
  const { formData } = props;
  const { fulfillWithValue, dispatch } = thunkAPI;
  dispatch(showAlert({}));
  console.log("formdata showing", formData)
  const data = await createPostService(formData);
  dispatch(showAlert({ msg: "Post created", type:"success" }));
  return fulfillWithValue(data.newPost);
});

export const deletePost = createAsyncThunk(
  "post/delete",
  async (props, thunkAPI) => {
    const { id } = props;
    const { dispatch, fulfillWithValue } = thunkAPI;
    await deletePostService({ id });
    return fulfillWithValue(id);
  }
);

export const likePost = createAsyncThunk(
  "post/like",
  async (props, thunkAPI) => {
    const { id, isLiked } = props;
    const { dispatch } = thunkAPI;
    const data = await likePostService({ id, add: !isLiked });
    dispatch(postSlice.actions.updatePosts(data.post));
  }
);

export const commentPost = createAsyncThunk(
  "post/comment",
  async (props, thunkAPI) => {
    const { id, comment } = props;
    const { dispatch, getState } = thunkAPI;
    const data = await commentPostService({ id, comment });
    if (getState().post.singlePost._id === id)
      dispatch(postSlice.actions.setSinglePost(data.post));
    dispatch(postSlice.actions.updatePosts(data.post));
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
    updatePosts: (state, action) => {
      state.allPosts.posts = state.allPosts.posts.map((post) => {
        if (post._id === action.payload._id) return action.payload;
        return post;
      });
      state.userPosts.posts = state.userPosts.posts.map((post) => {
        if (post._id === action.payload._id) return action.payload;
        return post;
      });
    },
    setSinglePost: (state, action) => {
      state.singlePost = action.payload;
    },
  },
  extraReducers: {
    [addPost.fulfilled]: (state, action) => {
      state.allPosts.posts.unshift(action.payload);
      state.userPosts.posts.unshift(action.payload);
    },
    [deletePost.fulfilled]: (state, action) => {
      state.allPosts.posts = state.allPosts.posts.filter(
        (post) => post._id !== action.payload
      );
      state.userPosts.posts = state.userPosts.posts.filter(
        (post) => post._id !== action.payload
      );
    },
  },
});

export const { setUserPosts, setAllPosts, setSinglePost } = postSlice.actions;

export default postSlice.reducer;
