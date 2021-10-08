import { put, call } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import { onFetchRestaurants, onFetchFilters } from '../sagas';
import { fetchRestaurants, fetchFiltersSuccess, fetchRestaurantsSuccess } from '../actions';
import * as service from '../services';
import restaurants_fixtures from './fixtures/restaurants';
import filters_fixtures from './fixtures/filters';
import * as T from 'modules/Restaurant/types';

describe('Sagas - restaurants', () => {
  describe('Fetch Restaurants', () => {
    const it = sagaHelper(onFetchRestaurants(fetchRestaurants({})));
    const response: T.FetchRestaurantsResponse = {
      items: restaurants_fixtures,
      count: 10
    }

    it('should call the fetchRestaurants service', result => {
      expect(result).toEqual(call(service.fetchRestaurants, {}));
      return response;
    });

    it('then call the fetchRestaurantsSuccess action', result => {
      expect(result).toEqual(put(fetchRestaurantsSuccess(response)));
    });
  });

  describe('Fetch Filters', () => {
    const it = sagaHelper(onFetchFilters());
    const response: T.FetchFiltersResponse = {
      items: filters_fixtures
    }

    it('should call the fetchFilters service', result => {
      expect(result).toEqual(call(service.fetchFilters));
      return response;
    });

    it('then call the fetchFiltersSuccess action', result => {
      expect(result).toEqual(put(fetchFiltersSuccess(response)));
      return '';
    });
  });
});
