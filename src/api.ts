import { AxiosResponse } from 'axios'
import { getBaseRequest } from './request'

const formatError = () => {
  //
}

export type RequestMethod = 'get' | 'post' | 'patch' | 'delete'

export interface RequestQuery {
  include?: string[]
  fields?: Record<string, string[]>
  sort?: string[]
  page?: { size: number; number: number }
  filter?: Record<string, string | number>
}

export const createRequestParams = (query: RequestQuery): any => {
  const params: Record<string, any> = {}
  if (query.include) {
    params.include = query.include.join(',')
  }

  if (query.fields) {
    Object.keys(query.fields).forEach((key) => {
      params[`fields[${key}]`] = (query.fields as any)[key].join(',')
    })
  }

  if (query.sort) {
    params.sort = query.sort.join(',')
  }

  if (query.page) {
    Object.keys(query.page).forEach((key) => {
      params[`page[${key}]`] = (query.page as any)[key]
    })
  }

  if (query.filter) {
    Object.keys(query.filter).forEach((key) => {
      params[`filter[q][${key}]`] = (query.filter as any)[key]
    })
  }

  return params
}

export const createRequest = (
  url: string,
  method: RequestMethod,
  query?: RequestQuery,
  data?: Record<string, any>,
): Promise<AxiosResponse> => {
  const baseRequest = getBaseRequest()
  return baseRequest.request({
    method,
    url,
    params: query ? createRequestParams(query) : {},
    data,
  })
}

export const find = async <T>(
  id: string,
  query: RequestQuery = {},
  resourceType: string,
): Promise<T> => {
  const request = createRequest(`/api/${resourceType}/${id}`, 'get', query)

  try {
    const { data } = await request
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const findBy = async <T>(
  query: RequestQuery,
  resourceType: string,
): Promise<T | null> => {
  const request = createRequest(`/api/${resourceType}`, 'get', query)

  try {
    const { data } = await request
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}
