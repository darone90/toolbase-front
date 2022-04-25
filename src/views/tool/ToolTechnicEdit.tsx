import React, { ChangeEvent, useEffect, useState } from 'react';
import Spinner from '../../components/general/loading/spinner';
import { useParams } from 'react-router-dom';
import { Tool } from '../../types/toolsTypes';
import { toolsList } from '../../data/tools';
import Select from '../../components/general/select/Select';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ToolTechnicalEdit = () => {

    const [tool, setTool] = useState<Tool | null>(null);
    const [changeFlag, setChangeFlag] = useState<boolean>(false);

    const { list } = useSelector((store: RootState) => store.types);

    const { id } = useParams();

    useEffect(() => {
        console.log('sztrzał do api za narzędziem do edycji po id: ', id);
        const findedTool = toolsList.find(tl => tl.id === id);
        if (findedTool) setTool(findedTool);
    }, [id])

    if (!tool) return <Spinner />;

    const setType = (e: ChangeEvent<HTMLSelectElement>) => {
        setTool(prev => ({ ...prev, info: { ...prev?.info, type: e.target.value } } as Tool));
        setChangeFlag(true);
    };

    const options = list.map(type => type.name);


    return (
        <div className='Tool-edit--technical'>
            <strong>Edycja parametrów dla {tool.info.type}{tool.info.subtype}</strong>
            <form>
                <Select title='Wybierz rodzaj urządzenia'
                    name='technical'
                    options={options}
                    value={tool.info.type}
                    getValue={setType} />
                <label>
                    zmień markę:
                    <input type="text" />
                </label>
                <label>
                    zmień numer seryjny:
                    <input type="text" />
                </label>
            </form>
        </div>
    );
};

export default ToolTechnicalEdit;
