import React, {useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {Connect} from 'lib/Connect';
import { Block } from 'components/Block';
import { Space } from 'components/Space';
import { Wrap } from 'components/Wrap';
import { Text, Title, Meta } from 'components/Text';
import { TextField, FieldRow, Form } from 'components/Form';
import Button, {ButtonGroup} from 'components/Button';
import { Link, Redirect} from 'react-router-dom';
import * as T from '../types';
import {URLS} from 'resources/urls';
import * as locales from 'resources/locales';

interface Props {
  status: T.STATUS;
  statusMessage: string;
  actions: Pick<T.Actions, 'loginUser'>;
}

export const Login: React.FC<Props> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  if(props.status === T.STATUS.LOGGED_IN) {
    return <Redirect to={URLS.DASHBOARD}/>
  }
  return(
    <Wrap width='small'>
      <Block padding={{top: '5', bottom: '5'}}>
        <Title align='center'>{locales.auth.loginTitle}</Title>
        <Form
          onSubmit={() => {props.actions.loginUser(email, password)}}
          disabled={{value: props.status === T.STATUS.LOGGIN_IN, fields:{}}}
          errors={{value: props.statusMessage, fields: {}}}>
          <FieldRow center>
            <TextField type='email' label='Email' value={email} onChange={e => setEmail(e.target.value)}/>
          </FieldRow>
          <FieldRow center>
            <TextField type='password' label='Password' value={password} onChange={e => setPassword(e.target.value)}/>
          </FieldRow>
          <ButtonGroup>
            <Button className='field' size='large' as='submit' expand loading={props.status === T.STATUS.LOGGIN_IN}>{locales.auth.loginAction}</Button>
          </ButtonGroup>
        </Form>
        <Space margin top1 bottom1>
          <Meta align='center' ><Link to={URLS.RECOVER_PASSWORD}>{locales.auth.loginFooter[0]}</Link></Meta>
        </Space>
        <Space margin top1 bottom1>
          <Meta align='center'>{locales.auth.loginFooter[1]} <Link to={URLS.SIGN_UP}>{locales.auth.loginFooter[2]}</Link></Meta>
        </Space>
      </Block>
    </Wrap>
  );
};

export default Connect<Props>(([actions, stores]) => {
  return ({
    status: stores.Auth.status,
    statusMessage: stores.Auth.statusMessage,
    actions: {
      loginUser: actions.Auth.loginUser
    }
  })
})(Login);
