import { Tool } from '../types/toolsTypes';
import { Login } from '../types/loginTypes';


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

export const communicate = async (path: string, data: object): Promise<Login | undefined> => {
    try {
        const connecting = await fetch(`http://localhost:8080${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const response = connecting.json() as unknown as Login;
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
