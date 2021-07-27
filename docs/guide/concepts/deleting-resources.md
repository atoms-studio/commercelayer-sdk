# Deleting resources

To delete a resource, simply call the `delete` method on a resource passing its id.

```ts
import { Addresses } from '@atoms-studio/commercelayer-sdk'

await Addresses.delete('xYZkjABcde')
```

The `delete` method returns an empty promise.