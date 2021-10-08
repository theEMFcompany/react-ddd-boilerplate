import React, { useState } from 'react';
import {FormDataSchema, FormUISchema, TextField, SelectFieldSet, FieldRow} from 'components/Form';
import Switch from 'components/Switch';
import {Button, ButtonGroup} from 'components/Button';
import {Icon} from 'components/Icon';
import { AddButton } from '../AddButton';
import EditableTextField from 'components/Form/components/EditableTextField';

interface Props {
  fullKey: string[];
  cancelText?: string;
  submitText?: string;
  data?: InsertData;
  onInsert(data: InsertData): void;
  onDiscard(): void;
}

export interface InsertData  {
  schema: FormDataSchema;
  uischema: FormUISchema;
  required: boolean;
}

type SupportedTypes = 'text' | 'number' | 'range' | 'option' | 'boolean'

export const Form: React.FC<Props> = (props: Props) => {

  const initialData: FormDataSchema = {
    title: '',
    description: '',
    type: 'string'
  }

  const initialUI: FormUISchema = {
    'ui:widget': ''
  };

  const [data, setData] = useState<FormDataSchema>(props.data?.schema || initialData);
  const [ui, setUI] = useState<FormUISchema>(props.data?.uischema || initialUI);
  const [required, setRequired] = useState<boolean>(props.data?.required || false);
  const [seletedTypeOption, setSelectedTypeOption] = useState<SupportedTypes>(((): SupportedTypes => {
    if(!props.data) {
      return 'text';
    }

    if(data.anyOf){
      return 'option';
    }
    if(data.type === 'string'){
      return 'text';
    }
    if(data.type === 'object' && (data.properties?.min || data.properties?.max)){
      return 'range';
    }
    if(data.type === 'number'){
      return 'number';
    }
    if(data.type === 'boolean'){
      return 'boolean';
    }
    return 'text'
  })())

  const requiredField = (
    <Switch
      checked={required ? true : false}
      label='Required'
      name={`${props.fullKey.join(':')}--required`}
      onChange={(value) => {
        setRequired(value);
      }}/>
  );

  return (
    <form className='fieldSchemaEditor__insertFields' onSubmit={(e) => {
      e.preventDefault();
      props.onInsert({
        schema: data,
        uischema: ui,
        required: required
      });
      setData(initialData);
    }}>
      <section className='fieldSchemaEditor__insertFields__default'>
        <FieldRow>
          <TextField
            label='Question'
            required
            value={data.title || ''}
            onChange={e => {
              const title = e.target.value;
              setData({
                ...data,
                title
              });
            }}/>
          <TextField
            label='Help Text (Optional)'
            value={data.description || ''}
            onChange={e => {
              const description = e.target.value;
              setData({
                ...data,
                description
              });
            }}/>
          <SelectFieldSet
            label='Response Type'
            onChange={(value: SupportedTypes) => {
              const types: Record<SupportedTypes, () => void> = {
                'text': () => {
                  setData({
                    ...data,
                    type: 'string',
                    anyOf: undefined,
                    enum: undefined
                  });
                  setUI(initialUI);
                  setSelectedTypeOption('text');
                },
                'number': () => {
                  setData({
                    ...data,
                    type: 'number'
                  });
                  setUI(initialUI);
                },
                'boolean': () => {
                  setData({
                    ...data,
                    type: 'boolean'
                  });
                  setUI(initialUI);
                },
                'range': () => {
                  setData({
                    ...data,
                    type: 'object',
                    properties: {
                      min: {
                        title: 'Min',
                        type: 'number'
                      },
                      max: {
                        title: 'Max',
                        type: 'number'
                      }
                    }
                  });
                  setUI(initialUI);
                },
                'option': () => {
                  setData({
                    ...data,
                    type: 'string',
                    anyOf: [{
                      type: 'string',
                      title: 'Option 1',
                      enum: ['option-1']
                    }]
                  });
                  setUI(initialUI);
                }
              };
              types[value]();
            }}
            value={seletedTypeOption}
            options={[{
              name: 'Text',
              value: 'text',
              icon: 'justify'
            },{
              name: 'Number',
              value: 'number',
              icon: 'num-lock'
            },{
              name: 'True/False',
              value: 'boolean',
              icon: 'power-button'
            },
            // {
            //   name: 'Range',
            //   value: 'range'
            // },
            {
              name: 'Predefined Option',
              value: 'option',
              icon: 'grid'
            }]}
          />
        </FieldRow>
      </section>
      <section className='fieldSchemaEditor__insertFields__extras'>
        {
          data.type === 'string' && !data.anyOf
          ?
          <FieldRow>
            <StringOptions
              fullKey={props.fullKey}
              data={{schema: data, uischema: ui, required}}
              onUpdate={(updates) => {
                setData(updates.schema);
                setUI(updates.uischema);
              }}/>
          </FieldRow>
          : null
        }
        {
          data.type === 'string' && data.anyOf
          ?
          <>
          <FieldRow>
            <SelectOptions
              fullKey={props.fullKey}
              data={{schema: data, uischema: ui, required}}
              onUpdate={(updates) => {
                setData(updates.schema);
                setUI(updates.uischema);
              }}/>
          </FieldRow>
          </>
          : null
        }
        {
          data.type === 'number'
          ?
          <FieldRow>
            <NumberOptions
              fullKey={props.fullKey}
              data={{schema: data, uischema: ui, required}}
              onUpdate={(updates) => {
                setData(updates.schema);
                setUI(updates.uischema);
              }}/>
          </FieldRow>
          : null
        }
        {
          data.type === 'boolean'
          ?
          <FieldRow>
            <BooleanOptions
              fullKey={props.fullKey}
              data={{schema: data, uischema: ui, required}}
              onUpdate={(updates) => {
                setData(updates.schema);
                setUI(updates.uischema);
              }}/>
          </FieldRow>
          : null
        }
        {/* {
          data.type === 'object' && data.properties?.min && data.properties?.max
          ?
          <FieldRow>
            <RangeOptions
              fullKey={props.fullKey}
              data={{schema: data, uischema: ui, required}}
              onUpdate={(updates) => {
                setData(updates.schema);
                setUI(updates.uischema);
              }}/>
          </FieldRow>
          : null
        } */}
      </section>
      <section className='fieldSchemaEditor__insertFields__actions'>
          {requiredField}
          <ButtonGroup justify='end'>
            <Button pair style='hollow' color='neutral' size='medium' text={props.cancelText || 'Discard'} onClick={() => {
              props.onDiscard();
            }}/>
            <Button pair as='submit' color='neutral' text={props.submitText || 'Insert'} size='medium'/>
          </ButtonGroup>
      </section>
    </form>);
}


interface OptionsProps {
  fullKey: string[];
  data: InsertData;
  onUpdate(data: InsertData): void;
}

function StringOptions(props: OptionsProps) {
  return (
    <Switch
      checked={props.data.uischema['ui:widget'] === 'textarea' ? true : false}
      label='Use Long Text'
      name={`${props.fullKey.join(':')}--useLongText`}
      onChange={(value) => {
        props.onUpdate({
          ...props.data,
          uischema: {
            ...props.data.uischema,
            'ui:widget': value ? 'textarea' : ''
          }
        })
      }}/>
  );
}

function SelectOptions(props: OptionsProps) {
  type Option = Pick<FormDataSchema, 'title' | 'type' | 'enum' | 'description'>;
  const [options, setOptions] = useState<Option[]>(
    props.data.schema.anyOf || []
  );

  return (
    <div className='fieldSchemaEditor__insertFields__optionsList'>
      {
        options.map((option, index) => {
          return (
            <span className='fieldSchemaEditor__insertFields__optionsList__item'>
              <span className='removeOptionButton'>
                <Icon
                  icon='close'
                  fillColor='mid-gray'
                  fillShade='900'
                  onClick={() => {
                    const optionArr: Option[] = [];

                    const newOptions: Option[] = options.reduce((sum, cur) => {
                      if(cur.enum && option.enum &&  cur.enum[0] === option.enum[0]) {
                        return sum;
                      }
                      sum.push(cur);
                      return sum
                    }, optionArr);

                    setOptions(newOptions);
                    props.onUpdate({
                      ...props.data,
                      schema: {
                        ...props.data.schema,
                        anyOf: newOptions
                      }
                    })
                  }}/>
              </span>
              <EditableTextField
                value={option.title || ''}
                onChange={value => {
                  const optionArr: Option[] = [];

                  const newOptions: Option[] = options.reduce((sum, cur) => {
                    if(cur.enum && option.enum &&  cur.enum[0] === option.enum[0]) {
                      sum.push({
                        ...cur,
                        title: value,
                      });
                      return sum
                    }
                    sum.push(cur);
                    return sum
                  }, optionArr);

                  setOptions(newOptions);
                  props.onUpdate({
                    ...props.data,
                    schema: {
                      ...props.data.schema,
                      anyOf: newOptions
                    }
                  })
                }}/>
            </span>);
        })
      }
      <AddButton onClick={() => {

        const newOptions: Option[] = [
          ...options, {
            title: `Option ${options.length + 1}`,
            enum: [`option-${options.length + 1}`]
          }
        ];
        setOptions(newOptions);
        props.onUpdate({
          ...props.data,
          schema: {
            ...props.data.schema,
            anyOf: newOptions
          }
        });
      }}/>
    </div>
  );
}

function NumberOptions(props: OptionsProps) {

  return  (
    <>
      <TextField label='min' type='number' value={props.data.schema.minimum || 0} onChange={e => props.onUpdate({
        ...props.data,
        schema: {
          ...props.data.schema,
          minimum: Number(e.target.value)
        }
      })}/>
      <TextField label='max' type='number' value={props.data.schema.maximum || 0} onChange={e => props.onUpdate({
        ...props.data,
        schema: {
          ...props.data.schema,
          maximum: Number(e.target.value)
        }
      })}/>
    </>
  );
}

function RangeOptions(props: OptionsProps) {

  return (
    <>
      <TextField label='from' type='number' onChange={e => props.onUpdate({
        ...props.data,
        schema: {
          ...props.data.schema,
          properties: {
            ...props.data.schema.properties,
            min: {
              type: 'number',
              minimum: Number(e.target.value)
            }
          }
        }
      })}/>
      <TextField label='to' type='number' onChange={e => props.onUpdate({
        ...props.data,
        schema: {
          ...props.data.schema,
          properties: {
            ...props.data.schema.properties,
            max: {
              type: 'number',
              maximum: Number(e.target.value)}
          }
        }
      })}/>
    </>
  );
}

function BooleanOptions(props: OptionsProps) {

  return (
    <>
      <TextField label='True Label' type='text' onChange={e => props.onUpdate({
        ...props.data,
        schema: {
          ...props.data.schema
        }
      })}/>
      <TextField label='False Label' type='text' onChange={e => props.onUpdate({
        ...props.data,
        schema: {
          ...props.data.schema
        }
      })}/>
    </>
    );
}
