import { setMarket, getMarket } from './market'
import { loginAsGuest } from './guest'
import { getToken } from './cache'
import {
  loginAsCustomer,
  isCustomerLoggedIn,
  logoutCustomer,
  getCustomerToken,
} from './customer'

export const Auth = {
  setMarket,
  getMarket,
  loginAsGuest,
  loginAsCustomer,
  isCustomerLoggedIn,
  logoutCustomer,
  getToken,
  getCustomerToken,
}
