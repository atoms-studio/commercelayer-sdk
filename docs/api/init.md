# Initialization API

To initialize the SDK, call the `init` function passing a configuration object.

- **Arguments:**

  - `config: Config`

```ts
interface Config {
  // Your commercelayer installation URL
  host: string

  // Your client id
  clientId: string

  // Your client secret. Required only when logging in as an integration
  clientSecret?: string = ''

  // Atuomatically refresh tokens when they expire
  refreshTokens?: boolean = true

  // Number of attempts to refresh a token before failing
  refreshTokensAttempts?: number = 3

  // Function called when refresh token fails
  onRefreshError?: (error: Error) => void | Promise<void> = (error: Error) => {}
}
```

- **Example:**

```ts
import { init } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
})
```