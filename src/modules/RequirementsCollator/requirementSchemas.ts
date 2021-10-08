
import * as T from './types';


const websiteSchema: T.RequirementSchema = {
  schema: {
    "title": "Website Design Requirements",
    "description": "In our quest to provide your company / organization with a top notch website, we've put together this handy worksheet to help you capture your vision for the project. The more information you can give us, the better we'll be able to respond. Please answer each question in a clear and concise manner, and skip any questions that don’t pertain to your project. Because each member of your team may have a different vision for the project, we recommend completing this worksheet as a group. That way we won't miss any important opinions. Once you’re happy that the worksheet clearly describes your project, please click the submit button and we’ll work out the right solution for you.",
    "type": "object",
    "properties": {
      "background": {
        "type": "string",
        "title": "Background Information",
      },
      "orgnisation-name": {
        "type": "string",
        "title": "What is the name of your organisation?",
      },
      "mission-statement": {
        "type": "string",
        "title": "What is your Mission statement"
      }
    },
  },
  uiSchema: {}
}

export const defaultSchema: T.RequirementSchema = {
  schema: {
    "title": "Custom Requirements",
    "description": "This section should ontain a general overview of the project and any inforation you would like you stakeholders to know before answering the questions.",
    "type": "object",
    "properties": {
      "sample-field-1": {
        "type": "string",
        "title": "Sample Field",
      }
    }
  },
  uiSchema: {}
};

export const schemas: Record<string, T.RequirementSchema> = {
  website: websiteSchema
};
