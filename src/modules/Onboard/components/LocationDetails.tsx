import  React from 'react';
import{ Block, Wrap, Space } from 'components/Scaffold';
import{ Title, Text, Heading, Meta} from "components/Text/";
import FieldStack, { TextField, FieldRow, SelectFieldSet } from 'components/FieldStack';
import * as locales from 'resources/locales';
import {countries} from 'data/country'
import * as T from 'modules/Onboard/types';

interface Props {
  values: any;
  onUpdate(key: string, value: string): void;
}

const AccountType: React.FC<Props> = (props)=>(
  <Wrap width='small'>
    <Block padding={{top: 10, bottom: 10}}>
      <Title align='center'>{locales.onboard.locationDetails.title}</Title>
      <Text align='center'>{locales.onboard.locationDetails.description}</Text>
      <FieldStack onSubmit={() => {
        // props.onSubmit()
      }}>
        <FieldRow center>
          <SelectFieldSet
            value={props.values.country}
            onChange={value => {
              console.log(value)
              props.onUpdate('country', value)
            }}
            options={countries}
            label={locales.onboard.locationDetails.form.country}/>
        </FieldRow>
        <FieldRow center>
          <TextField  value={props.values.state} onChange={e => {
            props.onUpdate('state', e.target.value)
            }} label={locales.onboard.locationDetails.form.state}/>
        </FieldRow>
      </FieldStack>
      <Space margin bottom1>
        <Meta align='center'>{locales.onboard.locationDetails.form.helpText}</Meta>
      </Space>
    </Block>
  </Wrap>
);

export default AccountType;
