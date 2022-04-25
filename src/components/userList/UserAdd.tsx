import React, { ChangeEvent, useState, MouseEvent } from 'react';

interface Props {
    func: (e: MouseEvent<HTMLElement>, user: string) => void
}

const UserAdd = (props: Props) => {

    const [newUser, setNewUser] = useState('');

    const getNewUser = (e: ChangeEvent<HTMLInputElement>) => {
        setNewUser(e.target.value)
    };

    const cleaner = () => {
        setNewUser('');
    }

    return (
        <>
            <label>
                Dodaj użytkownika do bazy:
                <input type="text" value={newUser} onChange={getNewUser} />
            </label>
            <button onClick={(e: MouseEvent<HTMLElement>) => {
                props.func(e, newUser);
                cleaner();
            }}>Dodaj</button>
        </>
    );
};

export default UserAdd;

