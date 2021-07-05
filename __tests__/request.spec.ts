import { initRequest, getBaseRequest } from '../src/config'

describe('request', () => {
  it('throws an error with an empty request', () => {
    expect(() => getBaseRequest()).toThrow(
      'You must call "init" before using any resource method',
    )
  })

  it('creates an axios instance after calling init', () => {
    const baseURL = 'http://www.google.com'
    initRequest({
      host: baseURL,
      clientId: '',
      refreshTokens: false,
      refreshTokensAttempts: 5,
      onRefreshError: (err) => {
        //
      },
      cookies: {} as any,
      isCustomerLoggedInFn: () => false,
      refreshCustomerTokenFn: async () => {
        return {} as any
      },
      refreshGuestTokenFn: async () => {
        return {} as any
      },
    })

    const request = getBaseRequest()

    expect(request.defaults.headers).toHaveProperty(
      'Accept',
      'application/vnd.api+json',
    )
    expect(request.defaults.headers).toHaveProperty(
      'Content-Type',
      'application/vnd.api+json',
    )
    expect(request.defaults.baseURL).toBe(baseURL)
    expect(request.defaults.timeout).toBe(5000)
  })
})
