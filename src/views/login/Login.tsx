import React, { useState, ChangeEvent } from 'react';
import Button from '../../components/general/button/Button';
import { buttonClass } from '../../../types/styleTypes';

interface ForLogin {
    login: string;
    password: string;
}

const Login = () => {

    const [loginData, setLoginData] = useState<ForLogin>({
        login: '',
        password: ''
    });

    const loginFunc = (): void => {
        console.log("loguje: ", loginData)
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
                <Button title='Zaloguj' addClass={buttonClass.SMALL} func={loginFunc} />
            </form>
        </div>
    )
}

export default Login;