import React, {useState} from 'react';
import { Block } from 'components/Block';
import {Meta} from 'components/Text';

interface Props {
  label?: string;
  id?: string;
  name: string;
  checked?: boolean;
  className?: string;
  onChange(value: boolean): void
}

const Switch: React.FC<Props> = (props: Props) => {
  return (
    <span className={`field toggleField ${props.className || ''}`}>
      <span className="switch small">
        <input
          className="switch-input"
          id={props.id || props.name}
          type="checkbox"
          name={props.name}
          checked={props.checked ? true : false}
          onChange={e => {
            props.onChange(e.target.checked)
          }}/>
        <label className="switch-paddle" htmlFor={props.id || props.name}>
          <span className="show-for-sr"></span>
        </label>
      </span>
      <label className='toggleField--label' htmlFor={props.id || props.name}>{props.label}</label>
    </span>
  )
};

export default Switch;
