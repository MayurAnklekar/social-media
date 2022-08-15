import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { createChatService, fetchMessagesService } from "../services/messageServices";

const initialState = {
	conversationID: "",
	to: "",
	messages: [],
	chats: [],
};


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

	}

})


export const { clearMessage, setChatID, setReceiverID, setMessages } = messageSlice.actions;

export default messageSlice.reducer;