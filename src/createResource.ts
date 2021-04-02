export interface ResourceConfig<T, U> {
  type: string
  attributes: (keyof T)[]
  relationships: (keyof U)[]
}

export interface CommonResourceAttributes {
  id: string
  reference: string
  reference_origin: string
  metadata: Record<string, any>
  created_at: string
  updated_at: string
}

export type ConcreteResourceInstance<T, U> = CommonResourceAttributes & T & U

export interface ResourcePagination<T> {
  items: T[]
  currentPage: number
  prevPage: number | null
  nextPage: number | null
  lastPage: number | null
  hasMore: boolean
}

export interface Resource<T> {
  find: () => Promise<T | null>
  findBy: () => Promise<T | null>
  findAll: () => Promise<ResourcePagination<T>>
  create: () => Promise<T>
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

export const createResource = <T, U, V = CommonResourceAttributes & T>(
  config: ResourceConfig<T, U>,
): Resource<V> => {
  return {
    find(): Promise<V | null> {
      return Promise.resolve(null)
    },

    findBy(): Promise<V | null> {
      return Promise.resolve(null)
    },

    findAll(): Promise<ResourcePagination<V>> {
      return Promise.resolve({
        items: [] as V[],
        currentPage: 1,
        prevPage: null,
        nextPage: null,
        lastPage: 1,
        hasMore: false,
      })
    },

    create() {
      return Promise.resolve({} as V)
    },

    update(id: string) {
      return Promise.resolve({} as V)
    },

    delete(id: string) {
      return Promise.resolve()
    },
  }
}