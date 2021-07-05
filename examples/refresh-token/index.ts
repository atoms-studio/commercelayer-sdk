import { init, Auth, Skus } from '@atoms-studio/commercelayer-sdk'

init({
  host: import.meta.env.VITE_CL_DOMAIN,
  clientId: import.meta.env.VITE_CL_CLIENT_ID,
})

Auth.setMarket(Number(import.meta.env.VITE_CL_PRIMARY_MARKET_ID)).then(() => {
  Skus.findBy({}).then((sku) => {
    console.log(sku)
    document.querySelector('#sku').textContent = sku.code
  })
})
