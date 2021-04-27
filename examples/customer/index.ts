import { init, Auth } from '@atoms-studio/commercelayer-sdk'

init({
  host: import.meta.env.VITE_CL_DOMAIN,
  clientId: import.meta.env.VITE_CL_CLIENT_ID,
})

document.getElementById('market1-get-token').addEventListener('click', () => {
  Auth.setMarket(Number(import.meta.env.VITE_CL_PRIMARY_MARKET_ID)).then(() => {
    Auth.loginAsCustomer(
      (document.getElementById('guest-email') as HTMLInputElement).value,
      (document.getElementById('guest-password') as HTMLInputElement).value,
    ).then(() => {
      document.getElementById(
        'customer1-token',
      ).textContent = Auth.getCustomerToken().token
      document.getElementById(
        'customer1-is-logged-in',
      ).textContent = Auth.isCustomerLoggedIn() ? 'true' : 'false'
    })
  })
})

document.getElementById('market2-get-token').addEventListener('click', () => {
  Auth.setMarket(Number(import.meta.env.VITE_CL_SECONDARY_MARKET_ID)).then(
    () => {
      document.getElementById(
        'market2-guest-token',
      ).textContent = Auth.getToken().token
      document.getElementById('customer2-token').textContent =
        Auth.getCustomerToken() && Auth.getCustomerToken().token
      document.getElementById(
        'customer2-is-logged-in',
      ).textContent = Auth.isCustomerLoggedIn() ? 'true' : 'false'
    },
  )
})
