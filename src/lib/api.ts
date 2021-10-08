import server from 'config/server';
import { AxiosPromise } from 'axios';
import {qs} from 'utils';

export function get(endpoint: string, params = {}) {
  return processResponse(server().get(endpoint + qs.stringify(params)));
}

export function part(endpoint: string){
  return processResponse(server().get(endpoint));
}

export function post(endpoint: string, body: any){
  return processResponse(server().post(endpoint, body));
}

export function update(endpoint: string, body: Record<string, unknown>){
  return processResponse(server().put(endpoint, body));
}

export function remove(endpoint: string){
  return processResponse(server().delete(endpoint));
}

export function upload(endpoint: string){
  return processResponse(server({
    headers: {
      'content-type': 'multipart/form-data'
    }
  }).post(endpoint));
}

export function replaceUpload(endpoint: string){
  return processResponse(server({
    headers: {
      'content-type': 'multipart/form-data'
    }
  }).put(endpoint));
}

async function processResponse(request: AxiosPromise) {
  try {
    const response = await request;
    return response.data;
  } catch(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.responseText || error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      const message = 'Was Unable to reach server';
      throw new Error(message);
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error;
    }

  }
}
