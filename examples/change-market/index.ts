import { init, Auth, Skus } from '@atoms-studio/commercelayer-sdk'
;(async () => {
  init({
    host: import.meta.env.VITE_CL_DOMAIN,
    clientId: import.meta.env.VITE_CL_CLIENT_ID,
  })

  await Auth.setMarket(Number(import.meta.env.VITE_CL_PRIMARY_MARKET_ID))
  ;(window as any).sku1 = await Skus.findBy({
    include: ['prices'],
  })

  await Auth.setMarket(Number(import.meta.env.VITE_CL_SECONDARY_MARKET_ID))
  ;(window as any).sku2 = await Skus.findBy({
    include: ['prices'],
  })

  await Auth.setMarket(Number(import.meta.env.VITE_CL_PRIMARY_MARKET_ID))
  ;(window as any).sku1 = await Skus.findBy({
    include: ['prices'],
  })
})()
