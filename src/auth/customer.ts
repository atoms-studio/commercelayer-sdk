import axios from 'axios'
import { getScope, getMarket } from './market'
import { getConfig } from '../config'
import { TokenCacheEntry } from './cache'

export interface CustomerData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customer: any
  token: string
  refreshToken: string
  expires: number
}

export const currentCustomerData: CustomerData = {
  customer: null,
  token: '',
  refreshToken: '',
  expires: 0,
}

export const logoutCustomer = (): void => {
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

export const loginAsCustomer = async (
  username: string,
  password: string,
): Promise<CustomerData> => {
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

    currentCustomerData.token = data.access_token
    currentCustomerData.refreshToken = data.refresh_token
    currentCustomerData.customer = null
    currentCustomerData.expires = Date.now() + data.expires_in * 1000
  } catch (err) /* istanbul ignore next */ {
    // Reset auth data and rethrow the error
    currentCustomerData.customer = null
    currentCustomerData.token = ''
    currentCustomerData.refreshToken = ''
    currentCustomerData.expires = 0

    throw err
  }

  return currentCustomerData
}

export const refreshCustomer = async (): Promise<CustomerData> => {
  const config = getConfig()
  if (!config.host) {
    throw new Error('You must call "init" before using any Auth method')
  }

  if (!isCustomerLoggedIn()) {
    return {
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

    currentCustomerData.token = data.access_token
    currentCustomerData.refreshToken = data.refresh_token
    currentCustomerData.customer = null
    currentCustomerData.expires = Date.now() + data.expires_in
  } catch (err) /* istanbul ignore next */ {
    // Reset auth data and rethrow the error
    currentCustomerData.customer = null
    currentCustomerData.token = ''
    currentCustomerData.refreshToken = ''
    currentCustomerData.expires = 0

    throw err
  }

  return currentCustomerData
}

export const useCustomerSession = async (
  accessToken: string,
  refreshToken: string,
  scope: string,
): Promise<CustomerData> => {
  const authData = {
    customer: null,
    token: '',
    refreshToken: '',
    expires: 0,
  }

  // Scopes must match
  if (scope !== getScope()) {
    return authData
  }

  // Temporarily set auth data
  currentCustomerData.token = accessToken
  currentCustomerData.refreshToken = refreshToken
  currentCustomerData.customer = null
  currentCustomerData.expires = Date.now() + 5 * 1000

  return await refreshCustomer()
}
