import * as T from './types';

export const getInitialState = (): T.State => {
  return {
    isFetchingRestaurants: false,
    restaurants: [],
    count: 0,
    filters: [],
    isFetchingFilters: false
  };
}

export const fetchRestaurants = (state: T.State, payload: {}): T.State => {
  return {
    ...state,
    isFetchingRestaurants: true
  };
}

export const fetchRestaurantsSuccess = (state: T.State, payload: T.FetchRestaurantsResponse): T.State => {
  return {
    ...state,
    restaurants: payload.items,
    count: payload.count,
    isFetchingRestaurants: false
  };
}

export const fetchRestaurantsError = (state: T.State): T.State => {
  return {
    ...state,
    isFetchingRestaurants: false
  };
}

export const fetchFilters = (state: T.State): T.State => {
  return {
    ...state,
    isFetchingFilters: true
  };
}

export const fetchFiltersSuccess = (state: T.State, payload: T.FetchFiltersResponse): T.State => {
  return {
    ...state,
    filters: payload.items,
    isFetchingFilters: false
  };
}

export const fetchFiltersError = (state: T.State): T.State => {
  return {
    ...state,
    filters: [],
    isFetchingFilters: false
  };
}
