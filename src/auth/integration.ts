import axios from 'axios'
import { getConfig } from '../config'
import {
  getScope,
  TokenResponse,
  cacheToken,
  getToken,
  setTokenType,
} from './session'

export const loginAsIntegration = async (): Promise<TokenResponse> => {
  const config = getConfig()
  if (!config.host) {
    throw new Error('You must call "init" before using any Auth method')
  }

  if (!config.clientId) {
    throw new Error('Missing client id')
  }

  if (!config.clientSecret) {
    throw new Error('Missing client secret')
  }

  setTokenType('integration')

  // Check if a token is already available
  const cachedValue = getToken()
  if (cachedValue.token) {
    return cachedValue
  }

  const scope = getScope()
  const { data } = await axios.post(`${config.host}/oauth/token`, {
    grant_type: 'client_credentials',
    client_id: config.clientId,
    client_secret: config.clientSecret,
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
