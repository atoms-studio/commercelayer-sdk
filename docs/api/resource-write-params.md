# ResourceWriteParams

This is the object used by `create` and `update` methods to specify the parameters needed to create or update a resource.

```ts
interface ResourceWriteParams {
  attributes?: AttributesPayload
  relationships?: RelationshipsPayload
  query?: RequestParameters
}
```

## attributes?

This property is used to specify the attributes of the resource to create / update. It is an object where keys are field names, and values are the values to set.
```ts
{
  attributes: {
    sku_code: '806848797',
    quantity: 1,
    _update_quantity: true,
  }
}
```

## relationships?

This property is used to specify the related resources when creating / updating a resource. It is an object where keys are relationship names, and values are the related resources to link.
```ts
{
  relationships: {
    order: myOrder,
  },
}
```

## query?

This property is used to alter the data in the response. It is a subset of the [RequestQuery](/api/request-query) fields.
```ts
{
  query: {
    include?: string[]
    fields?: Record<string, string[]>
  }
}
```

