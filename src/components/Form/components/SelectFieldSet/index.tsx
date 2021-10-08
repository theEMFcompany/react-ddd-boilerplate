import React, {useState, useRef} from 'react';
import Icon, {IconType} from 'components/Icon';
import {SelectOption} from './components/SelectOption';
import {SelectListItem} from './components/SelectListItem';
import {CHECKER_STYLE} from './components/Checker';
export * from './components/SelectBox';
export * from './components/SelectOption';
export * from './components/SelectListItem';

interface Props {
  name?: string;
  label: string;
  value?: string | string[];
  options: SelectOption[];
  onChange(value: string | string[]): void;
  className?: string;
  disabled?: boolean;
  as?: SELECT_STYLE;
  multiple?: boolean;
}

export enum SELECT_STYLE {
  DROPDOWN = 'dropdown',
  BUTTON = 'button'
}

interface SelectOption {
  name: string;
  value: string;
  icon?: IconType;
}

interface State {
  dropdownVisible: boolean;
}

const SelectFieldSet: React.FC<Props> = (props: Props) => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(props.value ? (Array.isArray(props.value) ? props.value : [props.value] ) : []);
  const selectRef = useRef<HTMLDivElement>(null);

  const optionList = props.options.map( (option, index)=>{
    return (
      <SelectListItem
        key={`check-${option.value}-${index}`}
        icon={option.icon}
        checkerStyle={CHECKER_STYLE.SPHERE}
        disabled={props.disabled || false}
        checked={selectedOptions.includes(option.value) ? true: false}
        label={option.name}
        onChange={() => {
          const newValue = option.value
          let newOptions = [...selectedOptions];
          if(newOptions.includes(newValue)) {
            const index = newOptions.indexOf(newValue);
            newOptions = newOptions.slice(0, index).concat(newOptions.slice(index + 1));
          }
          else if(props.multiple) {
             newOptions.push(newValue)
          } else {
            newOptions[0] = newValue;
          }
          setSelectedOptions(newOptions);
          props.onChange(option.value);
          if(props.multiple) {
            props.onChange(newOptions);
          } else {
            props.onChange(newValue);
            toggleDropdown(false);
          }
        }}/>
    )
  });

  const selected = props.options.find(option => {
    return option.value === selectedOptions[0];
  });
  const moreText = selectedOptions.length > 1 ? ` + ${selectedOptions.length - 1} more` : '';
  return (
    <div
      tabIndex={1}
      ref={selectRef}
      className={`field selectFieldSet ${props.className || ''}`}
      onFocus={() => toggleDropdown(true)}
      onBlur={() => toggleDropdown(false)}>
        <div className={`selectField ${dropdownVisible ? 'selectField--active' : ''}`}>
          <div
            className={`selectFieldMask${dropdownVisible ? '--active' : ''}`}
            onClick={() => dropdownVisible && toggleDropdown(false)}/>
          <span key='value' className='selectField__value'>{selected ? selected.name + moreText : 'Not Selected'}</span>
          <Icon key='option' className='selectField__caret' icon='angle-down'/>
          <span key='label' className='selectField__label'>{props.label}</span>
        </div>
        <div className={`selectField__list ${dropdownVisible ? 'selectField__list--active' : ''}`}>{optionList}</div>
    </div>
  );

  function toggleDropdown(dropdownState = false) {
    !dropdownState && selectRef?.current?.blur();
    setDropdownVisible(dropdownState);
  }
}

export default SelectFieldSet;
