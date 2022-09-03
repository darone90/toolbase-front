import React from 'react';
import { HistoryList } from '../../types/userTypes';

interface Props {
    record: HistoryList;
}

const HistoryRecord = (props: Props) => {

    const { name, sign, type, subtype, brand, serial, start, end } = props.record
    return (
        <li>
            <strong>{name}</strong>
            <p><strong> Użytkowane urządzenie:</strong> {type} {subtype} <strong>Marki</strong>: {brand}</p>
            <p>Odpowiedzialny od {start.slice(0, 10)} do {end ? end.slice(0, 10) : 'Aktualnie'}</p>
            <strong>Oznaczenie: {sign}</strong>
            <p>Numer seryjny: {serial}</p>
        </li>
    );
};

export default HistoryRecord;