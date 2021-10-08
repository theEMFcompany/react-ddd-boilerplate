import React, {useEffect} from 'react';
import {Block} from 'components/Block';
import {Heading} from 'components/Text';
import {requirementsCollator as L} from 'resources/locales';
import { BlockGrid, BlockGridCell } from 'components/BlockGrid';
import {ClickBox} from 'components/ClickBox';
import {Connect} from 'lib/Connect';
import * as T from '../types';

type StoreProps = Pick<T.TemplateTypeState, 'isFetching' | 'items' | 'selected'>;
type Actions = Pick<T.Actions, 'fetchTemplateTypes' | 'setTemplateType'>;
interface Props extends StoreProps {
  onSelect?(key: string): void;
  actions: Actions;
}

export const _TemplateType: React.FC<Props> = (props) => {
  useEffect(() => {
    props.actions.fetchTemplateTypes();
  }, []);
  const templateTypes = props.items.map((type, index) => (
    <BlockGridCell key={type.key}>
      <ClickBox
        active={props.selected === type.key}
        className='templateType'
        label={type.label}
        image={type.image}
        imageType={type.imageType}
        onClick={() => {
          props.actions.setTemplateType(type.key);
          props.onSelect && props.onSelect(type.key);
        }}/>
      </BlockGridCell>
  ))
  return (
    <Block>
      <Heading align='center' leading='3' size='6' weight='black'>{L.templateType.heading}</Heading>
      <BlockGrid>
        {templateTypes}
      </BlockGrid>
    </Block>
  );
};


export const TemplateType = Connect<Props, 'onSelect'>(([actions, stores]) => {
  return ({
    items: stores.GeneratorEditor.templateType.items,
    isFetching: stores.GeneratorEditor.templateType.isFetching,
    selected: stores.GeneratorEditor.templateType.selected,
    actions: {
      setTemplateType: actions.GeneratorEditor.setTemplateType,
      fetchTemplateTypes: actions.GeneratorEditor.fetchTemplateTypes,
    }
  })
})(_TemplateType);
