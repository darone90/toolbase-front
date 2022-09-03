import React, { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Password from '../../../../components/loginChnage/Password';
import Login from '../../../../components/loginChnage/Login';
import { getSession } from '../../../../global/functions';
import { dataPoster } from '../../../../global/workersHandle';
import Spinner from '../../../../components/general/loading/spinner';

import './ChangeLogin.scss';

const ChangeLogin = () => {

    const navigate = useNavigate();

    const [information, setInformation] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    if (loading) <Spinner />;

    const passwordChangeHandler = async (e: MouseEvent<HTMLElement>, password: string, newPassword: string, confirm: string) => {
        e.preventDefault();
        setLoading(true)
        try {
            const data = getSession();
            const toSend = {
                password,
                newPassword,
                confirm,
                user: data.user
            }
            const response = await dataPoster(toSend, 'PATCH', 'login/password')
            setLoading(false)
            if (response === 'false') {
                setInformation('wprowadzono niepoprawne dane')
            } else {
                setInformation('Dane zapisane poprawnie!')
            }
        } catch (err) {
            if (err instanceof Error)
                navigate(`/error/${err.message}`)
        }
    }

    const loginChangeHandler = async (e: MouseEvent<HTMLElement>, password: string, newLogin: string) => {
        e.preventDefault();
        setLoading(true)
        try {
            const data = getSession();
            const toSend = {
                password,
                newLogin,
                user: data.user
            }
            const response = await dataPoster(toSend, 'PATCH', 'login/login')
            setLoading(false);

            if (response === 'false') {
                setInformation('wprowadzono niepoprawne dane')
            } else {
                setInformation('Dane zapisane poprawnie!')
            }
        } catch (err) {
            if (err instanceof Error)
                navigate(`/error/${err.message}`)
        }
    }

    return (
        <div className='Login-change' onClick={() => { setInformation('') }}>
            <h2>Zmiana danych logowania:</h2>
            <div className='Login-change__password'>
                <h3>Zmień hasło</h3>
                <Password func={passwordChangeHandler} />

            </div>
            <div className='Login-change__login'>
                <h3>Zmień login</h3>
                <Login func={loginChangeHandler} />
            </div>
            <div>{information}</div>
        </div>
    );
};

export default ChangeLogin;