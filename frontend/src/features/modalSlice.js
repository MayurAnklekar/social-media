import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	type: "",
	msg: "",
	visible: false,
	isSidebarVisible: false,
	isLoading: false,
};


export const showAlert = createAsyncThunk("modal/show", async (props, thunkAPI) => {
	let { msg, type } = props;
	msg = msg || "Hold on I swear it won't take so long";
	type = type || "info";
	const { fulfillWithValue, dispatch } = thunkAPI;
	// setTimeout(() => {
	// 	dispatch(modalSlice.actions.hideModal());
	// }, 4000);
	return fulfillWithValue({ msg, visible: true, type  });
});


const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		hideAlert: state => {
			state.visible = false;
		},
		toggleSidebar: (state, action) => {
			state.isSidebarVisible = action.payload;
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
	extraReducers: {
		[showAlert.fulfilled]: (state, action) => {
			state.msg = action.payload.msg;
			state.visible = action.payload.visible;
			state.type = action.payload.type;
		}
	},
});

export const { hideAlert, toggleSidebar, setIsLoading } = modalSlice.actions;

export default modalSlice.reducer;
