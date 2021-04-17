import { setMarket, getMarket } from './market'
import { loginAsGuest } from './guest'
import { loginAsCustomer, isCustomerLoggedIn, logoutCustomer } from './customer'

export const Auth = {
  setMarket,
  getMarket,
  loginAsGuest,
  loginAsCustomer,
  isCustomerLoggedIn,
  logoutCustomer,
}
