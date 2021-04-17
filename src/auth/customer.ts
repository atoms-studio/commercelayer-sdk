import axios from 'axios'
import { getScope } from './market'
import { getConfig } from '../config'
import { TokenCacheEntry } from './cache'

export interface CustomerData {
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
  rememberMe = false,
): Promise<CustomerData> => {
  const config = getConfig()
  if (!config.host) {
    throw new Error('You must call "init" before using any Auth method')
  }

  // We dont use try..catch as auth errors must be handled by consumers
  const { data } = await axios.post(`${config.host}/oauth/token`, {
    grant_type: 'password',
    client_id: config.clientId,
    username,
    password,
    scope: getScope(),
  })

  let expires = 0
  /* istanbul ignore else */
  if (data.access_token) {
    expires = Date.now() + data.expires_in
    currentCustomerData.token = data.access_token
    currentCustomerData.refreshToken = data.refresh_token
    currentCustomerData.customer = null
    currentCustomerData.expires = Date.now() + data.expires_in
  }

  return {
    customer: null,
    token: data.access_token,
    refreshToken: data.refresh_token,
    expires,
  }
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

  // We dont use try..catch as auth errors must be handled by consumers
  const { data } = await axios.post(`${config.host}/oauth/token`, {
    grant_type: 'refresh_token',
    client_id: config.clientId,
    refresh_token: currentCustomerData.refreshToken,
  })

  let expires = 0
  /* istanbul ignore else */
  if (data.access_token) {
    expires = Date.now() + data.expires_in
    currentCustomerData.token = data.access_token
    currentCustomerData.refreshToken = data.refresh_token
    currentCustomerData.customer = null
    currentCustomerData.expires = Date.now() + data.expires_in
  }

  return {
    customer: null,
    token: data.access_token,
    refreshToken: data.refresh_token,
    expires,
  }
}
