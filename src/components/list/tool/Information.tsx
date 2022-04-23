import React from 'react';
import { Tool } from '../../../types/toolsTypes';

interface Props {
    tool: Tool
}

const Information = (props: Props) => {

    const { id, sign, person, place, status, info } = props.tool;

    return (
        <div className='Tool__information'>
            <h2>Aktualne informację</h2>

            <strong>Grawer lub oznacznie: {sign}</strong>

            <div>
                Identyfikator: {id}
            </div>

            <ul>
                <li>Rodzaj urządzenia: {info.type}</li>
                <li>Typ: {info.subtype}</li>
                <li>Marka: {info.brand}</li>
                <li>Numer seryjny: {info.serial}</li>
                <li>Status: {status}</li>
                <li>Miejsce: {place}</li>
                <li>Osoba odpowiedzialna: {person}</li>
            </ul>
        </div>
    );
};

export default Information;
