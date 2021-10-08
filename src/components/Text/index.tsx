import  React from  'react';

import  Icon, {IconType} from 'components/Icon/';
import {color, fontSize, Color, FontSize, ColorShades, WrapWidth} from 'utils/style';

export enum ALIGN {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right'
}

type Align = 'center' | 'left' | 'right';
export enum WEIGHT {
  LIGHT = 'light',
  REGULAR = 'regular',
  BOLD = 'bold',
  BLACK = 'black'
}
type Weight = 'bold' | 'regular' | 'light' | 'black';

interface Props {
  align?: Align;
  center?: boolean;
  icon?: IconType;
  size?: FontSize;
  width?: WrapWidth;
  color?: Color;
  shade?: ColorShades,
  label?: string;
  as?: React.ElementType;
  text?: string;
  className?: string;
  leading?: '1' | '2' | '3';
  inline?: boolean;
  weight?: Weight;
  style?: Record<string, string>;
}

export  const Text: React.FC<Props> = (props) => {

  const getFontSize = (size: string | FontSize) => {
    switch (size){
      case 'small':
        return 'font-size-2';
      break;
      case 'medium':
        return 'font-size-4';
      break;
      case 'large':
        return 'font-size-6';
      break;
      case 'xl':
        return 'font-size--9';
      break;
      default:
        return fontSize(size as FontSize);
    }
  }

  const getFontWeight = (weight: Weight): string  => {
    return {
      [WEIGHT.LIGHT]: 'text--weight--light',
      [WEIGHT.REGULAR]: 'text--weight--regular',
      [WEIGHT.BOLD]: 'text--weight--bold',
      [WEIGHT.BLACK]: 'text--weight--black',
    }[weight];
  }

  let classes = 'text ';
  classes += props.color ? color(props.color, props.shade, 'color') + ' ' : ''
  classes += props.size  ? getFontSize(props.size) + ' ' : ''
  classes += props.inline ? 'inline-type ' : 'block-type '
  classes += props.leading ? `leading-${props.leading || 0} ` : ''
  classes += getFontWeight(props.weight || WEIGHT.REGULAR) + ' '
  classes += props.width ? `wrapWidth--${props.width} ` : ''
  classes += props.center ? 'align-block-center ' : ''
  classes += props.className

  const Body = [
      props.icon ? <Icon icon={props.icon} key='icon' align='left'/> : null,
      props.label ? <em className='label-text-label' key='label'>{props.label}</em> : null,
      props.children,
  ];

  const Element = React.createElement(
    props.as as string || 'span',
    {
      className: classes,
      style: {
        textAlign: props.align || props.align,
        fontWeight: props.weight,
        color,
        ...props.style
      }
    },
    Body
  );
  return Element;
}

export  const Screamer: React.FC<Props> = (props) => {
  return  <Text size='6' {...props} as='h3' weight='bold' className='screamer'>{ props.text || props.children}</Text>
}

export  const Title: React.FC<Props> = (props) => {
  return  <Text size='5' {...props} as='h2' weight='bold' className='title'>{ props.text || props.children}</Text>
}

export  const SectionHead: React.FC<Props> = (props) => {
  return  <Text size='4' {...props} as='h3' weight='bold' className='sectionHead'>{ props.text || props.children}</Text>
}


export  const   Heading: React.FC<Props> = (props) => {
  return <Text size='4' {...props} as='h4' weight='bold' className='heading'>{ props.text || props.children}</Text>
}

export  const   SubHeading: React.FC<Props> = (props) => {
  return  <Text as='h5' size='2' {...props} weight='bold' className='subHeading'>{ props.text || props.children}</Text>
}


export  const Kicker: React.FC<Props> = (props) => {
  return  <Text size='3' {...props} className='kicker'>{ props.text || props.children}</Text>
}


export  const Deck: React.FC<Props> = (props) => {
  return  <Text size='2' {...props} className='deck'>{ props.text || props.children}</Text>
}


export  const Meta: React.FC<Props> =  (props) => {
  return  <Text size='2' {...props}>{ props.text || props.children}</Text>
}
