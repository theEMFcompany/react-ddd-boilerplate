import {
  get,
} from 'lib/api';
import * as T from './types';

import {schemas, defaultSchema} from './requirementSchemas';

enum END_POINTS {
  TEMPLATE_TYPES = 'template-types',
}

export function fetchTemplateTypes(params: T.FetchTemplateTypesRequest): Promise<T.FetchTemplateTypesResponse>{
  return Promise.resolve({
    count: 4,
    items: [{
      label: 'Visual Identity',
      key: 'visualId',
      imageType: 'svg',
      image: '/img/template-type.svg#design-1',
    },{
      label: 'Digital Campaign',
      key: 'digitalMarketing',
      imageType: 'svg',
      image: '/img/template-type.svg#megaphone-1',
    },{
      label: 'Website',
      key: 'website',
      imageType: 'svg',
      image: '/img/template-type.svg#software-service-1',
    },{
      label: 'Web App',
      key: 'webApp',
      imageType: 'svg',
      image: '/img/template-type.svg#app-layout-1',
    },{
      label: 'Mobile App',
      key: 'mobileApp',
      imageType: 'svg',
      image: '/img/template-type.svg#message-app-1',
    },{
      label: 'Custom',
      key: 'custom',
      imageType: 'svg',
      image: '/img/template-type.svg#analog-1',
    },]
  })
  // return get(END_POINTS.TEMPLATE_TYPES, params) as Promise<T.FetchTemplateTypesResponse>;
}

export function fetchRequirementsFields(payload: T.FetchRequirementsSchemaRequest): Promise<T.FetchRequirementsSchemaResponse> {
  return Promise.resolve({
    id: '',
    data: schemas[payload.id] || defaultSchema
  });
}
