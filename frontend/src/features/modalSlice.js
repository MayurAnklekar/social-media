import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		hideModal: state => {
			state.visible = false;
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
});

export const { hideModal, setIsLoading } = modalSlice.actions;

export default modalSlice.reducer;
