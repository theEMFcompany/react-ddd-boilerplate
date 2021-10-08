import React from 'react';
import {string} from 'utils';

interface Props {
  currency?: CURRENCY;
  amount: number;
  unit?: string;
}

export enum CURRENCY {
  NAIRA = '₦',
  DOLLAR = '$',
  POUNDS = '#'
}

export const Price: React.FC<Props> = (props) => {
  const currency = props.currency || CURRENCY.DOLLAR;
  return (
      props.amount === 0
        ? <span className = 'price'>FREE</span>
        : props.unit
          ? <span className = 'price'>
              <span className='price__currency'>
                {currency}
              </span>
              {
                string.maskPrice(props.amount)
              }
              <small>/{props.unit}</small>
            </span>
          : <span className = 'price'>
              <span className='price__currency'>{currency}</span>
              <span>{string.maskPrice(props.amount)}</span>
            </span>
  );
}

export default Price;
