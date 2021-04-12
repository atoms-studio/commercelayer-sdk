import { setMarket, getMarket } from './market'
import { loginAsGuest } from './guest'
import { loginAsCustomer, hasActiveCustomer } from './customer'

export const Auth = {
  setMarket,
  getMarket,
  loginAsGuest,
  loginAsCustomer,
  hasActiveCustomer,
}
