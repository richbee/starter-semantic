//import actions
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_START,
  LOGOUT_COMPLETE,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} from '../actions/authActions';

//auth
const initialState = {
  loggedIn: false,
  loggingIn: false,
  loggingOut: false,
  loginFailureReason: "",
  currentUser: {},
  signupInProgress: false,
  signupSuccess: false,
  signupFailureReason: "",
  accessToken: ""
}

export const userAuth = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_START:
      return {
        ...state,
        loggingIn: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn:false,
        loggedIn: true,
        currentUser: action.user,
        accessToken: action.token,
        loginFailureReason: ''
      }
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        currentUser: {},
        loginFailureReason: action.reason
      }
    case LOGOUT_START:
      return {
        ...state,
        loggingOut: true
      }
    case LOGOUT_COMPLETE:
      console.log('logging out');
      return {
        ...state,
        loggedIn: false,
        loggingOut: false,
        currentUser: {}
      }
    case SIGNUP_START:
      return {
        ...state,
        signupInProgress: true,
        currentUser: {}
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupInProgress: false,
        signupSuccess: true,
        currentUser: action.user
      }
    case SIGNUP_FAIL:
      return {
        ...state,
        signupInProgress: false,
        signupFailureReason: action.reason

      }
    default:
      return state;
  }
}
