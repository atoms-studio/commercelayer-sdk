import {
  createRequestParams,
  createRequest,
  find,
  findBy,
  findAll,
  destroy,
  create,
  update,
} from '../src/api'
import {
  mockRequestWithConfig,
  mockRequestWithUri,
  mockRequestWithResponse,
  mockRequestWithError,
  mockRequestWithEcho,
} from './utils'
import singleSku from './responses/single-sku.json'
import multipleSkus from './responses/multiple-skus.json'
import unauthorized from './responses/401-unauthorized.json'
import { commonResourceFields } from '../src/resource'
import { ResourceError } from '../src/errors'

const _originalCreateRequest = createRequest

const dummyConfig = {
  type: 'skus',
  attributes: [] as any,
  relationships: {},
}

const mockCreateRequest = () => {
  ;(createRequest as any) = jest.fn(
    (url: string, method: string, query: any, data: any) => {
      return {
        data: {
          data: {},
        },
        status: 200,
      }
    },
  )
}

describe('api', () => {
  afterEach(() => {
    ;(createRequest as any) = _originalCreateRequest
  })

  describe('createRequestParams', () => {
    it('returns an empty object with bad input', () => {
      let params = createRequestParams(null as any)
      expect(params).toEqual({})

      params = createRequestParams('asd' as any)
      expect(params).toEqual({})

      params = createRequestParams(45 as any)
      expect(params).toEqual({})

      params = createRequestParams([] as any)
      expect(params).toEqual({})
    })

    it('adds relationships', () => {
      let params = createRequestParams({})
      expect(params).not.toHaveProperty('include')

      const included = ['test1', 'test2']
      params = createRequestParams({
        include: included,
      })

      expect(params).toHaveProperty('include', included.join(','))
    })

    it('adds sparse fieldsets', () => {
      let params = createRequestParams({})
      expect(params).not.toHaveProperty('fields')

      const fields = {
        skus: ['code', 'name'],
        prices: ['formatted_amount'],
      }
      params = createRequestParams({
        fields,
      })

      expect(params).toHaveProperty('fields[skus]', fields.skus.join(','))
      expect(params).toHaveProperty('fields[prices]', fields.prices.join(','))
    })

    it('adds sorting', () => {
      let params = createRequestParams({})
      expect(params).not.toHaveProperty('sort')

      const sort = ['-created_at', 'code']
      params = createRequestParams({
        sort,
      })

      expect(params).toHaveProperty('sort', sort.join(','))
    })

    it('adds pagination', () => {
      let params = createRequestParams({})
      expect(params).not.toHaveProperty('page')

      const pagination = {
        size: 20,
        number: 1,
      }
      params = createRequestParams({
        page: pagination,
      })

      expect(params).toHaveProperty('page[size]', pagination.size)
      expect(params).toHaveProperty('page[number]', pagination.number)
    })

    it('adds filters', () => {
      let params = createRequestParams({})
      expect(params).not.toHaveProperty('filter')

      const filter = {
        name_eq: 'red handbag',
        email_matches: '%@gmail.com',
      }

      params = createRequestParams({
        filter,
      })

      expect(params).toHaveProperty('filter[q][name_eq]', filter.name_eq)
      expect(params).toHaveProperty(
        'filter[q][email_matches]',
        filter.email_matches,
      )
    })
  })

  describe('createRequest', () => {
    it('creates a request without parameters', async () => {
      mockRequestWithUri()

      const uri = await createRequest('/test', 'get')
      expect(uri).toBe('/test')
    })

    it('creates a request with relationships parameters', async () => {
      mockRequestWithUri()

      const uri = await createRequest('/test', 'get', {
        include: ['prices', 'prices.price_list'],
      })

      expect(uri).toBe('/test?include=prices,prices.price_list')
    })

    it('creates a request with sparse fieldsets parameters', async () => {
      mockRequestWithUri()

      const uri = await createRequest('/test', 'get', {
        fields: {
          skus: ['code', 'name'],
          prices: ['formatted_amount', 'amount_float'],
        },
      })

      expect(decodeURI((uri as unknown) as string)).toBe(
        '/test?fields[skus]=code,name&fields[prices]=formatted_amount,amount_float',
      )
    })

    it('creates a request with sorting', async () => {
      mockRequestWithUri()

      const uri = await createRequest('/test', 'get', {
        sort: ['-created_at', 'code'],
      })

      expect(decodeURI((uri as unknown) as string)).toBe(
        '/test?sort=-created_at,code',
      )
    })

    it('creates a request with pagination', async () => {
      mockRequestWithUri()

      const uri = await createRequest('/test', 'get', {
        page: {
          size: 10,
          number: 3,
        },
      })

      expect(decodeURI((uri as unknown) as string)).toBe(
        '/test?page[size]=10&page[number]=3',
      )
    })

    it('creates a request with filters', async () => {
      mockRequestWithUri()

      const uri = await createRequest('/test', 'get', {
        filter: {
          name_eq: 'red handbag',
          email_matches: '%@gmail.com',
        },
      })

      expect(decodeURI((uri as unknown) as string)).toBe(
        '/test?filter[q][name_eq]=red+handbag&filter[q][email_matches]=%%40gmail.com',
      )
    })

    it('adds JSON API headers', async () => {
      mockRequestWithConfig()

      const config = await createRequest('/test', 'get')
      expect(config).toHaveProperty('headers', {
        accept: 'application/vnd.api+json',
        'content-type': 'application/vnd.api+json',
      })
    })
  })

  describe('find', () => {
    it('passes parameters to request', async () => {
      mockCreateRequest()
      const query = {
        include: ['123', '456'],
      }

      await find('12345', query, dummyConfig)

      expect(createRequest).toHaveBeenLastCalledWith(
        '/api/skus/12345',
        'get',
        query,
      )
    })

    it('deserializes data', async () => {
      mockRequestWithResponse(singleSku)
      const res = await find('12345', {}, dummyConfig)

      const attributes = Object.keys(singleSku.data.attributes)
      const relationships = ['prices']

      for (const attribute of attributes) {
        expect(res).toHaveProperty(attribute)
      }

      for (const relationship of relationships) {
        expect(res).toHaveProperty(relationship)
      }

      for (const commonField of commonResourceFields) {
        expect(res).toHaveProperty(commonField)
      }
    })

    it('handles errors', async () => {
      mockRequestWithError(unauthorized, 401)

      const fn = async () => {
        try {
          await find('12345', {}, dummyConfig)
          return null
        } catch (error) {
          return error
        }
      }

      const err: ResourceError = await fn()
      expect(err.message).toBe('CommerceLayer API error')
      expect(err.isResourceError).toBe(true)
      expect(err.status).toBe(401)
      expect(err.messages.length).toBe(unauthorized.errors.length)
      expect(err.firstMessage?.title).toBe(unauthorized.errors[0].title)
    })
  })

  describe('findAll', () => {
    it('passes parameters to request', async () => {
      mockCreateRequest()
      const query = {
        include: ['123', '456'],
      }

      await findAll(query, dummyConfig)

      expect(createRequest).toHaveBeenLastCalledWith('/api/skus', 'get', query)
    })

    it('returns all results from the response', async () => {
      mockRequestWithResponse(multipleSkus)

      const res = await findAll({}, dummyConfig)

      expect(Object.keys(res).sort()).toEqual(
        [
          'items',
          'total',
          'currentPage',
          'prevPage',
          'nextPage',
          'lastPage',
          'hasMore',
        ].sort(),
      )
      expect(res.items.length).toBe(multipleSkus.data.length)
      expect(res.total).toBe(multipleSkus.meta.record_count)
      expect(res.currentPage).toBe(1)
      expect(res.prevPage).toBeNull()
      expect(res.nextPage).toBe(2)
      expect(res.lastPage).toBe(multipleSkus.meta.page_count)
      expect(res.hasMore).toBe(true)
    })

    it('handles errors', async () => {
      mockRequestWithError(unauthorized, 401)

      const fn = async () => {
        try {
          await findAll({}, dummyConfig)
          return null
        } catch (error) {
          return error
        }
      }

      const err: ResourceError = await fn()
      expect(err.message).toBe('CommerceLayer API error')
      expect(err.isResourceError).toBe(true)
      expect(err.status).toBe(401)
      expect(err.messages.length).toBe(unauthorized.errors.length)
      expect(err.firstMessage?.title).toBe(unauthorized.errors[0].title)
    })
  })

  describe('findBy', () => {
    it('passes parameters to request', async () => {
      mockCreateRequest()
      const query = {
        include: ['123', '456'],
      }

      await findBy(query, dummyConfig)

      expect(createRequest).toHaveBeenLastCalledWith('/api/skus', 'get', query)
    })

    it('returns the first result from the response', async () => {
      mockRequestWithResponse(multipleSkus)

      const res = await findBy({}, dummyConfig)

      const attributes = Object.keys(multipleSkus.data[0].attributes)
      const relationships = ['prices']

      for (const attribute of attributes) {
        expect(res).toHaveProperty(attribute)
      }

      for (const relationship of relationships) {
        expect(res).toHaveProperty(relationship)
      }

      for (const commonField of commonResourceFields) {
        expect(res).toHaveProperty(commonField)
      }
    })

    it('returns null if there are no results', async () => {
      mockRequestWithResponse({
        data: [],
      })

      const res = await findBy({}, dummyConfig)

      expect(res).toBeNull()
    })

    it('handles errors', async () => {
      mockRequestWithError(unauthorized, 401)

      const fn = async () => {
        try {
          await findBy({}, dummyConfig)
          return null
        } catch (error) {
          return error
        }
      }

      const err: ResourceError = await fn()
      expect(err.message).toBe('CommerceLayer API error')
      expect(err.isResourceError).toBe(true)
      expect(err.status).toBe(401)
      expect(err.messages.length).toBe(unauthorized.errors.length)
      expect(err.firstMessage?.title).toBe(unauthorized.errors[0].title)
    })
  })

  describe('destroy', () => {
    it('passes parameters to request', async () => {
      mockCreateRequest()

      await destroy('1234', dummyConfig)

      expect(createRequest).toHaveBeenLastCalledWith('/api/skus/1234', 'delete')
    })

    it('resolves with an empty result', async () => {
      mockRequestWithResponse({}, 204)

      const res = await destroy('1234', dummyConfig)

      expect(res).toBeUndefined()
    })

    it('handles errors', async () => {
      mockRequestWithError(unauthorized, 401)

      const fn = async () => {
        try {
          await destroy('12345', dummyConfig)
          return null
        } catch (error) {
          return error
        }
      }

      const err: ResourceError = await fn()
      expect(err.message).toBe('CommerceLayer API error')
      expect(err.isResourceError).toBe(true)
      expect(err.status).toBe(401)
      expect(err.messages.length).toBe(unauthorized.errors.length)
      expect(err.firstMessage?.title).toBe(unauthorized.errors[0].title)
    })
  })

  describe('create', () => {
    it('sends a serialized payload with relationships as objects', async () => {
      mockRequestWithEcho()
      mockCreateRequest()

      await create(
        {
          name: 'asd',
          description: 'asdasd',
        },
        {
          order: {
            type: 'orders',
            id: '12345',
          },
        },
        {
          type: 'skus',
          attributes: ['name', 'description'],
          relationships: {
            order: 'orders',
          },
        },
      )
      expect(createRequest).toHaveBeenLastCalledWith(
        '/api/skus',
        'post',
        {},
        {
          data: {
            type: 'skus',
            attributes: {
              name: 'asd',
              description: 'asdasd',
            },
            relationships: {
              order: {
                data: {
                  type: 'orders',
                  id: '12345',
                },
              },
            },
          },
        },
      )
    })

    it('sends a serialized payload with relationships as string', async () => {
      mockRequestWithEcho()
      mockCreateRequest()

      await create(
        {
          name: 'asd',
          description: 'asdasd',
        },
        {
          order: '12345',
        },
        {
          type: 'skus',
          attributes: ['name', 'description'],
          relationships: {
            order: 'orders',
          },
        },
      )
      expect(createRequest).toHaveBeenLastCalledWith(
        '/api/skus',
        'post',
        {},
        {
          data: {
            type: 'skus',
            attributes: {
              name: 'asd',
              description: 'asdasd',
            },
            relationships: {
              order: {
                data: {
                  type: 'orders',
                  id: '12345',
                },
              },
            },
          },
        },
      )
    })

    it('adds only supported relationships', async () => {
      mockRequestWithEcho()
      mockCreateRequest()

      await create(
        {
          name: 'another title',
          description: 'another description',
        },
        {
          order: {
            type: 'orders',
            id: '98765',
          },
          market: {
            type: 'markets',
            id: '00001',
          },
        } as any,
        {
          type: 'skus',
          attributes: ['name', 'description'],
          relationships: {
            order: 'orders',
          },
        },
      )
      expect(createRequest).toHaveBeenLastCalledWith(
        '/api/skus',
        'post',
        {},
        {
          data: {
            type: 'skus',
            attributes: {
              name: 'another title',
              description: 'another description',
            },
            relationships: {
              order: {
                data: {
                  type: 'orders',
                  id: '98765',
                },
              },
            },
          },
        },
      )
    })

    it('deserializes data', async () => {
      mockRequestWithResponse(singleSku)
      const res = await create({}, {}, dummyConfig)

      const attributes = Object.keys(singleSku.data.attributes)
      const relationships = ['prices']

      for (const attribute of attributes) {
        expect(res).toHaveProperty(attribute)
      }

      for (const relationship of relationships) {
        expect(res).toHaveProperty(relationship)
      }

      for (const commonField of commonResourceFields) {
        expect(res).toHaveProperty(commonField)
      }
    })

    it('handles errors', async () => {
      mockRequestWithError(unauthorized, 401)

      const fn = async () => {
        try {
          await create({}, {}, dummyConfig)
          return null
        } catch (error) {
          return error
        }
      }

      const err: ResourceError = await fn()
      expect(err.message).toBe('CommerceLayer API error')
      expect(err.isResourceError).toBe(true)
      expect(err.status).toBe(401)
      expect(err.messages.length).toBe(unauthorized.errors.length)
      expect(err.firstMessage?.title).toBe(unauthorized.errors[0].title)
    })
  })

  describe('update', () => {
    it('sends a serialized payload with relationships as objects', async () => {
      mockRequestWithEcho()
      mockCreateRequest()

      await update(
        '12345',
        {
          name: 'asd',
          description: 'asdasd',
        },
        {
          order: {
            type: 'orders',
            id: '098765',
          },
        },
        {
          type: 'skus',
          attributes: ['name', 'description'],
          relationships: {
            order: 'orders',
          },
        },
      )
      expect(createRequest).toHaveBeenLastCalledWith(
        '/api/skus/12345',
        'patch',
        {},
        {
          data: {
            id: '12345',
            type: 'skus',
            attributes: {
              name: 'asd',
              description: 'asdasd',
            },
            relationships: {
              order: {
                data: {
                  type: 'orders',
                  id: '098765',
                },
              },
            },
          },
        },
      )
    })

    it('sends a serialized payload with relationships as string', async () => {
      mockRequestWithEcho()
      mockCreateRequest()

      await update(
        '12345',
        {
          name: 'asd',
          description: 'asdasd',
        },
        {
          order: '098765',
        },
        {
          type: 'skus',
          attributes: ['name', 'description'],
          relationships: {
            order: 'orders',
          },
        },
      )
      expect(createRequest).toHaveBeenLastCalledWith(
        '/api/skus/12345',
        'patch',
        {},
        {
          data: {
            id: '12345',
            type: 'skus',
            attributes: {
              name: 'asd',
              description: 'asdasd',
            },
            relationships: {
              order: {
                data: {
                  type: 'orders',
                  id: '098765',
                },
              },
            },
          },
        },
      )
    })

    it('adds only supported relationships', async () => {
      mockRequestWithEcho()
      mockCreateRequest()

      await update(
        '11111',
        {
          name: 'another title',
          description: 'another description',
        },
        {
          order: {
            type: 'orders',
            id: '98765',
          },
          market: {
            type: 'markets',
            id: '00001',
          },
        } as any,
        {
          type: 'skus',
          attributes: ['name', 'description'],
          relationships: {
            order: 'orders',
          },
        },
      )
      expect(createRequest).toHaveBeenLastCalledWith(
        '/api/skus/11111',
        'patch',
        {},
        {
          data: {
            type: 'skus',
            id: '11111',
            attributes: {
              name: 'another title',
              description: 'another description',
            },
            relationships: {
              order: {
                data: {
                  type: 'orders',
                  id: '98765',
                },
              },
            },
          },
        },
      )
    })

    it('deserializes data', async () => {
      mockRequestWithResponse(singleSku)
      const res = await update('12345', {}, {}, dummyConfig)

      const attributes = Object.keys(singleSku.data.attributes)
      const relationships = ['prices']

      for (const attribute of attributes) {
        expect(res).toHaveProperty(attribute)
      }

      for (const relationship of relationships) {
        expect(res).toHaveProperty(relationship)
      }

      for (const commonField of commonResourceFields) {
        expect(res).toHaveProperty(commonField)
      }
    })

    it('handles errors', async () => {
      mockRequestWithError(unauthorized, 401)

      const fn = async () => {
        try {
          await update('12345', {}, {}, dummyConfig)
          return null
        } catch (error) {
          return error
        }
      }

      const err: ResourceError = await fn()
      expect(err.message).toBe('CommerceLayer API error')
      expect(err.isResourceError).toBe(true)
      expect(err.status).toBe(401)
      expect(err.messages.length).toBe(unauthorized.errors.length)
      expect(err.firstMessage?.title).toBe(unauthorized.errors[0].title)
    })
  })
})
