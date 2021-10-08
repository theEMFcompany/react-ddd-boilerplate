import React from 'react';
import {color, Color, ColorShades} from 'utils/style'

interface Props {
  fillColor?: Color;
  fillShade?: ColorShades;
  size?: string;
  className?: string;
}
export const Loader: React.FC<Props> = (props) => {

  const backgroundColor = color(props.fillColor as Color, props.fillShade as ColorShades, 'border');
  return(
    <div className={`loader ${props.className}`}>
      <div className={`quad-1 quad ${backgroundColor}`}></div>
      <div className={`quad-2 quad ${backgroundColor}`}></div>
      <div className={`quad-3 quad ${backgroundColor}`}></div>
      <div className={`quad-4 quad ${backgroundColor}`}></div>
    </div>
  );
}

Loader.defaultProps = {
  fillColor: 'primary',
  fillShade: '700'
}

export default Loader;
