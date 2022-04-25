import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { ToolsNames } from '../../types/toolsTypes';
import AddSubtypeForm from './addSubtypeForm';

const AddTypeForm = () => {

    const [newType, setNewType] = useState<string>('');
    const [finalData, setFinalData] = useState<ToolsNames>({ name: '', subtypes: [] });

    const addName = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setFinalData(prev => ({ ...prev, name: newType }))
        setNewType('');
    };

    const getNewType = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNewType(e.target.value)
    };

    const getSubtype = (subtype: string) => {
        setFinalData(prev => ({
            ...prev,
            subtypes: [...prev.subtypes, subtype]
        }));
    }

    const submiter = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        console.log('wysyłamy nowy typ', finalData)
    }

    const btnValidation = finalData.name && finalData.subtypes.length > 0 ? false : true;

    const subtypeList = finalData.subtypes.length > 0 ?
        finalData.subtypes.map((subtype, i) => <li key={i}>{subtype}<button className={subtype}>Usuń z listy</button></li>)
        : null;

    return (
        <div className='Type-add'>
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
        </div>
    );
};

export default AddTypeForm;
