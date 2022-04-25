import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from '../features/login-slice';
import { toolTypeSlice } from '../features/toolTypes-slice';
import { userSlice } from '../features/user-slice';

export const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        types: toolTypeSlice.reducer,
        users: userSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>