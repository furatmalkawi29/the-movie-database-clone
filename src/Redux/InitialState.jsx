
export const initialState = {
    logIn: {
      isLoggedIn: JSON.parse(localStorage.getItem('session_id'))? true:false,
      sessionId : JSON.parse(localStorage.getItem('session_id')) ?
      JSON.parse(localStorage.getItem('session_id')).session_id :
      null,
    },
    rememberMe: false, //get initial value from local storage
    userAccount:{
      id: null,
      // iso_639_1: "en",
      // iso_3166_1: "CA",
      // name: "Travis Bell",
      // include_adult: true,
      // username: "travisbell"
      // avatar: {
      // gravatar: {
      //     hash: "c9e9fc152ee756a900db85757c29815d"
      //   }
      // },
    }
  }
;
