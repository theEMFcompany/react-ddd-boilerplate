import React, { ReactElement, useState } from 'react';
import MultiLineField from '../MultiLineField/';
import DateField from '../DateField/';
import TextField, { TextFieldTypes } from '../TextField/';
import TimeField from '../TimeField/';
import SelectFieldSet from '../SelectFieldSet';
import OptionTextField from '../OptionTextField/';
import UploadField from '../UploadField/';

import EditableTextField from '../EditableTextField/';
import { JSONSchema6 } from 'json-schema';

interface Props {
  field?: Field;
  dataSchema?: FormDataSchema;
  data?: Data;
  disabled?: Disabled;
  errors?: FieldError;
  actions?: Actions;
  onSubmit?(event: React.FormEvent<HTMLFormElement>): void
  render?(props: RenderProps): ReactElement;
}

interface State {
  values: Record<string, string>;
  errors: Record<string, string>;
  disabled: Record<string, boolean>;
}

interface RenderProps extends Required<Pick<Props, 'disabled' | 'errors' | 'data' | 'actions'>> { }

interface Actions {
  onKeyDown?: KeyboardAction;
  onKeyUp?: KeyboardAction;
  onChange?: ChangeAction;
  onBlur?: FocusAction;
  onFocus?: FocusAction;
  onToggleMultiSelect?: ChangeAction;
}

type ChangeAction = (name: string, value: string, event: React.ChangeEvent) => void;
type FocusAction = (name: string, value: string, event: React.FocusEvent) => void;
type KeyboardAction = (name: string, value: string, event: React.KeyboardEvent) => void;

interface ExtendedJSONSchema extends JSONSchema6 {
  anyOf?: Pick<JSONSchema6, 'title' | 'type' | 'description' | 'enum' | 'properties'>[];
}

export interface FormDataSchema extends ExtendedJSONSchema {
  properties?: Record<string, FormDataSchema>;
};

export interface FormUISchema {
  'ui:widget'?: string;
  fields?: {
    [key: string]: FormUISchema;
  }
}

export function getKeyStringFromArray(keys: string[]): string {
  return keys.join(':');
}

export interface Field {
  key: string;
  label: string;
  type: FieldTypes;
  description?: string;
  fields?: Record<string, Field>;
}

type Data = Record<string, string>;

type FieldError = Record<string, string>;

type Disabled = Record<string, boolean>;

type FieldTypes = TextFieldTypes | 'multiline-text' | 'editable-text' | 'option-text' | 'date' | 'time' | 'select' | 'upload';

/**
 * Act as a wrapper for form fields.
 * Passes form props from store to the function passed to render prop
 */
export const Form: React.FC<Props> = (props) => {

  const actions = {
    ...props.actions,
  };

  return (
    typeof props.render === 'function'
      ? props.render({ data: props.data || {}, actions, errors: props.errors || {}, disabled: props.disabled || {} })
      : props.children
        ?<form
          className='fieldWrap'
          onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit && typeof props.onSubmit === 'function' && props.onSubmit(e)
          }}>
            {props.children}
          <div className={`form-error-message ${props.errors && props.errors.value ? 'show-element' : 'hide-element'}`} >{props.errors && props.errors.value}</div>
        </form>
        :props.field
          ?renderFieldItem({
            field: props.field,
            formProps: props,
            data: props.data,
            actions: actions,
            errors: props.errors,
            disabled: props.disabled
          })
          : null
  );
};

interface FieldItemProps {
  field: Field,
  formProps: Props,
  data?: Data,
  actions: Actions,
  errors?: FieldError,
  disabled?: Disabled
}

function renderFieldItem (props: FieldItemProps): ReactElement {
  const defaultValues: Record<string, string> = {}
  const defaultErrors: Record<string, string> = {}
  const defaultDisabled: Record<string, boolean> = {}
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState(defaultErrors);
  const [disabled, setDisabled] = useState(defaultDisabled);

  const isDisabled = props.formProps.disabled || props.disabled || disabled[props.field.key] ? true : false;
  const hasError = props.errors && props.errors[props.field.key] ? props.errors[props.field.key] : errors[props.field.key];

  const name = props.field.key;
  const label = props.field.label;
  const type = props.field.type;
  const value = props.data && props.data[props.field.key]
    ? props.data[props.field.key]
    : values[props.field.key];

  const onChange: React.EventHandler<React.ChangeEvent> = e => props.actions && props.actions.onChange && props.actions.onChange(props.field.key, value, e);
  const onBlur: React.EventHandler<React.FocusEvent> = e => props.actions && props.actions.onBlur && props.actions.onBlur(props.field.key, value, e);
  const onFocus: React.EventHandler<React.FocusEvent> = e => props.actions && props.actions.onFocus && props.actions.onFocus(props.field.key, value, e);
  const onKeyDown: React.EventHandler<React.KeyboardEvent> = e => props.actions && props.actions.onKeyDown && props.actions.onKeyDown(props.field.key, value, e);
  const onKeyUp: React.EventHandler<React.KeyboardEvent> = e => props.actions && props.actions.onKeyUp && props.actions.onKeyUp(props.field.key, value, e);

  const Field = getFieldType(props.field.type);
  const fields = Object.keys(props.field.fields || {}).map(f => props.field.fields ? props.field.fields[f] : null);

  return (
    <Field
      type={type}
      disabled={isDisabled}
      error={hasError}
      label={label}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      name={name}
      value={value}>
      <>
        {
          fields.map((_field, index) => {

            return _field && _field !== null
            ?renderFieldItem({
              field: _field,
              formProps: props,
              data: props.data,
              actions: props.actions,
              errors: props.errors,
              disabled: props.disabled,
            })
            : null;
          })
        }
      </>
    </Field>
  );

  function getFieldType(type: FieldTypes) {
    return {
      'text': TextField,
      'password': TextField,
      'url': TextField,
      'email': TextField,
      'number': TextField,
      'tel': TextField,
      'multiline-text': MultiLineField,
      'editable-text': EditableTextField,
      'option-text': OptionTextField,
      'date': DateField,
      'time': TimeField,
      'select': SelectFieldSet,
      'upload': UploadField
    }[type];
  }
}

export default Form;
