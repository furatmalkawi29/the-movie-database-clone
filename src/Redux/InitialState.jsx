
const appSession = JSON.parse(localStorage.getItem('app_session'));

export const initialState = {
  logIn: {
    isLoggedIn: appSession? true : false,
    sessionId: appSession ? appSession.session_id : null,
  },
  rememberMe: false, //get initial value from local storage
  userAccount: {
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
  },
};
