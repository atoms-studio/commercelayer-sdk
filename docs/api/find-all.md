# [resource].findAll

Find all resources that match a specific query.

- **Arguments:**

  - `query: RequestQuery`: Query parameters that define how to filter the response. [Read more](/api/request-query)

- **Returns:**

  - `Promise<ResourcePagination>`: A pagination object containing the results and information about current pagination data. [Read more](/api/resource-pagination)

- **Example:**

```ts
import { init, Auth, Skus } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
})

await Auth.setMarket('1234')

const result = await Skus.findAll({
  filter: {
    name_matches: '%shirt%'
  }
})
console.log(result)
/*
Prints:
{
  items: [
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
  ],
  currentPage: 1,
  prevPage: null,
  nextPage: null,
  lastPage: 1,
  hasMore: false,
}
*/
```
