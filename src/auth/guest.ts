import axios from 'axios'
import {
  getScope,
  TokenResponse,
  cacheToken,
  getToken,
  setTokenType,
} from './session'
import { getConfig } from '../config'

export const loginAsGuest = async (): Promise<TokenResponse> => {
  const config = getConfig()
  if (!config.host) {
    throw new Error('You must call "init" before using any Auth method')
  }

  if (!config.clientId) {
    throw new Error('Missing client id')
  }

  const scope = getScope()
  if (!scope) {
    throw new Error('You must first set a market')
  }

  setTokenType('sales_channel')

  // Check if a token is already available
  const cachedValue = getToken()
  if (cachedValue.token) {
    return cachedValue
  }

  // We dont use try..catch as auth errors must be handled by consumers
  const { data } = await axios.post(`${config.host}/oauth/token`, {
    grant_type: 'client_credentials',
    client_id: config.clientId,
    scope,
  })

  /* istanbul ignore next */
  const expires = Date.now() + (Number(data.expires_in) || 0) * 1000
  cacheToken(data.access_token, expires)

  return {
    token: data.access_token,
    expires,
  }
}
