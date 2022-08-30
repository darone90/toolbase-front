import React, { useState, ChangeEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

import './Searcher.scss';

interface Props {
    searchType: string;
    text: string;
    setSearching: (e: ChangeEvent<HTMLSelectElement>) => void;
    setText: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Searcher = (props: Props) => {


    const [helpList, setHelpList] = useState<string[]>([]);

    const { users } = useSelector((store: RootState) => store.users);
    const { list } = useSelector((store: RootState) => store.types)


    useEffect(() => {
        if (props.searchType === 'type') {
            const typelist: string[] = [];
            list.forEach(tool => typelist.push(tool.name));
            setHelpList(typelist)
        } else if (props.searchType === 'person') {
            const userList: string[] = [];
            users.forEach(user => userList.push(user.name))
            setHelpList(userList)
        } else {
            setHelpList([])
        }
    }, [props.searchType, list, users]);


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