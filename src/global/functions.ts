import { Tool, ToolsNames } from '../types/toolsTypes';
import { Login } from '../types/loginTypes';

interface incomingTool {
    _id: string;
    _name: string;
    _types: string[];
}

export const filtering = (list: Tool[], searchingType: string, searchingText: string) => {

    switch (searchingType) {
        case 'type': {
            const filtredList = list.filter(tool => tool.info.type.includes(searchingText));
            return filtredList as Tool[];
        }
        case 'brand': {
            const filtredList = list.filter(tool => tool.info.brand.includes(searchingText));
            return filtredList as Tool[];
        }
        case 'person': {
            const filtredList = list.filter(tool => tool.person.includes(searchingText));
            return filtredList as Tool[];
        }
    }
}
export const listDeleter = async (id: string): Promise<string | undefined> => {
    try {
        const data = await fetch(`http://localhost:8080/category/`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        const idn = await data.json();
        return idn.id as string

    } catch (error: unknown) {
        if (error instanceof Error)
            window.location.href = `/error/${error.message}`;
        //send info about error to error log
    }
}

export const listPatcher = async (id: string, subtype: string) => {
    try {
        const data = await fetch(`http://localhost:8080/category/part`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, subtype })
        });
        const idn = await data.json();
        return idn.id as string

    } catch (error: unknown) {
        if (error instanceof Error)
            window.location.href = `/error/${error.message}`;
        //send info about error to error log
    }
}

export const listPoster = async (data: ToolsNames, method: string): Promise<string | undefined> => {
    try {
        const income = await fetch(`http://localhost:8080/category`, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const id = await income.json();
        return id.id as string

    } catch (error: unknown) {
        // if (error instanceof Error)
        //     window.location.href = `/error/${error.message}`;
        //send info about error to error log
    }
}

export const listGetter = async (path: string): Promise<ToolsNames[] | undefined> => {
    try {
        const connecting = await fetch(`http://localhost:8080${path}`, {
            method: 'GET'
        })
        const data = await connecting.json() as incomingTool[];
        const list: ToolsNames[] = [];
        data.forEach(element => {
            const toolName = { id: element._id, name: element._name, subtypes: element._types };
            list.push(toolName);
        });

        return list
    } catch (error: unknown) {
        if (error instanceof Error)
            window.location.href = `/error/${error.message}`;
        //send info about error to error log
    }
}

export const communicate = async (path: string, data: object): Promise<Login | undefined> => {
    try {
        const connecting = await fetch(`http://localhost:8080${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const response = await connecting.json() as unknown as Login;
        return response;
    } catch (error: unknown) {
        if (error instanceof Error)
            window.location.href = `/error/${error.message}`;
        //send info about error to error log
    }
}

export const setSession = (token: string | null, loginStatus: boolean): void => {
    const loginState = loginStatus ? 'true' : 'false';
    const value = token ? token : '';
    sessionStorage.setItem('token', value);
    sessionStorage.setItem('loginStatus', loginState);
}

export const getSession = (): Login => {
    const data = sessionStorage.getItem('token');
    const token = data === undefined ? null : data;
    const loginStatus = sessionStorage.getItem('loginStatus') === 'true' ? true : false;
    const info = token ? 'Correct' : 'Uncorrect';

    return {
        login: loginStatus,
        token,
        info
    }
}
