import {
  resetSession,
  getCurrentMarkets,
  setCurrentMarkets,
  getTokenType,
} from './session'
import { loginAsGuest } from './guest'
import { loginAsIntegration } from './integration'

/* istanbul ignore next */
export const __resetMarket = (): void => {
  setCurrentMarkets([])
}

export const setMarket = async (marketId: number | number[]): Promise<void> => {
  let markets: number[]
  if (Array.isArray(marketId)) {
    markets = marketId
  } else {
    markets = [marketId]
  }

  setCurrentMarkets(markets)

  // Changing markets invalidates customer tokens
  // so we need to log them out
  resetSession()

  // Changing markets also invalidates the current token
  // so we need to get a new one ( or use the cached version )
  if (getTokenType() === 'integration') {
    await loginAsIntegration()
  } else {
    await loginAsGuest()
  }
}

// Always return a copy so consumers cannot alter directly
export const getMarket = (): number[] => getCurrentMarkets()
