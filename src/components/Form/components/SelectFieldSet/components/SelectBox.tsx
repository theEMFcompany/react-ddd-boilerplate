import    React from 'react';
import Icon, {IconType} from 'components/Icon';
import * as T from '../types';

interface Props extends T.SelectItemProps {
  icon: IconType;
}

export const SelectBox: React.FC<Props> = (props: Props) => {

  const disabledStateClass = props.disabled? 'selectButton--disabled' : '';
  const checkedStateClass = props.checked? 'selectButton--checked' : '';;

  return(
    <span
      className={`selectButton ${checkedStateClass} ${disabledStateClass}`}
      onClick={!props.disabled ? props.onChange : () => {}}>
        <Icon icon={props.icon}/>
        {props.label}
    </span>
  );

}
