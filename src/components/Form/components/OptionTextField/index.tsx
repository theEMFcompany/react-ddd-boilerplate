import React from 'react';

interface Props {
  name?: string;
  disabled?: boolean;
  value?: string;
  error?: string;
  label?: string;
  required?: boolean;
  className?: string;
  min?:number;
  max?:number;
  options: string[];
  onChange?(e: React.ChangeEvent<HTMLInputElement>): any;
  onKeyDown?(e: React.KeyboardEvent): any;
  onKeyUp?(e: React.KeyboardEvent): any;
  onBlur?(e: React.FocusEvent): any;
  onFocus?(e: React.FocusEvent): any;
}

export const OptionTextField: React.FC<Props> = (props: Props) => {

  const dataListOptions = props.options.map( (option, index)=>{
    return (
      <option value={option} key={`option_${option.replace(' ', '-')}_${index}`}/>
    )
  })

  return(
      <div className={`textField-wrap ${props.className}`}>
        <input
          name={props.name}
          disabled = {props.disabled}
          list = {`${props.name}_options`}
          className ='textField-input'
          onChange = {props.onChange}
          value = {props.value}
          required={props.required} />

        <label
          className={`textField-label ${props.value === '' ?'' : 'textField-label--dirty' } ${props.error? 'textField-error': ''}`}
          htmlFor={props.name}>
            {props.error || props.label}
        </label>

        <datalist id = {`${props.name}_options`}>
          {dataListOptions}
        </datalist>

      </div>
  );
}

export default OptionTextField;
