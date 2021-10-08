import * as T from 'types';

export type FetchResponse = T.FetchResponse;
export enum ACTION_TYPES {
  SEND_INVITE_EMAIL = 'SEND_INVITE_EMAIL',
  SEND_INVITE_EMAIL_SUCCESS = 'SEND_INVITE_EMAIL_SUCCESS',
  SEND_INVITE_EMAIL_ERROR = 'SEND_INVITE_EMAIL_ERROR',
  SET_INVITE_VIEW = 'SET_INVITE_VIEW',
  VERIFY_ACCESS_TOKEN = 'VERIFY_ACCESS_TOKEN',
  VERIFY_ACCESS_TOKEN_SUCCESS = 'VERIFY_ACCESS_TOKEN_SUCCESS',
  VERIFY_ACCESS_TOKEN_ERROR = 'VERIFY_ACCESS_TOKEN_ERROR',
  RECOVER_PASSWORD = 'RECOVER_PASSWORD',
  RECOVER_PASSWORD_SUCCESS = 'RECOVER_PASSWORD_SUCCESS',
  RECOVER_PASSWORD_ERROR = 'RECOVER_PASSWORD_ERROR',
  SET_RECOVER_PASSWORD_VIEW = 'SET_RECOVER_PASSWORD_VIEW',
  LOGIN_USER = 'LOGIN_USER',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR = 'LOGIN_USER_ERROR',
  LOG_OUT_USER = 'LOG_OUT_USER',
  LOG_OUT_USER_SUCCESS = 'LOG_OUT_USER_SUCCESS',
  LOG_OUT_USER_ERROR = 'LOG_OUT_USER_ERROR',
  SIGN_UP_USER = 'SIGN_UP_USER',
  SIGN_UP_USER_SUCCESS = 'SIGN_UP_USER_SUCCESS',
  SIGN_UP_USER_ERROR = 'SIGN_UP_USER_ERROR',
  RESET_PASSWORD = 'RESET_PASSWORD',
  RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR'
}

export interface Actions {
  loginUser(email: string, password: string): void;
  logOutUser(): void;
  signUpUser(email: string, password: string): void;
  sendInviteEmail(email: string): void;
  setInviteView(view: INVITE_VIEW): void;
  verifyAccessToken(token: string): void;
  verifyAccessTokenSuccess(token: string): void;
  verifyAccessTokenError(token: string): void;
  recoverPassword(email: string): void;
  recoverPasswordSuccess(): void;
  recoverPasswordError(reason: string): void;
  setRecoverView(activeView: RECOVER_VIEW): void;
  resetPassword(token: string, password: string): void;
  resetPasswordSuccess(): void;
  resetPasswordError(reason: string): void;
}

export interface ActionObject<T=any> {
  type: ACTION_TYPES;
  payload: T; //Find a better solution
}

export interface User {}
export interface InviteTokenPayload {
  email: string;
  iat: number;
  exp: number;
}
export interface AuthSagas {}

export interface State {
  signUpView: SIGNUP_VIEW;
  signUpEmail: string;
  recoverView: RECOVER_VIEW;
  recoverEmail: string;
  inviteView: INVITE_VIEW;
  inviteEmail: string;
  verifyStatus: VERIFY_STATUS;
  status: STATUS;
  statusMessage: string;
  user: User | null;
}

export enum INVITE_VIEW {
  LOADING = 'loading',
  VERIFY = 'verify',
  SUCCESS = 'success',
  ERROR = 'error'
}

export enum INVITE_STATUS {
  RESETING_PASSWORD = 'resetting_password',
}

export enum VERIFY_STATUS {
  UNVERIFIED = 'unverified',
  VERIFYING = 'verifying',
  VERIFIED = 'verified',
  FAILED = 'failed'
}

export enum RECOVER_VIEW {
  LOADING = 'loading',
  RESET = 'reset',
  SUCCESS = 'success',
  ERROR = 'error'
}

export enum SIGNUP_VIEW {
  VERIFY_TOKEN = 'verify_token',
  SIGN_UP_FORM = 'sign_up_form',
  LOADING = 'loading',
}

export enum SIGNUP_STATUS {
  SIGNING_UP = 'signing_up',
}

export enum STATUS {
  LOGGING_OUT = 'logging_out',
  LOGGED_OUT = 'logged_out',
  LOGGIN_IN = 'logging_in',
  LOGGED_IN = 'logged_in',
  SIGNING_UP = 'signing_up',
  RESETING_PASSWORD = 'resetting_password',
}

export interface UserData {
  email: string;
  id: string;
  authToken: string;
}

export interface Credentials {
  email: string;
  password: string;
}


