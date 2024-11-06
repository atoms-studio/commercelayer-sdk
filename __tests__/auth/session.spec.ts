import axios from 'axios'
import {
  __resetMarket,
  setMarket,
  isRefreshTokenError,
  loginAsIntegration,
  loginAsCustomer,
} from '../../src/auth/session'
import {
  initConfig,
  __resetConfig,
  getConfig,
  InternalConfig,
} from '../../src/config'
import { mockAuthResponse, mockRequestWithCustomError } from '../utils'
import {
  cacheKey,
  tokenCache,
  cacheToken,
  getToken,
  refreshCurrentToken,
  currentCustomerData,
  getRefreshTokenInterceptor,
} from '../../src/auth/session'
import { AxiosError } from 'axios'

const _originalRequest = axios.request

const createRefreshError = (errorConfig = { attempts: 0 }): AxiosError => {
  const error: AxiosError = new Error('axios error') as any
  error.isAxiosError = true
  error.config = {
    __retryAttempts: (errorConfig || {}).attempts || 0,
    headers: {},
    url: 'https://www.google.com',
  } as any
  error.toJSON = () => ({})
  error.response = {
    status: 401,
    statusText: 'Unauthorized',
    config: {},
    headers: {},
    data: {
      errors: [
        {
          code: 'INVALID_TOKEN',
        },
      ],
    },
  }

  return error
}

describe('auth:session', () => {
  beforeEach(() => {
    __resetMarket()
    initConfig({
      host: 'asdasd',
      clientId: 'aaaaa',
    })
    mockAuthResponse({
      access_token: 'your-9955-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      scope: 'market:code:9955',
      created_at: Date.now(),
    })
  })

  afterEach(() => {
    __resetConfig()
  })

  it('uses market as cache key', async () => {
    await setMarket('123')
    expect(cacheKey()).toBe('123')

    await setMarket(['456', '123'])
    expect(cacheKey()).toBe('456,123')
  })

  it('caches a token based on current market', async () => {
    await setMarket('987')
    cacheToken('test', 0)
    expect(tokenCache.has(cacheKey())).toBe(true)
    expect(tokenCache.get(cacheKey())).toEqual({
      token: 'test',
      expires: 0,
    })
  })

  it('returns an empty string with an expired token', async () => {
    await setMarket('987')
    cacheToken('test', 0)
    expect(getToken()).toEqual({ token: '', expires: 0 })
  })

  it('returns current token', async () => {
    await setMarket('123')
    const expires = Date.now() + 1000
    cacheToken('test', expires)
    expect(getToken()).toEqual({ token: 'test', expires })
  })
})

describe('isRefresTokenError', () => {
  it('tells if its a refresh token error', () => {
    expect(
      isRefreshTokenError({
        response: undefined,
        config: {},
        isAxiosError: true,
        toJSON: () => ({}),
        name: '',
        message: '',
      }),
    ).toBe(false)

    expect(
      isRefreshTokenError({
        response: {
          status: 404,
          data: null,
          statusText: '',
          headers: {},
          config: {},
        },
        config: {},
        isAxiosError: true,
        toJSON: () => ({}),
        name: '',
        message: '',
      }),
    ).toBe(false)

    expect(
      isRefreshTokenError({
        response: {
          status: 401,
          data: null,
          statusText: '',
          headers: {},
          config: {},
        },
        config: {},
        isAxiosError: true,
        toJSON: () => ({}),
        name: '',
        message: '',
      }),
    ).toBe(false)

    expect(
      isRefreshTokenError({
        response: {
          status: 401,
          data: {},
          statusText: '',
          headers: {},
          config: {},
        },
        config: {},
        isAxiosError: true,
        toJSON: () => ({}),
        name: '',
        message: '',
      }),
    ).toBe(false)

    expect(
      isRefreshTokenError({
        response: {
          status: 401,
          data: {
            errors: null,
          },
          statusText: '',
          headers: {},
          config: {},
        },
        config: {},
        isAxiosError: true,
        toJSON: () => ({}),
        name: '',
        message: '',
      }),
    ).toBe(false)

    expect(
      isRefreshTokenError({
        response: {
          status: 401,
          data: {
            errors: [],
          },
          statusText: '',
          headers: {},
          config: {},
        },
        config: {},
        isAxiosError: true,
        toJSON: () => ({}),
        name: '',
        message: '',
      }),
    ).toBe(false)

    expect(
      isRefreshTokenError({
        response: {
          status: 401,
          data: {
            errors: [
              {
                code: 'INVALID_TOKEN',
              },
            ],
          },
          statusText: '',
          headers: {},
          config: {},
        },
        config: {},
        isAxiosError: true,
        toJSON: () => ({}),
        name: '',
        message: '',
      }),
    ).toBe(true)
  })
})

describe('refreshCurrentToken', () => {
  beforeEach(() => {
    __resetMarket()
  })
  afterEach(() => {
    __resetConfig()
  })

  it('refreshes a guest token', async () => {
    __resetMarket()
    initConfig({
      host: 'asdasd',
      clientId: 'aaaaa',
      clientSecret: 'aaaaabbbb',
    })
    mockAuthResponse({
      access_token: 'your-first-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      scope: 'market:code:9955',
      created_at: Date.now(),
    })

    await setMarket('48279')

    expect(getToken()).toEqual({
      token: 'your-first-access-token',
      expires: expect.any(Number),
    })

    mockAuthResponse({
      access_token: 'your-refreshed-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      scope: 'market:code:9955',
      created_at: Date.now(),
    })

    await refreshCurrentToken()

    expect(getToken()).toEqual({
      token: 'your-refreshed-access-token',
      expires: expect.any(Number),
    })
  })

  it('refreshes an integration token', async () => {
    __resetMarket()
    initConfig({
      host: 'asdasd',
      clientId: 'aaaaa',
      clientSecret: 'aaaaabbbb',
    })
    mockAuthResponse({
      access_token: 'your-first-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      scope: 'market:code:9955',
      created_at: Date.now(),
    })

    await setMarket('48279')
    await loginAsIntegration()

    expect(getToken()).toEqual({
      token: 'your-first-access-token',
      expires: expect.any(Number),
    })

    mockAuthResponse({
      access_token: 'your-refreshed-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      scope: 'market:code:9955',
      created_at: Date.now(),
    })

    await refreshCurrentToken()

    expect(getToken()).toEqual({
      token: 'your-refreshed-access-token',
      expires: expect.any(Number),
    })
  })

  it('refreshes a customer token', async () => {
    __resetMarket()
    initConfig({
      host: 'asdasd',
      clientId: 'aaaaa',
      clientSecret: 'aaaaabbbb',
    })
    mockAuthResponse({
      access_token: 'your-first-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      refresh_token: 'your-refresh-token',
      scope: 'market:code:7777',
      created_at: Date.now(),
      owner_id: 'zxcVBnMASd',
      owner_type: 'customer',
    })

    await setMarket(['7777'])

    await loginAsCustomer('asdasd', 'asdasd')

    expect(currentCustomerData).toEqual({
      id: 'zxcVBnMASd',
      customer: expect.any(Object),
      token: 'your-first-access-token',
      refreshToken: 'your-refresh-token',
      expires: expect.any(Number),
    })

    mockAuthResponse({
      access_token: 'your-refreshed-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      refresh_token: 'your-refresh-token',
      scope: 'market:code:7777',
      created_at: Date.now(),
      owner_id: 'zxcVBnMASd',
      owner_type: 'customer',
    })

    await refreshCurrentToken()

    expect(currentCustomerData).toEqual({
      id: 'zxcVBnMASd',
      customer: expect.any(Object),
      token: 'your-refreshed-access-token',
      refreshToken: 'your-refresh-token',
      expires: expect.any(Number),
    })
  })
})

describe('getRefreshTokenInterceptor', () => {
  beforeEach(() => {
    __resetMarket()
  })
  afterEach(() => {
    __resetConfig()
    axios.request = _originalRequest
  })

  it('returns an axios interceptor', () => {
    const [onSuccess, onError] = getRefreshTokenInterceptor(getConfig())

    expect(onSuccess).toBeInstanceOf(Function)
    expect(onError).toBeInstanceOf(Function)

    const res = {}
    expect(onSuccess(res)).toBe(res)
  })

  it('rethrows non-refresh-token errors', async () => {
    const [_, onError] = getRefreshTokenInterceptor(getConfig())
    const error = new Error('standard error')
    await expect(async () => {
      await onError(error)
    }).rejects.toThrowError(error.message)
  })

  it('rethrows errors if refreshing tokens is disabled', async () => {
    initConfig({
      host: 'asdasd',
      clientId: 'aaaaa',
      clientSecret: 'aaaaabbbb',
      refreshTokens: false,
    })

    const [_, onError] = getRefreshTokenInterceptor(getConfig())
    const error = createRefreshError()
    await expect(async () => {
      await onError(error)
    }).rejects.toThrowError(error)
  })

  it('does not refresh if there are no more attempts', async () => {
    initConfig({
      host: 'asdasd',
      clientId: 'aaaaa',
      clientSecret: 'aaaaabbbb',
      refreshTokens: true,
      refreshTokensAttempts: 1,
    })
    const config = getConfig() as InternalConfig
    config.onRefreshError = jest.fn(() => {
      //
    })

    const [_, onError] = getRefreshTokenInterceptor(config)
    const error = createRefreshError({
      attempts: 2,
    })
    mockRequestWithCustomError(error)
    await expect(async () => {
      await onError(error)
    }).rejects.toThrowError(error)
    expect(config.onRefreshError).toHaveBeenCalledTimes(1)
  })
})
