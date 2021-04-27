import { init, Auth } from '@atoms-studio/commercelayer-sdk'

init({
  host: import.meta.env.VITE_CL_DOMAIN,
  clientId: import.meta.env.VITE_CL_CLIENT_ID,
})

document.getElementById('market1-get-token').addEventListener('click', () => {
  Auth.setMarket(Number(import.meta.env.VITE_CL_PRIMARY_MARKET_ID)).then(() => {
    document.getElementById(
      'market1-guest-token',
    ).textContent = Auth.getToken().token
  })
})

document.getElementById('market2-get-token').addEventListener('click', () => {
  Auth.setMarket(Number(import.meta.env.VITE_CL_SECONDARY_MARKET_ID)).then(
    () => {
      document.getElementById(
        'market2-guest-token',
      ).textContent = Auth.getToken().token
    },
  )
})

document
  .getElementById('market1-clone-get-token')
  .addEventListener('click', () => {
    Auth.setMarket(Number(import.meta.env.VITE_CL_PRIMARY_MARKET_ID)).then(
      () => {
        document.getElementById(
          'market1-clone-guest-token',
        ).textContent = Auth.getToken().token
      },
    )
  })
