# Auth.logoutCustomer

Log the current customer out.

- **Example:**

```ts
import { init, Auth, Customers } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
})

await Auth.loginAsCustomer('john@example.com', 'p4ssw0rd')
Auth.logoutCustomer()

console.log(Auth.isCustomerLoggedIn()) // prints: false
```
