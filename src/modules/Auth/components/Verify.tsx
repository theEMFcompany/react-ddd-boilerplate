import React, { useEffect } from 'react';
import {Connect} from 'lib/Redalt';
import * as T from '../types';
import * as locales from 'resources/locales';
import Loader from 'components/Loader';

interface Props extends Pick<T.State, 'verifyStatus'> {
  accessToken: string;
  onVerificationSuccess?(): void;
  onVerificationFailure?(): void;
  actions: Pick<T.Actions, 'verifyAccessToken'>;
}

export const Verify: React.FC<Props> = (props) => {
  useEffect(() => {
    if(props.verifyStatus === T.VERIFY_STATUS.VERIFIED) {
      props.onVerificationSuccess && typeof props.onVerificationSuccess === 'function' && props.onVerificationSuccess();
    } else if(props.verifyStatus === T.VERIFY_STATUS.UNVERIFIED && props.accessToken) {
      props.actions.verifyAccessToken(props.accessToken);
    } else if(props.verifyStatus === T.VERIFY_STATUS.FAILED) {
      props.onVerificationFailure && typeof props.onVerificationFailure === 'function' && props.onVerificationFailure();
    }
  }, [props.verifyStatus])
  return (
    <Loader/>
  )
};

export default Connect<Props, 'accessToken' | 'onVerificationFailure' | 'onVerificationSuccess'>(([actions, stores]) => {
  return ({
    verifyStatus: stores.Auth.verifyStatus,
    actions: {
      verifyAccessToken: actions.Auth.verifyAccessToken
    }
  })
})(Verify);
