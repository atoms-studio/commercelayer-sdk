import { initConfig, config, defaultConfig, getConfig } from '../src/config'
import { getBaseRequest, isRefreshTokenError } from '../src/config'

describe('config', () => {
  describe('initConfig', () => {
    it('throws an error if host is missing', () => {
      expect(() => {
        initConfig({} as any)
      }).toThrow('Missing host')
    })

    it('throws an error if clientId is missing', () => {
      expect(() => {
        initConfig({ host: 'asd' } as any)
      }).toThrow('Missing client id')
    })

    it('uses default values for missing options', () => {
      initConfig({
        host: 'asdasd',
        clientId: 'asd',
      })
      expect(config).toEqual({
        host: 'asdasd',
        clientId: 'asd',
        refreshTokens: defaultConfig.refreshTokens,
        refreshTokensAttempts: defaultConfig.refreshTokensAttempts,
        onRefreshError: defaultConfig.onRefreshError,
        cookies: defaultConfig.cookies,
        isCustomerLoggedInFn: defaultConfig.isCustomerLoggedInFn,
        refreshCustomerTokenFn: defaultConfig.refreshCustomerTokenFn,
        refreshGuestTokenFn: defaultConfig.refreshCustomerTokenFn,
      })

      initConfig({
        host: 'asdasd',
        clientId: 'asd',
        refreshTokens: false,
      })
      expect(config).toEqual({
        host: 'asdasd',
        clientId: 'asd',
        refreshTokens: false,
        refreshTokensAttempts: defaultConfig.refreshTokensAttempts,
        onRefreshError: defaultConfig.onRefreshError,
        cookies: defaultConfig.cookies,
        isCustomerLoggedInFn: defaultConfig.isCustomerLoggedInFn,
        refreshCustomerTokenFn: defaultConfig.refreshCustomerTokenFn,
        refreshGuestTokenFn: defaultConfig.refreshCustomerTokenFn,
      })

      initConfig({
        host: 'asdasd',
        clientId: 'asd',
        refreshTokens: false,
        refreshTokensAttempts: 4,
      })
      expect(config).toEqual({
        host: 'asdasd',
        clientId: 'asd',
        refreshTokens: false,
        refreshTokensAttempts: 4,
        onRefreshError: defaultConfig.onRefreshError,
        cookies: defaultConfig.cookies,
        isCustomerLoggedInFn: defaultConfig.isCustomerLoggedInFn,
        refreshCustomerTokenFn: defaultConfig.refreshCustomerTokenFn,
        refreshGuestTokenFn: defaultConfig.refreshCustomerTokenFn,
      })

      initConfig({
        host: 'asdasd',
        clientId: 'asd',
        refreshTokens: false,
        refreshTokensAttempts: 4,
        cookies: false,
      })
      expect(config).toEqual({
        host: 'asdasd',
        clientId: 'asd',
        refreshTokens: false,
        refreshTokensAttempts: 4,
        onRefreshError: defaultConfig.onRefreshError,
        cookies: {
          customer_token: false,
          customer_refresh_token: false,
          scopes: false,
        },
        isCustomerLoggedInFn: defaultConfig.isCustomerLoggedInFn,
        refreshCustomerTokenFn: defaultConfig.refreshCustomerTokenFn,
        refreshGuestTokenFn: defaultConfig.refreshCustomerTokenFn,
      })

      initConfig({
        host: 'asdasd',
        clientId: 'asd',
        refreshTokens: true,
        refreshTokensAttempts: 4,
        cookies: {
          customer_token: 'yes',
        },
      })
      expect(config).toEqual({
        host: 'asdasd',
        clientId: 'asd',
        refreshTokens: true,
        refreshTokensAttempts: 4,
        onRefreshError: defaultConfig.onRefreshError,
        cookies: {
          customer_token: 'yes',
          customer_refresh_token: defaultConfig.cookies.customer_refresh_token,
          scopes: defaultConfig.cookies.scopes,
        },
        isCustomerLoggedInFn: defaultConfig.isCustomerLoggedInFn,
        refreshCustomerTokenFn: defaultConfig.refreshCustomerTokenFn,
        refreshGuestTokenFn: defaultConfig.refreshCustomerTokenFn,
      })

      initConfig({
        host: 'asdasd',
        clientId: 'asd',
        refreshTokens: true,
        refreshTokensAttempts: 4,
        onRefreshError: defaultConfig.onRefreshError,
        cookies: {
          customer_token: 'yes',
        },
      })
      expect(config).toEqual({
        host: 'asdasd',
        clientId: 'asd',
        refreshTokens: true,
        refreshTokensAttempts: 4,
        onRefreshError: defaultConfig.onRefreshError,
        cookies: {
          customer_token: 'yes',
          customer_refresh_token: defaultConfig.cookies.customer_refresh_token,
          scopes: defaultConfig.cookies.scopes,
        },
        isCustomerLoggedInFn: defaultConfig.isCustomerLoggedInFn,
        refreshCustomerTokenFn: defaultConfig.refreshCustomerTokenFn,
        refreshGuestTokenFn: defaultConfig.refreshCustomerTokenFn,
      })

      initConfig({
        host: 'asdasd',
        clientId: 'asd',
        refreshTokens: true,
        refreshTokensAttempts: 4,
        cookies: {
          customer_token: '',
        },
      })
      expect(config).toEqual({
        host: 'asdasd',
        clientId: 'asd',
        refreshTokens: true,
        refreshTokensAttempts: 4,
        onRefreshError: defaultConfig.onRefreshError,
        cookies: {
          customer_token: defaultConfig.cookies.customer_token,
          customer_refresh_token: defaultConfig.cookies.customer_refresh_token,
          scopes: defaultConfig.cookies.scopes,
        },
        isCustomerLoggedInFn: defaultConfig.isCustomerLoggedInFn,
        refreshCustomerTokenFn: defaultConfig.refreshCustomerTokenFn,
        refreshGuestTokenFn: defaultConfig.refreshCustomerTokenFn,
      })

      expect(config.onRefreshError(new Error('asd'))).toEqual(undefined)
      expect(defaultConfig.isCustomerLoggedInFn()).toBe(false)

      expect(() => defaultConfig.refreshCustomerTokenFn()).not.toThrow()
      expect(() => defaultConfig.refreshGuestTokenFn()).not.toThrow()
    })

    it('passes host to request', () => {
      initConfig({
        host: 'asdasd',
        clientId: 'asd',
        refreshTokens: true,
        refreshTokensAttempts: 4,
        cookies: {
          customer_token: '',
        },
      })

      const req = getBaseRequest()
      expect(req.defaults.baseURL).toBe('asdasd')
    })
  })

  describe('getConfig', () => {
    it('returns the current config', () => {
      const cfg = {
        host: '1234',
        clientId: '5678',
      }

      initConfig(cfg)

      expect(getConfig()).toEqual(config)
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
})
