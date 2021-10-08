import    React from 'react';
import {Checker, CHECKER_STYLE} from './Checker';
import Icon, {IconType} from 'components/Icon';
import * as T from '../types';

interface Props extends T.SelectItemProps {
  checkerStyle: CHECKER_STYLE;
  icon?: IconType;
}
export const SelectOption: React.FC<Props> = (props) => {

  const disabledStateClass = props.disabled && 'selectOption--disabled';
  const checkedStateClass = props.checked && 'selectOption--checked';
  return(
    <span     className={`selectOption ${checkedStateClass} ${disabledStateClass}`}
              onClick={!props.disabled ? props.onChange : () => {}}>

        {
          props.icon
            ?<Icon icon={props.icon}/>
            :<Checker style={props.checkerStyle} checked={props.checked} disabled={props.disabled}/>
        }
        {props.label}

    </span>
  )
}
