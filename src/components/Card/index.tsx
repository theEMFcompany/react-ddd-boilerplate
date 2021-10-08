import React from 'react';

interface Props {
 className?: string;
 hoverEffect?: boolean;
 onClick?(e: React.MouseEvent): void;
}
export const Card: React.FC<Props> = (props) => {
  return(
    <div onClick={props.onClick} className = {`card ${props.className} ${props.hoverEffect ? 'card--hoverable' : ''}`}>
      {props.children}
    </div>
  );
}

export const CardHeader: React.FC = ({children}) => {
  return(
    <div className='card__header'>{children}</div>
  );
}

export const CardSection: React.FC = ({children}) => {
  return(
    <div className='card__section'>{children}</div>
  );
}

export const CardFooter: React.FC = ({children}) => {
  return(
    <div className='card__footer'>{children}</div>
  );
}

export default Card
