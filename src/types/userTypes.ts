import { Tool } from "./toolsTypes";

export interface User {
    name: string;
    id: string;
}

export interface HistoryList {
    name: string;
    tool: Tool;
    from: string;
    to: string;
}
