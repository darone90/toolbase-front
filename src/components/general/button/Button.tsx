import React, { MouseEvent } from 'react';
import { buttonClass } from '../../../types/styleTypes';
import { Link } from 'react-router-dom';


interface Props {
    ident?: string;
    pref?: string;
    link: boolean;
    title: string;
    addClass: buttonClass;
    func?: (event: MouseEvent<HTMLElement>) => void;
}

const Button = (props: Props) => {

    const inside = !props.link ? props.title : <Link to={String(props.pref) + props.ident} >{props.title}</Link>

    return (
        <button className={props.addClass} onClick={props.func}>{inside}</button>
    )
}

export default Button;
