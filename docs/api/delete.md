# [resource].delete

Delete an existing resource.

- **Arguments:**

  - `id: String`: The resource id.

- **Returns:**

  - `Promise<void>`.

- **Example:**

```ts
import { Addresses } from '@atoms-studio/commercelayer-sdk'

await Addresses.delete('xYZkjABcde')
```
