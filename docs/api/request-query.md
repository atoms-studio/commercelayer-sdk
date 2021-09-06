# RequestQuery

This is the object used to filter/alter the results of a request.<br>
Its signature is:

```ts
interface RequestQuery {
  include?: string[],
  fields?: Record<string, string[]>,
  sort?: string[]
  page?: {
    size: number
    number: number
  }
  filter?: Record<string, string | number>
  relatedTo?: ResourceInstance
}
```

## include?

This property is used to include related resources in the response. It accepts an array of related resources. You can also use nested resources by using dot notation.
```ts
{
  include: ['attachments', 'prices', 'prices.price_lists']
}
```

Read more about including associations on the [official Commerce Layer documentation](https://docs.commercelayer.io/api/including-associations).

## fields?

This property is used to select only specific fields from the response. It accepts a object in which keys are the resource names, and values are an array of field names to include.
```ts
{
  fields: {
    skus: ['code', 'name', 'prices'],
    prices: ['formatted_amount']
  }
}
```

Read more about sparse fieldsets on the [official Commerce Layer documentation](https://docs.commercelayer.io/api/sparse-fieldsets).

## sort?

This property is used to sort the results. It accepts an array of strings, where each string is a field used to sort by. The default sorting direction is ascending. To sort in descending order, prefix the field name with a minus sign.
```ts
{
  sort: ['-created_at', 'code']
}
```

Read more about sorting results on the [official Commerce Layer documentation](https://docs.commercelayer.io/api/sorting-results).

## page?

This property is used to apply pagination to a request. It accepts an object with two properties: size and number. The size property is the number of results per page, and the number property is the page number to return.<br>
The default page size if not specified is 10.

> Please note that the maximum page size the Commerce Layer API supports is 25. Passing a larger value will result in an error. 

```ts
{
  page: {
    size: 20,
    number: 2,
  }
}
```

Read more about pagination on the [official Commerce Layer documentation](https://docs.commercelayer.io/api/pagination).

## filter?

This property is used to filter the results of a request. It accepts an object in which keys are the fields to filter by, and values are the values of the filters.<br>
Note that field names must be suffixed by a matcher that specifies the operation used to compare the value.

```ts
{
  filter: {
    code_matches: 'sku-123%',
  }
}
```

For the complete list of matchers, read more about filtering data on the [official Commerce Layer documentation](https://docs.commercelayer.io/api/filtering-data).

## relatedTo?

This property is used to apply a request only to resources related to another, like retrieving all orders related to a customer.

```ts
import { init, Auth, Orders } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
})

await Auth.setMarket(1234)
const customer = Auth.getProfile()

const result = await Orders.findAll({
  relatedTo: customer,
})
```
