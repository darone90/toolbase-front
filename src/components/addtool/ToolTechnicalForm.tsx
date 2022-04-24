import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { toolNames } from '../../data/toolsNames';
import { ToolsNames, Technical } from '../../types/toolsTypes';
import Spinner from '../general/loading/spinner';
import Select from '../general/select/Select';

interface Props {
    addTechnicalInfo: (data: Technical) => void
}


const ToolTechnicalForm = (props: Props) => {

    const [toolTypes, setToolTypes] = useState<ToolsNames[] | null>(null);
    const [selectedTool, setSelectedTool] = useState<ToolsNames | null>(null);
    const [selectedSubtype, setSelectedSubtype] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [serial, setSerial] = useState<string>('');

    useEffect(() => {
        setToolTypes(toolNames)
    }, []);

    if (!toolTypes) return <Spinner />;

    const selectTool = (e: ChangeEvent<HTMLSelectElement>) => {
        const tool = toolTypes.find(tool => tool.name === e.target.value);
        if (tool) setSelectedTool(tool);
    }

    const selectSubtype = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubtype(e.target.value)
    }

    const submiter = (e: MouseEvent<HTMLElement>) => {

        e.preventDefault();

        if (brand && serial && selectedTool && selectedSubtype) {
            const technicalData: Technical = {
                brand,
                serial,
                type: selectedTool.name,
                subtype: selectedSubtype
            };
            props.addTechnicalInfo(technicalData);
        } else {
            console.log('walidacja do napisania')
        }

    }

    const firstOptions = toolTypes.map(tool => tool.name);

    const secondOptions = selectedTool ?
        selectedTool.subtypes
        : null


    return (
        <div>
            <form>
                <Select title='Wybierz rodzaj urządzenia'
                    name='type'
                    options={firstOptions}
                    value={selectedTool ? selectedTool.name : ''}
                    getValue={selectTool} />
                {secondOptions ?
                    <Select name='Wybierz typ urządzenia'
                        title='Wybierz typ urządzenia'
                        options={secondOptions}
                        value={selectedSubtype}
                        getValue={selectSubtype} />
                    : null}
                <label>
                    Marka urządzenia:
                    <input type="text"
                        value={brand}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => { setBrand(e.target.value) }} />
                </label>
                <label>
                    Numer seryjny:
                    <input type="text"
                        value={serial}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => { setSerial(e.target.value) }} />
                </label>
                <button onClick={submiter}>Dodaj dane...</button>
            </form>
        </div>
    );
};

export default ToolTechnicalForm;
