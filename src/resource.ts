import {
  find,
  findBy,
  findAll,
  destroy,
  create,
  update,
  RequestQuery,
  RequestParameters,
} from './api'
import { getType, isObject } from './utils'

export interface ResourceConfig<T, U> {
  type: string
  attributes: (keyof T)[]
  relationships: Record<keyof U, string>
}

export interface CommonResourceAttributes {
  id: string
  reference: string
  reference_origin: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: Record<string, any>
  created_at: string
  updated_at: string
  type: string
}
export interface CommonPayloadAttributes {
  reference?: string
  reference_origin?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>
}

export type AttributesPayload<T> = {
  [K in keyof T]?: T[K]
} &
  CommonPayloadAttributes

export type RelationshipsPayload<T> = {
  [K in keyof T]?: T[K] | string
}

export type RelatedResourceInstance = CommonResourceAttributes

export type ConcreteResourceInstance<T, U> = CommonResourceAttributes & T & U

export interface ResourcePagination<T> {
  items: T[]
  total: number
  currentPage: number
  prevPage: number | null
  nextPage: number | null
  lastPage: number | null
  hasMore: boolean
}

export interface ResourceWriteParams<T, U> {
  attributes: AttributesPayload<T>
  relationships?: RelationshipsPayload<U>
  query?: RequestParameters
}

export interface Resource<T, U, V = ConcreteResourceInstance<T, U>> {
  find: (id: string, query?: RequestQuery) => Promise<V>
  findBy: (query: RequestQuery) => Promise<V | null>
  findAll: (query: RequestQuery) => Promise<ResourcePagination<V>>
  create: (params: ResourceWriteParams<T, U>) => Promise<V>
  update: (id: string, params: ResourceWriteParams<T, U>) => Promise<V>
  delete: (id: string) => Promise<void>
}

export const commonResourceFields: (keyof CommonResourceAttributes)[] = [
  'id',
  'reference',
  'reference_origin',
  'metadata',
  'created_at',
  'updated_at',
]

export const commonPayloadAttributes: (keyof CommonPayloadAttributes)[] = [
  'reference',
  'reference_origin',
  'metadata',
]

const requireId = <T, U>(id: string, config: ResourceConfig<T, U>): void => {
  if (!id) {
    throw new Error(`[${config.type}] Missing resource id`)
  }
}

const checkQuery = <T, U>(
  query: RequestQuery | undefined,
  config: ResourceConfig<T, U>,
): void => {
  if (query && !isObject(query)) {
    throw new Error(
      `[${
        config.type
      }] Invalid resource query, expected object, received ${getType(query)}`,
    )
  }
}

const requireQuery = <T, U>(
  query: RequestQuery,
  config: ResourceConfig<T, U>,
): void => {
  if (!query) {
    throw new Error(`[${config.type}] Missing resource query`)
  }
  checkQuery(query, config)
}

const requireAttributes = <T, U>(
  attributes: AttributesPayload<T>,
  config: ResourceConfig<T, U>,
): void => {
  if (!attributes) {
    throw new Error(`[${config.type}] Missing resource attributes`)
  }

  if (!isObject(attributes)) {
    throw new Error(
      `[${
        config.type
      }] Invalid resource attributes, expected object, received ${getType(
        attributes,
      )}`,
    )
  }
}

const checkRelationships = <T, U>(
  relationships: RelationshipsPayload<U> | undefined,
  config: ResourceConfig<T, U>,
): void => {
  if (relationships && !isObject(relationships)) {
    throw new Error(
      `[${
        config.type
      }] Invalid resource relationships, expected object, received ${getType(
        relationships,
      )}`,
    )
  }
}

export const createResource = <T, U>(
  config: ResourceConfig<T, U>,
): Resource<T, U, ConcreteResourceInstance<T, U>> => {
  return {
    find(
      id: string,
      query?: RequestQuery,
    ): Promise<ConcreteResourceInstance<T, U>> {
      requireId(id, config)
      checkQuery(query, config)

      return find<T, U>(id, query || {}, config)
    },

    findBy(
      query: RequestQuery,
    ): Promise<ConcreteResourceInstance<T, U> | null> {
      requireQuery(query, config)

      return findBy<T, U>(query, config)
    },

    findAll(
      query: RequestQuery,
    ): Promise<ResourcePagination<ConcreteResourceInstance<T, U>>> {
      requireQuery(query, config)

      return findAll<T, U>(query, config)
    },

    create(params: ResourceWriteParams<T, U>) {
      if (!params || getType(params) !== 'object') {
        throw new Error(
          `[${
            config.type
          }] Invalid resource params, expected object, received ${getType(
            params,
          )}`,
        )
      }

      requireAttributes(params.attributes, config)
      checkRelationships(params.relationships, config)

      return create(
        params.attributes,
        params.query || {},
        params.relationships || {},
        config,
      )
    },

    update(id: string, params: ResourceWriteParams<T, U>) {
      requireId(id, config)

      if (!params || getType(params) !== 'object') {
        throw new Error(
          `[${
            config.type
          }] Invalid resource params, expected object, received ${getType(
            params,
          )}`,
        )
      }

      requireAttributes(params.attributes, config)
      checkRelationships(params.relationships, config)

      return update(
        id,
        params.attributes,
        params.query || {},
        params.relationships || {},
        config,
      )
    },

    delete(id: string): Promise<void> {
      requireId(id, config)

      return destroy<T, U>(id, config)
    },
  }
}
