import React, { useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import Select from '../general/select/Select';
import { statusType, Local } from '../../types/toolsTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import './ToolDataForm.scss';

interface Props {
    getToolData: (data: Local) => void
}

const ToolDataForm = (props: Props) => {

    const [status, setStatus] = useState<string>('');
    const [persons, setPersons] = useState<string[]>([]);
    const [person, setPerson] = useState<string>('');
    const [sign, setSign] = useState<string>('');
    const [place, setPlace] = useState<string>('');

    const { users } = useSelector((store: RootState) => store.users)

    useEffect(() => {
        const userList: string[] = [];
        users.forEach(user => userList.push(user.name))
        setPersons(userList)
    }, [users]);

    const getPerson = (e: ChangeEvent<HTMLSelectElement>) => {
        setPerson(e.target.value)
    };

    const getValue = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'na bazie: Dostępna') {
            setPlace('baza')
        }
        setStatus(e.target.value)
    };

    const getSign = (e: ChangeEvent<HTMLInputElement>) => {
        setSign(e.target.value)
    };

    const getPlace = (e: ChangeEvent<HTMLInputElement>) => {
        setPlace(e.target.value)
    };

    const submiter = (e: MouseEvent<HTMLElement>) => {

        e.preventDefault();

        if (status && person && sign && place) {
            const data: Local = {
                name: person,
                sign,
                place,
                status,
            }
            props.getToolData(data);
        }
    }

    const options = [statusType.BASE, statusType.PRIVATE, statusType.WORK, statusType.REPAIR];

    const validation = status === '' || person === '' || sign === '' || place === '' ? true : false;

    return (
        <div className="Data-form">
        <form>
                <Select title='Status urządzenia: '
                name='status'
                options={options}
                value={status}
                getValue={getValue}
            />
                <Select title='Osoba odpowiedzialna: '
                name='person'
                options={persons}
                value={person}
                getValue={getPerson} />
            <label>
                    Oznaczenie:
                <input type="text" value={sign} onChange={getSign} />
            </label>
            <label>
                    Miejsce użytkowania:
                <input type="text" value={place} onChange={getPlace} />
            </label>
            <button disabled={validation} onClick={submiter}>Dodaj dane...</button>
        </form>
        </div>
    );
};

export default ToolDataForm;
