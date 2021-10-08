import { put, call, takeEvery} from 'redux-saga/effects';
import * as actions from './actions';
import {ACTION_TYPES} from './types';
import * as service from './services/';
import * as T from './types';

export function* onSendInviteEmail(action: T.ActionObject<{email: string}>) {
  try {
    yield call(service.verifyEmail, action.payload.email);
    yield put(actions.sendInviteEmailSuccess());
  } catch (error) {
    yield put(actions.sendInviteEmailError(error.message));
  }
}

export function* onVerifyAccessToken(action: T.ActionObject<{token: string}>): any {
  try {
    const reponse: T.FetchResponse = yield call<string>(service.verifyAccessToken, action.payload.token);
    yield put(actions.verifyAccessTokenSuccess(reponse.payload));
  } catch (error) {
    yield put(actions.verifyAccessTokenError(error.message));
  }
}

export function* onRecoverPassword(action: T.ActionObject<{email: string}>) {
  try {
    yield call(service.recoverPassword, action.payload.email);
    yield put(actions.recoverPasswordSuccess());
  } catch (error) {
    yield put(actions.recoverPasswordError(error.message));
  }
}

export function* onLoginUser(action: T.ActionObject<{email: string, password: string}>): any {
  try {
    const user = yield call(service.loginUser, action.payload);
    yield put(actions.loginUserSuccess(user));
  } catch (error) {
    yield put(actions.loginUserError(error.message));
  }
}

export function* onLogOutUser(action: T.ActionObject<{token: string}>) {
  try {
    yield call(service.logOutUser, action.payload.token);
    yield put(actions.logOutUserSuccess());
  } catch (error) {
    yield put(actions.logOutUserError(error.message));
  }
}

export function* onSignUpUser(action: T.ActionObject<{email: string, password: string}>): any {
  try {
    const response: T.FetchResponse = yield call(service.signUpUser, action.payload);
    console.log(response);
    yield put(actions.signUpUserSuccess(response.payload));
  } catch (error) {
    yield put(actions.signUpUserError(error.message));
  }
}

export function* onResetPassword(action: T.ActionObject<{email: string, password: string}>): any {
  try {
    const user = yield call(service.resetPassword, action.payload);
    yield put(actions.resetPasswordSuccess());
  } catch (error) {
    yield put(actions.resetPasswordError(error.message));
  }
}

export default [
  takeEvery(ACTION_TYPES.RECOVER_PASSWORD, onRecoverPassword),
  takeEvery(ACTION_TYPES.SEND_INVITE_EMAIL, onSendInviteEmail),
  takeEvery(ACTION_TYPES.VERIFY_ACCESS_TOKEN, onVerifyAccessToken),
  takeEvery(ACTION_TYPES.LOGIN_USER, onLoginUser),
  takeEvery(ACTION_TYPES.LOG_OUT_USER, onLogOutUser),
  takeEvery(ACTION_TYPES.SIGN_UP_USER, onSignUpUser),
  takeEvery(ACTION_TYPES.RESET_PASSWORD, onResetPassword),
];
