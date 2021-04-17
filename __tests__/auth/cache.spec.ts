import { __resetMarket, setMarket } from '../../src/auth/market'
import { initConfig, __resetConfig } from '../../src/config'
import { mockAuthResponse } from '../utils'
import {
  cacheKey,
  tokenCache,
  cacheToken,
  getToken,
} from '../../src/auth/cache'

describe('auth:cache', () => {
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
      scope: 'market:9955',
      created_at: Date.now(),
    })
  })

  afterEach(() => {
    __resetConfig()
  })

  it('uses market as cache key', async () => {
    await setMarket(123)
    expect(cacheKey()).toBe('123')

    await setMarket([456, 123])
    expect(cacheKey()).toBe('456,123')
  })

  it('caches a token based on current market', async () => {
    await setMarket(987)
    cacheToken('test', 0)
    expect(tokenCache.has(cacheKey())).toBe(true)
    expect(tokenCache.get(cacheKey())).toEqual({
      token: 'test',
      expires: 0,
    })
  })

  it('returns an empty string with an expired token', async () => {
    await setMarket(987)
    cacheToken('test', 0)
    expect(getToken()).toEqual({ token: '', expires: 0 })
  })

  it('returns current token', async () => {
    await setMarket(123)
    const expires = Date.now() + 1000
    cacheToken('test', expires)
    expect(getToken()).toEqual({ token: 'test', expires })
  })
})
