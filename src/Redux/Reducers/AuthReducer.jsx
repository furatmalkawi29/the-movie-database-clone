import {initialState} from '../InitialState'

export const authReducer = (state = initialState, action) =>{
  console.log('action',action);
    switch(action.type){
        case 'USER_LOGIN' : return {
            ...state,
            logIn: {
                isLoggedIn: true,
                sessionId : action.payload.sessionId,
              },
            userAccount: action.payload.userAccount
            }
        case 'USER_LOGOUT' : return {
              ...state,
              logIn: {
                  isLoggedIn: false,
                  sessionId : action.payload.sessionId,
                }
              }
        case 'REMEMBER_ME_CLICKED' : return {
              ...state,
              rememberMe: action.payload.rememberMe,
              }
       default: return state
    }
}
