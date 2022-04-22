import { createSlice } from "@reduxjs/toolkit";

const initial: boolean = false;

export const loginSlice = createSlice({
    name: 'login',
    initialState: initial,
    reducers: {
        appLogin: (state, action) => {
            state = true;
        },

        appLogout: (state, action) => {
            state = false
        }
    }
})

export const { appLogin, appLogout } = loginSlice.actions;