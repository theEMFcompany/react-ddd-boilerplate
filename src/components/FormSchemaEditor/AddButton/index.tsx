import React from 'react';
import Icon from 'components/Icon';
import {Text} from 'components/Text';

interface AddButtonProps {
  text?: string;
  onClick(): void;
}

export function AddButton(props: AddButtonProps) {
  return (
    <div onClick={props.onClick} className='formSchemaEditor__addFieldArea'>
      <span className='formSchemaEditor__addFieldArea__button'>
        <Icon icon='add' fillColor='light-gray' fillShade='100'/>
      </span>
      {
        props.text
        ?<span className='formSchemaEditor__addFieldArea__label'><Text>{props.text}</Text></span>
        :null
      }
    </div>
  );
}
