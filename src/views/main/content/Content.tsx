import React from 'react';
import { Routes, Route } from 'react-router-dom';
import List from './list/List';
import History from './history/History';
import AddType from './addType/AddType';
import AddTool from './addTool/addTool';
import UsersList from './Users/UsersList';
import ChangeLogin from './ChangeLoginData/ChangeLogin';
import ToolLocalEdit from '../../tool/ToolLocalEdit';
import ToolTechnicalEdit from '../../tool/ToolTechnicEdit';
import Error from './ErrorPage/Error';

const Content = () => {
    return (
        <div className='content'>
            <Routes>
                <Route path='/' element={<List />} />
                <Route path='/addtool' element={<AddTool />} />
                <Route path='/types' element={<AddType />} />
                <Route path='/user' element={<UsersList />} />
                <Route path='/history' element={<History />} />
                <Route path='/change' element={<ChangeLogin />} />
                <Route path='/list/change/:id' element={<ToolLocalEdit />} />
                <Route path='/list/edit/:id' element={<ToolTechnicalEdit />} />
                <Route path='/*' element={<Error />} />
            </Routes>
        </div>
    );
};

export default Content;
