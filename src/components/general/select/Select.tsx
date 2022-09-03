import React, { ChangeEvent } from 'react';

import './Select.scss';

interface Props {
    title: string;
    name: string;
    options: string[];
    value: string;
    getValue: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select = (props: Props) => {

    const options = props.options.map((option, i) => <option key={i} value={option}>{option}</option>);

    return (
        <label className='Select'>
            {props.title}
            <select name={props.name} value={props.value} onChange={props.getValue}>
                <option value=''>Wybierz z listy...</option>
                {options}
            </select>
        </label>
    )
}

export default Select;
