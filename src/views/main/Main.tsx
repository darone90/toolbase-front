import React, { useEffect, useState } from 'react';
import MainMenu from './menu/MainMenu';
import Header from './header/Header';
import Content from './content/Content';
import Footer from './footer/Footer';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadAll } from '../../features/toolTypes-slice';
import { loadAll as userLoad } from '../../features/user-slice';
import { ToolsNames } from '../../types/toolsTypes';
import Spinner from '../../components/general/loading/spinner';
import { toolNames } from '../../data/toolsNames';
import { User } from '../../types/userTypes';
import { persons } from '../../data/persons';


const Main = () => {

    const [listType, setListType] = useState<ToolsNames[] | null>(null);
    const [users, setUsers] = useState<User[] | null>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('strzał do api aby pobrać listę typów narzędzi');
        setListType(toolNames)
        setUsers(persons)
    }, []);

    if (!listType || !users) return <Spinner />

    dispatch(loadAll(listType));
    dispatch(userLoad(users));

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
