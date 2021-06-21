import axios from 'axios'
import { getConfig } from '../config'
import {
  getScope,
  currentCustomerData,
  getCustomerToken,
  resetSession,
  isCustomerLoggedIn,
} from './session'
import { Customers, CustomerInstance } from '../resources/Customers'

export { isCustomerLoggedIn, getCustomerToken, currentCustomerData }
export interface CustomerData {
  id: string
  customer: CustomerInstance | null
  token: string
  refreshToken: string
  expires: number
}

export const logoutCustomer = (): void => {
  resetSession()
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

export const refreshCustomer = async (): Promise<CustomerData> => {
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
    currentCustomerData.expires = Date.now() + data.expires_in

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
): Promise<CustomerData> => {
  const authData = {
    id: '',
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
    currentCustomerData.customer = await Customers.find(currentCustomerData.id)
  }
}

export const getProfile = (): CustomerInstance | null => {
  return currentCustomerData.customer
}
