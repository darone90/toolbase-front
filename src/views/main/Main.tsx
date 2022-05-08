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
import { listGetter } from '../../global/functions';
import { dataGetter } from '../../global/workersHandle';

const Main = () => {

    const [loading, setLoading] = useState<boolean>(true);

    const dispatch = useDispatch();

    const downloadToolsNamesList = async () => {
        const data = await listGetter('/category');
        if (data) { dispatch(loadAll(data)) }
    };

    const downloadWorkersNamesList = async () => {
        const data = await dataGetter('/workers') as User[];
        if (data) { dispatch(userLoad(data)) }
    }

    useEffect(() => {
        (async () => {
            await downloadToolsNamesList();
            await downloadWorkersNamesList();
            setLoading(false);
        })();
    });

    if (loading) return <Spinner />

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
