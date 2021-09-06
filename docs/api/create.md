# [resource].create

Create a new resource.

- **Arguments:**

  - `params?: ResourceWriteParams`: The parameters to create the resource with. [Read more](/api/resource-write-params)

- **Returns:**

  - `Promise<ResourceInstance | null>`.

- **Example:**

```ts
import { Orders, LineItems } from '@atoms-studio/commercelayer-sdk'

// Create a new order without any parameter
const order = await Orders.create()

// Add a line item to the order, and include relationships in the result
const lineItem = await LineItems.create({
  attributes: {
    sku_code: '806848797',
    quantity: 1,
    _update_quantity: true,
  },
  relationships: {
    order,
  },
  query: {
    include: ['order', 'order.line_items', 'order.line_items.item'],
  },
})
```