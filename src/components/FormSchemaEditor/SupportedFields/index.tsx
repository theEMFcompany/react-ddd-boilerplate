import React, { useState } from 'react';
import Icon from 'components/Icon';
import {FormDataSchema, FormUISchema, EditableTextField} from 'components/Form';
import {InsertForm, InsertData} from '../InsertBlock';

interface Props {
  fullKey: string[];
  dataSchema: FormDataSchema;
  uiSchema: FormUISchema;
  required: boolean;
  onReorder?(): void;
  onDelete(): void;
  onDuplicate(): void;
  onUpdate(data: InsertData): void;
  onChange: (state: FormDataSchema) => void;
}

export function SupportedFields(props: Props) {
  const [isEditing, setEditing] = useState(false);
  const supportedFieldEditors =  {
    'string': <FieldEditor
      key={props.fullKey.join(':')}
      required={props.required}
      fullKey={props.fullKey}
      dataSchema={props.dataSchema}
      onEdit={() => setEditing(true)}
      onReorder={() => props.onReorder && props.onReorder()}
      onDelete={() => props.onDelete()}
      onDuplicate={() => props.onDuplicate()}
      onChange={handleChange}/>,
    'array': <ArrayFieldEditor
      key={props.fullKey.join(':')}
      required={props.required}
      fullKey={props.fullKey}
      dataSchema={props.dataSchema}
      onEdit={() => setEditing(true)}
      onReorder={() => props.onReorder && props.onReorder()}
      onDelete={() => props.onDelete()}
      onDuplicate={() => props.onDuplicate()}
      onChange={handleChange}/>,
    'number': <NumberFieldEditor
      key={props.fullKey.join(':')}
      required={props.required}
      fullKey={props.fullKey}
      dataSchema={props.dataSchema}
      onEdit={() => setEditing(true)}
      onReorder={() => props.onReorder && props.onReorder()}
      onDelete={() => props.onDelete()}
      onDuplicate={() => props.onDuplicate()}
      onChange={handleChange}/>,
    'boolean': <BooleanFieldEditor
      key={props.fullKey.join(':')}
      required={props.required}
      fullKey={props.fullKey}
      dataSchema={props.dataSchema}
      onEdit={() => setEditing(true)}
      onReorder={() => props.onReorder && props.onReorder()}
      onDelete={() => props.onDelete()}
      onDuplicate={() => props.onDuplicate()}
      onChange={handleChange}/>,
    'object': <UnsupportedField key={props.fullKey.join(':')} dataSchema={props.dataSchema}/>,
    'integer': <UnsupportedField key={props.fullKey.join(':')} dataSchema={props.dataSchema}/>,
    'null': <UnsupportedField key={props.fullKey.join(':')} dataSchema={props.dataSchema}/>,
    'any': <UnsupportedField key={props.fullKey.join(':')} dataSchema={props.dataSchema}/>,
  };

  function handleChange(state: FormDataSchema) {
    props.onChange({
      ...props.dataSchema,
      ...state
    });
  }

  if(isEditing) {
    return <InsertForm
      data={{
        schema: props.dataSchema,
        uischema: props.uiSchema,
        required: props.required,
      }}
      fullKey={props.fullKey}
      cancelText='Cancel'
      submitText='Update'
      onDiscard={() => setEditing(false)}
      onInsert={(data) => {
        props.onUpdate(data);
        setEditing(false);
      }}/>
  }

  return props.dataSchema.type && typeof props.dataSchema.type === 'string'
    ?supportedFieldEditors[props.dataSchema.type]
    :<UnsupportedField dataSchema={props.dataSchema}/>;
}

export interface FieldEditorProps {
  fullKey: string[];
  required?: boolean;
  dataSchema: FormDataSchema;
  onEdit(): void;
  onDelete(): void;
  onDuplicate(): void;
  onReorder?(): void;
  onChange(state: FormDataSchema): void;
}

function FieldEditor (props: FieldEditorProps) {
  const [isDragging, setIsDragging] = useState(false);
  return (
    <div
      className={`fieldSchemaEditor ${isDragging? 'fieldSchemaEditor--isDragging' : ''}`}
      draggable
      onDragStart={e => {
        e.dataTransfer.setData('fullKey', props.fullKey.join(':'));
        setTimeout(() => {
          setIsDragging(true);
        }, 100);
      }}
      onDragEnd={() => {
        setIsDragging(false);
      }}>
      <section className='fieldSchemaEditor__mainArea'>
        <div className='fieldSchemaEditor__title'>
          <EditableTextField
            placeholder='Title'
            value={props.dataSchema.title || ''}
            onChange={(value) => {
              props.onChange({
                ...props.dataSchema,
                title: value
              })
            }}/>
        </div>

        <div className='fieldSchemaEditor__description'>
          <EditableTextField
            placeholder='Description (Optional)'
            size='small'
            value={props.dataSchema.description || ''}
            onChange={(value) => {
              props.onChange({
                ...props.dataSchema,
                description: value
              })
            }}/>
        </div>
      </section>
      <section className='fieldSchemaEditor__extrasArea'>
        <span className='fieldSchemaEditor__attributes'>
          {
            props.required
              ? <span className='fieldSchemaEditor__attributes__item'>*Required</span>
              : null
          }
          <span className='fieldSchemaEditor__attributes__item'>{props.dataSchema.type}</span>
        </span>
        <section className='fieldSchemaEditor__actions'>
          <span className='fieldSchemaEditor__actions__icon' onClick={props.onEdit}>
            <Icon icon='edit' fillColor='dark-gray' fillShade='500'/>
          </span>
          <span className='fieldSchemaEditor__actions__icon' onClick={props.onDuplicate}>
            <Icon icon='duplicate' fillColor='dark-gray' fillShade='500'/>
          </span>
          <span className='fieldSchemaEditor__actions__icon' onClick={props.onDelete}>
            <Icon icon='delete' fillColor='dark-gray' fillShade='500'/>
          </span>
        </section>
      </section>
    </div>
  );
}

function NumberFieldEditor(props: FieldEditorProps) {
  return (
    <FieldEditor
      fullKey={props.fullKey}
      dataSchema={props.dataSchema}
      onEdit={props.onEdit}
      onReorder={props.onReorder}
      onChange={props.onChange}
      onDelete={props.onDelete}
      onDuplicate={props.onDuplicate}></FieldEditor>
  );
}
function ArrayFieldEditor(props: FieldEditorProps) {
  return (
    <FieldEditor
      fullKey={props.fullKey}
      dataSchema={props.dataSchema}
      onEdit={props.onEdit}
      onReorder={props.onReorder}
      onChange={props.onChange}
      onDelete={props.onDelete}
      onDuplicate={props.onDuplicate}></FieldEditor>
  );
}
function BooleanFieldEditor(props: FieldEditorProps) {
  return (
    <FieldEditor
      fullKey={props.fullKey}
      dataSchema={props.dataSchema}
      onEdit={props.onEdit}
      onReorder={props.onReorder}
      onChange={props.onChange}
      onDelete={props.onDelete}
      onDuplicate={props.onDuplicate}></FieldEditor>
  );
}
function UnsupportedField(props: Pick<FieldEditorProps, 'dataSchema'>) {
  return (
    <div className='fieldSchemaEditor fieldSchemaEditor--unsupported'>
      {`${props.dataSchema.title} is unsupported.`}
    </div>
  );
}
