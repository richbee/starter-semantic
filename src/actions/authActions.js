
// User levels
export const userLevel = {
  notLoggedIn: 0,
  user: 1,
  admin: 2,
  superAdmin: 3
}

//Action identifiers
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

//Action creators
export const loginStart = () => ({
  type: LOGIN_START
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  user: user
});

export const loginFail = (reason) => ({
  type: LOGIN_FAIL,
  reason: reason
})

export const logOut = () => ({
  type: LOGOUT
});

export const signupStart = () => ({
  type: SIGNUP_START
})

export const signupSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  user: user
})

export const signupFail = (reason) => ({
  type: SIGNUP_FAIL,
  reason: reason
})

//Async functions
export function logIn(username, password) {
  return function(dispatch) {
    console.log('login started');
    //flag starting logIn
    dispatch(loginStart);

    //set logged in user (tmp code for testing)
    let user = {
      username: "",
      userType: userLevel.notLoggedIn, //user, admin or superadmin
      language: "EN"
    }

    switch(username) {
      case "testuser":
        console.log('test user logged in');
        user.username = "testuser";
        user.name = "Test User";
        user.userType = userLevel.user;
        break;
      case "testadmin":
        console.log('test admin logged in');
        user.username = "testadmin";
        user.name = "Test Admin";
        user.userType = userLevel.admin;
        break;
      case "testSuperAdmin":
        console.log('test superadmin logged in');
        user.username = "testSuperAdmin";
        user.name = "Test Super Admin";
        user.userType = userLevel.superAdmin;
        break;
      default:
        return dispatch(loginFail("user not recognised"));
    }
    //flag login successful
    return dispatch(loginSuccess(user));

  }
}

export function applicationReloaded() {
  //not yet implemented. Needs to get current session and restore login state
  return function(dispatch) {

  }
}

export function logUserOut() {
  return function(dispatch) {
    // tmp code
    return dispatch(logOut());
  }
}

export function signUp(username, password, fullname) {
  return function(dispatch) {
    //signup code here
    console.log('signing up username:'+username+' password:'+password+' name:'+fullname);
  }
}
