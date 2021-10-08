import React from 'react';
import {Heading, Meta, Text} from 'components/Text';
import {Block} from 'components/Block';
import Card, {CardSection, CardFooter, CardHeader} from 'components/Card';
import Price, {CURRENCY} from 'components/Price';
import Rating from 'components/Rating/index';
import * as T from '../types';
import {restuarants as L} from 'resources/locales';

interface Props {
  data: T.Restaurant;
}

export default function Restaurant(props: Props) {
  return (
    <Card className='restaurantListing' hoverEffect>
      <CardHeader>
          <Heading className='restaurantName' leading='1'>{props.data.name}</Heading>
          <Block>
            <Rating count={props.data.aggregate_rating}/>
            <Text size='small'>{props.data.aggregate_rating} {L.ratingFrom} {props.data.votes || 'all'} {L.diners}</Text>
          </Block>

      </CardHeader>
      <CardSection>
        <Block>
          <Meta label={L.countryLabel} leading='1'>{props.data.country}</Meta>
          <Meta label={L.addressLabel} leading='1'>{props.data.address}</Meta>
          <Meta label={L.currencyLabel} leading='1'>{props.data.currency}</Meta>
          <Meta label={L.cuisinesLabel} leading='1'>{props.data.cuisines.join(' | ')}</Meta>
          <Meta label={L.priceRangeLabel} leading='1'>{props.data.price_range}</Meta>
        </Block>
      </CardSection>
      <CardFooter>
        <Text weight='bold' size='medium'>
          <Price amount={props.data.average_cost_for_two} unit=' couple' currency={CURRENCY.DOLLAR}/>
        </Text>
      </CardFooter>
    </Card>
  );
}
