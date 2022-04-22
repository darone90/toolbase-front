import React from 'react';
import { Routes, Route } from 'react-router-dom';
import List from './list/List';
import History from './history/History';
import AddType from './addType/AddType';

const Content = () => {
    return (
        <div className='content'>
            <Routes>
                <Route path='/' element={<List />} />
                <Route path='/types' element={<AddType />} />
                <Route path='/history' element={<History />} />
            </Routes>
        </div>
    );
};

export default Content;
