import {
  __resetMarket,
  setMarket,
  getMarket,
  getScope,
} from '../../src/auth/market'

describe('auth:market', () => {
  beforeEach(() => {
    __resetMarket()
  })

  it('sets the current market', () => {
    setMarket(123)
    expect(getMarket()).toEqual([123])
  })

  it('handles both single and array inputs', () => {
    setMarket(123)
    expect(getMarket()).toEqual([123])

    setMarket([123, 456])
    expect(getMarket()).toEqual([123, 456])
  })

  it('returns the scope based on current market', () => {
    setMarket(777)
    expect(getScope()).toEqual('market:777')

    setMarket([987, 333])
    expect(getScope()).toEqual('market:987 market:333')
  })

  it('sets current market by value', () => {
    const market = [567]
    setMarket(market)
    expect(getMarket()).toEqual([567])

    market.push(432)
    expect(getMarket()).toEqual([567])
  })
})
