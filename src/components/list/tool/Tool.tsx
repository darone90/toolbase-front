import React from 'react';
import { Tool as ToolType } from '../../../types/toolsTypes';
import Information from './Information';
import Button from '../../general/button/Button';
import { buttonClass } from '../../../types/styleTypes';

interface Props {
    tool: ToolType
}

const Tool = (props: Props) => {

    const showOneTool = () => {
        console.log('pokaż jedno narzędzie')
    }

    const editOneTool = () => {
        console.log('edycja pojedyńczego narzędzia')
    }

    return (
        <div className='Tool'>
            <img src="" alt="Chwilowy brak zdjęcia" />
            <Information tool={props.tool} />
            <Button title='Wprowadź zmiany' addClass={buttonClass.IMPORTANT} func={showOneTool} />
            <Button title='Edytuj narzędzie' addClass={buttonClass.SMALL} func={editOneTool} />
        </div>

    );
};

export default Tool;
