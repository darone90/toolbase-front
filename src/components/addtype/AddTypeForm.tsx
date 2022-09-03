import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { ToolsNames } from '../../types/toolsTypes';
import AddSubtypeForm from './addSubtypeForm';
import { listPoster } from '../../global/functions';
import InfoBox from '../general/informationBox/InfoBox';
import { loadOne } from '../../features/toolTypes-slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './AddTypeForm.scss';

const AddTypeForm = () => {

    const navigate = useNavigate();

    const [newType, setNewType] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [infoBoxVisible, setInfoBoxVisible] = useState<boolean>(false);
    const [finalData, setFinalData] = useState<ToolsNames>({ name: '', subtypes: [] });

    const dispatch = useDispatch();

    const removeSubtype = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const newSubtypesList = finalData.subtypes.filter(sub => sub !== (e.target as Element).classList[0]);
        setFinalData({ name: finalData.name, subtypes: newSubtypesList });
    }

    const addName = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setFinalData(prev => ({ ...prev, name: newType }))
        setNewType('');
    };

    const getNewType = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.value.includes(' ')) {
            window.alert('Nie można stosować spacji, typ musi być jednym ciągiem znaków');
            return;
        }
        setNewType(e.target.value)
    };

    const getSubtype = (subtype: string) => {
        setFinalData(prev => ({
            ...prev,
            subtypes: [...prev.subtypes, subtype]
        }));
    }

    const submiter = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (window.confirm('Zapisać typ w bazie danych ?')) {
            try {
                const id = await listPoster(finalData, 'POST');
                if (id) {
                    setId(id)
                    setInfoBoxVisible(true);
                };
                dispatch(loadOne(finalData));
                setFinalData({ name: '', subtypes: [] });
                setNewType('');
            } catch (error: unknown) {
                if (error instanceof Error)
                    navigate(`/error/${error.message}`)
            }

        }
    }

    const btnValidation = finalData.name && finalData.subtypes.length > 0 ? false : true;

    const subtypeList = finalData.subtypes.length > 0 ?
        finalData.subtypes.map((subtype, i) => <li key={i}>{subtype}<button className={subtype} onClick={removeSubtype}>Usuń z listy</button></li>)
        : null;

    return (
        <div className='Type-add' onClick={() => { setInfoBoxVisible(false); setId('') }}>
            <form>
                <label>
                    Wprowadź nazwę nowego rodzaju użądzenia:
                    <input type="text" value={newType} onChange={getNewType} />
                </label>
                <button onClick={addName}>{finalData.name === '' ? 'Dodaj' : 'Zmień nazwę'}</button>
                {finalData.name ? <AddSubtypeForm getSubtype={getSubtype} /> : null}
            </form>
            <div className='Type-add__results'>
                <h1>{finalData.name ? `Nowy rodzaj urządzenia: ${finalData.name}` : 'Podaj nazwę nowego rodzaju urządzenia'}</h1>
                {subtypeList ? <h2>Dodane typy: </h2> : null}
                {subtypeList ? <ul>{subtypeList}</ul> : null}
                <button disabled={btnValidation} onClick={submiter}>Zapisz Nowy Typ</button>
            </div>
            <InfoBox visible={infoBoxVisible} name='Nowy typ urządzenia' idn={id} action='a' />
        </div>
    );
};

export default AddTypeForm;
