import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    const downloadToolsNamesList = async () => {
        try {
            const data = await listGetter('/category');
            if (data) { dispatch(loadAll(data)) }
        } catch (err) {
            if (err instanceof Error)
                navigate(`/error/${err.message}`)
        }
    };

    const downloadWorkersNamesList = async () => {
        try {
            const data = await dataGetter('/workers') as User[];
            if (data) { dispatch(userLoad(data)) }
        } catch (err) {
            if (err instanceof Error)
                navigate(`/error/${err.message}`)
        }  
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
