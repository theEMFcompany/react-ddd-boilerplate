import React, {useEffect, useState} from 'react';
import {Block} from 'components/Block';
import {Heading} from 'components/Text';
import {requirementsCollator as L} from 'resources/locales';
import {FormSchemaEditor} from 'components/FormSchemaEditor';
import {Loader} from 'components/Loader';
import {Connect} from 'lib/Connect';
import * as T from '../types';

type StoreProps = Pick<T.RequirementFieldsState, 'isFetching' | 'data'>;
type Actions = Pick<T.Actions, 'fetchRequirementsFields' | 'updateRequirementsSchema'>;
interface Props extends StoreProps {
  schemaId?: string;
  actions: Actions;
}

export const Requirements: React.FC<Props> = (props) => {
  useEffect(() => {
    props.schemaId && props.actions.fetchRequirementsFields(props.schemaId);
  }, []);

  return (
    props.data && props.data !== null
    ?<Block flex axis='y' align='stretch'>
      <Heading align='center' leading='3' size='8' weight='black'>{L.requirementFields.heading}</Heading>
      <FormSchemaEditor
        dataSchema={props.data.schema}
        uiSchema={props.data.uiSchema}
        onUpdate={(updates) => {
          props.actions.updateRequirementsSchema({
            id: props.schemaId,
            data: updates
          })
        }}/>
    </Block>
    : <Loader/>
  );
};


export default Connect<Props, 'schemaId'>(([actions, stores]) => {
  return ({
    isFetching: stores.GeneratorEditor.requirementFields.isFetching,
    data: stores.GeneratorEditor.requirementFields.data,
    actions: {
      fetchRequirementsFields: actions.GeneratorEditor.fetchRequirementsFields,
      updateRequirementsSchema: actions.GeneratorEditor.updateRequirementsSchema
    }
  })
})(Requirements);
