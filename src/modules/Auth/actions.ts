import {ACTION_TYPES} from './types';
import * as T from './types';

export function sendInviteEmail(email: string) {
  return {
    type: ACTION_TYPES.SEND_INVITE_EMAIL,
    payload: {
      email
    }
  }
}

export function sendInviteEmailSuccess() {
  return {
    type: ACTION_TYPES.SEND_INVITE_EMAIL_SUCCESS
  }
}

export function sendInviteEmailError(reason: string) {
  return {
    type: ACTION_TYPES.SEND_INVITE_EMAIL_ERROR,
    payload: {
      reason
    }
  }
}

export function setInviteView(activeView: T.INVITE_VIEW) {
  return {
    type: ACTION_TYPES.SET_INVITE_VIEW,
    payload: {
      activeView
    }
  }
}

export function verifyAccessToken(token: string) {
  return {
    type: ACTION_TYPES.VERIFY_ACCESS_TOKEN,
    payload: {
      token
    }
  }
}

export function verifyAccessTokenSuccess(payload: T.InviteTokenPayload) {
  return {
    type: ACTION_TYPES.VERIFY_ACCESS_TOKEN_SUCCESS,
    payload
  }
}

export function verifyAccessTokenError(reason: string) {
  return {
    type: ACTION_TYPES.VERIFY_ACCESS_TOKEN_ERROR,
    payload: {
      reason
    }
  }
}

export function recoverPassword(email: string) {
  return {
    type: ACTION_TYPES.RECOVER_PASSWORD,
    payload: {
      email
    }
  }
}

export function recoverPasswordSuccess() {
  return {
    type: ACTION_TYPES.RECOVER_PASSWORD_SUCCESS
  }
}

export function recoverPasswordError(reason: string) {
  return {
    type: ACTION_TYPES.RECOVER_PASSWORD_ERROR,
    payload: {
      reason
    }
  }
}

export function setRecoverPasswordView(activeView: T.RECOVER_VIEW) {
  return {
    type: ACTION_TYPES.SET_RECOVER_PASSWORD_VIEW,
    payload: {
      activeView
    }
  }
}

export function loginUser(email: string, password: string) {
  return {
    type: ACTION_TYPES.LOGIN_USER,
    payload: {
      email,
      password
    }
  }
}

export function loginUserSuccess(user: any) {
  return {
    type: ACTION_TYPES.LOGIN_USER_SUCCESS,
    payload: {
      user
    }
  }
}

export function loginUserError(reason: string) {
  return {
    type: ACTION_TYPES.LOGIN_USER_ERROR,
    payload: {
      reason
    }
  }
}

export function logOutUser(token: string) {
  return {
    type: ACTION_TYPES.LOG_OUT_USER,
    payload: {
      token
    }
  }
}

export function logOutUserSuccess() {
  return {
    type: ACTION_TYPES.LOG_OUT_USER_SUCCESS
  }
}

export function logOutUserError(reason: string) {
  return {
    type: ACTION_TYPES.LOG_OUT_USER_ERROR,
    payload: {
      reason
    }
  }
}

export function signUpUser(email: string, password: string) {
  return {
    type: ACTION_TYPES.SIGN_UP_USER,
    payload: {
      email,
      password
    }
  }
}

export function signUpUserSuccess(user: any) {
  return {
    type: ACTION_TYPES.SIGN_UP_USER_SUCCESS,
    payload: {
      user
    }
  }
}

export function signUpUserError(reason: string) {
  return {
    type: ACTION_TYPES.SIGN_UP_USER_ERROR,
    payload: {
      reason
    }
  }
}
export function resetPassword(token: string, password: string) {
  return {
    type: ACTION_TYPES.SIGN_UP_USER,
    payload: {
      token,
      password
    }
  }
}

export function resetPasswordSuccess() {
  return {
    type: ACTION_TYPES.SIGN_UP_USER_SUCCESS,
    payload: {}
  }
}

export function resetPasswordError(reason: string) {
  return {
    type: ACTION_TYPES.SIGN_UP_USER_ERROR,
    payload: {
      reason
    }
  }
}
