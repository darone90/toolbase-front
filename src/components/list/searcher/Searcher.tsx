import React, { useState } from 'react';
import Spinner from '../../general/loading/spinner';
import { persons } from '../../../data/persons';
import { toolNames } from '../../../data/toolsNames';



const Searcher = () => {

    const [searchType, setSearchType] = useState<string>('');


    return (
        <div className='Searcher'>
            <div className='Searcher__type'>
                <label>Wyszukaj po:
                    <select name="search-type">
                        <option value="type">Rodzaju</option>
                        <option value="person">Osobie odpowiedzialnej</option>
                        <option value="brand">Marce</option>
                    </select>
                </label>
            </div>
            <div className='Searcher__input'>
                <label>
                    wprowadź wyszukiwaną frazę:
                    <input type="text" list='selectlist' />
                    <datalist id='selectlist'>

                    </datalist>
                </label>
            </div>
        </div>
    );
};

export default Searcher;