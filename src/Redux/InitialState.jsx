console.log(localStorage.getItem('session_id'));

export const initialState = {
    logIn: {
      isLoggedIn: false,
      sessionId : JSON.parse(localStorage.getItem('session_id')) ?
      JSON.parse(localStorage.getItem('session_id')).session_id :
      null,
    },
    rememberMe: false
  }
