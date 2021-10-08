import {
  post,
} from 'lib/api';
import * as AUTH from '../types';

export function verifyEmail(email: string){
  return post('auth/invite', {email})
}

export function verifyAccessToken(accessToken: string){
  return post('auth/verify', {accessToken})
}

export function signUpUser(userDetails: AUTH.Credentials){
  return post('auth/signup', userDetails)
}

export function loginUser({email, password}: AUTH.Credentials){
  return post('auth/login', {email, password})
}

export function logOutUser(token: string){
  return post('auth/logout', {token})
}

export function checkAuthState(authToken: string){
  return post('auth/check', {authToken})
}

export function recoverPassword(email: string){
return post('auth/recover', {email})
}

export function resetPassword({email, password}: AUTH.Credentials){
return post('auth/reset', {email, password})
}
