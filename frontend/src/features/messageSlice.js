import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchChatsService, } from "../services/messageServices";
import { logout } from "./userSlice";

const initialState = {
	conversationID: "",
	to: "",
	messages: [],
	chats: [],
};

export const getAllChats = createAsyncThunk("message/getAllChats", async (props, thunkAPI) => {
	const { users } = props;
	const { getState, rejectWithValue, fulfillWithValue } = thunkAPI;
	const { user } = getState();
	const data = await fetchChatsService();
	if (!data) return rejectWithValue();
	return fulfillWithValue({
		users: users.filter(u => u._id !== user.id),
		chats: data.chats,
	});
});

const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers: {
		clearMessage: (state, action) => {
			const conversationID = action.payload?.conversationID;
			if (conversationID) {
				const index = state.chats.findIndex(chat => chat._id === conversationID);
				const updatingChat = state.chats[index];
				state.chats = [
					{ ...updatingChat, lastMessage: "" },
					...state.chats.filter(chat => chat._id !== conversationID),
				];
				if (conversationID === state.conversationID) state.messages = [];
			} else {
				state.messages = [];
			}
		},
		setChatID: (state, action) => {
			state.conversationID = action.payload;
		},
		setReceiverID: (state, action) => {
			state.to = action.payload;
		},
		setMessages: (state, action) => {
			const { messages, id } = action.payload;
			state.messages = messages.map(message => {
				return { text: message.text, send: message.sender === id, createdAt: message.createdAt };
			});
		},
		addMessages: (state, action) => {
			const { text, send = false } = action.payload;
			state.messages = [...state.messages, { text, send, createdAt: String(new Date()) }];
		},
		deleteChat: (state, action) => {
			state.chats = state.chats.filter(chat => chat._id !== action.payload);
			if (action.payload === state.conversationID) state.conversationID = "";
		},
	},
	extraReducers: {
		[getAllChats.fulfilled]: (state, action) => {
			const { users, chats } = action.payload;
			const getUserDetails = members => users.find(user => members.includes(user._id));
			state.chats = chats.map(chat => ({ ...chat, userDetails: getUserDetails(chat.members) }));
		},
		[logout.type]: (state, action) => {
			return initialState;
		},
	},
});

export const { addMessages, clearMessage, setChatID, setReceiverID, setMessages, deleteChat } =
	messageSlice.actions;

export default messageSlice.reducer;
