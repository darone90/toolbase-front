import { createSlice } from "@reduxjs/toolkit";
import { User } from '../types/userTypes'

interface ListLoad {
    payload: User[]
}

interface Initial {
    users: User[]
}

const initialState: Initial = {
    users: []
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        loadAll: (state, action: ListLoad) => {
            state.users = action.payload
        }
    }

})

export const { loadAll } = userSlice.actions;