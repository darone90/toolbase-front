import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appLogin } from '../../../features/login-slice';
import { setSession } from '../../../global/functions';

import './MainMenu.scss';

const MainMenu = () => {

    const dispatch = useDispatch();

    const logoutFunc = () => {
        setSession(null, false, null);
        dispatch(appLogin({ loginStatus: false, token: null }));
    }

    const scrollToContent = () => {
        if (window.innerWidth < 480) {
            window.scroll({
                top: 560,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className='Menu-main'>
            <h2>MENU</h2>
            <ul>
                <li>
                    <Link to={'/'} onClick={scrollToContent}>Wykaz narzędzi</Link>
                </li>
                <li>
                    <Link to={'/addtool'} onClick={scrollToContent}>Dodaj narzędzia do bazy</Link>
                </li>
                <li>
                    <Link to={'/types'} onClick={scrollToContent}>Dodaj typy narzędzi</Link>
                </li>
                <li>
                    <Link to={'/user'} onClick={scrollToContent}>Lista osób</Link>
                </li>
                <li>
                    <Link to={'/history'} onClick={scrollToContent}>Historia użytkowania</Link>
                </li>
                <li>
                    <Link to={'/change'} onClick={scrollToContent}>Zmiana danych logowania</Link>
                </li>
                <li>
                    <Link to={'/'} onClick={logoutFunc}>Wyloguj</Link>
                </li>
            </ul>
        </div>
    );
};

export default MainMenu;
