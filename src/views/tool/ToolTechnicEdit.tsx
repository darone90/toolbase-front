import React, { ChangeEvent, useEffect, useState, MouseEvent } from 'react';
import Spinner from '../../components/general/loading/spinner';
import { useParams } from 'react-router-dom';
import { Tool } from '../../types/toolsTypes';
import { toolsList } from '../../data/tools';
import Select from '../../components/general/select/Select';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Button from '../../components/general/button/Button';
import { buttonClass } from '../../types/styleTypes';

const ToolTechnicalEdit = () => {

    const [tool, setTool] = useState<Tool | null>(null);
    const [subtypes, setSubtypes] = useState<string[]>([]);


    const { list } = useSelector((store: RootState) => store.types);

    const { id } = useParams();

    useEffect(() => {
        console.log('sztrzał do api za narzędziem do edycji po id: ', id);
        const findedTool = toolsList.find(tl => tl.id === id);
        if (findedTool) setTool(findedTool);
    }, [id])

    if (!tool) return <Spinner />;

    const setType = (e: ChangeEvent<HTMLSelectElement>) => {
        const toolType = list.find(el => el.name === e.target.value);
        const subtypeList = toolType ? toolType.subtypes : [];
        setSubtypes(subtypeList);
        setTool(prev => ({ ...prev, info: { ...prev?.info, type: e.target.value, subtype: subtypeList[0] } } as Tool));
        if (tool.info.subtype === undefined) {
            setTool(prev => ({ ...prev, info: { ...prev?.info, subtype: '' } } as Tool));
        }
    };

    const setSubtype = (e: ChangeEvent<HTMLSelectElement>) => {
        setTool(prev => ({ ...prev, info: { ...prev?.info, subtype: e.target.value } } as Tool))
    }

    const getToolParam = (e: ChangeEvent<HTMLInputElement>) => {
        setTool(prev => ({ ...prev, info: { ...prev?.info, [e.target.name]: e.target.value } } as Tool));
    };

    const submiter = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (tool.info.subtype === '' || tool.info.type === '') {
            alert('na razie alert docelowo komponent z ostrzeżenieniem że nie wszytskie pola są uzupełnione')
            return;
        }
        console.log('wysyłamy na serwer edytowane narzędzie', tool)
    }

    const options = list.map(type => type.name);

    const secondSelect = subtypes.length > 0 ?
        <Select title='Wybierz nowy typ urządzenia'
            name='technical-subtype'
            options={subtypes}
            value={tool.info.subtype}
            getValue={setSubtype} />
        : null;

    return (
        <div className='Tool-edit--technical'>
            <strong>Edycja parametrów dla: {tool.info.type} typ: {tool.info.subtype}</strong>
            <form>
                <Select title='Wybierz nowy rodzaj urządzenia'
                    name='technical'
                    options={options}
                    value={tool.info.type}
                    getValue={setType} />
                {secondSelect}
                <label>
                    zmień markę:
                    <input name='brand' type="text" value={tool.info.brand} onChange={getToolParam} />
                </label>
                <label>
                    zmień numer seryjny:
                    <input name='serial' type="text" value={tool.info.serial} onChange={getToolParam} />
                </label>
            </form>
            <Button link={false} title='Zapisz zmiany' addClass={buttonClass.BIG} func={submiter} />
            <Button link={true} pref={'/'} ident={''} title='Wróć do listy narzędzi' addClass={buttonClass.BIG} />
        </div>
    );
};

export default ToolTechnicalEdit;
