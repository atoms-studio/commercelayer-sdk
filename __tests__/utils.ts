import axios, { AxiosError, AxiosInstance } from 'axios'
import { initRequest, baseRequest } from '../src/config'
import customerResponse from './responses/customer.json'

export const mockRequestWithConfig = (): AxiosInstance => {
  initRequest({
    host: 'http://www.google.com',
    timeout: 5000,
    clientId: '',
    clientSecret: '',
    refreshTokens: false,
    refreshTokensAttempts: 5,
    onRefreshError: (err) => {
      //
    },
    cookies: {} as any,
  })
  ;(baseRequest.request as any) = jest.fn((config) => Promise.resolve(config))

  return baseRequest
}

export const mockRequestWithUri = (): AxiosInstance => {
  const baseURL = 'http://www.google.com'
  initRequest({
    host: baseURL,
    timeout: 5000,
    clientId: '',
    clientSecret: '',
    refreshTokens: false,
    refreshTokensAttempts: 5,
    onRefreshError: (err) => {
      //
    },
    cookies: {} as any,
  })
  ;(baseRequest.request as any) = jest.fn((config) =>
    Promise.resolve(axios.getUri(config)),
  )

  return baseRequest
}

export const mockRequestWithResponse = (
  response: Record<string, any>,
  status = 200,
): AxiosInstance => {
  const baseURL = 'http://www.google.com'
  initRequest({
    host: baseURL,
    timeout: 5000,
    clientId: '',
    clientSecret: '',
    refreshTokens: false,
    refreshTokensAttempts: 5,
    onRefreshError: (err) => {
      //
    },
    cookies: {} as any,
  })
  ;(baseRequest.request as any) = jest.fn((params) => {
    // Requests for profile always return this result for auth mocks
    if (params.url.includes('/api/customers')) {
      return Promise.resolve({
        data: customerResponse,
        status: 200,
      })
    }

    return Promise.resolve({
      data: response,
      status,
      headers: params.headers,
    })
  })

  return baseRequest
}

export const mockRequestWithEcho = (): AxiosInstance => {
  const baseURL = 'http://www.google.com'
  initRequest({
    host: baseURL,
    timeout: 5000,
    clientId: '',
    clientSecret: '',
    refreshTokens: false,
    refreshTokensAttempts: 5,
    onRefreshError: (err) => {
      //
    },
    cookies: {} as any,
  })
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
  const baseURL = 'http://www.google.com'
  initRequest({
    host: baseURL,
    timeout: 5000,
    clientId: '',
    clientSecret: '',
    refreshTokens: false,
    refreshTokensAttempts: 5,
    onRefreshError: (err) => {
      //
    },
    cookies: {} as any,
  })
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

export const mockAuthResponse = (response: any) => {
  ;(axios.post as any) = jest.fn(() => {
    return Promise.resolve({
      data: response,
      status: 200,
    })
  })
  mockRequestWithResponse({})
}

export const mockRequestWithCustomError = (error: AxiosError) => {
  ;(axios.request as any) = jest.fn(() => {
    return Promise.reject(error)
  })
}
