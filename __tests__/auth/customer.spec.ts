import { __resetMarket, setMarket } from '../../src/auth/session'
import { createRequest } from '../../src/api'
import {
  loginAsCustomer,
  currentCustomerData,
  logoutCustomer,
  isCustomerLoggedIn,
  getCustomerToken,
  refreshCustomer,
  useCustomerSession,
  getProfile,
} from '../../src/auth/session'
import { initConfig, __resetConfig } from '../../src/config'
import { mockAuthResponse } from '../utils'
import axios from 'axios'

const _originalPost = axios.post
const _originalCreateRequest = createRequest

describe('auth:customer', () => {
  beforeEach(() => {
    __resetMarket()
    __resetConfig()
  })

  afterEach(() => {
    ;(axios.post as any) = _originalPost
    ;(createRequest as any) = _originalCreateRequest
    logoutCustomer()
  })

  it('throws an error if used before initializing the config', async () => {
    await expect(() => loginAsCustomer('asd', 'asd')).rejects.toThrow(
      'You must call "init" before using any Auth method',
    )
  })

  it('throws an error if used before setting a market', async () => {
    initConfig({
      host: 'asda',
      clientId: 'asdasd',
    })

    await expect(() => loginAsCustomer('asd', 'asd')).rejects.toThrow(
      'You must first set a market',
    )
  })

  it('returns CustomerData', async () => {
    initConfig({
      host: 'asda',
      clientId: 'asdasd',
    })
    const createdAt = Date.now() - 60 * 1000
    mockAuthResponse({
      access_token: 'your-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      refresh_token: 'your-refresh-token',
      scope: 'market:code:1',
      created_at: createdAt,
      owner_id: 'zxcVBnMASd',
      owner_type: 'customer',
    })
    await setMarket('1')

    const response = await loginAsCustomer('asd', 'asd')
    expect(response).toHaveProperty('id', 'zxcVBnMASd')
    expect(response).toHaveProperty('token', 'your-access-token')
    expect(response).toHaveProperty('refreshToken', 'your-refresh-token')
    expect(response).toHaveProperty('customer', expect.any(Object))
    expect(response).toHaveProperty('expires')

    // Expect date expiration to be within a 5% of the expected value
    expect(response.expires).toBeLessThan((Date.now() + 7200) * 1.05)
    expect(response.expires).toBeGreaterThan((Date.now() + 7200) / 1.05)
  })

  it('caches the token', async () => {
    initConfig({
      host: 'asda',
      clientId: 'asdasd',
    })
    const createdAt = Date.now() - 60 * 1000
    mockAuthResponse({
      access_token: 'your-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      refresh_token: 'your-refresh-token',
      scope: 'market:code:7777',
      created_at: createdAt,
      owner_id: 'zxcVBnMASd',
      owner_type: 'customer',
    })

    await setMarket(['7777'])

    await loginAsCustomer('asdasd', 'asdasd')
    expect(currentCustomerData).toEqual({
      id: 'zxcVBnMASd',
      customer: expect.any(Object),
      token: 'your-access-token',
      refreshToken: 'your-refresh-token',
      expires: expect.any(Number),
    })
  })

  it('resets customer data', async () => {
    initConfig({
      host: 'asda',
      clientId: 'asdasd',
    })
    const createdAt = Date.now() - 60 * 1000
    mockAuthResponse({
      access_token: 'your-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      refresh_token: 'your-refresh-token',
      scope: 'market:code:7777',
      created_at: createdAt,
      owner_id: 'zxcVBnMASd',
      owner_type: 'customer',
    })
    setMarket(['7777'])

    await loginAsCustomer('asdasd', 'asdasd')
    expect(currentCustomerData).toEqual({
      id: 'zxcVBnMASd',
      customer: expect.any(Object),
      token: 'your-access-token',
      refreshToken: 'your-refresh-token',
      expires: expect.any(Number),
    })

    logoutCustomer()

    expect(currentCustomerData).toEqual({
      id: '',
      customer: null,
      token: '',
      refreshToken: '',
      expires: 0,
    })
  })

  it("tells if there's an active customer", async () => {
    expect(isCustomerLoggedIn()).toBe(false)
    initConfig({
      host: 'asda',
      clientId: 'asdasd',
    })
    const createdAt = Date.now() - 60 * 1000
    mockAuthResponse({
      access_token: 'your-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      refresh_token: 'your-refresh-token',
      scope: 'market:code:7777',
      created_at: createdAt,
      owner_id: 'zxcVBnMASd',
      owner_type: 'customer',
    })

    await setMarket(['7777'])

    await loginAsCustomer('asdasd', 'asdasd')
    expect(isCustomerLoggedIn()).toBe(true)

    logoutCustomer()
    expect(isCustomerLoggedIn()).toBe(false)
  })

  it('returns the customer token', async () => {
    expect(getCustomerToken()).toEqual({
      token: '',
      expires: 0,
    })
    initConfig({
      host: 'asda',
      clientId: 'asdasd',
    })
    const createdAt = Date.now() - 60 * 1000
    mockAuthResponse({
      access_token: 'your-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      refresh_token: 'your-refresh-token',
      scope: 'market:code:7777',
      created_at: createdAt,
      owner_id: 'zxcVBnMASd',
      owner_type: 'customer',
    })

    await setMarket(['7777'])

    await loginAsCustomer('asdasd', 'asdasd')
    expect(getCustomerToken()).toEqual({
      token: 'your-access-token',
      expires: expect.any(Number),
    })
  })

  it('refreshes customer token', async () => {
    expect(currentCustomerData).toEqual({
      id: '',
      customer: null,
      token: '',
      refreshToken: '',
      expires: 0,
    })

    expect(async () => {
      await refreshCustomer()
    }).rejects.toThrow('You must call "init" before using any Auth method')

    initConfig({
      host: 'asda',
      clientId: 'asdasd',
    })
    const createdAt = Date.now() - 60 * 1000
    mockAuthResponse({
      access_token: 'your-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      refresh_token: 'your-refresh-token',
      scope: 'market:code:7778',
      created_at: createdAt,
      owner_id: 'zxcVBnMASd',
      owner_type: 'customer',
    })

    await setMarket(['7778'])

    const badResult = await refreshCustomer()
    expect(badResult).toEqual({
      id: '',
      customer: null,
      token: '',
      refreshToken: '',
      expires: 0,
    })

    currentCustomerData.token = '123'
    currentCustomerData.refreshToken = '456'

    const result = await refreshCustomer()
    expect(result).toEqual({
      id: 'zxcVBnMASd',
      customer: expect.any(Object),
      token: 'your-access-token',
      refreshToken: 'your-refresh-token',
      expires: expect.any(Number),
    })
    expect(currentCustomerData).toEqual({
      id: 'zxcVBnMASd',
      customer: expect.any(Object),
      token: 'your-access-token',
      refreshToken: 'your-refresh-token',
      expires: expect.any(Number),
    })
  })

  it('uses a saved customer token', async () => {
    expect(currentCustomerData).toEqual({
      id: '',
      customer: null,
      token: '',
      refreshToken: '',
      expires: 0,
    })

    initConfig({
      host: 'asda',
      clientId: 'asdasd',
    })
    const createdAt = Date.now() - 60 * 1000
    mockAuthResponse({
      access_token: 'your-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      refresh_token: 'your-refresh-token',
      scope: 'market:code:7778',
      created_at: createdAt,
      owner_id: 'zxcVBnMASd',
      owner_type: 'customer',
    })

    await setMarket(['77738'])

    expect(async () => {
      await useCustomerSession(
        'your-access-token',
        'your-refresh-token',
        'market:code:123',
      )
    }).rejects.toThrow('Invalid session data')

    const result = await useCustomerSession(
      'your-access-token',
      'your-refresh-token',
      'market:code:77738',
    )
    expect(result).toEqual({
      id: 'zxcVBnMASd',
      customer: expect.any(Object),
      token: 'your-access-token',
      refreshToken: 'your-refresh-token',
      expires: expect.any(Number),
    })
    expect(currentCustomerData).toEqual({
      id: 'zxcVBnMASd',
      customer: expect.any(Object),
      token: 'your-access-token',
      refreshToken: 'your-refresh-token',
      expires: expect.any(Number),
    })
  })

  it('returns the current customer', async () => {
    expect(currentCustomerData).toEqual({
      id: '',
      customer: null,
      token: '',
      refreshToken: '',
      expires: 0,
    })

    expect(getProfile()).toEqual(null)

    initConfig({
      host: 'asda',
      clientId: 'asdasd',
    })
    const createdAt = Date.now() - 60 * 1000
    mockAuthResponse({
      access_token: 'your-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      refresh_token: 'your-refresh-token',
      scope: 'market:code:1',
      created_at: createdAt,
      owner_id: 'zxcVBnMASd',
      owner_type: 'customer',
    })
    await setMarket('1')

    await loginAsCustomer('asd', 'asd')

    expect(currentCustomerData).toEqual({
      id: 'zxcVBnMASd',
      customer: expect.any(Object),
      token: 'your-access-token',
      refreshToken: 'your-refresh-token',
      expires: expect.any(Number),
    })

    expect(getProfile()).toEqual(
      expect.objectContaining({
        status: 'repeat',
        has_password: true,
      }),
    )
  })
})
