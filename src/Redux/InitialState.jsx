
const appSession = JSON.parse(localStorage.getItem('app_session'));

export const initialState = {
  logIn: {
    isLoggedIn: appSession? true : false,
    sessionId: appSession?.session_id || null,
  },
  userAccount: appSession?.userAccount
  // rememberMe: false, //get initial value from local storage

};
