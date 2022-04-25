import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/general/button/Button';
import { buttonClass } from '../../types/styleTypes';
import { appLogin } from '../../features/login-slice';

interface ForLogin {
    login: string;
    password: string;
};


const Login = () => {

    const [loginData, setLoginData] = useState<ForLogin>({
        login: '',
        password: ''
    });

    const dispatch = useDispatch();

    const loginFunc = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        dispatch(appLogin(true));

    };

    const addLoginData = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <div className='login'>
            <form>
                <label>
                    Login:
                    <input type="text" value={loginData.login} name='login' onChange={addLoginData} />
                </label>
                <label>
                    Hasło:
                    <input type="password" value={loginData.password} name='password' onChange={addLoginData} />
                </label>
                <Button link={false} title='Zaloguj' addClass={buttonClass.SMALL} func={loginFunc} />
            </form>
        </div>
    )
}

export default Login;