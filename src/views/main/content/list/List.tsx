import React, { useEffect, useState, ChangeEvent } from 'react';
import { Tool as ToolType, incomingTool } from '../../../../types/toolsTypes';
import Spinner from '../../../../components/general/loading/spinner';
import Tool from '../../../../components/list/tool/Tool';
import Searcher from '../../../../components/list/searcher/Searcher';
import { filtering } from '../../../../global/functions';
import { dataGetter } from '../../../../global/workersHandle';


const List = () => {

    const [list, setList] = useState<ToolType[] | null>(null);
    const [searchType, setSearchType] = useState<string>('type');
    const [text, setText] = useState<string>('');



    useEffect(() => {
        const dataGET = async () => {
            const data = await dataGetter('/tools');
            const toSet: ToolType[] = data.map((tool: incomingTool) => {
                return ({
                    id: tool.id,
                    sign: tool.sign,
                    person: tool.name,
                    status: tool.status,
                    place: tool.place,
                    info: {
                        type: tool.type,
                        subtype: tool.subtype,
                        brand: tool.brand,
                        serial: tool.serial
                    }
                })
            })
            setList(toSet);
        }
        dataGET();
    }, []);


    const setSearching = (e: ChangeEvent<HTMLSelectElement>) => {
        setSearchType(e.target.value);
        setText('')
    };


    const setSearchingText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    };


    if (!list) return <Spinner />;

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
