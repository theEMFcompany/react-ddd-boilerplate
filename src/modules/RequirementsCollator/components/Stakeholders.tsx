import React, {useEffect, useState} from 'react';
import {Block} from 'components/Block';
import {Wrap} from 'components/Wrap'
import {Heading} from 'components/Text';
import {requirementsCollator as L} from 'resources/locales';
import TagMap from 'components/TagMap';
import {Loader} from 'components/Loader';
import {Connect} from 'lib/Connect';
import * as T from '../types';

type StoreProps = Pick<T.RequirementFieldsState, 'isFetching'  | 'schemaId'>;
type Actions = Pick<T.Actions, 'fetchRequirementsFields'>;
interface Props extends StoreProps {
  actions: Actions;
}

export const StakeHolders: React.FC<Props> = (props) => {
  useEffect(() => {
    // props.actions.fetchRequirementsFields(props.schemaId);
  }, []);

  return (
    <Block>
      <Heading align='center' leading='3' size='6' weight='black'>{L.stakeholders.heading}</Heading>
      <Wrap>
        <Block align='center'>
        <TagMap label={L.stakeholders.emailFieldLabel}/>
        </Block>
      </Wrap>
    </Block>
  );
};


export default Connect<Props>(([actions, stores]) => {
  return ({
    isFetching: stores.GeneratorEditor.requirementFields.isFetching,
    schemaId: stores.GeneratorEditor.requirementFields.schemaId,
    actions: {
      fetchRequirementsFields: actions.GeneratorEditor.fetchRequirementsFields,
    }
  })
})(StakeHolders);
