# Auth.isCustomerLoggedIn

Check if there is a customer logged in.

- **Returns:**

  - `loggedIn: boolean`.

- **Example:**

```ts
import { init, Auth } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
})

await Auth.setMarket(1234)
console.log(Auth.isCustomerLoggedIn()) // Prints: false
```
