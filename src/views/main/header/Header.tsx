import React, { useEffect, useState } from 'react';
import Clock from 'react-clock';

import './Header.scss';
import logo from './techglass_logo.png';
import 'react-clock/dist/Clock.css';

const Header = () => {

    const [clock, setClock] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => setClock(new Date()), 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);


    return (
        <div className='Header'>
            <div className="Header__img">
                <img src={logo} alt="chwilowo brak obrazka" />
            </div>
            <h1>Baza danych: Narzędzia</h1>
            <div className='Header__clock'>
                <Clock size={120} value={clock} />
            </div>
        </div>
    );
};

export default Header;
