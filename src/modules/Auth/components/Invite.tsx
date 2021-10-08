import React, {useState} from 'react';
import {Connect} from 'lib/Redalt';
import { Block, Wrap, Space } from 'components/Scaffold';
import { Text, Title, Meta } from 'components/Text';
import FieldStack, { TextField, FieldRow } from 'components/FieldStack';
import Button, {ButtonGroup} from 'components/Button';
import {URLS} from 'resources/urls';
import { Link } from 'react-router-dom';
import * as T from '../types';
import Loader from 'components/Loader';
import * as locales from 'resources/locales';

interface Props {
  activeView: T.INVITE_VIEW;
  actions: Pick<T.Actions, 'sendInviteEmail' | 'setInviteView'>;
}

export const SignUp: React.FC<Props> = (props) => {
  const [email, setEmail] = useState('');
  const verify = (
    <Wrap width='small'>
      <Block padding={{top: 10, bottom: 10}}>
        <Title align='center'>{locales.auth.verifyEmailTitle}</Title>
        <Text align='center'>{locales.auth.verifyEmailBody}</Text>
        <FieldStack onSubmit={() => {
          props.actions.sendInviteEmail && typeof props.actions.sendInviteEmail === 'function' && props.actions.sendInviteEmail(email)
        }}>
          <FieldRow center>
            <TextField type='email' value={email} onChange={e => {
              setEmail(e.target.value)
              }} label='Email'/>
          </FieldRow>
          <ButtonGroup>
            <Button className='field' size='large' expand as='submit' text='Verify Email'/>
          </ButtonGroup>
        </FieldStack>
        <Space margin top1 bottom1>
          <Meta align='center'>{locales.auth.verifyEmailExit[0]}<Link to={URLS.LOGIN}>{locales.auth.verifyEmailExit[1]}</Link></Meta>
        </Space>
      </Block>
    </Wrap>
  );

  const successMessage = (
    <Wrap width='small'>
      <Block padding={{top: 10, bottom: 10}}>
        <Title align='center'>{locales.auth.verifyEmailSuccessTitle}</Title>
        <Text align='center'>{locales.auth.verifyEmailSuccessBody}</Text>
        <Space margin top1 bottom1>
          <Meta align='center'>{locales.auth.verifyEmailSuccessRetry[0]}
          <Button size='small' style='hollowNeutral' onClick={() => props.actions.sendInviteEmail(T.INVITE_VIEW.VERIFY)}>{locales.auth.verifyEmailSuccessRetry[1]}</Button>
          </Meta>
        </Space>
      </Block>
    </Wrap>
  );

  const errorMessage = (
    <Wrap width='small'>
      <Block padding={{top: 10, bottom: 10}}>
        <Title align='center'>{locales.auth.verifyEmailErrorTitle}</Title>
        <Text align='center'>{locales.auth.verifyEmailErrorBody}</Text>
        <Space margin top1 bottom1>
          <Text align='center'>{locales.auth.verifyEmailErrorRetry[0]}<Button onClick={() => props.actions.setInviteView(T.INVITE_VIEW.VERIFY)}>{locales.auth.verifyEmailErrorRetry[1]}</Button></Text>
        </Space>
      </Block>
    </Wrap>
  );

  const loading = (
    <Wrap width='small'>
      <Block padding={{top: 10, bottom: 10}}>
        <Title align='center'>{locales.auth.verifyEmailLoadingTitle}</Title>
        <Text align='center'>{locales.auth.verifyEmailLoadingBody}</Text>
        <Space margin top1 bottom1>
          <Loader />
        </Space>
      </Block>
    </Wrap>
  );

  return {
    [T.INVITE_VIEW.VERIFY]: verify,
    [T.INVITE_VIEW.SUCCESS]: successMessage,
    [T.INVITE_VIEW.ERROR]: errorMessage,
    [T.INVITE_VIEW.LOADING]: loading
  }[props.activeView];
};

export default Connect<Props>(([actions, stores]) => {
  return ({
    activeView: stores.Auth.inviteView,
    actions: {
      setInviteView: actions.Auth.setInviteView,
      sendInviteEmail: actions.Auth.sendInviteEmail
    }
  })
})(SignUp);
