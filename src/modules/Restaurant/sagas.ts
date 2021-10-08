import { put, call, takeEvery} from 'redux-saga/effects';
import * as actions from './actions';
import {ACTION_TYPE} from './types';
import * as service from './services';
import * as T from './types';

export function* onFetchRestaurants(action: T.ActionObject<T.FetchRestaurantsRequest>): any {
  try {
    const response: T.FetchRestaurantsResponse = yield call<T.FetchRestaurantsRequest>(service.fetchRestaurants, action.payload);
    yield put(actions.fetchRestaurantsSuccess(response));
  } catch (error) {
    yield put(actions.fetchRestaurantsError(error.message));
  }
}

export function* onFetchFilters(): any {
  try {
    const response: T.FetchFiltersResponse = yield call(service.fetchFilters);
    yield put(actions.fetchFiltersSuccess(response));
  } catch (error) {
    yield put(actions.fetchFiltersError(error.message));
  }
}

export default [
  takeEvery(ACTION_TYPE.FETCH_RESTAURANTS, onFetchRestaurants),
  takeEvery(ACTION_TYPE.FETCH_FILTERS, onFetchFilters),
];
