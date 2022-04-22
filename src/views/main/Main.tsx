import React from 'react';
import MainMenu from './menu/MainMenu';
import Header from './header/Header';
import Content from './content/Content';
import Footer from './footer/Footer';


const Main = () => {
    return (
        <div className='Main-window'>
            <Header />
            <MainMenu />
            <Content />
            <Footer />
        </div>
    )
};

export default Main;
