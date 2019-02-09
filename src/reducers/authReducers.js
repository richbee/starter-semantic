//import actions
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} from '../actions/authActions';

//auth
const initialState = {
  loggedIn: false,
  loggingIn: false,
  loginFailureReason: "",
  currentUser: {},
}

export const userAuth = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_START:
      return {
        loggingIn: true
      }
    case LOGIN_SUCCESS:
      return {
        loggingIn:false,
        loggedIn: true,
        currentUser: action.user,
        loginFailureReason: ''
      }
    case LOGIN_FAIL:
      return {
        loggingIn: false,
        loggedIn: false,
        currentUser: {},
        loginFailureReason: action.reason
      }
    case LOGOUT:
      console.log('logging out');
      return {
        loggedIn: false,
        currentUser: {},
      }
    case SIGNUP_START:
      return state;
    case SIGNUP_SUCCESS:
      return state;
    case SIGNUP_FAIL:
      return state;
    default:
      return state;
  }
}
