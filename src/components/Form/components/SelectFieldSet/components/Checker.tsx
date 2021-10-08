import    React from 'react';

interface Props {
  style: CHECKER_STYLE;
  disabled: boolean;
  checked: boolean;
  onChange?(checkedState: boolean): void;
}

export enum CHECKER_STYLE {
  SPHERE = 'sphere',
  TICK = 'tick'
}

export const Checker: React.FC<Props> = (props) => {

  const disabledStateClass = props.disabled && 'checker-disabled';
  const checkedStateClass = props.checked && 'checker-checked';

  function setStyleClass(style: CHECKER_STYLE, checked: boolean){
    if(style===CHECKER_STYLE.TICK){
      return checked? 'checker-box icofont icofont-check' :'checker-box icofont icofont-close';
    } else if(style===CHECKER_STYLE.SPHERE){
      return checked? ' checker-sphere checker-sphere-checked' :'checker-sphere checker-sphere-checked';
    }
  }

  return(
    <span  className={`checker ${checkedStateClass} ${disabledStateClass} ${setStyleClass(props.style, props.checked)}`}
      onClick={_handleCheckedStateChange.bind(null, props.checked)}>
    </span>
  );

  function _handleCheckedStateChange(checkedState: boolean){
    if(props.onChange && typeof props.onChange === 'function'){
      props.onChange(!checkedState);
    }
  }

}
