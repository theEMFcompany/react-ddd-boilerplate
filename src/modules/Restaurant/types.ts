import * as T from 'types';

export interface Actions {
  fetchRestaurants(params: FilterParams): void;
  fetchRestaurantsSuccess(items: FetchRestaurantsResponse): void;
  fetchRestaurantsError(resaon: string): void;
  fetchFilters(): void;
  fetchFiltersSuccess(items: FetchFiltersResponse): void;
  fetchFiltersError(resaon: string): void;
}

export interface State {
  isFetchingRestaurants: boolean;
  restaurants: Restaurant[];
  count: number;
  isFetchingFilters: boolean;
  filters: Filter[];
}

export enum ACTION_TYPE {
  FETCH_RESTAURANTS = 'FETCH_RESTAURANTS',
  FETCH_RESTAURANTS_SUCCESS = 'FETCH_RESTAURANTS_SUCCESS',
  FETCH_RESTAURANTS_ERROR = 'FETCH_RESTAURANTS_ERROR',
  FETCH_FILTERS = 'FETCH_FILTERS',
  FETCH_FILTERS_SUCCESS = 'FETCH_FILTERS_SUCCESS',
  FETCH_FILTERS_ERROR = 'FETCH_FILTERS_ERROR',
}

export interface ActionObject<T=any> {
  type: ACTION_TYPE;
  payload: T;
}

export interface Restaurant {
  name: string;
  id: number;
  address: string;
  longitude: number;
  latitude: number;
  cuisines: string[];
  average_cost_for_two: number;
  currency: string;
  has_table_booking: boolean;
  has_online_delivery: boolean;
  price_range: number;
  aggregate_rating: number;
  rating_color: string;
  rating_text: string;
  votes: number;
  city: string;
  country: string;
  locality: string;
  locality_verbose: string;
}

export type FilterParams = Record<string, any>;

export type FetchRestaurantsRequest =  FilterParams;

export type FilterWidget = 'select' | 'multi_select' | 'search' | 'range_slider' | 'toggle' | 'option_search';
export type FilterType = 'number' | 'string' | 'range' | 'boolean';
export type FilterConstraint = 'exclude_value';

export interface Filter {
  key: string;
  label: string;
  type: FilterType;
  ui_widget: FilterWidget;
  ui_disabled?: boolean;
  ui_constraints?: FilterConstraint[];
  items?: Filter[];
  values: any;
}

export interface FetchRestaurantsResponse {
  items: Restaurant[];
  count: number;
};

export interface FetchFiltersResponse {
  items: Filter[]
};
