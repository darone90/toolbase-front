import React, { useEffect, useState } from 'react';
import { Tool as ToolType } from '../../../../types/toolsTypes';
import Spinner from '../../../../components/general/loading/spinner';
import { toolsList } from '../../../../data/tools';
import Tool from '../../../../components/list/tool/Tool';
import Searcher from '../../../../components/list/searcher/Searcher';

const List = () => {

    const [list, setList] = useState<ToolType[]>([]);

    useEffect(() => {
        console.log('strzał do api aby ustawić listę');
        //potem to musi być async i osbna funkcja z poza komponentu
        setList(toolsList);
    }, []);

    if (list === []) return <Spinner />;


    const showList = list.map(tool => <Tool tool={tool} key={tool.id} />) 

    return (
        <div className='List'>
            <div className='List__search'>
                <Searcher />

            </div>
            <div className='List__show'>
                {showList}
            </div>
        </div>
    );
};

export default List;
