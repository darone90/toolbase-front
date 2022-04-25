import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Tool } from '../../types/toolsTypes';
import { toolsList } from '../../data/tools';
import Spinner from '../../components/general/loading/spinner';
import { RootState } from '../../store';
import Select from '../../components/general/select/Select';
import { statusType } from '../../types/toolsTypes';
import Button from '../../components/general/button/Button';
import { buttonClass } from '../../types/styleTypes'

interface Flags {
    person: boolean;
    status: boolean;
    place: boolean;
}

enum flagsKeys {
    PERSON = 'person',
    STATUS = 'status',
    PLACE = 'place'
}

const ToolLocalEdit = () => {

    const [tool, setTool] = useState<Tool | null>(null);
    const [flags, setFlags] = useState<Flags>({ person: false, status: false, place: false })
    const { id } = useParams();

    const { users } = useSelector((store: RootState) => store.users);

    useEffect(() => {
        console.log('strzał do api pobranie jednego narzędzia do edycji');
        const finded = toolsList.find(tool => tool.id === id);
        const value = finded ? finded : null;
        setTool(value);
    }, [id]);

    if (!tool) return <Spinner />;

    const flagChange = (e: MouseEvent<HTMLElement>, param: flagsKeys) => {
        e.preventDefault();
        const readValue = flags[param]
        setFlags(prev => ({ ...prev, [param]: !readValue }))
    };

    const changePerson = (e: ChangeEvent<HTMLSelectElement>) => {
        setTool(prev => ({ ...prev, person: e.target.value } as Tool))
    };

    const changeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
        let value: statusType;
        switch (e.target.value) {
            case 'na bazie: Dostępna': {
                value = statusType.BASE
                setTool(prev => ({ ...prev, place: 'baza' } as Tool))
                break;
            }
            case 'w serwisie: Niedostępna': {
                value = statusType.REPAIR
                break;
            }
            case 'na wyjeździe: Niedostępna': {
                value = statusType.WORK
                break;
            }
            case 'wypożyczona: Niedostępna': {
                value = statusType.PRIVATE
                break;
            }
        };
        setTool(prev => ({ ...prev, status: value } as Tool));

    };

    const changePlace = (e: ChangeEvent<HTMLInputElement>) => {
        setTool(prev => ({ ...prev, place: e.target.value } as Tool))
    };

    const submiter = () => {
        if (tool.person === '') {
            alert('docelowo komponent z błedem że musi być osoba odpowiedzialna');
            return;
        }
        console.log('wysyłamy zmiany w stausach po edycji', tool);
    }



    const options = users.map(user => user.name);
    const secondSelectOptions = Object.values(statusType)

    const select = flags.person ?
        <Select title='Wybierz nową osobę odpowiedzialną:'
            name='person-select'
            options={options}
            value={tool.person}
            getValue={changePerson} />
        : null;

    const status = flags.status ?
        <Select title='Zmień aktualny status urządzenia'
            name='status-select'
            options={secondSelectOptions}
            value={tool.status}
            getValue={changeStatus} />
        : null

    const place = flags.place ?
        <label>
            Wprowadź nowe miejsce magazynowania:
            <input type="text" value={tool.place} onChange={changePlace} />
        </label>
        : null;

    return (
        <div className='Tool-edit--local'>
            <strong>Zmiana statusów dla urządzenia: {tool.info.type} typ: {tool.info.subtype} marki: {tool.info.brand}</strong>
            <p>Identyfikator w bazie danych: {tool.id}</p>
            <p>Numer seryjny: {tool.info.serial}</p>
            <div className='Tool-edit--local__data'>
                <section className='Tool-edit--local__data-person'>
                    Osoba odpowiedzialna: {tool.person}
                    <button onClick={(e: MouseEvent<HTMLElement>) => { flagChange(e, flagsKeys.PERSON) }}>
                        {flags.person ? 'Wróć' : 'Zmień'}
                    </button>
                    {select}
                </section>
                <section className='Tool-edit--local__data-status'>
                    Aktualny status: {tool.status}
                    <button onClick={(e: MouseEvent<HTMLElement>) => { flagChange(e, flagsKeys.STATUS) }}>
                        {flags.status ? 'Wróć' : 'Zmień'}
                    </button>
                    {status}
                </section>
                <section className='Tool-edit--local__data-place'>
                    Aktualne miejsce magazynowania: {tool.place}
                    <button onClick={(e: MouseEvent<HTMLElement>) => { flagChange(e, flagsKeys.PLACE) }}>
                        {flags.place ? 'Wróć' : 'Zmień'}
                    </button>
                    {place}
                </section>
            </div>
            <Button link={false} title='Zapisz zmiany' addClass={buttonClass.IMPORTANT} func={submiter} />
            <Button link={true} title='powrót do listy urządzeń' addClass={buttonClass.SMALL} pref='/' ident='' />
        </div>
    );
};

export default ToolLocalEdit;