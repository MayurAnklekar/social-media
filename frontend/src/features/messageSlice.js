import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
	chats: [],
};


const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers:{

	}

})

export default messageSlice.reducer;