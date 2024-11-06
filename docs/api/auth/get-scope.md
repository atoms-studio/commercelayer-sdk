# Auth.getScope

Get the current scope used when fetching access tokens.

- **Returns:**

  - `scope: string`.

- **Example:**

```ts
import { init, Auth } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
})

await Auth.setMarket(1234)
console.log(Auth.getScope()) // Prints: 'market:code:1234'

await Auth.setMarket([1234, 5678])
console.log(Auth.getMarket()) // Prints: 'market:code:1234 market:code:5678'
```
