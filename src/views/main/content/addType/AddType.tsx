import React, { useState, MouseEvent, ChangeEvent } from 'react';
import { buttonClass } from '../../../../types/styleTypes';
import Button from '../../../../components/general/button/Button';
import Select from '../../../../components/general/select/Select';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import AddTypeForm from '../../../../components/addtype/AddTypeForm';
import EditExistedForm from '../../../../components/addtype/EditExistedForm';

import './AddType.scss';

const AddType = () => {

    const [newTypeView, setNewTypeView] = useState<boolean>(false);
    const [selectedType, setSelectedType] = useState<string>('');

    const { list } = useSelector((store: RootState) => store.types)

    const newTypeViewHandler = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setNewTypeView(true);
        setSelectedType('');
    }

    const getSelected = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setSelectedType(e.target.value);
        setNewTypeView(false);
    }

    const options = list.map(tool => tool.name)

    return (
        <div className='Add-type'>
            <div className='Add-type__new'> 
                Dodaj nowy rodzaj urządzenia:
                <Button link={false} title='Dodaj nowy rodzaj'
                    addClass={buttonClass.SMALL}
                    func={newTypeViewHandler} />
            </div>
            <div className='Add-type__existing'>
                <Select title='Lub wybierz już istniejący aby dodać kolejny typ:'
                    name='types'
                    options={options}
                    value={selectedType}
                    getValue={getSelected} />
            </div>
            <div className='Add-type__edit'>
                {newTypeView ? <AddTypeForm /> : null}
                {!newTypeView && selectedType !== '' ? <EditExistedForm selected={selectedType} /> : null}

            </div>
        </div>
    );
};

export default AddType;
