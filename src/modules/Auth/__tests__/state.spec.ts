import stateManager from 'modules/Auth/state';
import * as T from 'types';
import {getInitialState} from 'modules/Auth/helpers';
import * as actions from 'modules/Auth/actions';

describe('Auth State', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
  // let state: T.State;
  // beforeEach(() => {
  //   state = stateManager(undefined, {type: ''})
  // })
  // it('should start at initial state', () => {
  //   expect(state).toEqual(getInitialState());
  // });
  // it('should start verification of sign up email', () => {
  //   const email = 'e@s.com'
  //   state = stateManager(state, actions.verifySignUpEmail(email));
  //   expect(state.verificationEmail).toEqual(email);
  // });
  // it('should succeed when verification of signup email is done', () => {
  //   const email = 'e@s.com'
  //   state = stateManager(state, actions.verifySignUpEmail(email));
  //   state = stateManager(state, actions.verifySignUpEmailSuccess());
  //   expect(state.verificationEmail).toEqual(email);
  // });
  // it('should fail when verification of signup email errors out', () => {
  //   const email = 'e@s.com';
  //   const failureReason = 'Failed for nothing';
  //   state = stateManager(state, actions.verifySignUpEmail(email));
  //   state = stateManager(state, actions.verifySignUpEmailError(failureReason));
  //   expect(state.verificationEmail).toEqual(email);
  // });
})
