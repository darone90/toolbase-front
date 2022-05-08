import React, { useEffect, useState } from 'react';
import MainMenu from './menu/MainMenu';
import Header from './header/Header';
import Content from './content/Content';
import Footer from './footer/Footer';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadAll } from '../../features/toolTypes-slice';
import { loadAll as userLoad } from '../../features/user-slice';
import Spinner from '../../components/general/loading/spinner';
import { User } from '../../types/userTypes';
import { persons } from '../../data/persons';
import { listGetter } from '../../global/functions';


const Main = () => {

    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const downloadToolsNamesList = async () => {
            const data = await listGetter('/category');
            if (data) { dispatch(loadAll(data)); setLoading(false) }
        };
        downloadToolsNamesList();
        console.log('strzał do api aby pobrać listę pracowników');
        setUsers(persons)
    }, [dispatch]);

    if (loading || !users) return <Spinner />

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
