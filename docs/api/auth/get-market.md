# Auth.getMarket

Get the current market number.

- **Returns:**

  - `marketNumber: number[]`. The current market number(s). Note that it always returns an array, even if there is only one market number set.

- **Example:**

```ts
import { init, Auth } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
})

await Auth.setMarket(1234)
console.log(Auth.getMarket()) // Prints: [1234]

await Auth.setMarket([1234, 5678])
console.log(Auth.getMarket()) // Prints: [1234, 5678]
```
