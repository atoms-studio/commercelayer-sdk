# Fetching resources

## Find by id

To find a resource by id, use the `find` method on a resource:

```ts
import { Skus } from '@atoms-studio/commercelayer-sdk'

await Skus.find('nkGgSEKLqn')
```

To pass additional query parameters, like the inclusion of relationships, pass a second parameter:

```ts
import { Skus } from '@atoms-studio/commercelayer-sdk'

await Skus.find('nkGgSEKLqn', {
  include: ['prices']
})
```

The `find` method returns a promise that resolves to a resource object, or null if the resource is not found.<br>
A resource object is a plain object that contains all attributes of the resource and also all relationships included in the query:

```ts
{
  code: "808811825",
  created_at: "2020-12-15T15:30:22.378Z",
  description: null,
  do_not_ship: false,
  do_not_track: false,
  hs_tariff_number: "61091000",
  id: "nkGgSEKLqn",
  image_url: null,
  meta: {
    mode: "test", organization_id: "asdasdsad"
  },
  metadata: {
    class: "335", event: "B6", colour: "1200", pro_65: "N", season: "20193",
  },
  name: "UJCA0LPZ6001200-2-t-shirt-pz600-graphite-l",
  pieces_per_pack: null,
  reference: ""
  reference_origin: null
  unit_of_weight: "gr"
  updated_at: "2021-02-18T12:05:26.205Z"
  weight: 150
}
```

## Find all

To find all resources that match a query, use the `findAll` method on a resource:

```ts
import { Skus } from '@atoms-studio/commercelayer-sdk'

await Skus.findAll({
  filter: {
    code_start: '808811',
  },
})
```

The `findAll` method returns a promise that resolves to a resource pagination object, containing the resources plus information about pagination:

```ts
{
  items: [...],
  currentPage: 1,
  prevPage: null,
  nextPage: 2,
  lastPage: 4,
  hasMore: true,
}
```

## Find by

To find a single resource by a specific query, use the `findBy` method on a resource:

```ts
import { Skus } from '@atoms-studio/commercelayer-sdk'

await Skus.findBy({
  filter: {
    code_eq: '808811825',
  },
})
```

The `findBy` method returns a promise that resolves to a resource object, or null if the resource is not found.


## Including associations

To include relationships when fetching resources, use the `include` option, passing an array of relationship names:

```ts
import { Skus } from '@atoms-studio/commercelayer-sdk'

await Skus.find('nkGgSEKLqn', {
  include: ['prices', 'prices.price_list'],
})
await Skus.findBy({
  include: ['prices', 'prices.price_list'],
})
await Skus.findAll({
  include: ['prices', 'prices.price_list'],
})
```

The resulting resource object will contain all included relationships in addition to its own attributes.

## Sparse fieldsets

To return only specific fields of a resource, use the `fields` option, passing an object with the list of fields for each type of resource:

```ts
import { Skus } from '@atoms-studio/commercelayer-sdk'

await Skus.find('nkGgSEKLqn', {
  include: ['prices'],
  fields: {
    skus: ['code', 'name'],
    prices: ['formatted_amount', 'amount_float'],
  },
})
await Skus.findBy({
  include: ['prices'],
  fields: {
    skus: ['code', 'name'],
    prices: ['formatted_amount', 'amount_float'],
  },
})
await Skus.findAll({
  include: ['prices'],
  fields: {
    skus: ['code', 'name'],
    prices: ['formatted_amount', 'amount_float'],
  },
})
```

## Filtering data

To filter data, use the `filter` option, passing an object with the filters to apply:

```ts
import { Skus } from '@atoms-studio/commercelayer-sdk'

await Skus.findAll({
  filter: {
    code_start: '808811',
  },
})

await Skus.findBy({
  filter: {
    code_eq: '808811825',
  },
})
```

To see the list of available filters and their format, check out the [Commercelayer API documentation](https://developers.commerce.com/docs/api/resources/sku).

## Sorting results

To sort results, use the `sort` option, passing an array of fields to sort by:

```ts
import { Skus } from '@atoms-studio/commercelayer-sdk'

await Skus.findAll({
  sort: ['-created_at', 'code'],
})

await Skus.findBy({
  sort: ['-created_at', 'code'],
})
```

## Pagination

To apply pagination to a request, pass the `page` option:

```ts
import { Skus } from '@atoms-studio/commercelayer-sdk'

await Skus.findAll({
  page: {
    size: 10,
    number: 2,
  },
})

await Skus.findBy({
  page: {
    size: 10,
    number: 2,
  },
})
```

## Fetching related resources

To fetch resources related to another resource, use the `relatedTo` option passing a resource instance:

```ts
import { Orders, Auth } from '@atoms-studio/commercelayer-sdk'

const customer = Auth.getProfile()
await Orders.findAll({
  relatedTo: customer,
})
```