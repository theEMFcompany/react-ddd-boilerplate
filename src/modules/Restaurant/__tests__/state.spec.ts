import systemUnderTest from 'modules/Restaurant/state';
import * as T from 'modules/Restaurant/types';
import {getInitialState} from 'modules/Restaurant/helpers';
import restaurants from './fixtures/restaurants';

describe('Restaurants State', () => {
  let state: T.State;
  beforeEach(() => {
    state = systemUnderTest(undefined)
  })

  it('should start at initial state', () => {
    expect(state).toEqual(getInitialState());
  });

  it('should fetch restaurants', () => {
    state = systemUnderTest(state, {type: T.ACTION_TYPE.FETCH_RESTAURANTS, payload: {}});
    expect(state).toHaveProperty('isFetchingRestaurants');
    expect(state.isFetchingRestaurants).toBe(true);
  });

  it('should load restaurants when fetch succeeds', () => {
    const payload: T.FetchRestaurantsResponse = {
      items: restaurants,
      count: 120
    };
    state = systemUnderTest(state, {type: T.ACTION_TYPE.FETCH_RESTAURANTS_SUCCESS, payload})
    expect(state).toHaveProperty('isFetchingRestaurants');
    expect(state).toHaveProperty('restaurants');
    expect(state).toHaveProperty('count');
    expect(state.restaurants).toHaveLength(payload.items.length);
    expect(state.count).toBe(payload.count);
    expect(state.isFetchingRestaurants).toBe(false);
  });

  it('should reset state when restaurant fetch fails', () => {
    const errorResponse = {
      reason: "Error"
    };
    const fetchResponse: T.FetchRestaurantsResponse = {
      items: restaurants,
      count: 120
    };
    const fetchParams = {};
    state = systemUnderTest(state, {type: T.ACTION_TYPE.FETCH_RESTAURANTS, payload: fetchParams});
    state = systemUnderTest(state, {type: T.ACTION_TYPE.FETCH_RESTAURANTS_SUCCESS, payload: fetchResponse});
    const restaurantCount = state.restaurants.length;
    const totalCount = state.count;

    state = systemUnderTest(state, {type: T.ACTION_TYPE.FETCH_RESTAURANTS, payload: fetchParams});
    state = systemUnderTest(state, {type: T.ACTION_TYPE.FETCH_RESTAURANTS_ERROR, payload: errorResponse})
    expect(state).toHaveProperty('isFetchingRestaurants');
    expect(state).toHaveProperty('restaurants');
    expect(state).toHaveProperty('count');
    expect(state.restaurants).toHaveLength(restaurantCount);
    expect(state.isFetchingRestaurants).toBe(false);
    expect(state.count).toBe(totalCount);
  });


  it('should fetch filters', () => {
    state = systemUnderTest(state, {type: T.ACTION_TYPE.FETCH_FILTERS, payload: null});
    expect(state).toHaveProperty('isFetchingFilters');
    expect(state.isFetchingFilters).toBe(true);
  });

  it('should load filters when fetch succeeds', () => {
    const payload: T.FetchFiltersResponse = {
      items: [{
        key: 'filter_1',
        label: 'Filter 2',
        type: 'string',
        ui_widget: 'search',
        ui_disabled: false,
        ui_constraints: [],
        items: [],
        values: [],

      },{
        key: 'filter_2',
        label: 'Filter 2',
        type: 'string',
        ui_widget: 'search',
        ui_disabled: false,
        ui_constraints: [],
        items: [],
        values: [],

      },]
    };
    state = systemUnderTest(state, {type: T.ACTION_TYPE.FETCH_FILTERS, payload: null});
    state = systemUnderTest(state, {type: T.ACTION_TYPE.FETCH_FILTERS_SUCCESS, payload})
    expect(state).toHaveProperty('isFetchingFilters');
    expect(state).toHaveProperty('filters');
    expect(state.filters).toHaveLength(payload.items.length);
    expect(state.isFetchingFilters).toBe(false);
  });

  it('should reset state when filters fetch fails', () => {
    const payload = {
      reason: "Error"
    };
    state = systemUnderTest(state, {type: T.ACTION_TYPE.FETCH_FILTERS, payload: null});
    state = systemUnderTest(state, {type: T.ACTION_TYPE.FETCH_FILTERS_ERROR, payload})
    expect(state).toHaveProperty('isFetchingFilters');
    expect(state).toHaveProperty('filters');
    expect(state.filters).toHaveLength(0);
    expect(state.isFetchingFilters).toBe(false);
  });
})
