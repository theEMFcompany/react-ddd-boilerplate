import * as T from './types';

const onboardingHelpers = {
  getInitialState(): T.State {
    return {
      isOnboardingUser: false,
      onboardingUserComplete: false,
      activeStep: T.ONBOARDING_STEP.USER_INFO,
      savedValues: {
        [T.ONBOARDING_STEP.USER_INFO]: {
          username: ''
        },
        [T.ONBOARDING_STEP.ACCOUNT_TYPE]: {
          accountType: T.ACCOUNT_TYPE.CREATOR
        },
        [T.ONBOARDING_STEP.LOCATION_DETAILS]: {
          country: '',
          state: ''
        },
        [T.ONBOARDING_STEP.SUNSCRIPTION_PLAN]: {
          subscriptionPlan:T.SUBSCRIPTION_PLAN.CREATOR
        }
      }
    };
  },
  resetValues: (state: T.State): T.State => {
    return {
      ...state,
      savedValues: {
        ...state.savedValues,
        [state.activeStep]: {
          ...onboardingHelpers.getInitialState().savedValues[state.activeStep],
        }
      }
    };
  },
  nextStep: (state: T.State): T.State => {
    const activeStep: T.ONBOARDING_STEP = {
      [T.ONBOARDING_STEP.USER_INFO]: T.ONBOARDING_STEP.ACCOUNT_TYPE,
      [T.ONBOARDING_STEP.ACCOUNT_TYPE]: T.ONBOARDING_STEP.LOCATION_DETAILS,
      [T.ONBOARDING_STEP.LOCATION_DETAILS]: T.ONBOARDING_STEP.SUNSCRIPTION_PLAN,
      [T.ONBOARDING_STEP.SUNSCRIPTION_PLAN]: T.ONBOARDING_STEP.SUNSCRIPTION_PLAN,
    }[state.activeStep];
    return {
      ...state,
      isOnboardingUser: T.ONBOARDING_STEP.SUNSCRIPTION_PLAN ? true : false,
      activeStep
    }
  },
  prevStep: (state: T.State): T.State => {
    const activeStep: T.ONBOARDING_STEP = {
      [T.ONBOARDING_STEP.USER_INFO]: T.ONBOARDING_STEP.USER_INFO,
      [T.ONBOARDING_STEP.ACCOUNT_TYPE]: T.ONBOARDING_STEP.USER_INFO,
      [T.ONBOARDING_STEP.LOCATION_DETAILS]: T.ONBOARDING_STEP.ACCOUNT_TYPE,
      [T.ONBOARDING_STEP.SUNSCRIPTION_PLAN]: T.ONBOARDING_STEP.LOCATION_DETAILS,
    }[state.activeStep];
    return {
      ...state,
      activeStep
    }
  },
  updateValue: (state: T.State, payload: T.UpdateValueRequestPayload): T.State => {
    return {
      ...state,
      savedValues: {
        ...state.savedValues,
        [state.activeStep]: {
          ...state.savedValues[state.activeStep],
          [payload.key]: payload.value,
        }
      }
    };
  },
  onboardUser: (state: T.State): T.State => {
    return {
      ...state,
      isOnboardingUser: true
    }
  },
  onboardUserSuccess: (state: T.State): T.State => {
    return {
      ...state,
      isOnboardingUser: false,
      onboardingUserComplete: true
    }
  },
  onboardUserError: (state: T.State): T.State => {
    return {
      ...state,
      isOnboardingUser: false,
      onboardingUserComplete: false
    }
  }
}

export default onboardingHelpers;
