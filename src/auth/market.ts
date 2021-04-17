import { logoutCustomer } from './customer'
import { loginAsGuest } from './guest'

let currentMarkets: number[] = []

/* istanbul ignore next */
export const __resetMarket = (): void => {
  currentMarkets = []
}

export const setMarket = async (marketId: number | number[]): Promise<void> => {
  let markets: number[]
  if (Array.isArray(marketId)) {
    markets = marketId
  } else {
    markets = [marketId]
  }

  // Always assign a copy, otherwise consumer's modifications
  // on the input parameter would alter the value
  currentMarkets = markets.slice()

  // Changing markets invalidates customer tokens
  // so we need to log them out
  logoutCustomer()

  // Changing markets also invalidates the current guest token
  // so we need to get a new one ( or use the cached version )
  await loginAsGuest()
}

// Always return a copy so consumers cannot alter directly
export const getMarket = (): number[] => currentMarkets.slice()

export const getScope = (): string =>
  currentMarkets.map((market) => `market:${market}`).join(' ')
