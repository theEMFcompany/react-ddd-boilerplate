import React from 'react';

export type WrapSizes = 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large'
interface WrapProps {
  width?: WrapSizes;
  className?: string;
}

export const Wrap: React.FC<WrapProps> = (props) => {
  const size: WrapSizes = props.width || 'large';
  return(
    <div className={`wrap ${props.className || ''} wrap--${size}`}>
      {props.children}
    </div>
  );
}
