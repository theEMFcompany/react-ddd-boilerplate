import { put, call, takeEvery} from 'redux-saga/effects';
import * as actions from './actions';
import {ACTION_TYPES} from './types';
import * as service from './services/';
import * as T from './types';

export function* onboardUser(action: T.ActionObject<T.ONBOARD_VALUES>) {
  try {
    yield call(service.onboardUser, action.payload);
    yield put(actions.onboardUserSuccess());
  } catch (error) {
    yield put(actions.onboardUserError(error.message));
  }
}

export default [
  takeEvery(ACTION_TYPES.ONBOARD_USER, onboardUser),
];
