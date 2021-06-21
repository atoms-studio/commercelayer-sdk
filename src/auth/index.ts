import { setMarket, getMarket } from './market'
import { getScope } from './session'
import { loginAsGuest } from './guest'
import { getToken } from './cache'
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
  getToken,
  getCustomerToken,
  useCustomerSession,
  loadProfile,
  getProfile,
}
