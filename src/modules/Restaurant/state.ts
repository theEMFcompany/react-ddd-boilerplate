import {ACTION_TYPE} from './types';

import * as restaurantsHelper from './helpers';
import * as T from './types';

const initialState = restaurantsHelper.getInitialState();

export default function reastaurants( state = initialState, action?: T.ActionObject ): T.State {
  const reducer: Record<ACTION_TYPE, (action: T.ActionObject) => T.State> = {
    [ACTION_TYPE.FETCH_RESTAURANTS]: (action: T.ActionObject) => restaurantsHelper.fetchRestaurants(state, action.payload),
    [ACTION_TYPE.FETCH_RESTAURANTS_SUCCESS]: (action: T.ActionObject) => restaurantsHelper.fetchRestaurantsSuccess(state, action.payload),
    [ACTION_TYPE.FETCH_RESTAURANTS_ERROR]: (_action: T.ActionObject) => restaurantsHelper.fetchRestaurantsError(state),
    [ACTION_TYPE.FETCH_FILTERS]: (_action: T.ActionObject) => restaurantsHelper.fetchFilters(state),
    [ACTION_TYPE.FETCH_FILTERS_SUCCESS]: (action: T.ActionObject) => restaurantsHelper.fetchFiltersSuccess(state, action.payload),
    [ACTION_TYPE.FETCH_FILTERS_ERROR]: (_action: T.ActionObject) => restaurantsHelper.fetchFiltersError(state),
  }
  return action && action.type && reducer[action.type]
    ? reducer[action.type](action)
    : state;
}
