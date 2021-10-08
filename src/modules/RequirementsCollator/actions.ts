import * as T from './types';


export function resetValues(){
  return {
    type: T.ACTION_TYPE.RESET_VALUES,
  }
}

export function nextStep(){
  return {
    type: T.ACTION_TYPE.NEXT_STEP,
  }
}

export function prevStep(){
  return {
    type: T.ACTION_TYPE.PREV_STEP,
  }
}

export function updateValue(key: string){
  return {
    type: T.ACTION_TYPE.UPDATE_VALUE,
    payload: {
      key,
    }
  }
}

export function setTemplateType(key: string){
  return {
    type: T.ACTION_TYPE.SET_TEMPLATE_TYPE,
    payload: {
      key,
    }
  }
}

export function fetchTemplateTypes() {
  return {
    type: T.ACTION_TYPE.FETCH_TEMPLATE_TYPES
  }
}

export function fetchTemplateTypesSuccess(payload: T.FetchTemplateTypesResponse) {
  return {
    type: T.ACTION_TYPE.FETCH_TEMPLATE_TYPES_SUCCESS,
    payload,
  }
}

export function fetchTemplateTypesError(reason: string) {
  return {
    type: T.ACTION_TYPE.FETCH_TEMPLATE_TYPES_ERROR,
    payload: {
      reason
    }
  }
}

export function fetchRequirementsFields(id: string) {
  return {
    type: T.ACTION_TYPE.FETCH_REQUIREMENTS_FIELDS,
    payload: {
      id
    }
  }
}

export function fetchRequirementsFieldsSuccess(payload: T.FetchRequirementsSchemaResponse) {
  return {
    type: T.ACTION_TYPE.FETCH_REQUIREMENTS_FIELDS_SUCCESS,
    payload
  }
}

export function fetchRequirementsFieldsError(reason: string) {
  return {
    type: T.ACTION_TYPE.FETCH_REQUIREMENTS_FIELDS_ERROR,
    reason
  }
}

export function updateRequirementsSchema(payload: T.UpdateRequirementsSchemaResquest) {
  return {
    type: T.ACTION_TYPE.UPDATE_REQUIREMENTS_FIELDS,
    payload
  }
}

export function updateRequirementsSchemaSuccess(payload: T.UpdateRequirementsSchemaResponse) {
  return {
    type: T.ACTION_TYPE.UPDATE_REQUIREMENTS_FIELDS_SUCCESS,
    payload
  }
}

export function updateRequirementsSchemaError(reason: string) {
  return {
    type: T.ACTION_TYPE.UPDATE_REQUIREMENTS_FIELDS_SUCCESS,
    payload: {
      reason
    }
  }
}

export function creatingNewGenerator(payload: T.EDITOR_VALUES){
  return {
    type: T.ACTION_TYPE.CREATE_NEW_GENERATOR,
    payload
  }
}

export function creatingNewGeneratorSuccess(){
  return {
    type: T.ACTION_TYPE.CREATE_NEW_GENERATOR_SUCCESS,
  }
}

export function creatingNewGeneratorUserError(reason: string){
  return {
    type: T.ACTION_TYPE.CREATE_NEW_GENERATOR_ERROR,
    payload: {
      reason
    }
  }
}
