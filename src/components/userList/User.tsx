import React, { MouseEvent } from 'react';
import { User as UserType } from '../../types/userTypes';

interface Props {
    user: UserType
    deleter: (e: MouseEvent<HTMLElement>) => void;
}

const User = (props: Props) => {

    const { name, id } = props.user;

    return (
        <li>
            <strong>Użytkownik: {name}</strong>
            <p>ID w bazie danych: {id}</p>
            <button id={id} onClick={props.deleter}>Usuń</button>
        </li>
    );
};

export default User;
