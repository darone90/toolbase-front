import React, { useEffect, useState, ChangeEvent } from 'react';
import { Tool as ToolType } from '../../../../types/toolsTypes';
import Spinner from '../../../../components/general/loading/spinner';
import { toolsList } from '../../../../data/tools';
import Tool from '../../../../components/list/tool/Tool';
import Searcher from '../../../../components/list/searcher/Searcher';
import { filtering } from '../../../../global/functions';


const List = () => {


    const [list, setList] = useState<ToolType[]>([]);
    const [searchType, setSearchType] = useState<string>('type');
    const [text, setText] = useState<string>('');


    useEffect(() => {
        console.log('strzał do api aby ustawić listę');
        //potem to musi być async i osbna funkcja z poza komponentu
        setList(toolsList);
    }, []);


    const setSearching = (e: ChangeEvent<HTMLSelectElement>) => {
        setSearchType(e.target.value);
        setText('')
    };


    const setSearchingText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    };


    if (list === []) return <Spinner />;

    const filtredList = filtering(list, searchType, text);
    const showList = filtredList ? filtredList.map(tool => <Tool tool={tool} key={tool.id} />) : null;



    return (
        <div className='List'>
            <div className='List__search'>
                <Searcher setSearching={setSearching} setText={setSearchingText} searchType={searchType} text={text} />
            </div>
            <div className='List__show'>
                {showList}
            </div>
        </div>
    );
};

export default List;
