import React, { ChangeEvent, useState, MouseEvent } from 'react';

interface Props {
    getSubtype: (subtype: string) => void;
}

const AddSubtypeForm = (props: Props) => {

    const [subtype, setSubtype] = useState<string>('');

    const getSubtype = (e: ChangeEvent<HTMLInputElement>) => {
        setSubtype(e.target.value)
    }

    const cleaner = () => {
        setSubtype('');
    }

    const validation = subtype.length > 2 ? false : true;

    return (
        <div className='Add-type__subtype'>
            <label>
                Podaj nowy typ dla urządzenia { }:
                <input type="text" value={subtype} onChange={getSubtype} />
                <button disabled={validation}
                    onClick={(e: MouseEvent<HTMLElement>) => {
                        e.preventDefault();
                        props.getSubtype(subtype);
                        cleaner()
                    }}>Dodaj</button>
            </label>
        </div>
    );
};

export default AddSubtypeForm;