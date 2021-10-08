import  React from 'react';
import{ Block, Wrap, Space } from 'components/Scaffold';
import{ Text, Title } from "components/Text/";
import * as locales from 'resources/locales';
import * as T from 'modules/Onboard/types';
import { Compare } from 'components/Compare';

const SUBCRIPTIONS = [
    {
        name: 'Professional',
        value: T.SUBSCRIPTION_PLAN.PROFESSIONAL,
        price: 99.99,
        features: [{
          label: 'Multiseat',
          status: 'unchecked',
        },{
          label: 'Multiseat',
          status: 'checked',
        },{
          label: 'Global Shares',
        }],
        recommended: false
    },
    {
        name: 'Studio',
        value: T.SUBSCRIPTION_PLAN.STUDIO,
        price: 199.99,
        features: [{
          label: 'Multiseat',
          status: 'checked',
        },{
          label: 'Multiseat',
          status: 'checked',
        }],
        recommended: true
    },
    {
        name: 'Enterprise',
        value: T.SUBSCRIPTION_PLAN.ENTERPRISE,
        price: 349.99,
        features: [{
          label: 'Multiseat',
          status: 'checked',
        },{
          label: 'Custom Themes',
          status: 'checked',
        }],
        recommended: false
    }
];

interface Props {
  values: any;
  onUpdate(key: string, type: T.SUBSCRIPTION_PLAN): void;
}

const AccountType: React.FC<Props> = (props)=>(
    <Block flex axis='y' align='center' justify='center' padding={{top: 3}}>
      <Title align='center'>{locales.onboard.subscriptionPlan.title}</Title>
      <Space margin bottom3>
        <Text align='center'>{locales.onboard.subscriptionPlan.description}</Text>
      </Space>

      <Wrap width='large'>
        <Compare
          amountUnit='year'
          items={SUBCRIPTIONS.map(plan => ({
            key: plan.value,
            title: plan.name,
            amount: plan.price,
            features: plan.features,
            highlighted: plan.recommended}))}
          onSelect={(selectedIndex => props.onUpdate('subscriptionPlan', SUBCRIPTIONS[selectedIndex].value))}/>
      </Wrap>
    </Block>
);

export default AccountType;
