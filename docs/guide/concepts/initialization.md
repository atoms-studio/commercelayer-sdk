# Initialization

To initialize the library, simply call the `init` function, passing a configuration object.

```ts
import { init } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
})
```

This is the bare minimum configuration to start using the library. To view all the configuration options, please refer to the [init API Reference](/api/init) section.