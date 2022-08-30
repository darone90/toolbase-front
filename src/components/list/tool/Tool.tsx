import React, { MouseEvent } from 'react';
import { Tool as ToolType } from '../../../types/toolsTypes';
import Information from './Information';
import Button from '../../general/button/Button';
import { buttonClass } from '../../../types/styleTypes';

import './Tool.scss';


interface Props {
    tool: ToolType
}

const Tool = (props: Props) => {

    const showOneTool = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
    }

    return (
        <div className='Tool'>
            <Information tool={props.tool} />
            <Button pref={'/list/change/'} link={true}
                ident={props.tool.id} title='Aktualizuj informacje'
                addClass={buttonClass.IMPORTANT}
                func={showOneTool} />
        </div>

    );
};

export default Tool;
