# Auth.useCustomerSection

Restore a customer session.

- **Arguments:**

  - `accessToken: string`
  - `refreshToken: string`
  - `scope: string`

- **Returns:**

  - `Promise<void>`.

- **Example:**

```ts
import { init, Auth } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
})

await Auth.setMarket(1234)

// Try to restore the session
try {
  await Auth.useCustomerSession(
    'eyJhbGciOiJIUzUxMiJ9.eyJ....',
    'IjN2TXbif8rq....',
    'market:1234'
  )
  // Customer is logged in now
} catch (error) {
  // Session cannot be restored
}

```
