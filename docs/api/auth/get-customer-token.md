# Auth.getCustomerToken

Get the current customer token and expiration time.

- **Returns:**

  - `tokenInfo: { token: string, expires: number }`.

- **Example:**

```ts
import { init, Auth } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
})

await Auth.setMarket(1234)
await Auth.loginAsCustomer('john@example.com', 'p4ssw0rd')
console.log(Auth.getCustomerToken())
/*
Prints:
{
  token: 'eyJhbGciOiJIUzUxMiJ9.eyJ....',
  expires: 1627373587
}
*/
```
