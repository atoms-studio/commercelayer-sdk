import { __resetMarket, setMarket } from '../../src/auth/session'
import {
  tokenCache,
  getTokenType,
  INTEGRATION_PREFIX,
} from '../../src/auth/session'
import { loginAsIntegration } from '../../src/auth/session'
import { initConfig, __resetConfig } from '../../src/config'
import { mockAuthResponse } from '../utils'
import axios from 'axios'

const _originalPost = axios.post

describe('auth:integration', () => {
  beforeEach(() => {
    __resetMarket()
    __resetConfig()
    ;(axios.post as any) = _originalPost
    mockAuthResponse({
      access_token: 'your-592-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      scope: 'market:592',
      created_at: Date.now(),
    })
  })

  afterEach(() => {
    ;(axios.post as any) = _originalPost
  })

  it('throws an error if used before initializing the config', () => {
    expect(() => loginAsIntegration()).rejects.toThrow(
      'You must call "init" before using any Auth method',
    )
  })

  it('throws an error if used without a client id', () => {
    initConfig({
      host: 'asda',
    })

    expect(() => loginAsIntegration()).rejects.toThrow('Missing client id')
  })

  it('throws an error if used without a client secret', () => {
    initConfig({
      host: 'asda',
      clientId: 'asdasd',
    })

    expect(() => loginAsIntegration()).rejects.toThrow('Missing client secret')
  })

  it('returns a TokenResponse', async () => {
    initConfig({
      host: 'asda',
      clientId: 'asdasd',
      clientSecret: 'asdasd',
    })
    const createdAt = Date.now() - 60 * 1000
    mockAuthResponse({
      access_token: 'your-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      scope: 'market:1234',
      created_at: createdAt,
    })
    await setMarket(1)

    const response = await loginAsIntegration()
    expect(response).toHaveProperty('token', 'your-access-token')
    expect(response).toHaveProperty('expires')

    // Expect date expiration to be within a 5% of the expected value
    expect(response.expires).toBeLessThan((Date.now() + 7200) * 1.05)
    expect(response.expires).toBeGreaterThan((Date.now() + 7200) / 1.05)
  })

  it('caches the token without a market', async () => {
    initConfig({
      host: 'asda',
      clientId: 'asdasd',
      clientSecret: 'asdasd',
    })
    const createdAt = Date.now() - 60 * 1000
    mockAuthResponse({
      access_token: 'your-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      scope: '',
      created_at: createdAt,
    })

    await loginAsIntegration()
    const key = `${INTEGRATION_PREFIX}`
    expect(tokenCache.has(key)).toBe(true)
    expect((tokenCache.get(key) || {}).token).toBe('your-access-token')
    expect(getTokenType()).toBe('integration')
  })

  it('caches the token in the current market', async () => {
    initConfig({
      host: 'asda',
      clientId: 'asdasd',
      clientSecret: 'asdasd',
    })
    const createdAt = Date.now() - 60 * 1000
    mockAuthResponse({
      access_token: 'your-7777-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      scope: 'market:7777',
      created_at: createdAt,
    })

    await setMarket([7777])

    await loginAsIntegration()
    const key = `${INTEGRATION_PREFIX}7777`
    expect(tokenCache.has(key)).toBe(true)
    expect((tokenCache.get(key) || {}).token).toBe('your-7777-access-token')
    expect(getTokenType()).toBe('integration')
  })

  it('uses a cached token if available', async () => {
    initConfig({
      host: 'asda',
      clientId: 'asdasd',
      clientSecret: 'asdasd',
    })
    mockAuthResponse({
      access_token: 'your-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      scope: 'market:1234',
      created_at: Date.now(),
    })

    await setMarket([19])
    await loginAsIntegration()
    expect(axios.post).toHaveBeenCalledTimes(1)

    await loginAsIntegration()
    expect(axios.post).toHaveBeenCalledTimes(1)
  })
})
