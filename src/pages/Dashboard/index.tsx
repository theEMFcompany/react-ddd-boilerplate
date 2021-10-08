import React from 'react';
import {useHistory, useLocation} from 'react-router-dom'
import MainSite from 'templates/MainSite';
import {SectionHead, Heading} from 'components/Text';
import {
  PageContainer,
  Page,
  PageContent,
  PageHeader,
  SideBar,
  SideBarHeader,
  SideBarContent } from 'components/Page';
import { Restaurants, RestaurantFilters } from 'modules/Restaurant';
import {qs} from 'utils';
import {URLS} from 'resources/urls';
import {restuarants as L} from 'resources/locales';

export const RestaurantsPage = () => {
  const location = useLocation();
  const history = useHistory();

  const queryParams = qs.parse(location.search);

  const handleUpdateFilters = (params?: any) => {
    const oldParams = qs.parse(location.search);
    if(!params) {
      history.push(URLS.RESTAURANTS)
    } else {
      const newParams = {
        ...oldParams,
        ...params
      }
      Object.keys(params).forEach(param => {
        if(!params[param]) {
          delete newParams[param];
        }
      });
      delete newParams.page
      history.push(URLS.RESTAURANTS + qs.stringify(newParams));
    }
  };

  const handleUpdatePage = (page: number) => {
    const oldParams = qs.parse(location.search);
    if(!oldParams) {
      history.push(URLS.RESTAURANTS + qs.stringify( {page}))
    } else {
      const newParams = {
        ...oldParams,
        ...{page}
      }
      history.push(URLS.RESTAURANTS + qs.stringify(newParams));
    }
  };

  return (
    <MainSite className='restaurantsPage'>
      <PageContainer>
        <SideBar>
          <SideBarHeader>
            <Heading>{L.filterRestaurants}</Heading>
          </SideBarHeader>
          <SideBarContent>
            <RestaurantFilters
              queryParams={queryParams}
              onUpdateFilter={handleUpdateFilters}/>
          </SideBarContent>
        </SideBar>
        <Page>
          <PageHeader>
            <SectionHead>{L.restaurantsTitle}</SectionHead>
          </PageHeader>
          <PageContent>
            <Restaurants
              queryParams={queryParams}
              searchString={location.search}
              onUpdatePage={handleUpdatePage}/>
          </PageContent>
        </Page>
      </PageContainer>
    </MainSite>
  )
}

export default RestaurantsPage;
