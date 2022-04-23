import React, { useState, ChangeEvent, useEffect } from 'react';
import Spinner from '../../general/loading/spinner';
import { persons } from '../../../data/persons';
import { toolNames } from '../../../data/toolsNames';



const Searcher = () => {

    const [searchType, setSearchType] = useState<string>('type');
    const [helpList, setHelpList] = useState<string[]>([]);
    const [text, setText] = useState<string>('');

    useEffect(() => {
        if (searchType === 'type') {
            const list: string[] = [];
            toolNames.forEach(tool => list.push(tool.name));
            setHelpList(list)
        } else if (searchType === 'person') {
            setHelpList(persons)
        } else {
            setHelpList([])
        }
    }, [searchType]);


    const setSearch = (e: ChangeEvent<HTMLSelectElement>) => {
        setSearchType(e.target.value)
        setText('');
    };

    const setTextToSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const searchHelper = helpList.length > 0 ? helpList.map((el, i) => <option value={el} key={i} />) : null;


    return (
        <div className='Searcher'>
            <div className='Searcher__type'>
                <label>Wyszukaj po:
                    <select name="search-type" value={searchType} onChange={setSearch}>
                        <option value="type">Rodzaju</option>
                        <option value="person">Osobie odpowiedzialnej</option>
                        <option value="brand">Marce</option>
                    </select>
                </label>
            </div>
            <div className='Searcher__input'>
                <label>
                    wprowadź wyszukiwaną frazę:
                    <input type="text" list='selectlist' value={text} onChange={setTextToSearch} />
                    <datalist id='selectlist'>
                        {searchHelper}
                    </datalist>
                </label>
            </div>
        </div>
    );
};

export default Searcher;