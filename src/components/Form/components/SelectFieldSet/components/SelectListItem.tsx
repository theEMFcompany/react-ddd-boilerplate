import    React from 'react';
import {Checker, CHECKER_STYLE} from './Checker';
import Icon, {IconType} from 'components/Icon';
import * as T from '../types';

interface Props extends T.SelectItemProps{
  checkerStyle: CHECKER_STYLE;
  icon?: IconType;
}
export const SelectListItem: React.FC<Props>  = (props) => {

  const disabledStateClass = props.disabled && 'selectField__listItem--disabled';
  const checkedStateClass = props.checked && 'selectField__listItem--checked';

  return(
    <div     className={`selectField__listItem ${checkedStateClass} ${disabledStateClass}`}
             onClick={!props.disabled ? props.onChange : () => {}}>


        {
          props.icon
            ?<span className='selectField__listItem__icon'>
              <Icon icon={props.icon} fillColor={props.checked ? 'primary' : 'dark-gray'}/>
            </span>
            :<span className='selectField__listItem__checker'>
              <Checker style={props.checkerStyle} checked={props.checked} disabled={props.disabled}/>
            </span>
        }

        <span className='selectField__listItem__content'>
          {props.label}
        </span>

    </div>
  );

}
