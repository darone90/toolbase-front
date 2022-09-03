import React, { useEffect, useState } from 'react';
import Clock from 'react-clock';

import './Header.scss';
import logo from './techglass_logo.png';
import 'react-clock/dist/Clock.css';

const Header = () => {

    const [clock, setClock] = useState<Date>(new Date());
    const [clockSize, setClockSize] = useState<number>(120);

    const changeClockSize = () => {
        const width = window.innerWidth;
        if (width < 480) {
            setClockSize(60);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => setClock(new Date()), 1000);
        changeClockSize();

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
                <Clock size={clockSize} value={clock} />
            </div>
        </div>
    );
};

export default Header;
