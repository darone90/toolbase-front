import React, { useEffect, useState, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { User as UserType } from '../../../../types/userTypes';
import User from '../../../../components/userList/User';
import UserAdd from '../../../../components/userList/UserAdd';

const UsersList = () => {

    const [usersList, setUsersList] = useState<UserType[]>([]);

    const { users } = useSelector((store: RootState) => store.users);

    useEffect(() => {
        setUsersList(users)
    }, [users]);

    const deleter = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const id = (e.target as Element).id;
        console.log('usuwam użytkownika o id:', id)
    };

    const submiter = (e: MouseEvent<HTMLElement>, user: string) => {
        e.preventDefault();
        console.log('zapisujemy w bazie użytkownika: ', user)
    };

    const showList = usersList.map(user => <User user={user} deleter={deleter} key={user.id} />)


    return (
        <>
            <div className='Users-list'>
                <h2>Lista osób korzystających z urządzeń:</h2>
                {usersList.length > 0 ? <ul>{showList}</ul> : <p>Brak użytkowników w bazie</p>}
            </div>
            <div className='User-add'>
                <UserAdd func={submiter} />
            </div>
        </>
    );
};

export default UsersList;
