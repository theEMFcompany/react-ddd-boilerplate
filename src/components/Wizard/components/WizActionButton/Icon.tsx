import React from "react";
import Icon from 'components/Icon';
type Direction = 'backward' | 'forward';
interface Props {
  direction: Direction | null;
}

export const ActionIcon: React.FC<Props> = (props) =>{
  return props.direction
    ?<Icon
        className={`wizard-action-icon wizard-action-icon-${props.direction}`}
        icon={
          props.direction === 'backward'
            ? 'arrow-left'
            : 'arrow-right'
        }
        fillColor={
          props.direction === 'backward'
            ? 'dark-gray'
            : 'light-gray'
        }
        fillShade={
          props.direction === 'backward'
            ? '900'
            : '100'
        }/>
    :null;
}
