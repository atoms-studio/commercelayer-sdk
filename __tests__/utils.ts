import axios from 'axios'
import { initRequest, getBaseRequest } from '../src/request'

export const mockRequestWithUri = () => {
  initRequest('http://www.google.com')
  const baseRequest = getBaseRequest()

  ;(baseRequest.request as any) = jest.fn((config) =>
    Promise.resolve(axios.getUri(config)),
  )

  return baseRequest
}
