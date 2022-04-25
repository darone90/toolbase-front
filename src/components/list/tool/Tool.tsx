import React, { MouseEvent } from 'react';
import { Tool as ToolType } from '../../../types/toolsTypes';
import Information from './Information';
import Button from '../../general/button/Button';
import { buttonClass } from '../../../types/styleTypes';

interface Props {
    tool: ToolType
}

const Tool = (props: Props) => {

    const showOneTool = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
    }

    const editOneTool = (e: MouseEvent<HTMLElement>) => {
        console.log('edycja pojedyńczego narzędzia')
    }

    return (
        <div className='Tool'>
            <img src="" alt="Chwilowy brak zdjęcia" />
            <Information tool={props.tool} />
            <Button pref={'/list/change/'} link={true}
                ident={props.tool.id} title='Wprowadź zmiany'
                addClass={buttonClass.IMPORTANT}
                func={showOneTool} />

            <Button pref={'/list/edit/'}
                link={true}
                ident={props.tool.id}
                title='Edytuj narzędzie'
                addClass={buttonClass.SMALL}
                func={editOneTool} />
        </div>

    );
};

export default Tool;
