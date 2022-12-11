import { createSlice } from "@reduxjs/toolkit";
import { ToolsNames } from "../types/toolsTypes";

interface ListLoad {
    payload: ToolsNames[]
}

interface SubtypeDelete {
    payload: {
        id: string;
        subtype?: string;
    }
}

interface OneLoad {
    payload: ToolsNames
}

interface oneAdd {
    payload: {
        id: string;
        newSubtype: string;
    }
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
        },
        loadOne: (state, action: OneLoad) => {
            state.list = [...state.list, action.payload]
        },
        changeOne: (state, action: OneLoad) => {
            const filered = state.list.filter(el => el.id !== action.payload.id);
            state.list = [...filered, action.payload];
        },
        addOneSubtype: (state, action: oneAdd) => {
            const tool = state.list.find(el => el.id === action.payload.id);
            if (tool)
                tool.subtypes = [...tool?.subtypes as string[], action.payload.newSubtype]
        },

        deleteSubtype: (state, action: SubtypeDelete) => {
            const filered = state.list.filter(el => el.id !== action.payload.id);
            const edited = state.list.find(el => el.id === action.payload.id);
            const shorterList = edited?.subtypes.filter(el => el !== action.payload.subtype);
            state.list = [...filered, { id: edited?.id, name: edited?.name as string, subtypes: shorterList as string[] }]
        },
        deleteType: (state, action: SubtypeDelete) => {
            const filered = state.list.filter(el => el.id !== action.payload.id);
            state.list = [...filered];
        }
    }
})

export const { loadAll, loadOne, changeOne, deleteSubtype, deleteType, addOneSubtype } = toolTypeSlice.actions