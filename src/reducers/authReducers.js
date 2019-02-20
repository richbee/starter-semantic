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
  signupInProgress: false,
  signupFailureReason: ""
}

export const userAuth = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_START:
      return {
        loggingIn: true,
        ...state
      }
    case LOGIN_SUCCESS:
      return {
        loggingIn:false,
        loggedIn: true,
        currentUser: action.user,
        loginFailureReason: '',
        ...state
      }
    case LOGIN_FAIL:
      return {
        loggingIn: false,
        loggedIn: false,
        currentUser: {},
        loginFailureReason: action.reason,
        ...state
      }
    case LOGOUT:
      console.log('logging out');
      return {
        loggedIn: false,
        currentUser: {},
        ...state
      }
    case SIGNUP_START:
      return {
        signupInProgress: true,
        currentUser: {},
        ...state
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupInProgress: false,
        currentUser: action.user

      }
    case SIGNUP_FAIL:
      console.log('signup failed: ',action.reason)
      return {
        ...state,
        signupInProgress: false,
        signupFailureReason: action.reason

      }
    default:
      return state;
  }
}
