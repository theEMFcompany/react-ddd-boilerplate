import {
  get,
} from 'lib/api';
import * as T from './types';

enum END_POINTS {
  RESTAURANTS = 'restaurants',
  FILTERS = 'restaurants/filters',
}

export function fetchRestaurants(params: T.FetchRestaurantsRequest): Promise<T.FetchRestaurantsResponse>{
  return get(END_POINTS.RESTAURANTS, params) as Promise<T.FetchRestaurantsResponse>;
}


export function fetchFilters(): Promise<T.FetchFiltersResponse>{
  return get(END_POINTS.FILTERS) as Promise<T.FetchFiltersResponse>;
}
