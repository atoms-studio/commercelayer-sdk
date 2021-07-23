import { setMarket, getMarket } from './market'
import { getScope, getToken } from './session'
import { loginAsGuest } from './guest'
import { loginAsIntegration } from './integration'
import {
  loginAsCustomer,
  isCustomerLoggedIn,
  logoutCustomer,
  getCustomerToken,
  useCustomerSession,
  loadProfile,
  getProfile,
} from './customer'

export const Auth = {
  setMarket,
  getMarket,
  getScope,
  loginAsGuest,
  loginAsCustomer,
  isCustomerLoggedIn,
  logoutCustomer,
  loginAsIntegration,
  getToken,
  getCustomerToken,
  useCustomerSession,
  loadProfile,
  getProfile,
}
