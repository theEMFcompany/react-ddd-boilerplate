import  React, {ReactElement, useEffect} from 'react';
import { Block } from 'components/Block';
import {BlockGrid} from 'components/BlockGrid';
import {Connect} from 'lib/Connect';
import * as T from '../types';
import Restaurant from './Restaurant';
import Pagination, {PageRange} from 'components/Pagination';
import LoadingPage from 'components/LoadingPage';
import {restuarants as L} from 'resources/locales';
import NoResults from 'components/NoResults';
import Scroll from 'components/Scroll';

interface Props extends Pick<T.State,
'isFetchingRestaurants' |
'restaurants' |
'count' |
'filters'> {
  searchString: string;
  queryParams: T.FilterParams;
  onUpdatePage(page: number): void;
  actions: Pick<T.Actions, 'fetchRestaurants'>
}

const Restaurants: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    props.actions.fetchRestaurants(props.queryParams)
  }, [props.searchString]);

  let listing: ReactElement[] | ReactElement = (
    <NoResults heading={L.noResultsHeading} description={L.noResultsDesc} icon='heart-broken'/>
  );

  if(Array.isArray(props.restaurants) && props.restaurants.length > 0) {
    listing =  props.restaurants.map((restaurant, index) => {
      return (
        <Block className='cell' key={`data_listing_${index}`}>
          <Restaurant data={restaurant}/>
        </Block>
      )
    });
  }

  const limit = props.queryParams.limit ? props.queryParams.limit : 12;
  const pageCount = Math.ceil(props.count/limit);
  const currentPage = props.queryParams && props.queryParams.page ? parseInt(props.queryParams.page) : 1;
  return (
    props.isFetchingRestaurants
      ?<LoadingPage label={L.loadingRestaurants}/>
      :<Scroll scrollToken={props.searchString}>
        <Block className='restaurantsWrapper' >
          <Block padding={{bottom: '2'}}>
            <PageRange
              count={props.count}
              activePage={currentPage}
              limit={limit}
              locales={{
                singular: L.singularRestaurant,
                plural: L.pluralRestaurant
              }}/>
          </Block>
          <BlockGrid>
            {listing}
          </BlockGrid>
          <Block>
            <Pagination
              onPageChange={props.onUpdatePage}
              currentPage={currentPage}
              pageCount={pageCount}/>
          </Block>
        </Block>
      </Scroll>
  )
}

export default Connect<Props, 'queryParams' | 'onUpdatePage' | 'searchString'>(([actions, stores]) => {
  return ({
    restaurants: stores.Restaurant.restaurants,
    filters: stores.Restaurant.filters,
    count: stores.Restaurant.count,
    isFetchingRestaurants: stores.Restaurant.isFetchingRestaurants,
    actions: {
      fetchRestaurants: actions.Restaurant.fetchRestaurants
    }
  })
})(Restaurants);
