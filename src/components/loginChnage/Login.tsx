import React, { ChangeEvent, useState, MouseEvent } from 'react';

import './Login.scss';

interface Props {
    func: (e: MouseEvent<HTMLElement>, password: string, newLogin: string) => void;
}

const Login = (props: Props) => {

    const [old, setOld] = useState('');
    const [newLog, setNewLog] = useState('');



    return (
        <form className='Login-change'>
            <label>
                Podaj nowy login:
                <input type="text" value={newLog} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewLog(e.target.value)} />
            </label>
            <label>
                Podaj stare hasło:
                <input type="password" value={old} onChange={(e: ChangeEvent<HTMLInputElement>) => setOld(e.target.value)} />
            </label>

            <button onClick={(e: MouseEvent<HTMLElement>) => { props.func(e, old, newLog); setOld(''); setNewLog('') }}>Zapisz zmiany</button>
        </form>
    );
};

export default Login;
