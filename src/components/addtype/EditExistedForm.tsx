import React, { ChangeEvent, useState, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { ToolsNames } from '../../types/toolsTypes';
import NameSection from './NameSection';
import { listPatcher, listDeleter, listPoster } from '../../global/functions';
import InfoBox from '../general/informationBox/InfoBox';
import { addOneSubtype, changeOne, deleteSubtype, deleteType } from '../../features/toolTypes-slice';

import './EditExistedForm.scss';

interface Props {
    selected: string
}

const EditExistedForm = (props: Props) => {

    const navigate = useNavigate();

    const [newSubtypes, setNewSubtypes] = useState<string[]>([]);
    const [newSubtype, setNewSubtype] = useState<string>('');
    const [nameInput, setNameInput] = useState<boolean>(false)
    const [newName, setNewName] = useState<string>('');
    const [idno, setIdno] = useState<string>('');
    const [infoBoxVisible, setInfoBoxVisible] = useState<boolean>(false);
    const [action, setAction] = useState<string>('e');

    const dispatch = useDispatch();

    const nameInputHandler = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setNameInput(prev => !prev)
    };

    const getNewName = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.includes(' ')) {
            window.alert('Nie można stosować spacji, typ musi być jednym ciągiem znaków');
            return;
        }
        setNewName(e.target.value);
    };

    const getNewSubtype = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.includes(' ')) {
            window.alert('Nie można stosować spacji, typ musi być jednym ciągiem znaków');
            return;
        }
        setNewSubtype(e.target.value);
    };

    const getNewSubtypes = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (newSubtype) {
            if (tool) {
                const id = tool.id as string;
                dispatch(addOneSubtype({ id, newSubtype }))
            }  
        }
    }

    const submiter = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const name = newName ? newName : toolName;
        const subtypes = tool ? [...tool.subtypes, ...newSubtypes] : [...newSubtypes];
        const id = tool?.id

        const editedType: ToolsNames = {
            name,
            subtypes,
            id,
        }
        if (window.confirm('Zapisać zmiany w bazie ?')) {
            try {
                const idn = await listPoster(editedType, 'PATCH');
                if (idn) {
                    dispatch(changeOne(editedType))
                    setIdno(idn)
                    setInfoBoxVisible(true);
                    setAction('e');
                };
                setNewName('');
                setNameInput(false);
                setNewSubtypes([]);
                setNewSubtype('');
            } catch (error: unknown) {
                if (error instanceof Error)
                    navigate(`/error/${error.message}`)
            }
        }
    };

    const deleter = async (e: MouseEvent<HTMLButtonElement>) => {
        try {
            if (tool) {
                const id = tool.id as string;
                const subtype = (e.target as Element).classList[0];
                if (tool.subtypes.length === 1) {
                    window.alert('Narzędzie musi posiadać przynajmniej jeden podtyp. Najpierw zapisz zmiany z nowymi typami.');
                    return;
                }
                await listPatcher(id, subtype);
                dispatch(deleteSubtype({ id, subtype }));
            }
        } catch (error: unknown) {
            if (error instanceof Error)
                navigate(`/error/${error.message}`)
        }
    };

    const deleteAll = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (window.confirm('Usunąc typ z bazy ??')) {
            if (tool) {
                try {
                    const id = await listDeleter(tool.id as string);
                    if (id) {
                        setIdno(id)
                        setInfoBoxVisible(true);
                        setAction('d');
                        dispatch(deleteType({ id }))
                    };
                } catch (error: unknown) {
                    if (error instanceof Error)
                        navigate(`/error/${error.message}`)
                }
            }
        }
    }

    const { list } = useSelector((store: RootState) => store.types);

    const tool = list.find(element => element.name === props.selected);
    const toolName = tool ? tool.name : 'Brak nazwy';
    const subtypeList = tool ?
        [...tool.subtypes, ...newSubtypes].map((type, i) => <li key={i}>{type}<button className={type} onClick={deleter}>Usuń</button></li>)
        : null

    return (
        <div className='Type-add__edit' onClick={() => { setInfoBoxVisible(false); setIdno('') }}>
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
            <button onClick={deleteAll}>Usuń cały rodzaj</button>
            <InfoBox visible={infoBoxVisible} name='Nowy typ urządzenia' idn={idno} action={action} />
        </div>
    );
};

export default EditExistedForm;