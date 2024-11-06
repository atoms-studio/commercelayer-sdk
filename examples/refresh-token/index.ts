import { init, Auth, Skus } from '@atoms-studio/commercelayer-sdk'

init({
  host: import.meta.env.VITE_CL_DOMAIN,
  clientId: import.meta.env.VITE_CL_CLIENT_ID,
})

Auth.setMarket(String(import.meta.env.VITE_CL_PRIMARY_MARKET_ID)).then(() => {
  Auth.__setCurrentToken('bad_token', Date.now() + 10000)
  Skus.findBy({}).then((sku) => {
    document.querySelector('#sku').textContent = sku.code
  })
})
