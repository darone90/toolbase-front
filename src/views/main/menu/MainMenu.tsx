import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appLogout } from '../../../features/login-slice';

const MainMenu = () => {

    const dispatch = useDispatch();

    const logoutFunc = () => {
        dispatch(appLogout);
    }

    return (
        <div className='Menu-main'>
            <h2>MENU</h2>
            <ul>
                <li>
                    <NavLink to='/'>Wykaz narzędzi</NavLink>
                </li>
                <li>
                    <NavLink to='/types'>Dodaj typy narzędzi</NavLink>
                </li>
                <li>
                    <NavLink to='/history'>Historia użytkowania</NavLink>
                </li>
                <li>
                    <NavLink to='/' onClick={logoutFunc}>Wyloguj</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default MainMenu;
