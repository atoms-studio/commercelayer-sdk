import { createRequestParams, createRequest } from '../src/api'
import { mockRequestWithUri } from './utils'

describe('api', () => {
  describe('createRequestParams', () => {
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
  })
})
