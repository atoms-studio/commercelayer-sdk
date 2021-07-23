import { deserialize, serialize } from '../src/serializer'
import singleSku from './responses/single-sku.json'
import multipleSkus from './responses/multiple-skus.json'

describe('serializer', () => {
  it('deserializes a single resource', async () => {
    const resource = await deserialize(singleSku)

    const keys = [
      'id',
      'prices',
      'meta',
      'type',
      ...Object.keys(singleSku.data.attributes),
    ].sort()

    expect(Object.keys(resource).sort()).toEqual(keys)
    expect(resource.prices[0]).toHaveProperty('price_list')
  })

  it('deserializes a collection resource', async () => {
    const pagination = await deserialize(multipleSkus)

    const keys = ['items', 'total', 'lastPage'].sort()

    expect(Object.keys(pagination).sort()).toEqual(keys)
    expect(pagination.items.length).toBe(multipleSkus.data.length)
    expect(pagination.total).toBe(multipleSkus.meta.record_count)
    expect(pagination.lastPage).toBe(multipleSkus.meta.page_count)
  })

  it('serializes a single resource', async () => {
    const payload = {
      name: 'test name',
      description: 'test description',
      sku_code: '12345678',
      metadata: {
        asd: 'asdasd',
      },
      reference: 'test ref',
      reference_origin: 'ref_origin',
    }

    const result = await serialize(
      {
        type: 'test_types',
        attributes: [
          'name',
          'description',
          'sku_code',
          'metadata',
          'reference',
          'reference_origin',
        ],
        relationships: {},
      },
      payload,
      {},
    )

    expect(result).toEqual({
      data: {
        type: 'test_types',
        attributes: payload,
      },
    })
  })

  it('serializes an empty resource', async () => {
    const result = await serialize(
      {
        type: 'test_types',
        attributes: ['name', 'description'],
        relationships: {},
      },
      {},
      {},
    )

    expect(result).toEqual({
      data: {
        type: 'test_types',
        attributes: {},
      },
    })
  })

  it('throws an error with invalid attributes', async () => {
    expect(async () => {
      await serialize(
        {
          type: 'test_types',
          attributes: ['name', 'description'],
          relationships: {},
        },
        null as any,
        {},
      )
    }).rejects.toThrow(
      'Invalid resource attributes, expected object, received null',
    )

    expect(async () => {
      await serialize(
        {
          type: 'test_types',
          attributes: ['name', 'description'],
          relationships: {},
        },
        123 as any,
        {},
      )
    }).rejects.toThrow(
      'Invalid resource attributes, expected object, received number',
    )

    expect(async () => {
      await serialize(
        {
          type: 'test_types',
          attributes: ['name', 'description'],
          relationships: {},
        },
        'asd' as any,
        {},
      )
    }).rejects.toThrow(
      'Invalid resource attributes, expected object, received string',
    )

    expect(async () => {
      await serialize(
        {
          type: 'test_types',
          attributes: ['name', 'description'],
          relationships: {},
        },
        [] as any,
        {},
      )
    }).rejects.toThrow(
      'Invalid resource attributes, expected object, received array',
    )
  })

  it('throws an error with invalid relationships', async () => {
    expect(async () => {
      await serialize(
        {
          type: 'test_types',
          attributes: ['name', 'description'],
          relationships: {},
        },
        {},
        null as any,
      )
    }).rejects.toThrow(
      'Invalid resource relationships, expected object, received null',
    )

    expect(async () => {
      await serialize(
        {
          type: 'test_types',
          attributes: ['name', 'description'],
          relationships: {},
        },
        {},
        123 as any,
      )
    }).rejects.toThrow(
      'Invalid resource relationships, expected object, received number',
    )

    expect(async () => {
      await serialize(
        {
          type: 'test_types',
          attributes: ['name', 'description'],
          relationships: {},
        },
        {},
        'asd' as any,
      )
    }).rejects.toThrow(
      'Invalid resource relationships, expected object, received string',
    )

    expect(async () => {
      await serialize(
        {
          type: 'test_types',
          attributes: ['name', 'description'],
          relationships: {},
        },
        {},
        [] as any,
      )
    }).rejects.toThrow(
      'Invalid resource relationships, expected object, received array',
    )
  })

  it('serializes a resource with relationships passed as strings', async () => {
    const payload = {
      name: 'test name',
      description: 'test description',
    }

    const relationships = {
      linked_type: '12345',
    }

    const result = await serialize(
      {
        type: 'test_types',
        attributes: ['name', 'description'],
        relationships: {
          linked_type: 'linked_types',
        },
      },
      payload,
      relationships,
    )

    expect(result).toEqual({
      data: {
        type: 'test_types',
        attributes: payload,
        relationships: {
          linked_type: {
            data: {
              type: 'linked_types',
              id: '12345',
            },
          },
        },
      },
    })
  })

  it('serializes a resource with relationships passed as objects', async () => {
    const payload = {
      name: 'test name',
      description: 'test description',
    }

    const relationships = {
      linked_type: {
        id: '12345',
      },
    }

    const result = await serialize(
      {
        type: 'test_types',
        attributes: ['name', 'description'],
        relationships: {
          linked_type: 'linked_types',
        },
      },
      payload,
      relationships,
    )

    expect(result).toEqual({
      data: {
        type: 'test_types',
        attributes: payload,
        relationships: {
          linked_type: {
            data: {
              type: 'linked_types',
              id: '12345',
            },
          },
        },
      },
    })
  })

  it('creates a warning with an invalid relationship value', async () => {
    ;(console.warn as any) = jest.fn()
    const result = await serialize(
      {
        type: 'test_types',
        attributes: ['name', 'description'],
        relationships: {
          linked_type: 'linked_types',
        },
      },
      {},
      {
        linked_type: null,
      },
    )

    expect(result).toEqual({
      data: {
        type: 'test_types',
        attributes: {},
        relationships: {
          linked_type: {
            data: {
              type: 'linked_types',
              id: '',
            },
          },
        },
      },
    })
    expect(console.warn).toHaveBeenLastCalledWith(
      'Invalid relationship value for "linked_type" on resource "test_types"',
    )
  })
})
