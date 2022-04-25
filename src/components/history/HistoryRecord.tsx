import React from 'react';
import { HistoryList } from '../../types/userTypes';

interface Props {
    record: HistoryList;
}

const HistoryRecord = (props: Props) => {

    const { name, tool, from, to } = props.record
    return (
        <li>
            <strong>{name}</strong>
            <p>Był odpowiedzialny za:
                {tool.info.type} {tool.info.subtype}
                Marki: {tool.info.brand}
            </p>
            <p>Odpowiedzialny od {from} do {to === '' ? "dziś" : to}</p>
        </li>
    );
};

export default HistoryRecord;