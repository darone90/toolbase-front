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