# Auth.loginAsIntegration

Log in as an integration.

- **Returns:**

  - `tokenInfo: Promise<{ token: string, expires: number }>`

- **Example:**

```ts
import { init, Auth } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
  clientSecret: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
})

const tokenInfo = await Auth.loginAsIntegration()
console.log(tokenInfo)
/*
Prints:
{
  token: 'eyJhbGciOiJIUzUxMiJ9.eyJ....',
  expires: 1627373587
}
*/
```