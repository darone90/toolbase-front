import React, { useEffect, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { User as UserType } from '../../../../types/userTypes';
import User from '../../../../components/userList/User';
import UserAdd from '../../../../components/userList/UserAdd';
import { dataPoster } from '../../../../global/workersHandle';
import InfoBox from '../../../../components/general/informationBox/InfoBox';
import { addOne, deleteOne } from '../../../../features/user-slice';

const UsersList = () => {

    const dispatch = useDispatch();

    const [usersList, setUsersList] = useState<UserType[]>([]);
    const [infoVisible, setInfoVisible] = useState<boolean>(false);
    const [id, setId] = useState<string>('');
    const [action, setAction] = useState<string>('');

    const { users } = useSelector((store: RootState) => store.users);

    useEffect(() => {
        setUsersList(users)
    }, [users]);

    const deleter = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const id = (e.target as Element).id;
        const ID = await dataPoster({ id }, "DELETE", 'workers') as string
        if (ID) {
            setInfoVisible(true);
            setId(ID);
            setAction('d');
            dispatch(deleteOne(ID));
        }
    };

    const submiter = async (e: MouseEvent<HTMLElement>, user: string) => {
        e.preventDefault();
        const id = await dataPoster({ name: user }, 'POST', 'workers') as string
        if (id) {
            setInfoVisible(true);
            setId(id);
            setAction('a');
            dispatch(addOne({ name: user, id }))
        }
    };

    const showList = usersList.map(user => <User user={user} deleter={deleter} key={user.id} />)


    return (
        <>
            <div className='Users-list' onClick={() => { setInfoVisible(false) }}>
                <h2>Lista osób korzystających z urządzeń:</h2>
                {usersList.length > 0 ? <ul>{showList}</ul> : <p>Brak użytkowników w bazie</p>}
            </div>
            <div className='User-add'>
                <UserAdd func={submiter} />
            </div>
            <InfoBox name='Pracownik' idn={id} visible={infoVisible} action={action} />
        </>
    );
};

export default UsersList;
