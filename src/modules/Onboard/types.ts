export enum ACTION_TYPES {
  RESET_ONBOARDING_VALUES = "RESET_ONBOARDING_VALUES",
  NEXT_ONBOARDING_STEP = "NEXT_ONBOARDING_STEP",
  PREV_ONBOARDING_STEP = "PREV_ONBOARDING_STEP",
  UPDATE_ONBOARDING_VALUE = "UPDATE_ONBOARDING_VALUE",
  ONBOARD_USER = 'ONBOARD_USER',
  ONBOARD_USER_SUCCESS = 'ONBOARD_USER_SUCCESS',
  ONBOARD_USER_ERROR = 'ONBOARD_USER_ERROR',
}

export interface Actions {
  updateValue(key: string, value: string): void;
  resetValues(): void;
  nextStep(): void;
  prevStep(): void;
  onboardUser(values: ONBOARD_VALUES): void;
  onboardUserSuccess(): void;
  onboardUserError(): void;
}

export interface ONBOARD_VALUES {
  [ONBOARDING_STEP.USER_INFO]: {
    username: string;
  };
  [ONBOARDING_STEP.LOCATION_DETAILS]: {
    country: string;
    state: string;
  };
  [ONBOARDING_STEP.ACCOUNT_TYPE]: {
    accountType: ACCOUNT_TYPE
  };
  [ONBOARDING_STEP.SUNSCRIPTION_PLAN]: {
    subscriptionPlan: SUBSCRIPTION_PLAN
  };
}

export interface State {
  savedValues: ONBOARD_VALUES;
  activeStep: ONBOARDING_STEP;
  isOnboardingUser: boolean;
  onboardingUserComplete: boolean;
}

export interface ActionObject<A=any> {
  payload: A;
  type: ACTION_TYPES;
}

export interface UpdateValueRequestPayload {
  key: string;
  value: any;
}

export enum ACCOUNT_TYPE {
  CREATOR = 'creator',
  AGENCY = 'agency',
  COMPANY = 'company'
}

export enum ONBOARDING_STEP {
  USER_INFO = 'USER_INFO',
  LOCATION_DETAILS = 'LOCATION_DETAILS',
  ACCOUNT_TYPE = 'ACCOUNT_TYPE',
  SUNSCRIPTION_PLAN = 'SUBSCRIPTION_PLAN',
}

export enum SUBSCRIPTION_PLAN {
  CREATOR = 'creator',
  PROFESSIONAL = 'professional',
  STUDIO = 'studio',
  ENTERPRISE = 'enterprise'
}
