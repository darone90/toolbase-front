
export const dataGetter = async (path: string) => {
    try {
        const connecting = await fetch(`http://localhost:8080${path}`, {
            method: 'GET'
        })
        const data = await connecting.json()
        return data;
    } catch (error: unknown) {
        if (error instanceof Error)
            window.location.href = `/error/${error.message}`;
        //send info about error to error log
    }
}

export const dataPoster = async (data: object, method: string, path: string): Promise<string | undefined> => {
    try {
        const income = await fetch(`http://localhost:8080/${path}`, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const id = await income.json();
        return id.id as string

    } catch (error: unknown) {
        if (error instanceof Error)
            window.location.href = `/error/${error.message}`;
        //send info about error to error log
    }
}