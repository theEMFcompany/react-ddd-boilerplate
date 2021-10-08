import {
  post,
} from 'lib/api';
import * as T from '../types';

export function onboardUser(payload: T.ONBOARD_VALUES) {
  return post('user/onboard', payload)
}
