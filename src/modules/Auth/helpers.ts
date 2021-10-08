import * as T from './types';

export const getInitialState = (): T.State => {
  return {
    signUpEmail: '',
    signUpView: T.SIGNUP_VIEW.SIGN_UP_FORM,
    inviteView: T.INVITE_VIEW.VERIFY,
    inviteEmail: '',
    verifyStatus: T.VERIFY_STATUS.UNVERIFIED,
    recoverView: T.RECOVER_VIEW.RESET,
    recoverEmail: '',
    status: T.STATUS.LOGGED_OUT,
    statusMessage: '',
    user: null
  };
}

export const setInviteView = (state: T.State, payload: {activeView: T.INVITE_VIEW}): T.State => {
  return {
    ...state,
    inviteView: payload.activeView
  };
}

export const sendInviteEmail = (state: T.State, payload: {email: string}): T.State => {
  return {
    ...state,
    inviteView: T.INVITE_VIEW.LOADING,
    inviteEmail: payload.email
  };
}

export const sendInviteEmailSuccess = (state: T.State): T.State => {
  return {
    ...state,
    inviteView: T.INVITE_VIEW.SUCCESS,
  };
}

export const sendInviteEmailError = (state: T.State, payload: {reason: string}): T.State => {
  return {
    ...state,
    inviteView: T.INVITE_VIEW.ERROR,
  };
}

export const verifyAccessToken = (state: T.State): T.State => {
  return {
    ...state,
    verifyStatus: T.VERIFY_STATUS.VERIFYING,
  };
}

export const verifyAccessTokenSuccess = (state: T.State, payload: T.InviteTokenPayload): T.State => {
  return {
    ...state,
    signUpEmail: payload.email,
    verifyStatus: T.VERIFY_STATUS.VERIFIED,
  };
}

export const verifyAccessTokenError = (state: T.State, payload: {reason: string}): T.State => {
  return {
    ...state,
    verifyStatus: T.VERIFY_STATUS.FAILED,
  };
}

export const setRecoverPasswordActiveView = (state: T.State, payload: {activeView: T.RECOVER_VIEW}): T.State => {
  return {
    ...state,
    recoverView: payload.activeView
  };
}

export const recoverPassword = (state: T.State, payload: {email: string}): T.State => {
  return {
    ...state,
    recoverView: T.RECOVER_VIEW.LOADING,
    recoverEmail: payload.email
  };
}

export const recoverPasswordSuccess = (state: T.State): T.State => {
  return {
    ...state,
    recoverView: T.RECOVER_VIEW.SUCCESS,
  };
}

export const recoverPasswordError = (state: T.State, payload: {reason: string}): T.State => {
  return {
    ...state,
    recoverView: T.RECOVER_VIEW.ERROR,
  };
}

export const loginUser = (state: T.State, payload: {email: string, password: string}): T.State => {
  return {
    ...state,
    status: T.STATUS.LOGGIN_IN,
  };
}

export const loginUserSuccess = (state: T.State, payload: {user: any}): T.State => {
  return {
    ...state,
    user: payload.user,
    status: T.STATUS.LOGGED_IN,
  };
}

export const loginUserError = (state: T.State, payload: {reason: string}): T.State => {
  return {
    ...state,
    status: T.STATUS.LOGGED_OUT,
    statusMessage: payload.reason
  };
}

export const logOutUser = (state: T.State): T.State => {
  return {
    ...state,
    status: T.STATUS.LOGGING_OUT,
  };
}

export const logOutUserSuccess = (state: T.State): T.State => {
  return {
    ...state,
    user: null,
    status: T.STATUS.LOGGED_OUT,
  };
}

export const logOutUserError = (state: T.State, payload: {reason: string}): T.State => {
  return {
    ...state,
    status: T.STATUS.LOGGED_IN,
    statusMessage: payload.reason
  };
}
export const signUpUser = (state: T.State, payload: {email: string, password: string}): T.State => {
  return {
    ...state,
    status: T.STATUS.SIGNING_UP,
  };
}

export const signUpUserSuccess = (state: T.State, payload: {user: string}): T.State => {
  console.log(payload);
  return {
    ...state,
    user: payload.user,
    status: T.STATUS.LOGGED_IN,
  };
}

export const signUpUserError = (state: T.State, payload: {reason: string}): T.State => {
  return {
    ...state,
    status: T.STATUS.LOGGED_OUT,
    statusMessage: payload.reason
  };
}

export const resetPassword = (state: T.State, payload: {email: string, password: string}): T.State => {
  return {
    ...state,
    status: T.STATUS.RESETING_PASSWORD,
  };
}

export const resetPasswordSuccess = (state: T.State, payload: {user: string}): T.State => {
  return {
    ...state,
    user: payload.user,
    status: T.STATUS.LOGGED_OUT,
  };
}

export const resetPasswordError = (state: T.State, payload: {reason: string}): T.State => {
  return {
    ...state,
    status: T.STATUS.LOGGED_OUT,
    statusMessage: payload.reason
  };
}
