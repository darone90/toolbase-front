import { createSlice } from "@reduxjs/toolkit";
import { ToolsNames } from "../types/toolsTypes";

interface ListLoad {
    payload: ToolsNames[]
}

interface Initial {
    list: ToolsNames[]
}

const initialState: Initial = {
    list: []
};

export const toolTypeSlice = createSlice({
    name: 'types',
    initialState,
    reducers: {
        loadAll: (state, action: ListLoad) => {
            state.list = action.payload
        }
    }
})

export const { loadAll } = toolTypeSlice.actions