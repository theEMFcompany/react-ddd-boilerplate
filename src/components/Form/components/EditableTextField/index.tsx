import React, {useState} from 'react';
import {Text, Meta} from 'components/Text';

interface Props {
  type?: 'text' | 'number';
  size?: 'small' | 'medium'
  multiline?: boolean;
  placeholder?: string;
  label?: string;
  value: string;
  onChange(value: any): void;
}

export const EditableTextField: React.FC<Props> = (props: Props) => {
  const [isEditing, setEditing] = useState(false);

  const displayMode = (
    <div
      className={`editableText ${!props.value ? 'editableText--placeholder' : ''}`}
      onClick={() => setEditing(true)}>
      <Text>
          {props.value || props.placeholder || 'Enter text here'}
      </Text>
    </div>
  );

  const editingMode = (
    props.multiline
    ?<textarea
      placeholder={props.placeholder}
      autoFocus={true}
      onBlur={() => setEditing(false)}
      className={`editableMultiLineTextField`}
      rows={Math.ceil(props.value.split(' ').length / 20)}
      onChange={e => {
        const val = e.target.value
        props.onChange(val);
      }}
      value={props.value}
      onSubmit={() => setEditing(false)}/>
    :<input
      placeholder={props.placeholder}
      autoFocus={true}
      onBlur={() => setEditing(false)}
      className={`editableTextField`}
      type={props.type}
      onChange={e => {
        const val = e.target.value
        props.onChange(val);
      }}
      onSubmit={() => setEditing(false)}
      value={props.value}/>
  );

  return (
    <div title='Click to edit' className={`editableGroup ${props.size ? 'editableGroup--'+props.size : ''}`}>
      {
        props.label &&
        <Text className='editableGroup__label' weight='bold'>
          {props.label}
        </Text>
      }
      <div className={`editableGroup__field ${isEditing ? 'editableGroup__field--editing': ''}`}>
        {isEditing? editingMode: displayMode}
      </div>
    </div>
  );
}
export default EditableTextField;
