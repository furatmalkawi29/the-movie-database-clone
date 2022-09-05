import React, { useState, useEffect } from 'react';
import { GetRequestToken, CreateSession,DeleteSession, ValidateWithLogin, GetAccountDetails } from '../Services';
import { useDispatch, useSelector } from 'react-redux';
//TODO::make file index for actions, reducers ..)
import { userLogin} from '../Redux/Actions/LoginAction'
import { userLogout} from '../Redux/Actions/LogoutAction'
import { rememberMe} from '../Redux/Actions/RrememberMeAction'
import {InputComponent, FormComponent} from '../components'
//TODO::USE react-cookies to set session expiration after 24 hours 
//TODO:: redirect user to another page after login
//TODO:: add remember me feature 
//TODO: make guest session 
export const LoginPage = ({ }) => {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [accountDetails, setAccountDetails] = useState(null)
    const [sessionId, setSessionId] = useState(null)
    const [sessionCreateDate, setSessionCreateDate] = useState(null)

    const loginInfo = useSelector((state) => state.logIn);
    const rememberMeValue = useSelector((state) => state.rememberMe);
    const dispatch = useDispatch();

    
    const getRequestToken = async () => {

        const response = await GetRequestToken();
        
        if (!(response && response.status && response.status !== 200)) {

            console.log('response',response);

            setSessionCreateDate(response.expires_at)
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
            }
        
    }
    const deleteSession = async () => {

        const body = {
               data: { 
                session_id: sessionId,
               },
            }
            const response = await DeleteSession(body);

            if (!(response && response.status && response.status !== 200)) {
                localStorageHandler(false)
                // sessionStorageHandler(false)
            }
        
    }


    const getAccountDetails = async (sessionId) =>{
        const response = await GetAccountDetails(sessionId);

        if (!(response && response.status && response.status !== 200)) {
            setAccountDetails(response);
        } 
    }


    // const sessionStorageHandler = (isLogin,sessionId) =>{
    //     if(isLogin){
    //         const item = {
    //             session_id: sessionId,
    //             created_at: requestTokenInfo.created_at,
    //         }
    //         sessionStorage.setItem('app_session', JSON.stringify(item) )
    //         localStorage.setItem('app_session', null) 
    //     }else {
    //         sessionStorage.setItem('app_session', null) 
    //     }
    //     }


    const localStorageHandler = (isLogin,sessionId) =>{
        if(isLogin){
            const item = {
                session_id: sessionId,
                created_at: sessionCreateDate
                        }
            localStorage.setItem('app_session', JSON.stringify(item) )
            // sessionStorage.setItem('app_session', null) 
        }else {
            localStorage.removeItem('app_session') 
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

        deleteSession();

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

    useEffect(()=>{
        const appSession = JSON.parse(localStorage.getItem('app_session'));

        if(appSession){
            setSessionId(appSession.session_id)
            setSessionCreateDate(appSession.created_at)
        }

    },[])

//make enum file for text
    return (
        <div className='login-view-wrapper'>
            <div className='login-top-part'>
                <h4>Login to your account</h4>
                <p>In order to use the editing and rating capabilities of 
                TMDB, as well as get personal recommendations you will
             need to login to your account. If you do not have an account,
              registering for an account is free and simple. 
              <a target="_blank"  href='https://www.themoviedb.org/signup'> Click here</a> to
             get started. </p>
             <p>You can also use TMDB features as <a>a guest</a>  . </p>
            </div>
            {/* TODO:: make form component */}
            <FormComponent 
            submitButtonText='Login'
            classes='form-component-wrapper'
            submitButtonClasses='basic-button'
            onSubmitHandler={loginFormHandler}
            >
            <InputComponent
                inputType='text'
                labelText='Username'
                classes='basic-input'
                inputValue= {username}
                onChangeHandler={(event)=>{
                    const {value} = event.target;
                    setUsername(value);
                }}
                />
            <InputComponent
                inputType='password'
                labelText='Password'
                classes='basic-input'
                inputValue= {password}
                onChangeHandler={(event)=>{
                    const {value} = event.target;
                    setPassword(value);
                }}
                />
            </FormComponent>
            <input type="button" value= "logout" onClick={logoutClickHandler}
                />
           {/* <label for="html">Remember Me</label> 
            <input type="checkbox" 
            onClick={rememberClickHandler}
        /> */}
            </div>
    )
}
