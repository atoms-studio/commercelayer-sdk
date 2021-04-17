import { initRequest } from './request'

export interface InternalConfig {
  host: string
  clientId: string
  refreshTokens: boolean
  refreshTokensAttempts: number
  cookies: {
    scopes: string | false
    customer_token: string | false
    customer_refresh_token: string | false
  }
}

export interface Config {
  host: string
  clientId: string
  refreshTokens?: boolean
  refreshTokensAttempts?: number
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
  refreshTokens: true,
  refreshTokensAttempts: 5,
  cookies: {
    scopes: 'cl_scopes',
    customer_token: 'cl_customer_token',
    customer_refresh_token: 'cl_customer_refresh_token',
  },
}

export const config: InternalConfig = {
  host: defaultConfig.host,
  clientId: defaultConfig.clientId,
  refreshTokens: defaultConfig.refreshTokens,
  refreshTokensAttempts: defaultConfig.refreshTokensAttempts,
  cookies: {
    scopes: (defaultConfig.cookies as Record<string, any>).scopes,
    customer_token: (defaultConfig.cookies as Record<string, any>)
      .customer_token,
    customer_refresh_token: (defaultConfig.cookies as Record<string, any>)
      .customer_refresh_token,
  },
}

/* istanbul ignore next */
export const __resetConfig = (): void => {
  Object.assign(config, defaultConfig)
}

export const initConfig = (providedConfig: Config): void => {
  config.host = providedConfig.host
  config.clientId = providedConfig.clientId
  config.refreshTokens = !!providedConfig.refreshTokens
  config.refreshTokensAttempts = Number(providedConfig.refreshTokensAttempts)

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
    ;(config.cookies as any) = {}
    ;(config.cookies as Record<string, any>).scopes =
      providedConfig.cookies.scopes || defaultConfig.cookies.scopes
    ;(config.cookies as Record<string, any>).customer_token =
      providedConfig.cookies.customer_token ||
      defaultConfig.cookies.customer_token
    ;(config.cookies as Record<string, any>).customer_refresh_token =
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

  if (!config.clientId) {
    throw new Error('Missing client id')
  }

  if (isNaN(config.refreshTokensAttempts)) {
    config.refreshTokensAttempts = defaultConfig.refreshTokensAttempts
  }

  initRequest(config.host)
}

export const getConfig = (): Readonly<Config> => config
