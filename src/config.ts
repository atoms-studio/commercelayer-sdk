import axios, { AxiosInstance, AxiosError } from 'axios'
import { CustomerData } from './auth/customer'
import { GuestResponse } from './auth/guest'
export interface InternalConfig {
  host: string
  clientId: string
  clientSecret: string
  refreshTokens: boolean
  refreshTokensAttempts: number
  onRefreshError: (error: Error) => void | Promise<void>
  isCustomerLoggedInFn: () => boolean
  refreshCustomerTokenFn: () => Promise<CustomerData>
  refreshGuestTokenFn: () => Promise<GuestResponse>
  cookies: {
    scopes: string | false
    customer_token: string | false
    customer_refresh_token: string | false
  }
}

export interface Config {
  host: string
  clientId?: string
  clientSecret?: string
  refreshTokens?: boolean
  refreshTokensAttempts?: number
  onRefreshError?: (error: Error) => void | Promise<void>
  cookies?:
    | {
        scopes?: string | false
        customer_token?: string | false
        customer_refresh_token?: string | false
      }
    | false
}

export const defaultConfig: Readonly<InternalConfig> = {
  host: '',
  clientId: '',
  clientSecret: '',
  refreshTokens: true,
  refreshTokensAttempts: 5,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRefreshError: (error: Error) => {
    // Do nothing by default
  },
  cookies: {
    scopes: 'cl_scopes',
    customer_token: 'cl_customer_token',
    customer_refresh_token: 'cl_customer_refresh_token',
  },
  isCustomerLoggedInFn: () => false,
  refreshCustomerTokenFn: () => {
    return Promise.resolve({} as any)
  },
  refreshGuestTokenFn: async () => {
    return Promise.resolve({} as any)
  },
}

export const config: InternalConfig = {
  host: defaultConfig.host,
  clientId: defaultConfig.clientId,
  clientSecret: defaultConfig.clientSecret,
  refreshTokens: defaultConfig.refreshTokens,
  refreshTokensAttempts: defaultConfig.refreshTokensAttempts,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRefreshError: (error: Error) => {
    // Do nothing by default
  },
  cookies: {
    scopes: (defaultConfig.cookies as Record<string, string | false>).scopes,
    customer_token: (defaultConfig.cookies as Record<string, string | false>)
      .customer_token,
    customer_refresh_token: (defaultConfig.cookies as Record<
      string,
      string | false
    >).customer_refresh_token,
  },
  isCustomerLoggedInFn: defaultConfig.isCustomerLoggedInFn,
  refreshCustomerTokenFn: defaultConfig.refreshCustomerTokenFn,
  refreshGuestTokenFn: defaultConfig.refreshCustomerTokenFn,
}

/* istanbul ignore next */
export const __resetConfig = (): void => {
  Object.assign(config, defaultConfig)
}

export const initConfig = (providedConfig: Config): void => {
  config.host = providedConfig.host
  config.clientId = providedConfig.clientId || ''
  config.clientSecret = providedConfig.clientSecret || ''
  config.refreshTokens = !!providedConfig.refreshTokens
  config.refreshTokensAttempts = Number(providedConfig.refreshTokensAttempts)
  config.onRefreshError =
    providedConfig.onRefreshError || defaultConfig.onRefreshError

  if (typeof providedConfig.refreshTokens === 'boolean') {
    config.refreshTokens = providedConfig.refreshTokens
  } else {
    config.refreshTokens = defaultConfig.refreshTokens
  }

  if (providedConfig.cookies === false) {
    config.cookies = {
      scopes: false,
      customer_token: false,
      customer_refresh_token: false,
    }
  } else if (providedConfig.cookies) {
    ;(config.cookies as Record<string, string | false>) = {}
    ;(config.cookies as Record<string, string | false>).scopes =
      providedConfig.cookies.scopes || defaultConfig.cookies.scopes
    ;(config.cookies as Record<string, string | false>).customer_token =
      providedConfig.cookies.customer_token ||
      defaultConfig.cookies.customer_token
    ;(config.cookies as Record<string, string | false>).customer_refresh_token =
      providedConfig.cookies.customer_refresh_token ||
      defaultConfig.cookies.customer_refresh_token
  } else {
    config.cookies = {
      scopes: defaultConfig.cookies.scopes,
      customer_token: defaultConfig.cookies.customer_token,
      customer_refresh_token: defaultConfig.cookies.customer_refresh_token,
    }
  }

  if (!config.host) {
    throw new Error('Missing host')
  }

  if (isNaN(config.refreshTokensAttempts)) {
    config.refreshTokensAttempts = defaultConfig.refreshTokensAttempts
  }

  initRequest(config)
}

export const getConfig = (): Readonly<Config> => config
export const getWritableConfig = (): InternalConfig => config

let baseRequest: AxiosInstance | null = null

export const initRequest = (config: InternalConfig): void => {
  baseRequest = axios.create({
    baseURL: config.host,
    timeout: 5000,
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  })

  /* istanbul ignore next */
  baseRequest.interceptors.response.use(
    (response) => {
      return response
    },
    async (error: AxiosError) => {
      if (!isRefreshTokenError(error)) {
        throw error
      }

      if (!config.refreshTokens) {
        await config.onRefreshError(error)
        throw error
      }

      const retries = (error.config as any).__retryAttempts || 0
      if (retries < config.refreshTokensAttempts) {
        const isCustomerSignedIn = config.isCustomerLoggedInFn()
        let authData: GuestResponse | CustomerData

        try {
          if (isCustomerSignedIn) {
            authData = await config.refreshCustomerTokenFn()
          } else {
            authData = await config.refreshGuestTokenFn()
          }
        } catch (err) {
          config.onRefreshError(error)
          throw error
        }

        ;(error.config as any).__retryAttempts++
        error.config.headers.Authorization = `Bearer ${authData.token}`

        return await axios.request(error.config)
      } else {
        config.onRefreshError(error)
        throw error
      }
    },
  )
}

export const getBaseRequest = (): AxiosInstance => {
  if (!baseRequest) {
    throw new Error('You must call "init" before using any resource method')
  }

  return baseRequest
}

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
