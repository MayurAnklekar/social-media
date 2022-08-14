import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import modalReducer from '../features/modalSlice';
import usersReducer from '../features/usersSlice';
import messageReducer from '../features/messageSlice';
import postReducer from '../features/postSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        modal: modalReducer,
        users: usersReducer,
        message: messageReducer,
        post: postReducer,
    }
});
