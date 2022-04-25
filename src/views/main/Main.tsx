import React, { useEffect, useState } from 'react';
import MainMenu from './menu/MainMenu';
import Header from './header/Header';
import Content from './content/Content';
import Footer from './footer/Footer';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadAll } from '../../features/toolTypes-slice';
import { ToolsNames } from '../../types/toolsTypes';
import Spinner from '../../components/general/loading/spinner';
import { toolNames } from '../../data/toolsNames';


const Main = () => {

    const [listType, setListType] = useState<ToolsNames[] | null>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('strzał do api aby pobrać listę typów narzędzi');
        setListType(toolNames)
    }, []);

    if (!listType) return <Spinner />
    dispatch(loadAll(listType));

    return (
        <div className='Main-window'>
            <BrowserRouter>
            <Header />
            <MainMenu />
            <Content />
            <Footer />
            </BrowserRouter>
        </div>
    )
};

export default Main;
