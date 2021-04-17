import { initConfig, config, defaultConfig, getConfig } from '../src/config'
import { getBaseRequest } from '../src/request'

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
        cookies: defaultConfig.cookies,
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
        cookies: defaultConfig.cookies,
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
        cookies: defaultConfig.cookies,
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
        cookies: {
          customer_token: false,
          customer_refresh_token: false,
          scopes: false,
        },
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
        cookies: {
          customer_token: 'yes',
          customer_refresh_token: defaultConfig.cookies.customer_refresh_token,
          scopes: defaultConfig.cookies.scopes,
        },
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
        cookies: {
          customer_token: 'yes',
          customer_refresh_token: defaultConfig.cookies.customer_refresh_token,
          scopes: defaultConfig.cookies.scopes,
        },
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
        cookies: {
          customer_token: defaultConfig.cookies.customer_token,
          customer_refresh_token: defaultConfig.cookies.customer_refresh_token,
          scopes: defaultConfig.cookies.scopes,
        },
      })
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
})
