import React, { ChangeEvent, useState, MouseEvent } from 'react';

interface Props {
    getSubtype: (subtype: string) => void;
}

const AddSubtypeForm = (props: Props) => {

    const [subtype, setSubtype] = useState<string>('');

    const getSubtype = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.includes(' ')) {
            window.alert('Nie można stosować spacji, typ musi być jednym ciągiem znaków');
            return;
        }
        setSubtype(e.target.value)
    }

    const cleaner = () => {
        setSubtype('');
    }

    const validation = subtype.length > 2 ? false : true;

    return (
        <div className='Type-add__subtype'>
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