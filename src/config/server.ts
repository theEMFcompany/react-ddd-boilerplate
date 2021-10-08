import axios, { AxiosRequestConfig } from 'axios';
const apiVersion = '';

enum ENV {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production'
}

function getBaseUrl(env: ENV, apiVersion: string): string {
  return {
    [ENV.DEVELOPMENT]: 'http://localhost:5050/' + apiVersion,
    [ENV.STAGING]: 'https://api-staging.briefcart.com/' + apiVersion,
    [ENV.PRODUCTION]: 'https://api.briefcart.com/' + apiVersion
  }[env];
}

export default function launchServer(options: AxiosRequestConfig = {}) {
  return axios.create({
    baseURL:  getBaseUrl(process.env.BUILD_ENV as ENV, apiVersion),
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  })
}
