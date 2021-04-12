import { __resetMarket, setMarket } from '../../src/auth/market'
import {
  loginAsCustomer,
  currentCustomerData,
  resetCustomerData,
  hasActiveCustomer,
  getCustomerToken,
} from '../../src/auth/customer'
import { initConfig } from '../../src/config'
import { mockAuthResponse } from '../utils'
import axios from 'axios'

const _originalPost = axios.post

describe('auth:customer', () => {
  beforeEach(() => {
    __resetMarket()
  })

  afterEach(() => {
    ;(axios.post as any) = _originalPost
    resetCustomerData()
  })

  it('throws an error if used before initializing the config', () => {
    expect(() => loginAsCustomer('asd', 'asd')).rejects.toThrow(
      'You must call "init" before using any Auth method',
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
      scope: 'market:1',
      created_at: createdAt,
      owner_id: 'zxcVBnMASd',
      owner_type: 'customer',
    })
    setMarket(1)

    const response = await loginAsCustomer('asd', 'asd')
    expect(response).toHaveProperty('token', 'your-access-token')
    expect(response).toHaveProperty('refreshToken', 'your-refresh-token')
    expect(response).toHaveProperty('customer', null)
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
    setMarket([7777])
    mockAuthResponse({
      access_token: 'your-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      refresh_token: 'your-refresh-token',
      scope: 'market:7777',
      created_at: createdAt,
      owner_id: 'zxcVBnMASd',
      owner_type: 'customer',
    })

    await loginAsCustomer('asdasd', 'asdasd')
    expect(currentCustomerData).toEqual({
      customer: null,
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
    setMarket([7777])
    mockAuthResponse({
      access_token: 'your-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      refresh_token: 'your-refresh-token',
      scope: 'market:7777',
      created_at: createdAt,
      owner_id: 'zxcVBnMASd',
      owner_type: 'customer',
    })

    await loginAsCustomer('asdasd', 'asdasd')
    expect(currentCustomerData).toEqual({
      customer: null,
      token: 'your-access-token',
      refreshToken: 'your-refresh-token',
      expires: expect.any(Number),
    })

    resetCustomerData()

    expect(currentCustomerData).toEqual({
      customer: null,
      token: '',
      refreshToken: '',
      expires: 0,
    })
  })

  it("tells if there's an active customer", async () => {
    expect(hasActiveCustomer()).toBe(false)
    initConfig({
      host: 'asda',
      clientId: 'asdasd',
    })
    const createdAt = Date.now() - 60 * 1000
    setMarket([7777])
    mockAuthResponse({
      access_token: 'your-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      refresh_token: 'your-refresh-token',
      scope: 'market:7777',
      created_at: createdAt,
      owner_id: 'zxcVBnMASd',
      owner_type: 'customer',
    })

    await loginAsCustomer('asdasd', 'asdasd')
    expect(hasActiveCustomer()).toBe(true)

    resetCustomerData()
    expect(hasActiveCustomer()).toBe(false)
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
    setMarket([7777])
    mockAuthResponse({
      access_token: 'your-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      refresh_token: 'your-refresh-token',
      scope: 'market:7777',
      created_at: createdAt,
      owner_id: 'zxcVBnMASd',
      owner_type: 'customer',
    })

    await loginAsCustomer('asdasd', 'asdasd')
    expect(getCustomerToken()).toEqual({
      token: 'your-access-token',
      expires: expect.any(Number),
    })
  })
})
