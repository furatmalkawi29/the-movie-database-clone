import React, { useState, useEffect } from 'react';
import { GetRequestToken, CreateSession, ValidateWithLogin } from '../Services';
import { useDispatch, useSelector } from 'react-redux';
//make file index for actions, reducers ..)
import { userLogin} from '../Redux/Actions/LoginAction'
import { userLogout} from '../Redux/Actions/LogoutAction'
import { rememberMe} from '../Redux/Actions/RrememberMeAction'
import {GetAccountDetails} from '../Services'
//USE react-cookies to set token expiration after one day 
export const LoginPage = ({ }) => {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    // const [requestTokenInfo, setRequestTokenInfo] = useState(null)
    const [isValidated,setIsValidated] = useState(null)
    const [accountDetails, setAccountDetails] = useState(null)
    const [sessionId, setSessionId] = useState(null)

    const loginInfo = useSelector((state) => state.logIn);
    const rememberMeValue = useSelector((state) => state.rememberMe);
    const dispatch = useDispatch();

    
    const getRequestToken = async () => {

        const response = await GetRequestToken();
        
        if (!(response && response.status && response.status !== 200)) {
            // setRequestTokenInfo({
            //     request_token: response.request_token,
            //     created_at: response.expires_at
            // })
            validateWithLogin(response.request_token);
        }
    }

    const validateWithLogin = async (requestToken) => {

        const body = {
                username: username,
                password: password,
                request_token: requestToken,
            }
            const response = await ValidateWithLogin(body);

            if (!(response && response.status && response.status !== 200)) {
                setIsValidated(true);
                createSession(requestToken);
            } else{
                setIsValidated(false);
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
            }
        
    }


    const getAccountDetails = async (sessionId) =>{
        const response = await GetAccountDetails(sessionId);

        if (!(response && response.status && response.status !== 200)) {
            setAccountDetails(response);
        } 
    }


    const sessionStorageHandler = (isLogin,sessionId) =>{
        if(isLogin){
            const item = {
                session_id: sessionId,
                // created_at: requestTokenInfo.created_at,
                // request_token: requestTokenInfo.request_token
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
                // created_at: requestTokenInfo.created_at,
                // request_token: sessionId
            }
            localStorage.setItem('session_id', JSON.stringify(item) )
            sessionStorage.setItem('session_id', null) 
        }else {
            localStorage.setItem('session_id', null) 
        }
    }

    const loginFormHandler = (event)=>{
        event.preventDefault();

        if(password&&username){
            getRequestToken();
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
 
        if(accountDetails){
        localStorageHandler(true, sessionId)
        //  if(rememberMeValue) localStorageHandler(true, sessionId)
        //  else sessionStorageHandler(true, sessionId);

            dispatch(
                userLogin({
                    userAccount: accountDetails,
                    sessionId: sessionId,
                }))

        }
    }, [accountDetails])



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
           {/* <label for="html">Remember Me</label> 
            <input type="checkbox" 
            onClick={rememberClickHandler}
                /> */}
        </>
    )
}
