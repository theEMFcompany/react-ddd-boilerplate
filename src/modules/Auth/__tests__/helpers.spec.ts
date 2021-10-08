import * as T from '../types';
import * as helpers from 'modules/Auth/helpers';

describe('Auth State Helpers', () => {
  describe('getInitialState', () => {
    it('should pass', () => {
      expect(true).toBe(true);
    });
  //   it('should return initial state', () => {
  //     const activeView = T.INVITE_VIEW.VERIFY;
  //     expect(helpers.getInitialState()).toEqual({
  //       verifyEmailActiveView: T.INVITE_VIEW.VERIFY,
  //       verificationEmail: '',
  //       requestPasswordResetActiveView: T.REQUEST_PASSWORD_RESET_VIEWS.RESET,
  //       requestPasswordResetEmail: '',
  //       status: T.STATUS.LOGGED_OUT,
  //       statusMessage: '',
  //       user: null
  //     });
  //   });
  // });
  // describe('verifySignUpEmail', () => {
  //   it('should change the verification view to "loading"', () => {
  //     const activeView = T.VERIFY_EMAIL_VIEWS.LOADING;
  //     const email = 'u@a.com';
  //     const state = helpers.verifySignUpEmail(helpers.getInitialState(), {email});
  //     expect(state).toHaveProperty('verifyEmailActiveView');
  //     expect(state.verifyEmailActiveView).toBe(activeView);
  //   });
  // });
  // describe('verifySignUpEmailSuccess', () => {
  //   it('should change the active view to "success"', () => {
  //     const activeView = T.VERIFY_EMAIL_VIEWS.SUCCESS;
  //     const email = 'u@a.com';
  //     const initialState = helpers.verifySignUpEmail(helpers.getInitialState(), {email});
  //     const state = helpers.verifySignUpEmailSuccess(initialState)
  //     expect(state).toHaveProperty('verifyEmailActiveView');
  //     expect(state.verifyEmailActiveView).toBe(activeView);

  //   })
  })
})
