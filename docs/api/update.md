# [resource].update

Update an existing resource.

- **Arguments:**

  - `id: String`: The resource id.
  - `params?: ResourceWriteParams`: The parameters to update the resource with. [Read more](/api/resource-write-params)

- **Returns:**

  - `Promise<ResourceInstance | null>`.

- **Example:**

```ts
import { Addresses, Auth } from '@atoms-studio/commercelayer-sdk'

const customer = Auth.getProfile()

const address = await Addresses.update('xYZkjABcde', {
  attributes: {
    line_2: 'Apt.23'
  },
  relationships: {
    customer,
  },
  query: {
    include: ['customer'],
  },
})
```
