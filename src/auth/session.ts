export interface TokenCacheEntry {
  token: string
  expires: number
}

export interface TokenResponse {
  token: string
  expires: number
}

export interface SessionData {
  id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customer: any
  token: string
  refreshToken: string
  expires: number
}

export type TokenType = 'sales_channel' | 'integration'

let tokenType: TokenType = 'sales_channel'

export const setTokenType = (type: TokenType): void => {
  tokenType = type
}

export const getTokenType = (): TokenType => tokenType

export const tokenCache: Map<string, TokenCacheEntry> = new Map()

export const INTEGRATION_PREFIX = 'integration__'

export const cacheKey = (): string => {
  let prefix = ''
  if (tokenType === 'integration') {
    prefix = INTEGRATION_PREFIX
  }
  return prefix + getCurrentMarkets().join(',')
}

export const cacheToken = (token: string, expires: number): void => {
  tokenCache.set(cacheKey(), {
    token,
    expires,
  })
}

export const getToken = (): TokenCacheEntry => {
  const key = cacheKey()
  const cachedValue = tokenCache.get(key)
  if (!cachedValue || !cachedValue.token || cachedValue.expires <= Date.now()) {
    return {
      token: '',
      expires: 0,
    }
  }

  return cachedValue
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

export const getCurrentToken = (): TokenCacheEntry => {
  return isCustomerLoggedIn() ? getCustomerToken() : getToken()
}
