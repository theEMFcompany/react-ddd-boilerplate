import { put, call, takeEvery} from 'redux-saga/effects';
import * as actions from './actions';
import {ACTION_TYPE} from './types';
import * as service from './services';
import * as T from './types';

export function* onFetchTemplateTypes(action: T.ActionObject<T.FetchTemplateTypesRequest>): any {
  try {
    const response: T.FetchTemplateTypesResponse = yield call<T.FetchTemplateTypesRequest>(service.fetchTemplateTypes, action.payload);
    yield put(actions.fetchTemplateTypesSuccess(response));
  } catch (error) {
    yield put(actions.fetchTemplateTypesError(error.message));
  }
}

export function* onFetchRequirementsfields(action: T.ActionObject<T.FetchRequirementsSchemaRequest>): any {
  try {
    const response: T.FetchRequirementsSchemaResponse = yield call<T.FetchRequirementsSchemaRequest>(service.fetchRequirementsFields, action.payload);
    yield put(actions.fetchRequirementsFieldsSuccess(response));
  } catch (error) {
    yield put(actions.fetchRequirementsFieldsError(error.message));
  }
}

export default [
  takeEvery(ACTION_TYPE.FETCH_TEMPLATE_TYPES, onFetchTemplateTypes),
  takeEvery(ACTION_TYPE.FETCH_REQUIREMENTS_FIELDS, onFetchRequirementsfields)
];
