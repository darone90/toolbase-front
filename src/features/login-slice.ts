import { createSlice } from "@reduxjs/toolkit";

interface Initial {
    loginStatus: boolean
};

interface Status {
    payload: boolean
}

const initialState: Initial = {
    loginStatus: false
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        appLogin: (state, action: Status) => {
            state.loginStatus = action.payload;
        },

    }
})

export const { appLogin } = loginSlice.actions;