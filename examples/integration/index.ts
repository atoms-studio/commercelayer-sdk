import { init, Auth } from '@atoms-studio/commercelayer-sdk'

init({
  host: import.meta.env.VITE_CL_DOMAIN,
  clientId: import.meta.env.VITE_CL_INTEGRATION_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CL_INTEGRATION_CLIENT_SECRET,
})

document.getElementById('no-market-get-token').addEventListener('click', () => {
  Auth.loginAsIntegration()
    .then(() => Auth.setMarket([]))
    .then(() => {
      document.getElementById(
        'no-market-integration-token',
      ).textContent = Auth.getToken().token
    })
})

document.getElementById('market1-get-token').addEventListener('click', () => {
  Auth.setMarket(Number(import.meta.env.VITE_CL_PRIMARY_MARKET_ID)).then(() => {
    document.getElementById(
      'market1-integration-token',
    ).textContent = Auth.getToken().token
  })
})

document.getElementById('market2-get-token').addEventListener('click', () => {
  Auth.setMarket(Number(import.meta.env.VITE_CL_SECONDARY_MARKET_ID)).then(
    () => {
      document.getElementById(
        'market2-integration-token',
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
          'market1-clone-integration-token',
        ).textContent = Auth.getToken().token
      },
    )
  })
