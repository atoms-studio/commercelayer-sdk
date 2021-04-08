import { deserialize } from '../src/serializer'
import singleSku from './responses/single-sku.json'
import multipleSkus from './responses/multiple-skus.json'

describe('serializer', () => {
  it('deserializes a single resource', async () => {
    const resource = await deserialize(singleSku)

    const keys = [
      'id',
      'prices',
      'meta',
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
})
