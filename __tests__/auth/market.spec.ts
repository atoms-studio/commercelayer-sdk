import { __resetMarket, setMarket, getMarket } from '../../src/auth/market'
import { getScope } from '../../src/auth/session'
import { resetSession } from '../../src/auth/session'
import { loginAsGuest } from '../../src/auth/guest'
import { initConfig, __resetConfig } from '../../src/config'
import { mockAuthResponse } from '../utils'
import axios from 'axios'

const _originalPost = axios.post

describe('auth:market', () => {
  beforeEach(() => {
    __resetMarket()
    initConfig({
      host: 'asdasd',
      clientId: 'aaaaa',
    })
    mockAuthResponse({
      access_token: 'your-7777-access-token',
      token_type: 'bearer',
      expires_in: 7200,
      scope: 'market:7777',
      created_at: Date.now(),
    })
  })

  afterEach(() => {
    __resetConfig()
    ;(axios.post as any) = _originalPost
  })

  it('sets the current market', async () => {
    await setMarket(123)
    expect(getMarket()).toEqual([123])
  })

  it('handles both single and array inputs', async () => {
    await setMarket(123)
    expect(getMarket()).toEqual([123])

    await setMarket([123, 456])
    expect(getMarket()).toEqual([123, 456])
  })

  it('returns the scope based on current market', async () => {
    await setMarket(777)
    expect(getScope()).toEqual('market:777')

    await setMarket([987, 333])
    expect(getScope()).toEqual('market:987 market:333')
  })

  it('sets current market by value', async () => {
    const market = [567]
    await setMarket(market)
    expect(getMarket()).toEqual([567])

    market.push(432)
    expect(getMarket()).toEqual([567])
  })

  it('logs out current customer when changing market', async () => {
    const originalFn = resetSession
    ;(resetSession as any) = jest.fn()

    await setMarket(918)
    expect(resetSession).toHaveBeenCalledTimes(1)
    ;(resetSession as any) = originalFn
  })

  it('retrieves the guest token when changing market', async () => {
    const originalFn = loginAsGuest
    ;(loginAsGuest as any) = jest.fn()

    await setMarket(918)
    expect(loginAsGuest).toHaveBeenCalledTimes(1)
    ;(loginAsGuest as any) = originalFn
  })
})
