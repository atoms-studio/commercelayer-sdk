# Auth.getToken

Get the currently active guest token and expiration time.

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
console.log(Auth.getToken())
/*
Prints:
{
  token: 'eyJhbGciOiJIUzUxMiJ9.eyJ....',
  expires: 1627373587
}
*/
```
