import  React from 'react';
import { Block, Wrap, Space } from 'components/Scaffold';
import { Text, Title, Heading, Meta } from 'components/Text';
import FieldStack, { TextField, FieldRow } from 'components/FieldStack';
import * as T from 'modules/Onboard/types';
import * as locales from 'resources/locales';

const ACCOUNT_TYPES = [
    {
        name: 'Creator',
        value: T.ACCOUNT_TYPE.CREATOR,
        iconClass: 'wireless-mouse'
    },
    {
        name: 'Agency',
        value: T.ACCOUNT_TYPE.AGENCY,
        iconClass: 'pen-nib'
    },
    {
        name: 'Company',
        value: T.ACCOUNT_TYPE.COMPANY,
        iconClass: 'drwaing-tablet'
    }
];

interface Props {
  values: any;
  onUpdate(key: string, value: string ): void;
}

const AccountType: React.FC<Props> = (props) => (
  <Wrap width='small'>
    <Block padding={{top: 10, bottom: 10}}>
      <Title align='center'>{locales.onboard.userInfo.title}</Title>
      <Text align='center'>{locales.onboard.userInfo.description}</Text>
      <FieldStack onSubmit={() => {
        // props.onSubmit()
      }}>
        <FieldRow center>
          <TextField value={props.values.username} onChange={e => {
            props.onUpdate('username', e.target.value)
            }} label={locales.onboard.userInfo.form.username}/>
        </FieldRow>
      </FieldStack>
      <Space margin bottom1>
        <Meta align='center'>{locales.onboard.userInfo.form.helpText}</Meta>
      </Space>
    </Block>
  </Wrap>
);

export default AccountType;
