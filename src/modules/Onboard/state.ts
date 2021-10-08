import * as T from './types';
import helpers from './helpers';

export default function onboarding( state = helpers.getInitialState(), action: T.ActionObject ) {
  const reducer = {
    [T.ACTION_TYPES.RESET_ONBOARDING_VALUES]: (action: T.ActionObject) => helpers.resetValues(state),
    [T.ACTION_TYPES.NEXT_ONBOARDING_STEP]: (action: T.ActionObject) => helpers.nextStep(state),
    [T.ACTION_TYPES.PREV_ONBOARDING_STEP]: (action: T.ActionObject) => helpers.prevStep(state),
    [T.ACTION_TYPES.UPDATE_ONBOARDING_VALUE]: (action: T.ActionObject) => helpers.updateValue(state, action.payload),
    [T.ACTION_TYPES.ONBOARD_USER]: (action: T.ActionObject) => helpers.onboardUser(state),
    [T.ACTION_TYPES.ONBOARD_USER_SUCCESS]: (action: T.ActionObject) => helpers.onboardUserSuccess(state),
    [T.ACTION_TYPES.ONBOARD_USER_ERROR]: (action: T.ActionObject) => helpers.onboardUserError(state),
  };
  return action && action.type && reducer[action.type]
    ? reducer[action.type](action)
    : state;
}
