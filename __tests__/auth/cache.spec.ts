import { __resetMarket, setMarket } from '../../src/auth/market'
import {
  cacheKey,
  tokenCache,
  cacheToken,
  getToken,
} from '../../src/auth/cache'

describe('auth:cache', () => {
  beforeEach(() => {
    __resetMarket()
  })

  it('uses market as cache key', () => {
    setMarket(123)
    expect(cacheKey()).toBe('123')

    setMarket([456, 123])
    expect(cacheKey()).toBe('456,123')
  })

  it('caches a token based on current market', () => {
    setMarket(987)
    cacheToken('test', 0)
    expect(tokenCache.has(cacheKey())).toBe(true)
    expect(tokenCache.get(cacheKey())).toEqual({
      token: 'test',
      expires: 0,
    })
  })

  it('returns an empty string with an expired token', () => {
    setMarket(987)
    cacheToken('test', 0)
    expect(getToken()).toEqual({ token: '', expires: 0 })
  })

  it('returns current token', () => {
    setMarket(123)
    const expires = Date.now() + 1000
    cacheToken('test', expires)
    expect(getToken()).toEqual({ token: 'test', expires })
  })
})
