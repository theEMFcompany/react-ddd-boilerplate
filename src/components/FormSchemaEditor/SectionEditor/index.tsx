import React from 'react';
import {FormDataSchema, FormUISchema, getKeyStringFromArray} from 'components/Form';
import {SupportedFields} from '../SupportedFields';
import {InsertBlock, InsertData} from '../InsertBlock';

interface Props {
  fieldKey: string;
  dataSchema: FormDataSchema;
  uiSchema: FormUISchema;
  required: boolean;
  onUpdateField(keys: string[], data: InsertData): void;
  onMoveField(from: string[], to: string[]): void;
  onDeleteField(keys: string[]): void;
  onDuplicateField(keys: string[]): void;
  onAddField(keys: string[], data: InsertData): void;
  onChange(data: FormDataSchema): void;
  index: number;
}

export function SectionEditor(props: Props) {
  if(props.dataSchema.properties && props.dataSchema.type === 'object') {
    const children = Object.entries(props.dataSchema.properties).map(([fieldKey, fieldValue], index) => {
      return (
        <div className='sectionSchemaEditor' key={`${props.fieldKey}--editor`}>
          <SupportedFields
            key={[props.fieldKey, fieldKey].join(':')}
            fullKey={[props.fieldKey, fieldKey]}
            uiSchema={props.uiSchema.fields? props.uiSchema.fields[getKeyStringFromArray([props.fieldKey, fieldKey])] : {}}
            dataSchema={fieldValue}
            required={props.dataSchema.required ? props.dataSchema.required.indexOf(fieldKey) !== 1 : false}
            onUpdate={(data) => props.onUpdateField([props.fieldKey, fieldKey], data)}
            onDelete={() => props.onDeleteField([props.fieldKey, fieldKey])}
            onDuplicate={() => props.onDuplicateField([props.fieldKey, fieldKey])}
            onChange={(state) => {
              props.onChange({
                ...props.dataSchema,
                properties: {
                  [fieldKey]: {
                    ...state
                  }
                }
              });
            }}/>
            <InsertBlock
              fullKey={[props.fieldKey, fieldKey]}
              onDropField={(fullKey) => {
                props.onMoveField(fullKey, [props.fieldKey, fieldKey])
              }}
              onAddField={(data) => {
                props.onAddField([props.fieldKey, fieldKey], data);
              }}
              isMuted/>
        </div>
      );
    });

    return <>{children}</>;

  } else {
    return (
      <div className='sectionSchemaEditor' key={`${props.fieldKey}--editor`}>
        <SupportedFields
          key={props.fieldKey}
          fullKey={[props.fieldKey]}
          dataSchema={props.dataSchema}
          uiSchema={props.uiSchema.fields? props.uiSchema.fields[getKeyStringFromArray([props.fieldKey])] : {}}
          required={props.required}
          onUpdate={(data) => props.onUpdateField([props.fieldKey], data)}
          onDelete={() => props.onDeleteField([props.fieldKey])}
          onDuplicate={() => props.onDuplicateField([props.fieldKey])}
          onChange={props.onChange}/>
        <InsertBlock
          fullKey={[props.fieldKey]}
          onDropField={(fullKey) => {
            props.onMoveField(fullKey, [props.fieldKey]);
          }}
          onAddField={(data) => {
          props.onAddField([props.fieldKey], data);
        }} isMuted/>
      </div>
    );
  }
}
