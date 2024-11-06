# [resource].find

Find a resource by id.

- **Arguments:**

  - `id: string`: the id of the resource to find
  - `query?: RequestQuery`: Additional query parameters to alter the response data. [Read more](/api/request-query)

- **Returns:**

  - `Promise<ResourceInstance | null>`.

- **Example:**

```ts
import { init, Auth, Skus } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
})

await Auth.setMarket('1234')

const sku = await Skus.find('nkGgSEKLqn')
console.log(sku)
/*
Prints:
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
*/
```

Passing the `query` argument to alter the response data.

```ts
import { init, Auth, Skus } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
})

await Auth.setMarket('1234')

const sku = await Skus.find('nkGgSEKLqn', {
  include: ['prices'], // include prices relationship
  fields: { // include only these fields in the response
    skus: ['code', 'name', 'prices'],
    prices: ['formatted_amount']
  },
})
console.log(sku)
/*
Prints:
{
  code: "808811825",
  name: "UJCA0LPZ6001200-2-t-shirt-pz600-graphite-l",
  prices: [
    {
      formatted_amount: "€12.00"
    }
  ]
}
*/
```