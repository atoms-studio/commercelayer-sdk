import { AxiosResponse } from 'axios'
import { getBaseRequest } from './request'
import { serialize, deserialize } from './serializer'
import {
  ResourceConfig,
  ConcreteResourceInstance,
  ResourcePagination,
  AttributesPayload,
  RelationshipsPayload,
} from './resource'
import { handleApiErrors } from './errors'
import { getToken } from './auth/cache'
import { isCustomerLoggedIn, getCustomerToken } from './auth/session'

export type RequestMethod = 'get' | 'post' | 'patch' | 'delete'

export interface RequestParameters {
  include?: string[]
  fields?: Record<string, string[]>
}

export interface RequestFiltering {
  sort?: string[]
  page?: { size: number; number: number }
  filter?: Record<string, string | number>
}

export type RequestQuery = RequestParameters & RequestFiltering

export const createRequestParams = (
  query: RequestQuery,
): Record<string, string> => {
  const params: Record<string, string> = {}
  if (!query || query.toString() !== '[object Object]') {
    return params
  }

  if (query.include) {
    params.include = query.include.join(',')
  }

  if (query.fields) {
    Object.keys(query.fields).forEach((key) => {
      params[`fields[${key}]`] = (query.fields as Record<string, string[]>)[
        key
      ].join(',')
    })
  }

  if (query.sort) {
    params.sort = query.sort.join(',')
  }

  if (query.page) {
    if (query.page.number) {
      params[`page[number]`] = query.page.number.toString()
    }
    if (query.page.size) {
      params[`page[size]`] = query.page.size.toString()
    }
  }

  if (query.filter) {
    Object.keys(query.filter).forEach((key) => {
      params[`filter[q][${key}]`] = (query.filter as Record<
        string,
        string | number
      >)[key].toString()
    })
  }

  return params
}

export const createRequest = (
  url: string,
  method: RequestMethod,
  query?: RequestQuery,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>,
): Promise<AxiosResponse> => {
  const baseRequest = getBaseRequest()
  const { token } = isCustomerLoggedIn() ? getCustomerToken() : getToken()

  return baseRequest.request({
    method,
    url,
    params: createRequestParams(query || {}),
    data,
    headers: {
      accept: 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json',
      authorization: `Bearer ${token}`,
    },
  })
}

export const find = async <T, U>(
  id: string,
  query: RequestQuery,
  config: ResourceConfig<T, U>,
): Promise<ConcreteResourceInstance<T, U>> => {
  const request = createRequest(`/api/${config.type}/${id}`, 'get', query)

  try {
    const { data } = await request
    return await deserialize(data)
  } catch (error) {
    throw handleApiErrors(error)
  }
}

export const findAll = async <T, U>(
  query: RequestQuery,
  config: ResourceConfig<T, U>,
): Promise<ResourcePagination<ConcreteResourceInstance<T, U>>> => {
  const request = createRequest(`/api/${config.type}`, 'get', query)

  try {
    const { data } = await request
    const result = await deserialize(data)

    const currentPage = (query.page || {}).number || 1

    return {
      items: result.items || [],
      total: result.total,
      currentPage,
      prevPage: currentPage - 1 || null,
      nextPage: currentPage < result.lastPage ? currentPage + 1 : null,
      lastPage: result.lastPage,
      hasMore: currentPage < result.lastPage,
    }
  } catch (error) {
    throw handleApiErrors(error)
  }
}

export const findBy = async <T, U>(
  query: RequestQuery,
  config: ResourceConfig<T, U>,
): Promise<ConcreteResourceInstance<T, U> | null> => {
  const result = await findAll(query, config)
  if (result.items.length) {
    return result.items[0]
  }

  return null
}

export const destroy = async <T, U>(
  id: string,
  config: ResourceConfig<T, U>,
): Promise<void> => {
  try {
    await createRequest(`/api/${config.type}/${id}`, 'delete')
  } catch (error) {
    throw handleApiErrors(error)
  }
}

export const create = async <T, U>(
  attributes: AttributesPayload<T>,
  query: RequestParameters,
  relationships: RelationshipsPayload<U>,
  config: ResourceConfig<T, U>,
): Promise<ConcreteResourceInstance<T, U>> => {
  const body = await serialize(config, attributes, relationships)
  const request = createRequest(`/api/${config.type}`, 'post', query, body)

  try {
    const { data } = await request
    return await deserialize(data)
  } catch (error) {
    throw handleApiErrors(error)
  }
}

export const update = async <T, U>(
  id: string,
  attributes: AttributesPayload<T>,
  query: RequestParameters,
  relationships: RelationshipsPayload<U>,
  config: ResourceConfig<T, U>,
): Promise<ConcreteResourceInstance<T, U>> => {
  // Add id to attributes as it is always required
  Object.assign(attributes, {
    id,
  })

  const body = await serialize(config, attributes, relationships)
  const request = createRequest(
    `/api/${config.type}/${id}`,
    'patch',
    query,
    body,
  )

  try {
    const { data } = await request
    return await deserialize(data)
  } catch (error) {
    throw handleApiErrors(error)
  }
}
