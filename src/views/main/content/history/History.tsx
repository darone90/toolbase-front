import React, { ChangeEvent, useState, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { User } from '../../../../types/userTypes';
import HistoryList from '../../../../components/history/HistoryList';

import './History.scss'

const History = () => {

    const [lookedPerson, setLookedPerson] = useState<string>('');
    const [finded, setFinded] = useState<User | null>(null);

    const { users } = useSelector((store: RootState) => store.users);

    const getPerson = (e: ChangeEvent<HTMLInputElement>) => {
        setLookedPerson(e.target.value);
    };

    const finder = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const findUser = users.find(user => user.name === lookedPerson);
        const value = findUser ? findUser : null;
        setFinded(value);
    }

    const helpList = users.map(person => <option key={person.id} value={person.name} />)

    return (
        <div className='History'>
            <div className='History__searcher'>
                <label>
                    Podaj osobę której historię chcesz sprawdzić:
                    <input type="text" value={lookedPerson} onChange={getPerson} list='helpList' />
                    <datalist id='helpList'>
                        {helpList}
                    </datalist>
                    <button onClick={finder}>Wyszukaj</button>
                </label>
            </div>
            <HistoryList finded={finded} />
        </div>
    );
};

export default History;
