import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { userLogin } from '../Redux/Actions/LoginAction'
import {
    GetRequestToken, CreateSession, DeleteSession,
    ValidateWithLogin, GetAccountDetails, GetGuestSession
} from '../Services';
import { InputComponent, FormComponent } from '../components'
import { showSuccessMessage, showErrorMessage} from '../Helper'

export const LoginPage = ({ }) => {
    const { logIn } = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [accountDetails, setAccountDetails] = useState(null)
    const [sessionId, setSessionId] = useState(null)
    const [sessionCreateDate, setSessionCreateDate] = useState(null)
    const [isGuestSession, setIsGuestSession] = useState(false)


    const getRequestToken = async () => {
        const response = await GetRequestToken();

        if (!(response && response.status && response.status !== 200)) {
            if (isGuestSession) loginAsGuest(response.request_token)
            else loginAsUser(response.request_token);

            setSessionCreateDate(response.expires_at)
        }
    }


    const loginAsGuest = async (requestToken) => {
        const  body = {
                username: 'furatFofo',
                password: '123',
                request_token: requestToken,
            }

        const response = await ValidateWithLogin(body);
        if (!(response && response.status && response.status !== 200)) {
            createSession(requestToken);
        }
    }

    const loginAsUser = async (requestToken) => {
        const body = {
                username: username,
                password: password,
                request_token: requestToken,
            }

        const response = await ValidateWithLogin(body);
        if (!(response && response.status && response.status !== 200)) {
            createSession(requestToken);
        }
    }

    const createSession = async (requestToken) => {
        const body = {
            request_token: requestToken,
        }
        const response = await CreateSession(body);

        if (!(response && response.status && response.status !== 200)) {
            setSessionId(response.session_id);
            getAccountDetails(response.session_id)
            showSuccessMessage('Logged In Successfully')
        }else {
            showErrorMessage('Logged In Successfully')
        }

    }


    const getAccountDetails = async (sessionId) => {
        const response = await GetAccountDetails(sessionId);
        if (!(response && response.status && response.status !== 200)) {
            setAccountDetails(response);
        }
    }

    const localStorageHandler = (isLoggedIn, sessionId, accountDetails) => {
        if (isLoggedIn) {
            const item = {
                session_id: sessionId,
                userAccount: accountDetails,
                created_at: sessionCreateDate
            }
            localStorage.setItem('app_session', JSON.stringify(item))
        } else {
            localStorage.removeItem('app_session')
        }
    }

    const loginHandler = (event) => {
        event.preventDefault();

        if (password && username) {
            getRequestToken();
        }
    }

    useEffect(() => {
        if (isGuestSession) {
            getRequestToken()
        }
    }, [isGuestSession])

    useEffect(() => {

        if (accountDetails) {
            const isLoggedIn = true;

            dispatch(
                userLogin({
                    userAccount: accountDetails,
                    sessionId: sessionId,
                }))
            localStorageHandler(isLoggedIn, sessionId, accountDetails)
            navigate('/profile')
        }
    }, [accountDetails])


    return (
        <div className='login-view-wrapper'>
            <div className='login-top-part'>
                <h4>Login to your account</h4>
                <p>In order to use the editing and rating capabilities, you will
                need to login to your account.</p>
                <p>If you do not have an account,&nbsp;&nbsp;
                <a target="_blank" href='https://www.themoviedb.org/signup' title='Move To TMDB Website'>Click here</a> to
                    get started. </p>
            </div>
            <FormComponent
                classes='form-component-wrapper'
                submitButtonText='Login'
                submitButtonClasses='basic-button'
                onSubmitHandler={loginHandler}
                secondaryButtonText='Login As Guest'
                secondaryButtonClasses='outlined-button'
                onSecondaryBtnHandler={() => {
                    setIsGuestSession(true)
                }}
            >
                <InputComponent
                    inputType='text'
                    labelText='Username'
                    classes='basic-input'
                    inputValue={username}
                    onChangeHandler={(event) => {
                        const { value } = event.target;
                        setUsername(value);
                    }}
                />
                <InputComponent
                    inputType='password'
                    labelText='Password'
                    classes='basic-input'
                    inputValue={password}
                    onChangeHandler={(event) => {
                        const { value } = event.target;
                        setPassword(value);
                    }}
                />
            </FormComponent>
        </div>
    )
}
