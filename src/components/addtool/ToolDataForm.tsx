import React, { useState, ChangeEvent, MouseEvent } from 'react';
import Select from '../general/select/Select';
import { statusType, Local } from '../../types/toolsTypes';
import { persons as names } from '../../data/persons';

interface Props {
    getToolData: (data: Local) => void
}

const ToolDataForm = (props: Props) => {

    const [status, setStatus] = useState<string>('');
    const [persons, setPersons] = useState<string[]>([]);
    const [person, setPerson] = useState<string>('');
    const [sign, setSign] = useState<string>('');
    const [place, setPlace] = useState<string>('');

    useState(() => {
        console.log('strzał do api pobrać urzytkowników');
        setPersons(names)
    });

    const getPerson = (e: ChangeEvent<HTMLSelectElement>) => {
        setPerson(e.target.value)
    };

    const getValue = (e: ChangeEvent<HTMLSelectElement>) => {
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
                person,
                sign,
                place,
                status,
            }
            props.getToolData(data);
        }
    }

    const options = [statusType.BASE, statusType.PRIVATE, statusType.WORK, statusType.REPAIR];


    return (
        <form>
            <Select title='Wybierz status urządzenia: '
                name='status'
                options={options}
                value={status}
                getValue={getValue}
            />
            <Select title='Wybierz osobę odpowiedzialną: '
                name='person'
                options={persons}
                value={person}
                getValue={getPerson} />
            <label>
                Oznaczenie / grawer:
                <input type="text" value={sign} onChange={getSign} />
            </label>
            <label>
                Miejsce przechowywania / użytkowania:
                <input type="text" value={place} onChange={getPlace} />
            </label>
            <button onClick={submiter}>Dodaj dane...</button>
        </form>
    );
};

export default ToolDataForm;
