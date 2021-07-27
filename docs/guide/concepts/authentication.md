# Authentication

Authentication can be performed in 3 ways:

- [As a guest using a sales channel](#guest)
- [As a customer using a sales channel](#customer)
- [As an integration](#integration)


## Guest

To authenticate as a guest, simply set the market number using `Auth.setMarket`:

```ts
import { init, Auth } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
})

await Auth.setMarket(1234)
```

Setting the market always fetches a guest access token and caches it until it expires.<br>
Fetching resources will always use the cached token.

## Customer

To authenticate as a customer, set the market number and call `Auth.loginAsCustomer` passing username and password:

```ts
import { init, Auth } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
})

await Auth.setMarket(1234)

const { customer } = await Auth.loginAsCustomer('john@exaple.com', 'p4ssw0rd')
```

Logging in as a customer fetches an access token and the profile of the customer.<br>
After logging in, fetching resources will use the customer access token.<br><br>

To manually log a customer out, as with a logout button, call `Auth.logoutCustomer`:

```ts
import { Auth } from '@atoms-studio/commercelayer-sdk'

Auth.logoutCustomer()
```
After logging out, fetching resources will use a guest access token.
<br>

**Note**: When changing markets while a customer is logged in, the customer will be automatically logged out due to how the Commercelayer API works.<br><br>

## Integration

To authenticate as an integration, pass a clientSecret to the `init` function and call `Auth.loginAsIntegration`:

```ts
import { init, Auth } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
  clientSecret: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk',
})

await Auth.loginAsIntegration()
```

Note that you are not required to set a market with integrations, as they are often used to perform global operations.

**WARNING**: NEVER use integrations in a browser context. Exposing integration credentials to the browser gives everyone read and write permissions to any resource!


## Keeping customers logged in

To keep a customer logged in between sessions, first of all you should save the customer access token, refresh token, and the token scope to cookies:

```ts
import { init, Auth } from '@atoms-studio/commercelayer-sdk'
import Cookie from 'cookie-universal'
const cookies = Cookie()

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
})

await Auth.setMarket(1234)

const { token, refreshToken } = await Auth.loginAsCustomer('john@exaple.com', 'p4ssw0rd')
const scope = Auth.getScope()

// Save token, refresh token and scope to cookies
cookies.set('cl_access_token', token)
cookies.set('cl_refresh_token', refreshToken)
cookies.set('cl_scope', scope)
```

Now when you app starts, get the cookie values and pass them to the `Auth.useCustomerSession` method:

```ts
import { init, Auth } from '@atoms-studio/commercelayer-sdk'
import Cookie from 'cookie-universal'
const cookies = Cookie()

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
})

await Auth.setMarket(1234)

// Obtain saved data
const savedToken = cookies.get('cl_access_token')
const savedRefreshToken = cookies.get('cl_refresh_token')
const savedScope = cookies.get('cl_scope')

// Try to restore the session
try {
  await Auth.useCustomerSession(savedToken, savedRefreshToken, savedScope)
} catch (error) {
  // Session cannot be restored
}

```

## Refreshing access tokens

Access token refresh is performed automatically while fetching resources when receiving a 401 Unauthorized response from the API.<br>

You can alter this behavior by passing additional options to `init`:

```ts

import { init, Auth } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io/',
  clientId: '9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk', 
  refreshTokens: true, // Pass false to disable automatic token refresh
  refreshTokensAttempts: 3, // The number of attempts to try to refresh the token
  // A callback that will be called when a token cannot be refreshed
  onRefreshError: (error: Error) => {
    // Redirect to the login page if a customer is logged in
    if (Auth.isCustomerLoggedIn()) {
      Auth.logoutCustomer()
      router.push('/login')
    }
  },
})
```