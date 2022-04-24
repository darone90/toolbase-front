import React, { useState, ChangeEvent, useEffect } from 'react';
import { persons } from '../../../data/persons';
import { toolNames } from '../../../data/toolsNames';

interface Props {
    searchType: string;
    text: string;
    setSearching: (e: ChangeEvent<HTMLSelectElement>) => void;
    setText: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Searcher = (props: Props) => {


    const [helpList, setHelpList] = useState<string[]>([]);


    useEffect(() => {
        if (props.searchType === 'type') {
            const list: string[] = [];
            toolNames.forEach(tool => list.push(tool.name));
            setHelpList(list)
        } else if (props.searchType === 'person') {
            setHelpList(persons)
        } else {
            setHelpList([])
        }
    }, [props.searchType]);


    const searchHelper = helpList.length > 0 ? helpList.map((el, i) => <option value={el} key={i} />) : null;


    return (
        <div className='Searcher'>
            <div className='Searcher__type'>
                <label>Wyszukaj po:
                    <select name="search-type" value={props.searchType} onChange={props.setSearching}>
                        <option value="type">Rodzaju</option>
                        <option value="person">Osobie odpowiedzialnej</option>
                        <option value="brand">Marce</option>
                    </select>
                </label>
            </div>
            <div className='Searcher__input'>
                <label>
                    wprowadź wyszukiwaną frazę:
                    <input type="text" list='selectlist' value={props.text} onChange={props.setText} />
                    <datalist id='selectlist'>
                        {searchHelper}
                    </datalist>
                </label>
            </div>
        </div>
    );
};

export default Searcher;