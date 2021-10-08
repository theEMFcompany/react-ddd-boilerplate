import React from 'react';

export interface KeyboardEventWithValue extends React.KeyboardEvent<HTMLInputElement> {
  target: HTMLInputElement;
}

interface Props {
  name?: string;
  disabled?: boolean;
  type?: TextFieldTypes;
  value?: string | number;
  error?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  min?:number;
  max?:number;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): any;
  onKeyDown?(e: KeyboardEventWithValue): any;
  onKeyUp?(e: KeyboardEventWithValue): any;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): any;
  onFocus?(e: React.FocusEvent<HTMLInputElement>): any;
}

export type TextFieldTypes = 'email' | 'text' | 'password' | 'url' | 'number';

export const TextField: React.FC<Props> = (props) => {

  const isRequired = props.required && true;

  return (
      <div className={`field textField-wrap ${props.className || ''}`}>

          <input  name={props.name}
                  disabled={props.disabled}
                  type={props.type}
                  className='textField-input'
                  onChange = {props.onChange}
                  onBlur={props.onBlur}
                  onFocus={props.onFocus}
                  onKeyDown={props.onKeyDown}
                  min={props.min}
                  max={props.max}
                  onKeyUp={props.onKeyUp}
                  value = {props.value}
                  placeholder={props.placeholder}
                  required={isRequired} />

          <label  className={`textField-label ${props.value === '' ?'' : 'textField-label--dirty' } ${props.error? 'textField-error': ''}`}
                  htmlFor={props.name}>
              {props.error || props.label}
          </label>
      </div>
  );

}

export default TextField;
