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
            <p>Użytkowane urządzenie
                {type} {subtype}
                Marki: {brand}
            </p>
            <p>Odpowiedzialny od {start} do {end ? end : 'Aktualnie'}</p>
            <strong>Oznaczenie: {sign}</strong>
            <p>Numer seryjny: {serial}</p>
        </li>
    );
};

export default HistoryRecord;