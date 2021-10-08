import React from 'react';
import Icon from 'components/Icon';

interface Props {
  count: number;
}

export const Rating: React.FC<Props> = ({count=0}: Props) => {

  const halfCount = (count%1)* 10;
  const emptyCount = 5 - Math.ceil(count);

  let starDeck = [];
  let i, j; // Counter variables for For loops
  // Map full star icons to rating index
  for ( i = 1; i <= count; i++ ) {
    starDeck.push(<Star key = {`star-${i}`}/>);
  }
  // Map half star icon to rating float
  if (halfCount >= 5) {
    starDeck.push(<HalfStar key = {`half-star`}/>)
  }else if(halfCount) {
    starDeck.push(<NullStar key = {`null-star`}/>)
  };

  // Fill remainder with empty star
  for (j = 1; j <= emptyCount; j++) {
    starDeck.push(<NullStar key = {`nullStar-${j}`}/>);
  }
  return (<span>{starDeck}</span>);
};

export function Star(){
  return (
    <span className = 'star-rated'><Icon icon={['fas', 'star']} fillColor='secondary' fillShade='2'/></span>
  )
}

export function HalfStar(){
  return (
    <span className = 'half-star-rated'><Icon icon={['fas', 'star-half-alt']} fillColor='secondary' fillShade='2'/></span>
  )
}

export function NullStar(){
  return (
    <span className = 'half-star-rated'><Icon icon={['far', 'star']} fillColor='secondary' fillShade='2'/></span>
  )
}

export default Rating;
