import { Auth } from 'aws-amplify';

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
export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_COMPLETE = 'LOGOUT_COMPLETE';
export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

//Action creators
export const loginStart = () => ({
  type: LOGIN_START
});

export const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  user: user,
  token: token
});

export const loginFail = (reason) => ({
  type: LOGIN_FAIL,
  reason: reason
})

export const logOutStart = () => ({
  type: LOGOUT_START
});

export const logOutComplete = () => ({
  type: LOGOUT_COMPLETE
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
        //this needs removing from the switch statement when we know it works
        Auth.signIn(username,password)
          .then(data => {
            console.log(data);
            user = {
              username: data.signInUserSession.idToken.payload.email,
              name: data.signInUserSession.idToken.payload.name
            }
            return dispatch(loginSuccess(user, data.signInUserSession.accessToken));
          })
          .catch(err => {
            return dispatch(loginFail(err.message));
          });


        //return dispatch(loginFail("user not recognised"));
    }
    //flag login successful
    //return dispatch(loginSuccess(user));

  }
}

export function restoreSession() {
  //not yet fully implemented. Needs to get current session and restore login state
  return function(dispatch) {
    Auth.currentSession()
    .then(data => {
      console.log(data)
      //reset state from session
    })
    .catch(err => {
      console.log(err)
      //set state ready for new login
    });
  }
}

export function logUserOut() {
  return function(dispatch) {
    dispatch(logOutStart());
    // tmp code
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
    return dispatch(logOutComplete());
  }
}

export function signUp(username, password, fullname) {
  return function(dispatch) {
    //signup code here
    Auth.signUp({
      username: username,
      password: password,
      attributes: {
        name: fullname,
      }
    })
    .then(data => {
      console.log(data);
      //data.JSON.parse()
      return data;
    })
    .then(user => dispatch(signupSuccess(user)))
    .catch(err => {
      dispatch(signupFail(err.message));
    });
  }
}
