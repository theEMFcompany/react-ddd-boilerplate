import  React, {ReactElement, useEffect, useState} from 'react';
import { Block } from 'components/Block';
import { Space } from 'components/Space';
import Button, {ButtonGroup} from 'components/Button';
import {Text} from 'components/Text';
import {Connect} from 'lib/Connect';
import * as T from '../types';
import {getWidget} from './WidgetHelper';
import {restuarants as L} from 'resources/locales';

interface Props extends Pick<T.State,
'filters' |
'isFetchingFilters'> {
  queryParams: T.FilterParams;
  onUpdateFilter(params?: T.FilterParams): void;
  actions: Pick<T.Actions, 'fetchFilters'>
}

const RestaurantFilters: React.FC<Props> = (props: Props) => {

  useEffect(() => {
    props.actions.fetchFilters();
  }, ['true']);

  const [params, setParams] = useState(props.queryParams);

  let timeOut: NodeJS.Timeout;

  let filterContent: ReactElement[] | ReactElement = (
    <Block>
      <Text align='center'>{L.noFilters}</Text>
    </Block>
  );

  if(Array.isArray(props.filters) && props.filters.length > 0 && !props.isFetchingFilters) {
    filterContent = props.filters.map((filter, index) => {
      return (
        <Space key={filter.key} margin bottom1>
          {
            getWidget({
              filter: filter,
              onChange: (key, value, auto) => {
                if(key) {
                  handleUpdateParams({[key]: value});
                    auto && handleAutoSubmitFilters({[key]: value});
                }
              },
              currentParams: params
            })
          }
        </Space>
      );
    })
  }

  return (
    props.isFetchingFilters
      ? <Block>{L.loadingFilters}</Block>
      :<Block>
        {filterContent}
        <Space margin top3>
          <ButtonGroup>
            <Button
              pair
              style='hollow'
              text={L.clearFilters}
              onClick={handleClearParams}/>
            <Button
              pair
              text={L.filterCTA}
              onClick={handleSubmitFilters}/>
          </ButtonGroup>
        </Space>
      </Block>
  )

  function handleClearParams(): void {
    setParams({});
    props.onUpdateFilter();
  }

  function handleUpdateParams(_params: T.FilterParams): void {
    setParams({...params, ..._params});
  }

  function handleSubmitFilters(): void {
    console.log(params)
    props.onUpdateFilter(params);
  }

  function handleAutoSubmitFilters(_params: T.FilterParams): void {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      props.onUpdateFilter(_params)
    }, 1000);
  }
}

export default Connect<Props, 'queryParams' | 'onUpdateFilter'>(([actions, stores]) => {
  return ({
    filters: stores.Restaurant.filters,
    isFetchingFilters: stores.Restaurant.isFetchingFilters,
    actions: {
      fetchFilters: actions.Restaurant.fetchFilters
    }
  })
})(RestaurantFilters);
