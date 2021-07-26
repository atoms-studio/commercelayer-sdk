import { initRequest, baseRequest } from '../src/config'

describe('request', () => {
  it('creates an axios instance after calling init', () => {
    const baseURL = 'http://www.google.com'
    initRequest({
      host: baseURL,
      clientId: '',
      clientSecret: '',
      refreshTokens: false,
      refreshTokensAttempts: 5,
      onRefreshError: (err) => {
        //
      },
      cookies: {} as any,
    })

    expect(baseRequest.defaults.headers).toHaveProperty(
      'Accept',
      'application/vnd.api+json',
    )
    expect(baseRequest.defaults.headers).toHaveProperty(
      'Content-Type',
      'application/vnd.api+json',
    )
    expect(baseRequest.defaults.baseURL).toBe(baseURL)
    expect(baseRequest.defaults.timeout).toBe(5000)
  })
})
