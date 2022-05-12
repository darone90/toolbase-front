

export const dataGetter = async (path: string) => {

    try {
        const connecting = await fetch(`http://localhost:8080${path}`, {
            method: 'GET'
        })
        const data = await connecting.json()
        if (data.error) {
            throw new Error('Wystąpił błąd po stronie serwera... Spróbuj ponownie za chwilę');
        }
        return data;
    } catch (error: unknown) {
        throw new Error('Przepraszamy wystąpił nieoczekiwany błąd po twojej stronie, sprawdź połączenie z internetem, lub spróbuj za chwilę');
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
        if (id.error) {
            throw new Error('Wystąpił błąd po stronie serwera... Spróbuj ponownie za chwilę');
        }
        return id.id as string

    } catch (error: unknown) {
        if (error instanceof Error)
            throw new Error('Przepraszamy wystąpił nieoczekiwany błąd po twojej stronie, sprawdź połączenie z internetem, lub spróbuj za chwilę');
    }
}