# Auth.loadProfile

Reload the customer data.

- **Returns:**

  - `Promise<void>`.

- **Example:**

```ts
import { init, Auth, Customers } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
})

await Auth.setMarket(1234)
const customer = Auth.getProfile()

await Customers.update(customer.id, {
  attributes: {
    metadata: {
      firstName: 'John',
    }
  }
})

await Auth.loadProfile()
```
