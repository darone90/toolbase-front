import React, { useState, MouseEvent, useEffect } from 'react';
import { User } from '../../types/userTypes';
import { HistoryList as hList } from '../../types/userTypes';
import HistoryRecord from './HistoryRecord';
import Spinner from '../general/loading/spinner';
import { dataGetter, dataPoster } from '../../global/workersHandle';



interface Props {
    finded: User | null;
}

const HistoryList = (props: Props) => {



    const [history, setHistory] = useState<hList[] | null>(null);
    const [showActual, setShowActual] = useState<boolean>(false);

    console.log(history)

    if (!history) <Spinner />;

    useEffect(() => { 
        const getHistory = async () => {
            const list = await dataGetter(`/history/archived/${props.finded?.name}`);
            if (list) setHistory(list);
        };
        getHistory();
    }, [props.finded?.name])

    const clearHistory = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();

        await dataPoster({ name: props.finded?.name }, 'DELETE', `history`);
        setHistory([]);
    }

    const getActual = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setHistory([])
        const data = await dataGetter(`/history/actual/${props.finded?.name}`)
        setHistory(data)
        setShowActual(true)
    }

    const getArchived = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const list = await dataGetter(`/history/archived/${props.finded?.name}`);
        setHistory(list);
        setShowActual(false)
    }

    const result = history === null || history.length < 1 ?
        <h2>Brak wyników</h2>
        : history?.map(el => <HistoryRecord record={el} key={el.uuid} />)


    const buttonsHandler = showActual ?
        <button onClick={getArchived}>Pokaż historię</button>
        : <button onClick={getActual}>Pokaż aktualne</button>;

    return (
        props.finded ? <div className='History__list'>
            <h1>Historia użytkownika: {props.finded.name}</h1>
            {result}
            <button onClick={clearHistory} disabled={showActual}>Wyczyść historię dla {props.finded.name}</button>
            {buttonsHandler}
        </div>
            : null
    )

};

export default HistoryList;
