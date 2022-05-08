import { createSlice } from "@reduxjs/toolkit";
import { User } from '../types/userTypes'

interface ListLoad {
    payload: User[]
}

interface WorkerLoad {
    payload: User
}

interface WorkerDelete {
    payload: string
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
        },

        addOne: (state, action: WorkerLoad) => {
            state.users = [...state.users, action.payload];
        },
        deleteOne: (state, action: WorkerDelete) => {
            const newState = state.users.filter(user => user.id !== action.payload);
            state.users = [...newState];
        }
    }

})

export const { loadAll, addOne, deleteOne } = userSlice.actions;