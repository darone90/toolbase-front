import React, { useState, MouseEvent, useEffect } from 'react';
import { User } from '../../types/userTypes';
import { HistoryList as hList } from '../../types/userTypes';
import HistoryRecord from './HistoryRecord';
import Spinner from '../general/loading/spinner';
import { dataGetter, dataPoster } from '../../global/workersHandle';
import { useNavigate } from 'react-router-dom';



interface Props {
    finded: User | null;
}

const HistoryList = (props: Props) => {

    const navigate = useNavigate();

    const [history, setHistory] = useState<hList[] | null>(null);
    const [showActual, setShowActual] = useState<boolean>(false);

    console.log(history)

    if (!history) <Spinner />;

    useEffect(() => { 
        const getHistory = async () => {
            try {
                const list = await dataGetter(`/history/archived/${props.finded?.name}`);
                if (list) setHistory(list);
            } catch (err) {
                if (err instanceof Error)
                    navigate(`/error/${err.message}`)
            }
        };
        getHistory();
    }, [props.finded?.name, navigate])

    const clearHistory = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            await dataPoster({ name: props.finded?.name }, 'DELETE', `history`);
            setHistory([]);
        } catch (err) {
            if (err instanceof Error)
                navigate(`/error/${err.message}`)
        }   
    }

    const getActual = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setHistory([])
        try {
            const data = await dataGetter(`/history/actual/${props.finded?.name}`)
            setHistory(data)
            setShowActual(true)
        } catch (err) {
            if (err instanceof Error)
                navigate(`/error/${err.message}`)
        }
    }

    const getArchived = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            const list = await dataGetter(`/history/archived/${props.finded?.name}`);
            setHistory(list);
            setShowActual(false)
        } catch (err) {
            if (err instanceof Error)
                navigate(`/error/${err.message}`)
        }
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
