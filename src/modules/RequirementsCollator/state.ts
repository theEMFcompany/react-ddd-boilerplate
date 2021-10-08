import * as T from './types';
import helpers from './helpers';

export default function onboarding( state = helpers.getInitialState(), action: T.ActionObject ) {
  const reducer = {
    [T.ACTION_TYPE.RESET_VALUES]: (action: T.ActionObject) => helpers.resetValues(state),
    [T.ACTION_TYPE.NEXT_STEP]: (action: T.ActionObject) => helpers.nextStep(state),
    [T.ACTION_TYPE.PREV_STEP]: (action: T.ActionObject) => helpers.prevStep(state),
    [T.ACTION_TYPE.UPDATE_VALUE]: (action: T.ActionObject) => helpers.updateValue(state, action.payload),
    [T.ACTION_TYPE.SET_TEMPLATE_TYPE]: (action: T.ActionObject) => helpers.setTemplateType(state, action.payload),
    [T.ACTION_TYPE.FETCH_TEMPLATE_TYPES]: (action: T.ActionObject) => helpers.fetchTemplateTypes(state),
    [T.ACTION_TYPE.FETCH_TEMPLATE_TYPES_SUCCESS]: (action: T.ActionObject) => helpers.fetchTemplateTypesSuccess(state, action.payload),
    [T.ACTION_TYPE.FETCH_TEMPLATE_TYPES_ERROR]: (action: T.ActionObject) => helpers.fetchTemplateTypesError(state),
    [T.ACTION_TYPE.FETCH_REQUIREMENTS_FIELDS]: (action: T.ActionObject) => helpers.fetchRequirementsFields(state),
    [T.ACTION_TYPE.FETCH_REQUIREMENTS_FIELDS_SUCCESS]: (action: T.ActionObject) => helpers.fetchRequirementsFieldsSuccess(state, action.payload),
    [T.ACTION_TYPE.FETCH_REQUIREMENTS_FIELDS_ERROR]: (action: T.ActionObject) => helpers.fetchRequirementsFieldsError(state),
    [T.ACTION_TYPE.UPDATE_REQUIREMENTS_FIELDS]: (action: T.ActionObject) => helpers.updateRequirementsFields(state, action.payload),
    [T.ACTION_TYPE.UPDATE_REQUIREMENTS_FIELDS_SUCCESS]: (action: T.ActionObject) => state,
    [T.ACTION_TYPE.UPDATE_REQUIREMENTS_FIELDS_ERROR]: (action: T.ActionObject) => state,
    [T.ACTION_TYPE.CREATE_NEW_GENERATOR]: (action: T.ActionObject) => helpers.createNewGenerator(state),
    [T.ACTION_TYPE.CREATE_NEW_GENERATOR_SUCCESS]: (action: T.ActionObject) => helpers.createNewGeneratorSuccess(state),
    [T.ACTION_TYPE.CREATE_NEW_GENERATOR_ERROR]: (action: T.ActionObject) => helpers.createNewGeneratorError(state),
  };
  return action && action.type && reducer[action.type]
    ? reducer[action.type](action)
    : state;
}
