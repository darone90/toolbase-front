import React, { useEffect, useState, MouseEvent } from 'react';
import { User } from '../../types/userTypes';
import { HistoryList as hList } from '../../types/userTypes';
import { history as HS } from '../../data/toolToPerson';
import HistoryRecord from './HistoryRecord';

interface Props {
    finded: User | null;
}

const HistoryList = (props: Props) => {

    const [history, setHistory] = useState<hList[] | null>(null);

    useEffect(() => {
        if (props.finded) {
            const ph = HS.filter(hs => hs.name === props.finded?.name);
            setHistory(ph);
        }
    }, [props.finded]);

    const clearHistory = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        console.log('strzał do api czyścimy historię', props.finded)
    }

    const result = history ?
        history.map(el => <HistoryRecord record={el} key={el.tool.id} />)
        : <h2>Brak wyników</h2>


    return (
        props.finded ? <div className='History__list'>
            <h1>Historia użytkownika: {props.finded.name}</h1>
            {result ? <ul>{result}</ul> : result}
            <button onClick={clearHistory}>Wyczyść historię</button>
        </div>
            : null
    )

};

export default HistoryList;
