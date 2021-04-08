import { find, findBy, findAll, destroy, create, RequestQuery } from './api'

export interface ResourceConfig<T, U> {
  type: string
  attributes: (keyof T)[]
  relationships: Record<keyof U, string>
}

export interface CommonResourceAttributes {
  id: string
  reference: string
  reference_origin: string
  metadata: Record<string, any>
  created_at: string
  updated_at: string
}

export type AttributesPayload<T> = {
  [K in keyof T]?: T[K]
}

export type RelationshipsPayload<T> = {
  [K in keyof T]?: T[K] | string
}

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

export interface Resource<T> {
  find: (id: string, query?: RequestQuery) => Promise<T>
  findBy: (query: RequestQuery) => Promise<T | null>
  findAll: (query: RequestQuery) => Promise<ResourcePagination<T>>
  create: (
    attributes: AttributesPayload<any>,
    relationships?: RelationshipsPayload<any>,
  ) => Promise<T>
  update: (id: string) => Promise<T>
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

export const createResource = <T, U>(
  config: ResourceConfig<T, U>,
): Resource<ConcreteResourceInstance<T, U>> => {
  return {
    find(
      id: string,
      query?: RequestQuery,
    ): Promise<ConcreteResourceInstance<T, U>> {
      return find<T, U>(id, query || {}, config)
    },

    findBy(
      query: RequestQuery,
    ): Promise<ConcreteResourceInstance<T, U> | null> {
      return findBy<T, U>(query, config)
    },

    findAll(
      query: RequestQuery,
    ): Promise<ResourcePagination<ConcreteResourceInstance<T, U>>> {
      return findAll<T, U>(query, config)
    },

    create(
      attributes: AttributesPayload<T>,
      relationships?: RelationshipsPayload<U>,
    ) {
      return create(attributes, relationships || {}, config)
    },

    update(id: string) {
      return Promise.resolve({} as ConcreteResourceInstance<T, U>)
    },

    delete(id: string): Promise<void> {
      return destroy<T, U>(id, config)
    },
  }
}
