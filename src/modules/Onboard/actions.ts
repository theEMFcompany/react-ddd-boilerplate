import * as T from './types';


export function resetValues(){
  return {
    type: T.ACTION_TYPES.RESET_ONBOARDING_VALUES,
  }
}

export function nextStep(){
  return {
    type: T.ACTION_TYPES.NEXT_ONBOARDING_STEP,
  }
}

export function prevStep(){
  return {
    type: T.ACTION_TYPES.PREV_ONBOARDING_STEP,
  }
}

export function updateValue(key: string, value: any){
  return {
    type: T.ACTION_TYPES.UPDATE_ONBOARDING_VALUE,
    payload: {
      key,
      value,
    }
  }
}

export function onboardUser(payload: T.ONBOARD_VALUES){
  return {
    type: T.ACTION_TYPES.ONBOARD_USER,
    payload
  }
}

export function onboardUserSuccess(){
  return {
    type: T.ACTION_TYPES.ONBOARD_USER_SUCCESS,
  }
}

export function onboardUserError(reason: string){
  return {
    type: T.ACTION_TYPES.ONBOARD_USER_ERROR,
    payload: {
      reason
    }
  }
}
