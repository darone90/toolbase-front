import React from 'react';
import { NavLink } from 'react-router-dom';

const MainMenu = () => {
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
                    <NavLink to='/logout'>Wyloguj</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default MainMenu;
