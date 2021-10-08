import {ACTION_TYPE} from './types';
import * as T from './types';

export function fetchRestaurants(payload: T.FilterParams) {
  return {
    type: ACTION_TYPE.FETCH_RESTAURANTS,
    payload
  }
}

export function fetchRestaurantsSuccess(response: T.FetchRestaurantsResponse) {
  return {
    type: ACTION_TYPE.FETCH_RESTAURANTS_SUCCESS,
    payload: response
  }
}

export function fetchRestaurantsError(reason: string) {
  return {
    type: ACTION_TYPE.FETCH_RESTAURANTS_ERROR,
    payload: {
      reason
    }
  }
}

export function fetchFilters() {
  return {
    type: ACTION_TYPE.FETCH_FILTERS
  }
}

export function fetchFiltersSuccess(response: T.FetchFiltersResponse) {
  return {
    type: ACTION_TYPE.FETCH_FILTERS_SUCCESS,
    payload: response
  }
}

export function fetchFiltersError(reason: string) {
  return {
    type: ACTION_TYPE.FETCH_FILTERS_ERROR,
    payload: {
      reason
    }
  }
}

// const actions: T.Actions = {
//   fetchRestaurants,
//   fetchRestaurantsSuccess,
//   fetchRestaurantsError,
//   fetchFilters,
//   fetchFiltersSuccess,
//   fetchFiltersError,
// }

// export default actions;
