import { __resetMarket, setMarket } from '../../src/auth/session'
import { tokenCache, getTokenType } from '../../src/auth/session'
import { loginAsGuest, refreshGuest } from '../../src/auth/session'
import { initConfig, __resetConfig } from '../../src/config'
import { mockAuthResponse } from '../utils'
import axios from 'axios'

const _originalPost = axios.post

describe('auth:guest', () => {
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

  it('throws an error if used before initializing the config', async () => {
    await expect(() => loginAsGuest()).rejects.toThrow(
      'You must call "init" before using any Auth method',
    )
  })

  it('throws an error if used without a client id', async () => {
    initConfig({
      host: 'asda',
    })

    await expect(() => loginAsGuest()).rejects.toThrow('Missing client id')
  })

  it('throws an error if used before setting a market', () => {
    initConfig({
      host: 'asda',
      clientId: 'asdasd',
    })

    expect(() => loginAsGuest()).rejects.toThrow('You must first set a market')
  })

  it('returns a TokenResponse', async () => {
    initConfig({
      host: 'asda',
      clientId: 'asdasd',
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

    const response = await loginAsGuest()
    expect(response).toHaveProperty('token', 'your-access-token')
    expect(response).toHaveProperty('expires')

    // Expect date expiration to be within a 5% of the expected value
    expect(response.expires).toBeLessThan((Date.now() + 7200) * 1.05)
    expect(response.expires).toBeGreaterThan((Date.now() + 7200) / 1.05)
  })

  it('caches the token in the current market', async () => {
    initConfig({
      host: 'asda',
      clientId: 'asdasd',
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

    await loginAsGuest()
    expect(tokenCache.has('7777')).toBe(true)
    expect((tokenCache.get('7777') || {}).token).toBe('your-7777-access-token')
    expect(getTokenType()).toBe('sales_channel')
  })

  it('uses a cached token if available', async () => {
    initConfig({
      host: 'asda',
      clientId: 'asdasd',
    })
    mockAuthResponse({
      access_token: 'your-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      scope: 'market:1234',
      created_at: Date.now(),
    })

    await setMarket([19])
    await loginAsGuest()
    expect(axios.post).toHaveBeenCalledTimes(1)

    await loginAsGuest()
    expect(axios.post).toHaveBeenCalledTimes(1)
  })

  it('refreshes a guest token', async () => {
    initConfig({
      host: 'asda',
      clientId: 'asdasd',
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

    const response = await refreshGuest()
    expect(response).toHaveProperty('token', 'your-access-token')
    expect(response).toHaveProperty('expires')

    // Expect date expiration to be within a 5% of the expected value
    expect(response.expires).toBeLessThan((Date.now() + 7200) * 1.05)
    expect(response.expires).toBeGreaterThan((Date.now() + 7200) / 1.05)
  })
})
