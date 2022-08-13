import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isSidebarVisible: false,
	isLoading: false,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		hideModal: state => {
			state.visible = false;
		},
		toggleSidebar: (state, action) => {
			state.isSidebarVisible = action.payload;
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
});

export const { hideModal, toggleSidebar, setIsLoading } = modalSlice.actions;

export default modalSlice.reducer;
