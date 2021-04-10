import axios, { AxiosInstance } from 'axios'
import { initRequest, getBaseRequest } from '../src/request'

export const mockRequestWithConfig = (): AxiosInstance => {
  initRequest('http://www.google.com')
  const baseRequest = getBaseRequest()

  ;(baseRequest.request as any) = jest.fn((config) => Promise.resolve(config))

  return baseRequest
}

export const mockRequestWithUri = (): AxiosInstance => {
  initRequest('http://www.google.com')
  const baseRequest = getBaseRequest()

  ;(baseRequest.request as any) = jest.fn((config) =>
    Promise.resolve(axios.getUri(config)),
  )

  return baseRequest
}

export const mockRequestWithResponse = (
  response: Record<string, any>,
  status = 200,
): AxiosInstance => {
  initRequest('http://www.google.com')
  const baseRequest = getBaseRequest()

  ;(baseRequest.request as any) = jest.fn(() =>
    Promise.resolve({
      data: response,
      status,
    }),
  )

  return baseRequest
}

export const mockRequestWithEcho = (): AxiosInstance => {
  initRequest('http://www.google.com')
  const baseRequest = getBaseRequest()

  ;(baseRequest.request as any) = jest.fn((config) =>
    Promise.resolve({
      data: config.data,
      status: 201,
    }),
  )

  return baseRequest
}

export const mockRequestWithError = (
  response: Record<string, any>,
  status = 200,
): AxiosInstance => {
  initRequest('http://www.google.com')
  const baseRequest = getBaseRequest()

  ;(baseRequest.request as any) = jest.fn(() =>
    Promise.reject({
      response: {
        data: response,
        status,
      },
    }),
  )

  return baseRequest
}

export const mockFnWithEmptyResponse = (fn: any) => {
  ;(fn as any) = jest.fn(
    (url: string, method: string, query: any, data: any) => {
      return {
        data: {
          data: {},
        },
        status: 200,
      }
    },
  )
}
