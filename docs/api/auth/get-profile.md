# Auth.getProfile

Return the current customer information.

- **Returns:**

  - `customer: CustomerInstance`.

- **Example:**

```ts
import { init, Auth } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
})

await Auth.setMarket(1234)
await Auth.loginAsCustomer('john@example.com', 'p4ssw0rd')
console.log(Auth.getProfile())
/*
Prints:
{
  id: 'xYZkjABcde',
  email: 'john@example.com',
  name: 'john
  ...
}
*/
```
