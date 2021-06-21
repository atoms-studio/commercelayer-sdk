import { TokenCacheEntry } from './cache'

export interface SessionData {
  id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customer: any
  token: string
  refreshToken: string
  expires: number
}

export const currentCustomerData: SessionData = {
  id: '',
  customer: null,
  token: '',
  refreshToken: '',
  expires: 0,
}

export const resetSession = (): void => {
  currentCustomerData.id = ''
  currentCustomerData.customer = null
  currentCustomerData.token = ''
  currentCustomerData.refreshToken = ''
  currentCustomerData.expires = 0
}

export const isCustomerLoggedIn = (): boolean => {
  return !!(currentCustomerData.token && currentCustomerData.refreshToken)
}

export const getCustomerToken = (): TokenCacheEntry => {
  if (currentCustomerData.expires <= Date.now()) {
    return {
      token: '',
      expires: 0,
    }
  }

  return {
    token: currentCustomerData.token,
    expires: currentCustomerData.expires,
  }
}

let currentMarkets: number[] = []

export const getCurrentMarkets = (): number[] => {
  return currentMarkets.slice()
}

export const setCurrentMarkets = (markets: number[]): void => {
  currentMarkets = markets.slice()
}

export const getScope = (): string =>
  getCurrentMarkets()
    .map((market) => `market:${market}`)
    .join(' ')
