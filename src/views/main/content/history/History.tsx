import React, { useState } from 'react';
import ByUser from './ByUser';
import ByTool from './ByTool';
import Button from '../../../../components/general/button/Button';
import { buttonClass } from '../../../../../types/styleTypes';

const History = () => {

    const [searchBy, setSearchBy] = useState<boolean>(false);

    const setView = () => {
        setSearchBy(prev => !prev);
    };

    const view = searchBy ? <ByTool /> : <ByUser />;
    const btnTitle = searchBy ? 'Wyszukaj po użytkowniku' : 'Wyszukaj po narzędziu';


    return (
        <div>
            <h2>Przeszukiwanie historii użytkowania</h2>
            {view}
            <Button title={btnTitle} addClass={buttonClass.SMALL} func={setView} />
        </div>
    );
};

export default History;
