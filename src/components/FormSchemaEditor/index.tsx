import React, {useEffect, useState} from 'react';
import {FormDataSchema, FormUISchema, EditableTextField, getKeyStringFromArray} from 'components/Form';
import { InsertBlock } from './InsertBlock';
import { SectionEditor } from './SectionEditor';
import {Text} from 'components/Text';
import hashSum from 'hash-sum';

interface Props {
  onUpdate?(updates: {schema: FormDataSchema; uiSchema: FormUISchema}): void;
  dataSchema: FormDataSchema;
  uiSchema: FormUISchema;
}

export const FormSchemaEditor: React.FC<Props> = (props: Props) => {
  const [_dataSchema, setDataSchema] = useState(props.dataSchema);
  const [_uiSchema, setUISchema] = useState(props.uiSchema);

  function saveUpdates(schema: FormDataSchema = props.dataSchema, uiSchema: FormUISchema = props.uiSchema) {
    if(props.onUpdate) {
      props.onUpdate({
        schema,
        uiSchema: uiSchema
      })
    } else {
      setDataSchema(schema)
      setUISchema(uiSchema)
    }
  }

  const dataSchema = props.onUpdate ? props.dataSchema : _dataSchema;
  const uiSchema = props.onUpdate ? props.uiSchema : _uiSchema;

  return (
    <div className='formSchemaEditor'>
      <div className='formSchemaEditor__titleArea'>
        <Text weight='bold' size='4'>Title</Text>
        <EditableTextField
          value={dataSchema.title || ''}
          onChange={(value) => {
            const newDataSchema = {
              ...dataSchema,
              title: value
            };
            saveUpdates(newDataSchema);
          }}/>

        <Text weight='bold' size='4'>Overview</Text>
        <EditableTextField
          value={dataSchema.description || ''}
          multiline
          onChange={(value) => {
            const newDataSchema = {
              ...dataSchema,
              description: value
            }
            saveUpdates(newDataSchema);
          }}/>
      </div>
      <div className='formSchemaEditor__fieldsArea'>
        {
          dataSchema.properties && Object.keys(dataSchema.properties).length > 0
            ?<Text weight='bold' leading='2' size='4'>Questions</Text>
            :<InsertBlock
                fullKey={[]}
                onDropField={() => {}}
                onAddField={insertData => {
                  const newDataSchema = {...dataSchema};
                  addNodeAfterKey([], newDataSchema, insertData.schema);
                  saveUpdates(newDataSchema);
                }}/>
        }
        {
          dataSchema.properties
          ? Object.entries(dataSchema.properties).map(([sectionKey, sectionSchema], index) => {
            return (
              <SectionEditor
                key={sectionKey}
                fieldKey={sectionKey}
                dataSchema={sectionSchema}
                uiSchema={uiSchema || {}}
                required={dataSchema.required ? dataSchema.required.indexOf(sectionKey) !== -1 : false}
                index={index}
                onUpdateField={(keys, data) => {
                  const newDataSchema = {...dataSchema};
                  updateNodeAtKey([...keys], newDataSchema, data.schema);
                  updateRequiredKey([...keys], newDataSchema, data.required);
                  const newUISchema = {
                    ...uiSchema,
                    fields: {
                      ...(uiSchema.fields ? uiSchema.fields : {}),
                      [getKeyStringFromArray(keys)]: data.uischema
                    }
                  }
                  saveUpdates(newDataSchema, newUISchema);
                }}
                onMoveField={(from, to) => {
                  const newDataSchema = {...dataSchema};
                  moveNode(from, to, newDataSchema);
                  saveUpdates(newDataSchema);
                }}
                onAddField={(keys, insertData) => {
                  const newDataSchema = {...dataSchema};
                  const addedKey = addNodeAfterKey([...keys], newDataSchema, insertData.schema);
                  updateRequiredKey(keys.concat(addedKey), newDataSchema, insertData.required);
                  const newUISchema = {
                    ...uiSchema,
                    fields: {
                      ...uiSchema?.fields,
                      [getKeyStringFromArray(keys.concat(addedKey))]: insertData.uischema
                    }
                  }
                  saveUpdates(newDataSchema, newUISchema);
                }}
                onDeleteField={(keys: string[]) => {
                  const newDataSchema = {...dataSchema};
                  deleteNodeAtKey([...keys], newDataSchema);
                  updateRequiredKey([...keys], newDataSchema, false);
                  const newUISchema = {...uiSchema};
                  newUISchema.fields && delete newUISchema.fields[getKeyStringFromArray(keys)];
                  saveUpdates(newDataSchema, newUISchema);
                }}
                onDuplicateField={(keys: string[]) => {
                  const newDataSchema = {...dataSchema};
                  const dupKey = duplicateNodeAtKey([...keys], newDataSchema);
                  const newUISchema = {
                    ...uiSchema,
                    fields: {
                      ...(uiSchema.fields || {}),
                      [getKeyStringFromArray(keys.concat(dupKey))]: uiSchema.fields?.[getKeyStringFromArray(keys)] || {}
                    }
                  };
                  saveUpdates(newDataSchema, newUISchema);
                }}
                onChange={(state) => {
                  const newDataSchema = {
                    ...dataSchema,
                    properties: {
                      ...dataSchema.properties,
                      [sectionKey]: {
                        ...sectionSchema,
                        ...state
                      }
                    }
                  };
                  setDataSchema(newDataSchema);
                  saveUpdates(newDataSchema);
                }}/>
            );
          })
          : null
        }
      </div>
    </div>
  );

  function moveNode(from: string[], to: string[], tree: FormDataSchema): void {

    let fromData: FormDataSchema = {};
    from.forEach((key) => {
      fromData = tree.properties ? {...tree.properties[key]} : fromData;
    });
    const fromKey = from[from.length - 1];
    deleteNodeAtKey(from, tree);
    addNodeAfterKey(to, tree, fromData, fromKey);
  }

  function addNodeAfterKey(keys: string[], tree: FormDataSchema, node: FormDataSchema, useKey?: string): string {
    const currentKey = keys.pop();
    if(currentKey && keys.length !== 0 && tree.properties && tree.properties[currentKey]) {
      return addNodeAfterKey(keys, tree.properties[currentKey], node, useKey);
    } else if(currentKey && keys.length === 0 && tree.properties && tree.properties[currentKey]) {
      const newTreeProps: Record<string, FormDataSchema> = {};
      let key = useKey || '';

      Object.entries(tree.properties).reduce((sum, cur) => {
        sum[cur[0]] = cur[1];
        if(cur[0] === currentKey) {
          key = useKey || hashSum(node);
          sum[key] = node;
        }
        return sum;
      }, newTreeProps)
      tree.properties = newTreeProps;
      return key;
    } else {
      const key = useKey || hashSum(node);
      tree.properties
        ? (tree.properties[key] = node)
        : (tree.properties = {
          [key]: node
        });
      return key;
    }
  }

  function duplicateNodeAtKey(keys: string[], tree: FormDataSchema): string {
    const currentKey = keys.pop();
    if(currentKey && keys.length !== 0 && tree.properties && tree.properties[currentKey]) {
      return duplicateNodeAtKey(keys, tree.properties[currentKey]);
    }
    let key = '';
    if(currentKey && keys.length === 0 && tree.properties && tree.properties[currentKey]) {
      const newTreeProps: Record<string, FormDataSchema> = {};
      Object.entries(tree.properties).reduce((sum, cur) => {
        sum[cur[0]] = cur[1];
        if(cur[0] === currentKey) {
          key = hashSum(currentKey + Date.now());
          sum[key] = cur[1];
        }
        return sum;
      }, newTreeProps)
      tree.properties = newTreeProps;
      return key;
    }
    return key;
  }

  function deleteNodeAtKey(keys: string[], tree: FormDataSchema): void {
    const currentKey = keys.pop();
    if(currentKey && keys.length !== 0 && tree.properties && tree.properties[currentKey]) {
      return deleteNodeAtKey(keys, tree.properties[currentKey]);
    }
    if(currentKey && keys.length === 0 && tree.properties && tree.properties[currentKey]) {
      const newTreeProps: Record<string, FormDataSchema> = {};

      Object.entries(tree.properties).reduce((sum, cur) => {
        if(cur[0] === currentKey) {
          return sum;
        }
        sum[cur[0]] = cur[1];
        return sum;
      }, newTreeProps)
      tree.properties = newTreeProps;
    }
  }

  function updateNodeAtKey(keys: string[], tree: FormDataSchema, node: FormDataSchema): void {
    const currentKey = keys.pop();
    if(currentKey && keys.length !== 0 && tree.properties && tree.properties[currentKey]) {
      return updateNodeAtKey(keys, tree.properties[currentKey], node);
    }
    if(currentKey && keys.length === 0 && tree.properties && tree.properties[currentKey]) {
      const newTreeProps: Record<string, FormDataSchema> = {};

      Object.entries(tree.properties).reduce((sum, cur) => {
        if(cur[0] === currentKey) {
          sum[cur[0]] = node;
          return sum;
        }
        sum[cur[0]] = cur[1];
        return sum;
      }, newTreeProps)
      tree.properties = newTreeProps;
    }
  }

  function updateRequiredKey(keys: string[], tree: FormDataSchema, required: boolean): void {
    const currentKey = keys.pop();
    if(currentKey && keys.length > 1 && tree.properties && tree.properties[currentKey]) {
      return updateRequiredKey(keys, tree.properties[currentKey], required);
    }
    if(currentKey && keys.length <= 1) {
      const requiredKey = keys.pop() || currentKey;
      if(requiredKey && required) {
        tree.required = [...(tree.required || []), requiredKey]
      } else if (requiredKey && tree.required && tree.required.includes(requiredKey)) {
        const requiredIndex = tree.required.indexOf(requiredKey);
        tree.required = tree.required.slice(0, requiredIndex).concat(tree.required.slice(requiredIndex + 1));
      }
    }
  }
};
