import { getMarket } from './market'

export interface TokenCacheEntry {
  token: string
  expires: number
}

export const tokenCache: Map<string, TokenCacheEntry> = new Map()

export const cacheKey = (): string => getMarket().join(',')

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
