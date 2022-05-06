import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/general/button/Button';
import { buttonClass } from '../../types/styleTypes';
import { appLogin } from '../../features/login-slice';
import { communicate } from '../../global/functions';
import { Login as LoginData } from '../../types/loginTypes';
import Spinner from '../../components/general/loading/spinner';

interface ForLogin {
    login: string;
    password: string;
};

const Login = () => {

    const [infoVisible, setInfoVisible] = useState<boolean>(false);
    const [spinnerVisible, setSpinnerVisible] = useState<boolean>(false);
    const [loginData, setLoginData] = useState<ForLogin>({
        login: '',
        password: ''
    });

    const dispatch = useDispatch();

    const loginFunc = async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        try {
            setInfoVisible(false);
            setSpinnerVisible(true);
            const data = await communicate('/login', loginData) as LoginData;
            dispatch(appLogin({ loginStatus: data.login, token: data.token }));
            setInfoVisible(true);
            setSpinnerVisible(false);
        } catch (error: unknown) {
            if (error instanceof Error)
                return //dopisać bez przekierowania bład
            //send info about error to error log
        }
    };

    const addLoginData = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const loginInfoBox = <div><strong>Niepoprawny login lub hasło</strong></div>;

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
            {spinnerVisible ? <Spinner /> : null}
            {infoVisible ? loginInfoBox : null}
        </div>
    )
}

export default Login;