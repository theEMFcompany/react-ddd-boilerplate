import  React from 'react';
import{ Block } from 'components/Block';
import{ Title, Text } from "components/Text/";
import  ClickBox from "components/ClickBox";
import * as locales from 'resources/locales';
import * as T from 'modules/Onboard/types';

const ACCOUNT_TYPES = [
    {
        name: 'Creator',
        value: T.ACCOUNT_TYPE.CREATOR,
        icon: 'mouse'
    },
    {
        name: 'Agency',
        value: T.ACCOUNT_TYPE.AGENCY,
        icon: 'handshake'
    },
    {
        name: 'Company',
        value: T.ACCOUNT_TYPE.COMPANY,
        icon: 'users'
    }
];

interface Props {
  values: any;
  onUpdate(key: string, type: T.ACCOUNT_TYPE): void;
}

const AccountType: React.FC<Props> = (props)=>(
    <Block flex axis='y' align='center' justify='center' padding={{top: '3'}}>
        <Title align='center'>{locales.onboard.accountType.title}</Title>
        <Text align='center'>{locales.onboard.accountType.description}</Text>
        <Block flex justify='center' align='center' padding={{bottom: '6'}}>
        {
            ACCOUNT_TYPES.map(account=>(
                    <ClickBox   key={account.value}
                                label={account.name}
                                icon={account.icon}
                                onClick={()=>props.onUpdate('accountType', account.value)}
                                active={props.values.accountType === account.value}/>
            ))
        }
        </Block>
    </Block>
);

export default AccountType;
