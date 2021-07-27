# Updating resources

To update a resource, simply call the `update` method on a resource, passing its id and optionally passing attributes, relationships and query parameters.

```ts
import { Addresses } from '@atoms-studio/commercelayer-sdk'

const address = await Addresses.update('xYZkjABcde', {
  attributes: {
    line_2: 'Apt.23'
  },
})
```
The `update` method returns a promise that resolves with the updated resource.