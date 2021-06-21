import { commonResourceFields, createResource } from '../src/resource'
import { find, findAll, findBy, create, update, destroy } from '../src/api'

const originalApi = {
  find,
  findAll,
  findBy,
  create,
  update,
  destroy,
}

const dummyConfig = {
  type: 'test_types',
  attributes: [] as any,
  relationships: {},
}

const createDummyResource = () => createResource(dummyConfig)

describe('resource', () => {
  // afterEach(() => {
  //   ;(createRequest as any) = _originalCreateRequest
  // })

  describe('commonResourceFields', () => {
    it('is a predefined list of attributes', () => {
      expect(commonResourceFields).toEqual([
        'id',
        'reference',
        'reference_origin',
        'metadata',
        'created_at',
        'updated_at',
      ])
    })
  })

  describe('createResource', () => {
    beforeAll(() => {
      ;(find as any) = jest.fn(() => 'find')
      ;(findAll as any) = jest.fn(() => 'findAll')
      ;(findBy as any) = jest.fn(() => 'findBy')
      ;(create as any) = jest.fn(() => 'create')
      ;(update as any) = jest.fn(() => 'update')
      ;(destroy as any) = jest.fn(() => 'destroy')
    })

    afterAll(() => {
      ;(find as any) = originalApi.find
      ;(findAll as any) = originalApi.findAll
      ;(findBy as any) = originalApi.findBy
      ;(create as any) = originalApi.create
      ;(update as any) = originalApi.update
      ;(destroy as any) = originalApi.destroy
    })

    it('creates a collection of resource methods', () => {
      const resource = createDummyResource()

      expect(Object.keys(resource)).toEqual([
        'find',
        'findBy',
        'findAll',
        'create',
        'update',
        'delete',
      ])
    })

    describe('find', () => {
      it('throws an error if id is missing', async () => {
        const res = createDummyResource()

        expect(async () => {
          await res.find('')
        }).rejects.toThrow(`[test_types] Missing resource id`)

        expect(async () => {
          await res.find(null as any)
        }).rejects.toThrow(`[test_types] Missing resource id`)
      })

      it('throws an error if query exists and is not an object', async () => {
        const res = createDummyResource()

        expect(async () => {
          await res.find('asd', 1 as any)
        }).rejects.toThrow(
          `[test_types] Invalid resource query, expected object, received number`,
        )

        expect(async () => {
          await res.find('asd', [] as any)
        }).rejects.toThrow(
          `[test_types] Invalid resource query, expected object, received array`,
        )

        expect(async () => {
          await res.find('asd', 'asdasd' as any)
        }).rejects.toThrow(
          `[test_types] Invalid resource query, expected object, received string`,
        )

        expect(async () => {
          await res.find('asd', true as any)
        }).rejects.toThrow(
          `[test_types] Invalid resource query, expected object, received boolean`,
        )
      })

      it('calls api.find with an id', async () => {
        const res = createDummyResource()
        await res.find('12345')
        expect(find).toHaveBeenLastCalledWith('12345', {}, dummyConfig)
      })

      it('calls api.find with an id and query', async () => {
        const res = createDummyResource()
        const query = {
          include: ['asd'],
        }
        await res.find('12345', query)
        expect(find).toHaveBeenLastCalledWith('12345', query, dummyConfig)
      })

      it('returns the result of api.find', async () => {
        const res = createDummyResource()
        const value = await res.find('12345')
        expect(value).toEqual('find')
      })
    })

    describe('findBy', () => {
      it('throws an error if query is missing', async () => {
        const res = createDummyResource()

        expect(async () => {
          await res.findBy('' as any)
        }).rejects.toThrow(`[test_types] Missing resource query`)

        expect(async () => {
          await res.findBy(null as any)
        }).rejects.toThrow(`[test_types] Missing resource query`)
      })

      it('throws an error if query exists and is not an object', async () => {
        const res = createDummyResource()

        expect(async () => {
          await res.findBy(1 as any)
        }).rejects.toThrow(
          `[test_types] Invalid resource query, expected object, received number`,
        )

        expect(async () => {
          await res.findBy([] as any)
        }).rejects.toThrow(
          `[test_types] Invalid resource query, expected object, received array`,
        )

        expect(async () => {
          await res.findBy('asdasd' as any)
        }).rejects.toThrow(
          `[test_types] Invalid resource query, expected object, received string`,
        )

        expect(async () => {
          await res.findBy(true as any)
        }).rejects.toThrow(
          `[test_types] Invalid resource query, expected object, received boolean`,
        )
      })

      it('calls api.findBy with a query', async () => {
        const res = createDummyResource()
        const query = {
          include: ['asd'],
        }
        await res.findBy(query)
        expect(findBy).toHaveBeenLastCalledWith(query, dummyConfig)
      })

      it('returns the result of api.findBy', async () => {
        const res = createDummyResource()
        const value = await res.findBy({})
        expect(value).toEqual('findBy')
      })
    })

    describe('findAll', () => {
      it('throws an error if query is missing', async () => {
        const res = createDummyResource()

        expect(async () => {
          await res.findAll('' as any)
        }).rejects.toThrow(`[test_types] Missing resource query`)

        expect(async () => {
          await res.findAll(null as any)
        }).rejects.toThrow(`[test_types] Missing resource query`)
      })

      it('throws an error if query exists and is not an object', async () => {
        const res = createDummyResource()

        expect(async () => {
          await res.findAll(1 as any)
        }).rejects.toThrow(
          `[test_types] Invalid resource query, expected object, received number`,
        )

        expect(async () => {
          await res.findAll([] as any)
        }).rejects.toThrow(
          `[test_types] Invalid resource query, expected object, received array`,
        )

        expect(async () => {
          await res.findAll('asdasd' as any)
        }).rejects.toThrow(
          `[test_types] Invalid resource query, expected object, received string`,
        )

        expect(async () => {
          await res.findAll(true as any)
        }).rejects.toThrow(
          `[test_types] Invalid resource query, expected object, received boolean`,
        )
      })

      it('calls api.findAll with a query', async () => {
        const res = createDummyResource()
        const query = {
          include: ['asd'],
        }
        await res.findAll(query)
        expect(findAll).toHaveBeenLastCalledWith(query, dummyConfig)
      })

      it('returns the result of api.findAll', async () => {
        const res = createDummyResource()
        const value = await res.findAll({})
        expect(value).toEqual('findAll')
      })
    })

    describe('create', () => {
      it('throws an error if attributes are missing', async () => {
        const res = createDummyResource()

        expect(async () => {
          await res.create('' as any)
        }).rejects.toThrow(
          `[test_types] Invalid resource params, expected object, received string`,
        )

        expect(async () => {
          await res.create(null as any)
        }).rejects.toThrow(
          `[test_types] Invalid resource params, expected object, received null`,
        )

        expect(async () => {
          await res.create({} as any)
        }).rejects.toThrow(`[test_types] Missing resource attributes`)
      })

      it('throws an error if attributes is not an object', async () => {
        const res = createDummyResource()

        expect(async () => {
          await res.create({
            attributes: 1 as any,
          })
        }).rejects.toThrow(
          `[test_types] Invalid resource attributes, expected object, received number`,
        )

        expect(async () => {
          await res.create({
            attributes: [] as any,
          })
        }).rejects.toThrow(
          `[test_types] Invalid resource attributes, expected object, received array`,
        )

        expect(async () => {
          await res.create({
            attributes: 'aasd' as any,
          })
        }).rejects.toThrow(
          `[test_types] Invalid resource attributes, expected object, received string`,
        )

        expect(async () => {
          await res.create({
            attributes: true as any,
          })
        }).rejects.toThrow(
          `[test_types] Invalid resource attributes, expected object, received boolean`,
        )
      })

      it('throws an error if relationships exists and is not an object', async () => {
        const res = createDummyResource()

        expect(async () => {
          await res.create({
            attributes: {},
            relationships: 1 as any,
          })
        }).rejects.toThrow(
          `[test_types] Invalid resource relationships, expected object, received number`,
        )

        expect(async () => {
          await res.create({
            attributes: {},
            relationships: [] as any,
          })
        }).rejects.toThrow(
          `[test_types] Invalid resource relationships, expected object, received array`,
        )

        expect(async () => {
          await res.create({
            attributes: {},
            relationships: 'asdasd' as any,
          })
        }).rejects.toThrow(
          `[test_types] Invalid resource relationships, expected object, received string`,
        )

        expect(async () => {
          await res.create({
            attributes: {},
            relationships: true as any,
          })
        }).rejects.toThrow(
          `[test_types] Invalid resource relationships, expected object, received boolean`,
        )
      })

      it('calls api.create with attributes', async () => {
        const res = createDummyResource()
        const params = {
          attributes: {
            test: '1234',
          },
        }
        await res.create(params)
        expect(create).toHaveBeenLastCalledWith(
          params.attributes,
          {},
          {},
          dummyConfig,
        )
      })

      it('calls api.create with attributes and relationships', async () => {
        const res = createDummyResource()
        const params = {
          attributes: {
            test: '1234',
          },
          relationships: {
            otherTest: '5678',
          },
        }
        await res.create(params)
        expect(create).toHaveBeenLastCalledWith(
          params.attributes,
          {},
          params.relationships,
          dummyConfig,
        )
      })

      it('returns the result of api.create', async () => {
        const res = createDummyResource()
        const value = await res.create({
          attributes: {},
        })
        expect(value).toEqual('create')
      })
    })

    describe('update', () => {
      it('throws an error if id is missing', async () => {
        const res = createDummyResource()

        expect(async () => {
          await res.update('', {
            attributes: {},
          })
        }).rejects.toThrow(`[test_types] Missing resource id`)

        expect(async () => {
          await res.update(null as any, {
            attributes: {},
          })
        }).rejects.toThrow(`[test_types] Missing resource id`)
      })

      it('throws an error if attributes are missing', async () => {
        const res = createDummyResource()

        expect(async () => {
          await res.update('asd', '' as any)
        }).rejects.toThrow(
          `[test_types] Invalid resource params, expected object, received string`,
        )

        expect(async () => {
          await res.update('asd', null as any)
        }).rejects.toThrow(
          `[test_types] Invalid resource params, expected object, received null`,
        )
      })

      it('throws an error if attributes is not an object', async () => {
        const res = createDummyResource()

        expect(async () => {
          await res.update('asd', 1 as any)
        }).rejects.toThrow(
          `[test_types] Invalid resource params, expected object, received number`,
        )

        expect(async () => {
          await res.update('asd', [] as any)
        }).rejects.toThrow(
          `[test_types] Invalid resource params, expected object, received array`,
        )

        expect(async () => {
          await res.update('asd', 'asdasd' as any)
        }).rejects.toThrow(
          `[test_types] Invalid resource params, expected object, received string`,
        )

        expect(async () => {
          await res.update('asd', true as any)
        }).rejects.toThrow(
          `[test_types] Invalid resource params, expected object, received boolean`,
        )
      })

      it('throws an error if relationships exists and is not an object', async () => {
        const res = createDummyResource()

        expect(async () => {
          await res.update('asd', {
            attributes: {},
            relationships: 1 as any,
          })
        }).rejects.toThrow(
          `[test_types] Invalid resource relationships, expected object, received number`,
        )

        expect(async () => {
          await res.update('asd', {
            attributes: {},
            relationships: [] as any,
          })
        }).rejects.toThrow(
          `[test_types] Invalid resource relationships, expected object, received array`,
        )

        expect(async () => {
          await res.update('asd', {
            attributes: {},
            relationships: 'asdasd' as any,
          })
        }).rejects.toThrow(
          `[test_types] Invalid resource relationships, expected object, received string`,
        )

        expect(async () => {
          await res.update('asd', {
            attributes: {},
            relationships: true as any,
          })
        }).rejects.toThrow(
          `[test_types] Invalid resource relationships, expected object, received boolean`,
        )
      })

      it('calls api.update with id and attributes', async () => {
        const res = createDummyResource()
        const params = {
          attributes: {
            test: '1234',
          },
        }
        await res.update('asd', params)
        expect(update).toHaveBeenLastCalledWith(
          'asd',
          params.attributes,
          {},
          {},
          dummyConfig,
        )
      })

      it('calls api.update with id, attributes and relationships', async () => {
        const res = createDummyResource()
        const params = {
          attributes: {
            test: '1234',
          },
          relationships: {
            otherTest: '5678',
          },
        }
        await res.update('asd', params)
        expect(update).toHaveBeenLastCalledWith(
          'asd',
          params.attributes,
          {},
          params.relationships,
          dummyConfig,
        )
      })

      it('returns the result of api.update', async () => {
        const res = createDummyResource()
        const value = await res.update('asd', {
          attributes: {},
        })
        expect(value).toEqual('update')
      })
    })

    describe('delete', () => {
      it('throws an error if id is missing', async () => {
        const res = createDummyResource()

        expect(async () => {
          await res.delete('')
        }).rejects.toThrow(`[test_types] Missing resource id`)

        expect(async () => {
          await res.delete(null as any)
        }).rejects.toThrow(`[test_types] Missing resource id`)
      })

      it('calls api.destroy with an id', async () => {
        const res = createDummyResource()
        await res.delete('12345')
        expect(destroy).toHaveBeenLastCalledWith('12345', dummyConfig)
      })

      it('returns the result of api.destroy', async () => {
        const res = createDummyResource()
        const value = await res.delete('12345')
        expect(value).toEqual('destroy')
      })
    })
  })
})
