import React, { useState, useEffect } from 'react';
import { GetRequestToken, CreateSession, ValidateWithLogin } from '../Services';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin} from '../Redux/Actions/LoginAction'
import { userLogout} from '../Redux/Actions/LogoutAction'
import { rememberMe} from '../Redux/Actions/RrememberMeAction'


export const LoginPage = ({ }) => {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [requestTokenInfo, setRequestTokenInfo] = useState(null)
    const [isValidated, setIsValidated] = useState(null)
    
    const loginInfo = useSelector((state) => state.logIn);
    const rememberMeValue = useSelector((state) => state.rememberMe);
    const dispatch = useDispatch();

    console.log('loginInfo',loginInfo);
    
    const getRequestToken = async () => {

        const response = await GetRequestToken();
        
        if (!(response && response.status && response.status !== 200)) {
            setRequestTokenInfo({
                request_token: response.request_token,
                created_at: response.expires_at
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
                if(rememberMeValue) localStorageHandler(true, response.session_id)
                else sessionStorageHandler(true, response.session_id)
            }
        }
    }
    
    const loginFormHandler = (event)=>{
        event.preventDefault();

        if(password&&username){
            getRequestToken();
        }
    }


    const sessionStorageHandler = (isLogin,sessionId) =>{
        if(isLogin){
            const item = {
                session_id: sessionId,
                created_at: requestTokenInfo.created_at,
                request_token: requestTokenInfo.request_token
            }
            sessionStorage.setItem('session_id', JSON.stringify(item) )
            localStorage.setItem('session_id', null) 
        }else {
            sessionStorage.setItem('session_id', null) 
        }
        }

    const localStorageHandler = (isLogin,sessionId) =>{
        if(isLogin){
            const item = {
                session_id: sessionId,
                created_at: requestTokenInfo.created_at,
                request_token: requestTokenInfo.request_token
            }
            localStorage.setItem('session_id', JSON.stringify(item) )
            sessionStorage.setItem('session_id', null) 
        }else {
            localStorage.setItem('session_id', null) 
        }
    }
    const logoutClickHandler = ()=>{
        dispatch(
            userLogout({
                sessionId: null,
        }))

        localStorageHandler(false)
        sessionStorageHandler(false)
        console.log('loginInfo',loginInfo);

    }

    const rememberClickHandler = ()=>{
        dispatch(
            rememberMe({
                rememberMe: !rememberMeValue,
        }))

    }

    useEffect(() => {
        validateWithLogin();
    }, [requestTokenInfo])

    useEffect(() => {
        createSession();

        if(isValidated){
            dispatch(
                userLogin({
                    sessionId: requestTokenInfo.request_token,
                }))
        }
    }, [isValidated, requestTokenInfo])


    console.log('rememberMeValue',rememberMeValue);

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
            <input type="button" value= "logout" onClick={logoutClickHandler}
                />
           <label for="html">Remember Me</label> 
            <input type="checkbox" 
            onClick={rememberClickHandler}
                />
        </>
    )
}
