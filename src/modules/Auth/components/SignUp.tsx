import React, {useState, useEffect} from 'react';
import {Connect} from 'lib/Redalt';
import { Block, Wrap, Space } from 'components/Scaffold';
import { Text, Title, Meta } from 'components/Text';
import { TextField, FieldRow } from 'components/FieldStack';
import Button, {ButtonGroup} from 'components/Button';
import { Link, Redirect, useParams} from 'react-router-dom';
import * as T from '../types';
import {URLS} from 'resources/urls';
import * as locales from 'resources/locales';
import FieldStack from 'components/FieldStack/components/FieldStack';
import Loader from 'components/Loader';

interface Props {
  status: T.STATUS;
  statusMessage: string;
  email: string;
  onLoggedIn(): void;
  actions: Pick<T.Actions, 'signUpUser' | 'verifyAccessToken'>;
}

export const SignUp: React.FC<Props> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(props.status === T.STATUS.LOGGED_IN) {
      props.onLoggedIn && typeof props.onLoggedIn === 'function' && props.onLoggedIn();
    }
  }, [props.email, props.status]);

  if(props.status === T.STATUS.SIGNING_UP) {
    return <Loader/>
  }

  return (
    <Wrap width='small'>
      <Block padding={{top: 10, bottom: 10}}>
        <Title align='center'>{locales.auth.tryForFree}</Title>
        <Text align='center'>{locales.auth.joinOurCommunity}</Text>
        <FieldStack
          onSubmit={() => {props.actions.signUpUser(props.email, password)}}
          // disabled={{value: props.status === T.STATUS.SIGNING_UP}}
          errors={{value: props.statusMessage}}>
          <FieldRow center>
            <TextField disabled={true} label='Email' value={props.email} onChange={e => setEmail(e.target.value)} required={false}/>
          </FieldRow>
          <FieldRow center>
            <TextField label='Password' type='password' value={password} onChange={e => setPassword(e.target.value)}/>
          </FieldRow>
          <ButtonGroup>
            <Button className='field' size='large' as='submit' expand loading={props.status === T.STATUS.SIGNING_UP}>{locales.auth.inputLabels.createAccount}</Button>
          </ButtonGroup>
        </FieldStack>
        <Space margin top1 bottom1>
          <Meta align='center' >{locales.auth.acceptTerms[0]}
            <Link to={URLS.TERMS}>{locales.auth.acceptTerms[1]}</Link>{locales.auth.acceptTerms[2]}
            <Link to={URLS.PRIVACY_POLICY}>{locales.auth.acceptTerms[3]}</Link>
          </Meta>
        </Space>
        <Space margin top1 bottom1>
          <Meta align='center'>
            {locales.auth.alreadyHaveAccount[0]}
            <Link to={URLS.LOGIN}>{locales.auth.alreadyHaveAccount[1]}</Link>
          </Meta>
        </Space>
      </Block>
    </Wrap>
  );
};

export default Connect<Props, 'onLoggedIn'>(([actions, stores]) => {
  return ({
    email: stores.Auth.signUpEmail,
    status: stores.Auth.status,
    statusMessage: stores.Auth.statusMessage,
    actions: {
      signUpUser: actions.Auth.signUpUser,
      verifyAccessToken: actions.Auth.verifyAccessToken
    }
  })
})(SignUp);
