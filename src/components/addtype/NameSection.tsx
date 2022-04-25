import React, { MouseEvent, ChangeEvent } from 'react';

interface Props {
    func: (e: MouseEvent<HTMLElement>) => void;
    nameInput: boolean;
    actualName: string;
    value: string;
    getValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

const NameSection = (props: Props) => {

    if (props.nameInput) {
        return (
            <div>
                <label>
                    Wprowadź nową nazwę:
                    <input type="text" value={props.value} onChange={props.getValue} />
                </label>
                <button onClick={props.func}>Wróć</button>
            </div>
        )
    } else {
        return (
            <div>
                <h2>Edycja rodzaju narzędzia: {props.actualName}</h2>
                <button onClick={props.func}>Zmień nazwę</button>
            </div>
        )
    }

};

export default NameSection;
