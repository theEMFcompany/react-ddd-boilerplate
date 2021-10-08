import React, {useState}  from 'react';
import {Connect} from 'lib/Redalt';
import { Block, Wrap, Space } from 'components/Scaffold';
import { Text, Title, Meta } from 'components/Text';
import { TextField, FieldRow } from 'components/FieldStack';
import Button, {ButtonGroup} from 'components/Button';
import { Link, useParams } from 'react-router-dom';
import * as locales from 'resources/locales';
import * as T from '../types';
import FieldStack from 'components/FieldStack/components/FieldStack';
import { URLS } from 'resources/urls';

interface Props {
  actions: Pick<T.Actions, 'resetPassword'>;
}

export const Reset: React.FC<Props> = (props) => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const {token} = useParams<{token: string}>();
  const passwordsMatch = password && repeatPassword && password === repeatPassword;
  return(
    <Wrap width='small'>
      <Block padding={{top: 10, bottom: 10}}>
        <Title align='center'>{locales.auth.resetPasswordTitle}</Title>
        <Text align='center'>{locales.auth.resetPasswordBody}</Text>
        <FieldStack onSubmit={() => {
          props.actions.resetPassword && typeof props.actions.resetPassword === 'function' && props.actions.resetPassword(token, password);
        }}>
          <FieldRow center>
            <TextField label={locales.auth.inputLabels.password} type='password' value={password} onChange={e => {
              setPassword(e.target.value)
              }}/>
          </FieldRow>
          <FieldRow center>
            <TextField label={locales.auth.inputLabels.repeatPassword} type='password' value={repeatPassword} onChange={e => {
              setRepeatPassword(e.target.value)
              }} error={passwordsMatch ? '' : 'Passwords do not match'}/>
          </FieldRow>
          <ButtonGroup>
            <Button as='submit' className='field' size='large' expand disabled={!passwordsMatch}>{locales.auth.inputLabels.forgotPassword}</Button>
          </ButtonGroup>
        </FieldStack>
        <Space margin top1 bottom1>
          <Meta align='center'>{locales.auth.resetPasswordExit[0]}<Link to={URLS.LOGIN}>{locales.auth.resetPasswordExit[1]}</Link></Meta>
        </Space>
      </Block>
    </Wrap>
  );
};

export default Connect<Props>(([actions, stores]) => {
  return ({
    actions: {
      resetPassword: actions.Auth.resetPassword
    }
  })
})(Reset);
