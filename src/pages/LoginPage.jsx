import React, { useState, useEffect } from 'react';
import { GetRequestToken, CreateSession, ValidateWithLogin } from '../Services';

export const LoginPage = ({ }) => {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [requestTokenInfo, setRequestTokenInfo] = useState(null)
    const [isValidated, setIsValidated] = useState(null)


    const getRequestToken = async () => {

        const response = await GetRequestToken();

        if (!(response && response.status && response.status !== 200)) {
            setRequestTokenInfo({
                request_token: response.request_token,
                expires_at: response.expires_at
            })
        }

    }

    const validateWithLogin = async () => {

        if(requestTokenInfo){
            const body = {
                username: username,
                password: password,
                request_token: requestTokenInfo.request_token,
            }
            const response = await ValidateWithLogin(body);

            if (!(response && response.status && response.status !== 200)) {
                setIsValidated(true);
            } else{
                setIsValidated(false);
            }
        }
    }
    const createSession = async () => {

        if(requestTokenInfo, isValidated){
            const body = {
                request_token: requestTokenInfo.request_token,
            }
            const response = await CreateSession(body);

            if (!(response && response.status && response.status !== 200)) {
                localStorageHandler(response.session_id)
            }
        }
    }
    
    const loginFormHandler = (event)=>{
        event.preventDefault();

        if(password&&username){
            getRequestToken();
        }
    }

    const localStorageHandler = (sessionId) =>{
        const item = {
            session_id: sessionId,
            expires_at: requestTokenInfo.expires_at,
            request_token: requestTokenInfo.request_token
        }
        localStorage.setItem('session_id', JSON.stringify(item) )
    }

    useEffect(() => {
        validateWithLogin();
    }, [requestTokenInfo])

    useEffect(() => {
        createSession();
    }, [isValidated])



    return (
        <>
            <form onSubmit={loginFormHandler}>

                <input type="text"
                    value={username} onChange={(event)=>{
                        const value = event.target.value;
                        setUsername(value);
                    }}
                />
                <input type="password"
                    value={password} onChange={(event)=>{
                        const value = event.target.value;
                        setPassword(value);
                    }}
                />
                <input type="submit" onClick={loginFormHandler}
                />
            </form>
        </>
    )
}
