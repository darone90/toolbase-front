import React, { MouseEvent } from 'react';
import { buttonClass } from '../../../types/styleTypes'


interface Props {
    title: string;
    addClass: buttonClass;
    func: (event: MouseEvent<HTMLElement>) => void;
}

const Button = (props: Props) => {
    return (
        <button className={props.addClass} onClick={props.func}>{props.title}</button>
    )
}

export default Button;