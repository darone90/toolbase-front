import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appLogin } from '../../../features/login-slice';
import { setSession } from '../../../global/functions';

const MainMenu = () => {

    const dispatch = useDispatch();

    const logoutFunc = () => {
        setSession(null, false, null);
        dispatch(appLogin({ loginStatus: false, token: null }));
    }

    return (
        <div className='Menu-main'>
            <h2>MENU</h2>
            <ul>
                <li>
                    <Link to={'/'} >Wykaz narzędzi</Link>
                </li>
                <li>
                    <Link to={'/addtool'} >Dodaj narzędzia do bazy</Link>
                </li>
                <li>
                    <Link to={'/types'}>Dodaj typy narzędzi</Link>
                </li>
                <li>
                    <Link to={'/user'}>Lista osób</Link>
                </li>
                <li>
                    <Link to={'/history'} >Historia użytkowania</Link>
                </li>
                <li>
                    <Link to={'/change'} >Zmiana danych logowania</Link>
                </li>
                <li>
                    <Link to={'/'} onClick={logoutFunc}>Wyloguj</Link>
                </li>
            </ul>
        </div>
    );
};

export default MainMenu;
