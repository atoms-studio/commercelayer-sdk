# Auth.loginAsCustomer

Log a customer in the current market.

- **Arguments:**

  - `username: string`
  - `password: string`

- **Returns:**

  - `customerData: Promise<CustomerData>`.

- **Example:**

```ts
import { init, Auth } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
})

await Auth.setMarket(1234)
const customerData = await Auth.loginAsCustomer('john@example.com', 'p4ssw0rd')
console.log(customerData)
/*
Prints:
{
  id: 'xYZkjABcde',
  customer: {
    id: 'xYZkjABcde',
    email: 'john@example.com',
    ...
  }
  token: 'eyJhbGciOiJIUzUxMiJ9.eyJ....',
  refreshToken: 'IjN2TXbif8rq....',
  expires: 1627373587
}
*/
```
