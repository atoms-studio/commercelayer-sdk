import axios, { AxiosInstance } from 'axios'
import { CommonPayloadAttributes } from './resource'
export interface InternalConfig {
  host: string
  clientId: string
  clientSecret: string
  refreshTokens: boolean
  refreshTokensAttempts: number
  onRefreshError: (error: Error) => void | Promise<void>
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
  refreshTokensAttempts: 3,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRefreshError: /* istanbul ignore next */ (error: Error) => {
    // Do nothing by default
  },
  cookies: {
    scopes: 'cl_scopes',
    customer_token: 'cl_customer_token',
    customer_refresh_token: 'cl_customer_refresh_token',
  },
}

export const config: InternalConfig = {
  host: defaultConfig.host,
  clientId: defaultConfig.clientId,
  clientSecret: defaultConfig.clientSecret,
  refreshTokens: defaultConfig.refreshTokens,
  refreshTokensAttempts: defaultConfig.refreshTokensAttempts,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRefreshError: /* istanbul ignore next */ (error: Error) => {
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

export const getConfig = (): Readonly<InternalConfig> => config

export const baseRequest: AxiosInstance = axios.create({
  baseURL: '',
  timeout: 5000,
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  },
})

export const initRequest = (config: InternalConfig): void => {
  baseRequest.defaults.baseURL = config.host
}

export const commonPayloadAttributes: (keyof CommonPayloadAttributes)[] = [
  'reference',
  'reference_origin',
  'metadata',
]
