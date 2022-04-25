import React, { ChangeEvent, useState, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ToolsNames } from '../../types/toolsTypes';
import NameSection from './NameSection';

interface Props {
    selected: string
}

const EditExistedForm = (props: Props) => {

    const [newSubtypes, setNewSubtypes] = useState<string[]>([]);
    const [newSubtype, setNewSubtype] = useState<string>('');
    const [nameInput, setNameInput] = useState<boolean>(false)
    const [newName, setNewName] = useState<string>('');

    const nameInputHandler = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setNameInput(prev => !prev)
    };

    const getNewName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    };

    const getNewSubtype = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSubtype(e.target.value);
    };

    const getNewSubtypes = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (newSubtype) {
            setNewSubtypes(prev => [...prev, newSubtype])
        }
    }

    const submiter = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const name = newName ? newName : toolName;
        const subtypes = tool ? [...tool.subtypes, ...newSubtypes] : [...newSubtypes];

        const editedType: ToolsNames = {
            name,
            subtypes,
        }

        console.log('wysyłamy edytowany typ', editedType)
    };

    const deleter = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        console.log(`usuwamy typ ${(e.target as Element).classList[0]} w rodzaju ${props.selected}`)
    };

    const { list } = useSelector((store: RootState) => store.types);

    const tool = list.find(element => element.name === props.selected);
    const toolName = tool ? tool.name : 'Brak nazwy';
    const subtypeList = tool ?
        [...tool.subtypes, ...newSubtypes].map((type, i) => <li key={i}>{type}<button className={type} onClick={deleter}>Usuń</button></li>)
        : null

    return (
        <div>
            <NameSection func={nameInputHandler}
                nameInput={nameInput}
                actualName={toolName}
                value={newName}
                getValue={getNewName} />
            {subtypeList ? <h2>Lista typów dla tego urządzenia:</h2> : null}
            {subtypeList ? <ul>{subtypeList}</ul> : null}
            {tool ?
                <>
                    <label>Dodaj nowy typ:
                        <input type="text" value={newSubtype} onChange={getNewSubtype} />
                    </label>

                    <button onClick={getNewSubtypes}>Dodaj typ</button>
                </>
                : null}

            <button onClick={submiter}>Zapisz zmiany</button>
        </div>
    );
};

export default EditExistedForm;