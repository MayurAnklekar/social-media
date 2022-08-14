import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	allPosts: { posts: [], page: 0 },
	userPosts: { posts: [], page: 0 },
	singlePost: {},
};

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
		setSinglePost: (state, action) => {
			state.singlePost = action.payload;
		}
	}
	},
);

export const { setUserPosts, setAllPosts, setSinglePost } = postSlice.actions;

export default postSlice.reducer;
