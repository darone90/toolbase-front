import { Tool, ToolsNames } from '../types/toolsTypes';
import { Login } from '../types/loginTypes';
import {backendAddress} from '../connection.config';

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
        const data = await fetch(`${backendAddress.address}/category/`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        const idn = await data.json();
        if (idn.error) {
            throw new Error('Wystąpił błąd po stronie serwera... Spróbuj ponownie za chwilę');
        }
        return idn.id as string

    } catch (error: unknown) {
        if (error instanceof Error)
            throw new Error('Przepraszamy wystąpił nieoczekiwany błąd po twojej stronie, sprawdź połączenie z internetem, lub spróbuj za chwilę');
    }
}

export const listPatcher = async (id: string, subtype: string) => {
    try {
        const data = await fetch(`${backendAddress.address}/category/part`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, subtype })
        });
        const idn = await data.json();
        if (idn.error) {
            throw new Error('Wystąpił błąd po stronie serwera... Spróbuj ponownie za chwilę');
        }
        return idn.id as string

    } catch (error: unknown) {
        if (error instanceof Error)
            throw new Error('Przepraszamy wystąpił nieoczekiwany błąd po twojej stronie, sprawdź połączenie z internetem, lub spróbuj za chwilę');
    }
}

export const listPoster = async (data: ToolsNames, method: string): Promise<string | undefined> => {
    try {
        const income = await fetch(`${backendAddress.address}/category`, {
            method: method,
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const id = await income.json();
        if (id.error) {
            throw new Error('Wystąpił błąd po stronie serwera... Spróbuj ponownie za chwilę');
        }
        return id.id as string

    } catch (error: unknown) {
        if (error instanceof Error)
            throw new Error('Przepraszamy wystąpił nieoczekiwany błąd po twojej stronie, sprawdź połączenie z internetem, lub spróbuj za chwilę');
    }
}

export const listGetter = async (path: string): Promise<ToolsNames[] | undefined> => {
    try {
        const connecting = await fetch(`${backendAddress.address}${path}`, {
            method: 'GET',
            credentials: 'include',
        })

        const data = await connecting.json();
        if(data.error) {
            throw new Error('Wystąpił błąd po stronie serwera... Spróbuj ponownie za chwilę');
        }
        const list: ToolsNames[] = [];
        (data as incomingTool[]).forEach(element => {
            const toolName = { id: element._id, name: element._name, subtypes: element._types };
            list.push(toolName);
        });

        return list
    } catch (error: unknown) {
        if (error instanceof Error)
            throw new Error('Przepraszamy wystąpił nieoczekiwany błąd po twojej stronie, sprawdź połączenie z internetem, lub spróbuj za chwilę');
    }
}

export const communicate = async (path: string, data: object): Promise<Login | undefined> => {
    try {
        const connecting = await fetch(`${backendAddress.address}${path}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const response = await connecting.json();
        if(response.error) {
            throw new Error('Wystąpił błąd po stronie serwera... Spróbuj ponownie za chwilę');
        }
        return response  as unknown as Login;
    } catch (error: unknown) {
        if (error instanceof Error)
            throw new Error('Problem logowania')
    }
}

export const setSession = (token: string | null, loginStatus: boolean, user: string | null): void => {
    const loginState = loginStatus ? 'true' : 'false';
    const value = token ? token : '';
    sessionStorage.setItem('token', value);
    sessionStorage.setItem('loginStatus', loginState);
    const User = user ? user : 'null'
    sessionStorage.setItem('user', User)
}

export const getSession = (): Login => {
    const data = sessionStorage.getItem('token');
    const token = data === undefined ? null : data;
    const loginStatus = sessionStorage.getItem('loginStatus') === 'true' ? true : false;
    const info = token ? 'Correct' : 'Uncorrect';
    const user = sessionStorage.getItem('user');

    return {
        login: loginStatus,
        token,
        info,
        user
    }
}
