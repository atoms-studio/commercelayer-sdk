import axios, { AxiosError, AxiosResponse } from 'axios'
import { InternalConfig, getConfig, baseRequest } from '../config'
import { CustomerInstance } from '../resources/Customers'
import { find } from '../api'

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
  customer: CustomerInstance | null
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

/* istanbul ignore next */
export const removeCurrentToken = (): void => {
  tokenCache.delete(cacheKey())
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

export const refreshCurrentToken = (): Promise<TokenResponse | SessionData> => {
  return isCustomerLoggedIn()
    ? refreshCustomer()
    : tokenType === 'integration'
    ? refreshIntegration()
    : refreshGuest()
}

export const loginAsIntegration = async (): Promise<TokenResponse> => {
  const config = getConfig()
  if (!config.host) {
    throw new Error('You must call "init" before using any Auth method')
  }

  if (!config.clientId) {
    throw new Error('Missing client id')
  }

  if (!config.clientSecret) {
    throw new Error('Missing client secret')
  }

  setTokenType('integration')

  // Check if a token is already available
  const cachedValue = getToken()
  if (cachedValue.token) {
    return cachedValue
  }

  const scope = getScope()
  const { data } = await axios.post(`${config.host}/oauth/token`, {
    grant_type: 'client_credentials',
    client_id: config.clientId,
    client_secret: config.clientSecret,
    scope,
  })

  /* istanbul ignore next */
  const expires = Date.now() + (Number(data.expires_in) || 0) * 1000
  cacheToken(data.access_token, expires)

  return {
    token: data.access_token,
    expires,
  }
}

export const refreshIntegration = async (): Promise<TokenResponse> => {
  removeCurrentToken()
  return await loginAsIntegration()
}

export const loginAsGuest = async (): Promise<TokenResponse> => {
  const config = getConfig()
  if (!config.host) {
    throw new Error('You must call "init" before using any Auth method')
  }

  if (!config.clientId) {
    throw new Error('Missing client id')
  }

  const scope = getScope()
  if (!scope) {
    throw new Error('You must first set a market')
  }

  setTokenType('sales_channel')

  // Check if a token is already available
  const cachedValue = getToken()
  if (cachedValue.token) {
    return cachedValue
  }

  // We dont use try..catch as auth errors must be handled by consumers
  const { data } = await axios.post(`${config.host}/oauth/token`, {
    grant_type: 'client_credentials',
    client_id: config.clientId,
    scope,
  })

  /* istanbul ignore next */
  const expires = Date.now() + (Number(data.expires_in) || 0) * 1000
  cacheToken(data.access_token, expires)

  return {
    token: data.access_token,
    expires,
  }
}

export const refreshGuest = async (): Promise<TokenResponse> => {
  removeCurrentToken()
  return await loginAsGuest()
}

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

export const isRefreshTokenError = /* istanbul ignore next */ (
  error: AxiosError,
): boolean => {
  return !!(
    error.response &&
    error.response.status === 401 &&
    error.response.data &&
    error.response.data.errors &&
    error.response.data.errors.length &&
    error.response.data.errors[0].code === 'INVALID_TOKEN'
  )
}

export const getRefreshTokenInterceptor = (
  config: Readonly<InternalConfig>,
): any[] => [
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    if (!isRefreshTokenError(error)) {
      throw error
    }

    if (!config.refreshTokens) {
      throw error
    }

    const errorConfig = error.config as any

    const retries = errorConfig.__retryAttempts || /* istanbul ignore next */ 0
    /* istanbul ignore next */
    if (retries < config.refreshTokensAttempts) {
      try {
        const authData = await refreshCurrentToken()

        errorConfig.__retryAttempts++
        errorConfig.headers.authorization = `Bearer ${authData.token}`
      } catch (err) {
        // Could not refresh the token, exit immediatly
        config.onRefreshError(err)
        throw err
      }

      return await axios.request(error.config)
    } else {
      config.onRefreshError(error)
      throw error
    }
  },
]
baseRequest.interceptors.response.use(
  ...getRefreshTokenInterceptor(getConfig()),
)

export const logoutCustomer = (): void => {
  resetSession()
}

export const loginAsCustomer = async (
  username: string,
  password: string,
): Promise<SessionData> => {
  const config = getConfig()
  if (!config.host) {
    throw new Error('You must call "init" before using any Auth method')
  }

  const scope = getScope()
  if (!scope) {
    throw new Error('You must first set a market')
  }

  try {
    const { data } = await axios.post(`${config.host}/oauth/token`, {
      grant_type: 'password',
      client_id: config.clientId,
      username,
      password,
      scope,
    })

    currentCustomerData.id = data.owner_id
    currentCustomerData.token = data.access_token
    currentCustomerData.refreshToken = data.refresh_token
    currentCustomerData.customer = null
    currentCustomerData.expires = Date.now() + data.expires_in * 1000

    await loadProfile()
  } catch (err) /* istanbul ignore next */ {
    // Reset auth data and rethrow the error
    logoutCustomer()
    throw err
  }

  return currentCustomerData
}

export const refreshCustomer = async (): Promise<SessionData> => {
  const config = getConfig()
  if (!config.host) {
    throw new Error('You must call "init" before using any Auth method')
  }

  if (!isCustomerLoggedIn()) {
    return {
      id: '',
      customer: null,
      token: '',
      refreshToken: '',
      expires: 0,
    }
  }

  try {
    const { data } = await axios.post(`${config.host}/oauth/token`, {
      grant_type: 'refresh_token',
      client_id: config.clientId,
      refresh_token: currentCustomerData.refreshToken,
    })

    currentCustomerData.id = data.owner_id
    currentCustomerData.token = data.access_token
    currentCustomerData.refreshToken = data.refresh_token
    currentCustomerData.customer = null
    currentCustomerData.expires = Date.now() + data.expires_in * 1000

    await loadProfile()
  } catch (err) /* istanbul ignore next */ {
    // Reset auth data and rethrow the error
    logoutCustomer()
    throw err
  }

  return currentCustomerData
}

export const useCustomerSession = async (
  accessToken: string,
  refreshToken: string,
  scope: string,
): Promise<SessionData> => {
  if (!accessToken || !refreshToken || scope !== getScope()) {
    throw new Error('Invalid session data')
  }

  // Temporarily set auth data
  currentCustomerData.id = ''
  currentCustomerData.token = accessToken
  currentCustomerData.refreshToken = refreshToken
  currentCustomerData.customer = null
  currentCustomerData.expires = Date.now() + 5 * 1000

  return await refreshCustomer()
}

export const loadProfile = async (): Promise<void> => {
  /* istanbul ignore else */
  if (isCustomerLoggedIn()) {
    currentCustomerData.customer = (await find(
      currentCustomerData.id,
      {},
      {
        type: 'customers',
        attributes: ['email', 'password', 'status', 'has_password'],
        relationships: {},
      },
    )) as any
  }
}

export const getProfile = (): CustomerInstance | null => {
  return currentCustomerData.customer
}
