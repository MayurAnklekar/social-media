import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { createChatService, fetchMessagesService, fetchChatsService } from "../services/messageServices";

const initialState = {
	conversationID: "",
	to: "",
	messages: [],
	chats: [],
};

export const getAllChats = createAsyncThunk("message/getAllChats", async (props, thunkAPI) => {
	const { users } = props;
	const { getState, fulfillWithValue } = thunkAPI;
	const { user } = getState();
	const data = await fetchChatsService();
	return fulfillWithValue({
		users: users.filter(u => u._id !== user.id),
		chats: data.chats,
	});
});

export const createChat = createAsyncThunk("message/createChat", async(props, thunkAPI)=>{
	const { id } = props;
	const { getState, dispatch } = thunkAPI;
	const { user } = getState();
	const data = await createChatService({ partnerId: id });
	dispatch(messageSlice.actions.setChatID(data.cid));
	dispatch(messageSlice.actions.setReceiverID(id));
	const _data = await fetchMessagesService({ chatId: data.cid });
	dispatch(clearMessage());
	dispatch(setMessages({ messages: _data.messages, id: user.id }));
})

const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers:{
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
		clearMessage: (state) => {
			state.messages = [];
		}

	},
	extraReducers: {
		[getAllChats.fulfilled]: (state, action) => {
			const { users, chats } = action.payload;
			const getUserDetails = members => users.find(user => members.includes(user._id));
			state.chats = chats.map(chat => ({ ...chat, userDetails: getUserDetails(chat.members) }));
		}
	},

})


export const { clearMessage, setChatID, setReceiverID, setMessages } = messageSlice.actions;

export default messageSlice.reducer;