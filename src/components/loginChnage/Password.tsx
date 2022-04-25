import React, { ChangeEvent, useState, MouseEvent } from 'react';

interface Props {
    func: (e: MouseEvent<HTMLElement>, password: string, newPassword: string, confirm: string) => void;
}

const Password = (props: Props) => {

    const [old, setOld] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmNew, setConfirmNew] = useState('');


    return (
        <form>
            <label>
                Podaj stare hasło:
                <input type="password" value={old} onChange={(e: ChangeEvent<HTMLInputElement>) => setOld(e.target.value)} />
            </label>
            <label>
                Podaj nowe hasło:
                <input type="password" value={newPass} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPass(e.target.value)} />
            </label>
            <label>
                Powtórz nowe hasło:
                <input type="password" value={confirmNew} onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmNew(e.target.value)} />
            </label>
            <button onClick={(e: MouseEvent<HTMLElement>) => { props.func(e, old, newPass, confirmNew) }} >Zapisz zmiany</button>
        </form>
    );
};

export default Password;
