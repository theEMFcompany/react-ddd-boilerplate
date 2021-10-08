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
  activeView: T.RECOVER_VIEW;
  actions: Pick<T.Actions, 'recoverPassword' | 'setRecoverView'>;
}

export const Recover: React.FC<Props> = (props) => {
  const [email, setEmail] = useState('');
  const verify = (
    <Wrap width='small'>
      <Block padding={{top: 10, bottom: 10}}>
        <Title align='center'>{locales.auth.forgotPasswordTitle}</Title>
        <Text align='center'>{locales.auth.forgotPasswordBody}</Text>
        <FieldStack onSubmit={() => {
          props.actions.recoverPassword && typeof props.actions.recoverPassword === 'function' && props.actions.recoverPassword(email)
        }}>
          <FieldRow center>
            <TextField type='email' value={email} onChange={e => {
              setEmail(e.target.value)
              }} label={locales.auth.inputLabels.email}/>
          </FieldRow>
          <ButtonGroup>
            <Button className='field' size='large' expand as='submit' text={locales.auth.inputLabels.forgotPassword}/>
          </ButtonGroup>
        </FieldStack>
        <Space margin top1 bottom1>
          <Meta align='center'>{locales.auth.forgotPasswordExit[0]}<Link to={URLS.LOGIN}>{locales.auth.forgotPasswordExit[1]}</Link></Meta>
        </Space>
      </Block>
    </Wrap>
  );

  const successMessage = (
    <Wrap width='small'>
      <Block padding={{top: 10, bottom: 10}}>
        <Title align='center'>{locales.auth.forgotPasswordSuccessTitle}</Title>
        <Text align='center'>{locales.auth.forgotPasswordSuccessBody}</Text>
        <Space margin top1 bottom1>
          <Meta align='center'>{locales.auth.forgotPasswordSuccessRetry[0]}<Button onClick={() => props.actions.setRecoverView(T.RECOVER_VIEW.RESET)}>{locales.auth.forgotPasswordSuccessRetry[1]}</Button></Meta>
        </Space>
      </Block>
    </Wrap>
  );

  const errorMessage = (
    <Wrap width='small'>
      <Block padding={{top: 10, bottom: 10}}>
        <Title align='center'>{locales.auth.forgotPasswordErrorTitle}</Title>
        <Text align='center'>{locales.auth.forgotPasswordErrorBody}</Text>
        <Space margin top1 bottom1>
          <Text align='center'>{locales.auth.forgotPasswordErrorRetry[0]}<Button onClick={() => props.actions.setRecoverView(T.RECOVER_VIEW.RESET)}>{locales.auth.forgotPasswordErrorRetry[1]}</Button></Text>
        </Space>
      </Block>
    </Wrap>
  );

  const loading = (
    <Wrap width='small'>
      <Block padding={{top: 10, bottom: 10}}>
        <Title align='center'>{locales.auth.forgotPasswordLoadingTitle}</Title>
        <Text align='center'>{locales.auth.forgotPasswordLoadingBody}</Text>
        <Space margin top1 bottom1>
          <Loader />
        </Space>
      </Block>
    </Wrap>
  );

  return {
    [T.RECOVER_VIEW.RESET]: verify,
    [T.RECOVER_VIEW.SUCCESS]: successMessage,
    [T.RECOVER_VIEW.ERROR]: errorMessage,
    [T.RECOVER_VIEW.LOADING]: loading
  }[props.activeView];
};

export default Connect<Props>(([actions, stores]) => {
  return ({
    activeView: stores.Auth.recoverView,
    actions: {
      setRecoverView: actions.Auth.setRecoverView,
      recoverPassword: actions.Auth.recoverPassword
    }
  })
})(Recover);
