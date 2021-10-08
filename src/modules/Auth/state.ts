import {ACTION_TYPES} from './types';

import * as authHelper from './helpers';
import * as T from './types';

const initialState = authHelper.getInitialState();

export default function auth( state = initialState, action: T.ActionObject ): T.State {
  const reducer: Record<ACTION_TYPES, () => T.State> = {
    [ACTION_TYPES.SEND_INVITE_EMAIL]: () => authHelper.sendInviteEmail(state, action.payload),
    [ACTION_TYPES.SEND_INVITE_EMAIL_SUCCESS]: () => authHelper.sendInviteEmailSuccess(state),
    [ACTION_TYPES.SEND_INVITE_EMAIL_ERROR]: () => authHelper.sendInviteEmailError(state, action.payload),
    [ACTION_TYPES.SET_INVITE_VIEW]: () => authHelper.setInviteView(state, action.payload),
    [ACTION_TYPES.VERIFY_ACCESS_TOKEN]: () => authHelper.verifyAccessToken(state),
    [ACTION_TYPES.VERIFY_ACCESS_TOKEN_SUCCESS]: () => authHelper.verifyAccessTokenSuccess(state, action.payload),
    [ACTION_TYPES.VERIFY_ACCESS_TOKEN_ERROR]: () => authHelper.verifyAccessTokenError(state, action.payload),
    [ACTION_TYPES.RECOVER_PASSWORD]: () => authHelper.recoverPassword(state, action.payload),
    [ACTION_TYPES.RECOVER_PASSWORD_SUCCESS]: () => authHelper.recoverPasswordSuccess(state),
    [ACTION_TYPES.RECOVER_PASSWORD_ERROR]: () => authHelper.recoverPasswordError(state, action.payload),
    [ACTION_TYPES.SET_RECOVER_PASSWORD_VIEW]: () => authHelper.setRecoverPasswordActiveView(state, action.payload),
    [ACTION_TYPES.LOGIN_USER]: () => authHelper.loginUser(state, action.payload),
    [ACTION_TYPES.LOGIN_USER_SUCCESS]: () => authHelper.loginUserSuccess(state, action.payload),
    [ACTION_TYPES.LOGIN_USER_ERROR]: () => authHelper.loginUserError(state, action.payload),
    [ACTION_TYPES.LOG_OUT_USER]: () => authHelper.logOutUser(state),
    [ACTION_TYPES.LOG_OUT_USER_SUCCESS]: () => authHelper.logOutUserSuccess(state),
    [ACTION_TYPES.LOG_OUT_USER_ERROR]: () => authHelper.logOutUserError(state, action.payload),
    [ACTION_TYPES.SIGN_UP_USER]: () => authHelper.signUpUser(state, action.payload),
    [ACTION_TYPES.SIGN_UP_USER_SUCCESS]: () => authHelper.signUpUserSuccess(state, action.payload),
    [ACTION_TYPES.SIGN_UP_USER_ERROR]: () => authHelper.signUpUserError(state, action.payload),
    [ACTION_TYPES.RESET_PASSWORD]: () => authHelper.resetPassword(state, action.payload),
    [ACTION_TYPES.RESET_PASSWORD_SUCCESS]: () => authHelper.resetPasswordSuccess(state, action.payload),
    [ACTION_TYPES.RESET_PASSWORD_ERROR]: () => authHelper.resetPasswordError(state, action.payload)
  }
  return action.type && reducer[action.type]
    ? reducer[action.type]()
    : initialState;
}
