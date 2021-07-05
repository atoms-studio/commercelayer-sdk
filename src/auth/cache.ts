import { getCurrentMarkets } from './session'

export interface TokenCacheEntry {
  token: string
  expires: number
}

export const tokenCache: Map<string, TokenCacheEntry> = new Map()

export const cacheKey = (): string => getCurrentMarkets().join(',')

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
