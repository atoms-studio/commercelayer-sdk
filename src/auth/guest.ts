import axios from 'axios'
import { cacheToken, getToken } from './cache'
import { getScope } from './market'
import { getConfig } from '../config'

export interface GuestResponse {
  token: string
  expires: number
}

export const loginAsGuest = async (): Promise<GuestResponse> => {
  const config = getConfig()
  if (!config.host) {
    throw new Error('You must call "init" before using any Auth method')
  }

  const scope = getScope()
  if (!scope) {
    throw new Error('You must first set a market')
  }

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
  const expires = Date.now() + (Number(data.expires_in) || 0)
  cacheToken(data.access_token, expires)

  return {
    token: data.access_token,
    expires,
  }
}
