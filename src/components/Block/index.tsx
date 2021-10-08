import React from 'react';
import {
  color,
  elevation,
  display,
  spacing,
  FlexDirection,
  FlexChildPosition,
  SpacingConfig,
  Color,
  ColorShades,
  ElevationLevel} from 'utils/style'

interface Props {
  as?: React.ElementType;
  axis?: FlexDirection;
  justify?: FlexChildPosition;
  align?: FlexChildPosition;
  className?: string;
  fillColor?: Color;
  fillShade?: ColorShades;
  elevation?: ElevationLevel;
  padding?: SpacingConfig;
  expand?: boolean;
  divider?: boolean;
  flex?: boolean;
  collapse?: boolean;
  style?: Record<string, unknown>;
}

export const Block: React.FC<Props> = (props) => {

  const className = props.className ? props.className : '';
  const setJustification = display(props.axis || 'x', props.justify, props.align),
        setBackgroundColor = color(props.fillColor, props.fillShade),
        setBlockPadding = spacing('padding', props.padding),
        setElevation = elevation(props.elevation);

  const classes = 'block' + ' ' +
    className  + ' '+
    setJustification + ' ' +
    setBackgroundColor + ' '+
    setBlockPadding + ' '+
    setElevation

  return React.createElement(
    props.as || 'div',
    {
      className: classes,
      style: {...props.style}
    },
    props.children
  );
}
