import { TemplateType } from './components/TemplateType';
import * as T from './types';

const onboardingHelpers = {
  getInitialState(): T.State {
    return {
      isCreatingNewGenerator: false,
      activeStep: T.EDITOR_STEP.TEMPLATE_TYPE,
      templateType: {
        isFetching: false,
        selected: '',
        items: []
      },
      requirementFields: {
        schemaId: '',
        isFetching: false,
        isSaving: false,
        data: null,
        updatedData: null,
      }
    };
  },
  resetValues: (state: T.State): T.State => {
    return {
      ...state,
    };
  },
  nextStep: (state: T.State): T.State => {
    const activeStep: Record<T.EDITOR_STEP, T.State> = {
      [T.EDITOR_STEP.TEMPLATE_TYPE]: {
        ...state,
        activeStep: T.EDITOR_STEP.REQUIREMENT_FIELDS
      },
      [T.EDITOR_STEP.REQUIREMENT_FIELDS]: {
        ...state,
        activeStep: T.EDITOR_STEP.STAKEHOLDERS
      },
      [T.EDITOR_STEP.STAKEHOLDERS]: {
        ...state,
        activeStep: T.EDITOR_STEP.STAKEHOLDERS
      },
    };
    return activeStep[state.activeStep];
  },
  prevStep: (state: T.State): T.State => {
    const activeStep: T.EDITOR_STEP = {
      [T.EDITOR_STEP.TEMPLATE_TYPE]: T.EDITOR_STEP.TEMPLATE_TYPE,
      [T.EDITOR_STEP.REQUIREMENT_FIELDS]: T.EDITOR_STEP.TEMPLATE_TYPE,
      [T.EDITOR_STEP.STAKEHOLDERS]: T.EDITOR_STEP.REQUIREMENT_FIELDS,
    }[state.activeStep];
    return {
      ...state,
      activeStep
    }
  },
  updateValue: (state: T.State, payload: T.UpdateValueRequestPayload): T.State => {
    return {
      ...state,
    };
  },
  setTemplateType: (state: T.State, payload: T.UpdateValueRequestPayload): T.State => {
    return {
      ...state,
      templateType: {
        ...state.templateType,
        selected: payload.key
      }
    };
  },
  fetchTemplateTypes: (state: T.State): T.State => {
    return {
      ...state,
      templateType: {
        ...state.templateType,
        isFetching: true
      }
    }
  },
  fetchTemplateTypesSuccess: (state: T.State, payload: T.FetchTemplateTypesResponse): T.State => {
    return {
      ...state,
      templateType: {
        ...state.templateType,
        items: payload.items,
        isFetching: false
      }
    }
  },
  fetchTemplateTypesError: (state: T.State): T.State => {
    return {
      ...state,
      templateType: {
        ...state.templateType,
        isFetching: false
      }
    }
  },
  fetchRequirementsFields: (state: T.State): T.State => {
    return {
      ...state,
      requirementFields: {
        ...state.requirementFields,
        isFetching: true
      }
    }
  },
  fetchRequirementsFieldsSuccess: (state: T.State, payload: T.FetchRequirementsSchemaResponse): T.State => {
    return {
      ...state,
      requirementFields: {
        ...state.requirementFields,
        data: payload.data,
        updatedData: payload.data,
        isFetching: false
      }
    }
  },
  fetchRequirementsFieldsError: (state: T.State): T.State => {
    return {
      ...state,
      requirementFields: {
        ...state.requirementFields,
        isFetching: false
      }
    }
  },
  updateRequirementsFields(state: T.State, payload: T.UpdateRequirementsSchemaResquest): T.State {
    return {
      ...state,
      requirementFields: {
        ...state.requirementFields,
        data: payload.data,
        isSaving: payload.id ? true : false
      }
    }
  },
  createNewGenerator: (state: T.State): T.State => {
    return {
      ...state,
      isCreatingNewGenerator: true
    }
  },
  createNewGeneratorSuccess: (state: T.State): T.State => {
    return {
      ...state,
      isCreatingNewGenerator: false
    }
  },
  createNewGeneratorError: (state: T.State): T.State => {
    return {
      ...state,
      isCreatingNewGenerator: false
    }
  }
}

export default onboardingHelpers;
