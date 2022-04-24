import React, { MouseEvent } from 'react';
import { Technical, Local } from '../../types/toolsTypes'

interface Props {
    technical: Technical | null;
    local: Local | null;
    validation: boolean;
    addFunc: (e: MouseEvent<HTMLElement>) => void
}

const ToolDataLook = (props: Props) => {

    const technical = props.technical ?
        <div className='New-tool__technical'>
            <ul>
                <li>Marka: {props.technical.brand}</li>
                <li>Numer seryjny: {props.technical.serial}</li>
                <li>Rodzaj urządxzenia: {props.technical.type}</li>
                <li>Typ: {props.technical.subtype}</li>
            </ul>
        </div>
        : <div>Wprowadź dane nowego urządzenia</div>;

    const local = props.local ?
        <div className='New-tool__local'>
            <ul>
                <li>Miejsce magazynowania: {props.local.place}</li>
                <li>Status: {props.local.status}</li>
                <li>Osoba odpowiedzialna: {props.local.person}</li>
                <li>Oznaczenie / grawer: {props.local.sign}</li>
            </ul>
        </div>
        : <div>Wprowadź dane nowego urządzenia</div>

    return (
        <div className='New-tool'>
            {technical}
            {local}
            <button onClick={props.addFunc} disabled={props.validation}>Dodaj urządzenie do bazy danych</button>
        </div>
    );
};

export default ToolDataLook;
