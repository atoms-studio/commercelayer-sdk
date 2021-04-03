import axios, { AxiosInstance } from 'axios'

let baseRequest: AxiosInstance | null = null

export const initRequest = (baseURL: string): void => {
  baseRequest = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  })
}

export const getBaseRequest = (): AxiosInstance => {
  if (!baseRequest) {
    throw new Error('You must call "init" before using any resource method')
  }

  return baseRequest
}
