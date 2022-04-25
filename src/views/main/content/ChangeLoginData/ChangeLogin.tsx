import React, { MouseEvent } from 'react';
import Password from '../../../../components/loginChnage/Password';
import Login from '../../../../components/loginChnage/Login';

const ChangeLogin = () => {

    const passwordChangeHandler = (e: MouseEvent<HTMLElement>, password: string, newPassword: string, confirm: string) => {
        e.preventDefault();
        console.log('wysyłamy do zmiany', password, newPassword, confirm);
    }

    const loginChangeHandler = (e: MouseEvent<HTMLElement>, password: string, newLogin: string) => {
        e.preventDefault();
        console.log('wysyłamy do zmiany', password, newLogin);
    }


    return (
        <div className='Login-change'>
            <h2>Zmiana danych logowania:</h2>
            <div className='Login-change__password'>
                <h3>Zmień hasło</h3>
                <Password func={passwordChangeHandler} />
            </div>
            <div className='Ligin-change__login'>
                <h3>Zmień login</h3>
                <Login func={loginChangeHandler} />
            </div>
        </div>
    );
};

export default ChangeLogin;