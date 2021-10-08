import React from 'react';
import {color, Color, ColorShades} from 'utils/style';

export type IconType = 'add' |
'arrow-right' |
'arrow-left' |
'angle-down' |
'angle-up' |
'close' |
'delete' |
'duplicate' |
'edit' |
'grid' |
'justify' |
'num-lock' |
'portfolio-grid' |
'power-button';
export type IconSize = '2x' | '3x' | '4x' | '5x' | '6x';

interface Props {
  icon: IconType;
  className?: string;
  align?: 'center' | 'left' | 'right';
  size?: IconSize;
  fillColor?: Color;
  fillShade?: ColorShades;
  onClick?(e: React.MouseEvent<HTMLOrSVGElement>): void
}

export const Icon: React.FC<Props> = (props) => {
  let classes = '';
  classes += `${props.align ? 'align-block-' + props.align : ''} `// **** NEVER remove trailing whitespace
  classes += props.className || '';

  const imageSrc = {
    'add': '/img/ui-elements.svg#add-1',
    'arrow-right': '/img/ui-elements.svg#arrow-right-1',
    'arrow-left': '/img/ui-elements.svg#arrow-left-1',
    'close': '/img/ui-elements.svg#close-1',
    'angle-down': '/img/ui-elements.svg#angle-down-1',
    'angle-up': '/img/ui-elements.svg#angle-up-1',
    'delete': '/img/ui-elements.svg#delete-1',
    'duplicate': '/img/ui-elements.svg#add-layer-1',
    'edit': '/img/ui-elements.svg#edit-1',
    'portfolio-grid': '/img/ui-elements.svg#portfolio-grid-1',
    'grid': '/img/ui-elements.svg#portfolio-grid-1',
    'justify': '/img/ui-elements.svg#justify-1',
    'power-button': '/img/ui-elements.svg#shutdown-1',
    'num-lock': '/img/ui-elements.svg#num-lock-key-1'
  }

  const colorClass = `icon-${color(props.fillColor || 'primary', props.fillShade || '400', 'color')}`;

  return (
    <svg
      className={`iconClass ${classes} ${colorClass}`}
      onClick={props.onClick}>
      <use xlinkHref={imageSrc[props.icon]}></use>
    </svg>
  );
}

export default Icon;
