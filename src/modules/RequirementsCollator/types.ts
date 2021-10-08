
import {ImageType} from 'components/Image';
import {FormDataSchema, FormUISchema} from 'components/Form';
export enum ACTION_TYPE {
  RESET_VALUES = "RESET_EDITOR_VALUES",
  NEXT_STEP = "NEXT_EDITOR_STEP",
  PREV_STEP = "PREV_EDITOR_STEP",
  UPDATE_VALUE = "UPDATE_EDITOR_VALUE",
  SET_TEMPLATE_TYPE = "SET_TEMPLATE_TYPE",
  FETCH_TEMPLATE_TYPES = 'FETCH_TEMPLATE_TYPES',
  FETCH_TEMPLATE_TYPES_SUCCESS = 'FETCH_TEMPLATE_TYPES_SUCCESS',
  FETCH_TEMPLATE_TYPES_ERROR = 'FETCH_TEMPLATE_TYPES_ERROR',
  FETCH_REQUIREMENTS_FIELDS = 'FETCH_REQUIREMENTS_FIELDS',
  FETCH_REQUIREMENTS_FIELDS_SUCCESS = 'FETCH_REQUIREMENTS_FIELDS_SUCCESS',
  FETCH_REQUIREMENTS_FIELDS_ERROR = 'FETCH_REQUIREMENTS_FIELDS_ERROR',
  UPDATE_REQUIREMENTS_FIELDS = 'UPDATE_REQUIREMENTS_FIELDS',
  UPDATE_REQUIREMENTS_FIELDS_SUCCESS = 'UPDATE_REQUIREMENTS_FIELDS_SUCCESS',
  UPDATE_REQUIREMENTS_FIELDS_ERROR = 'UPDATE_REQUIREMENTS_FIELDS_ERROR',
  CREATE_NEW_GENERATOR = 'CREATE_NEW_GENERATOR',
  CREATE_NEW_GENERATOR_SUCCESS = 'CREATE_NEW_GENERATOR_SUCCESS',
  CREATE_NEW_GENERATOR_ERROR = 'CREATE_NEW_GENERATOR_ERROR',
}

export type RequirementSchema = {
  schema: FormDataSchema;
  uiSchema: FormUISchema;
} | null;

export interface State {
  activeStep: EDITOR_STEP;
  isCreatingNewGenerator: boolean;
  templateType: TemplateTypeState;
  requirementFields: RequirementFieldsState ;
}

export interface TemplateTypeState {
  items: Template[];
  selected: string;
  isFetching: boolean;
}

export interface RequirementFieldsState {
  data: RequirementSchema;
  updatedData: RequirementSchema;
  isFetching: boolean;
  isSaving: boolean;
  schemaId: string;
}

export interface Actions {
  updateValue(key: string, value: string): void;
  setTemplateType(key: string): void;
  resetValues(): void;
  nextStep(): void;
  prevStep(): void;
  fetchTemplateTypes(): void;
  fetchTemplateTypesSuccess(): void;
  fetchTemplateTypesError(): void;
  fetchRequirementsFields(templateType: string): void;
  fetchRequirementsFieldsSuccess(fields: FetchRequirementsSchemaResponse): void;
  fetchRequirementsFieldsError(reason: string): void;
  updateRequirementsSchema(request: UpdateRequirementsSchemaResquest): void;
  updateRequirementsSchemaSuccess(): void;
  updateRequirementsSchemaError(reason: string): void;
  creatingNewGenerator(): void;
  creatingNewGeneratorSuccess(): void;
  creatingNewGeneratorError(): void;
}

export interface Template {
  key: string;
  label: string;
  image: string;
  imageType: ImageType;
}

export interface Stakeholder {
  email: string;
  role: string;
}

export type StepIndex = 0 | 1 | 2;

export interface EDITOR_VALUES {
  [EDITOR_STEP.TEMPLATE_TYPE]: {
    selected: string;
  };
  [EDITOR_STEP.REQUIREMENT_FIELDS]: RequirementSchema;
  [EDITOR_STEP.STAKEHOLDERS]: Stakeholder[];
}

export interface UpdateValueRequestPayload {
  key: string;
  value: any;
}

export enum EDITOR_STEP {
  TEMPLATE_TYPE = 'TEMPLATE_TYPE',
  REQUIREMENT_FIELDS = 'REQUIREMENT_FIELDS',
  STAKEHOLDERS = 'STAKEHOLDERS'
}

export interface ActionObject<T=any> {
  type: ACTION_TYPE;
  payload: T;
}

export interface FetchTemplateTypesRequest {};

export interface FetchTemplateTypesResponse {
  items: Template[];
  count: number;
};


export interface FetchRequirementsSchemaRequest {
  options: Record<string, unknown>;
  id: string;
};

export interface FetchRequirementsSchemaResponse {
  data: RequirementSchema;
  id: string;
};

export interface UpdateRequirementsSchemaResquest {
  data: RequirementSchema;
  id?: string;
};

export interface UpdateRequirementsSchemaResponse {
  id?: string
}
