import { init, Auth } from '@atoms-studio/commercelayer-sdk'

init({
  host: import.meta.env.VITE_CL_DOMAIN,
  clientId: import.meta.env.VITE_CL_CLIENT_ID,
})

document.getElementById('market1-get-token').addEventListener('click', () => {
  Auth.setMarket(Number(import.meta.env.VITE_CL_PRIMARY_MARKET_ID)).then(() => {
    Auth.loginAsCustomer(
      (document.getElementById('customer-email') as HTMLInputElement).value,
      (document.getElementById('customer-password') as HTMLInputElement).value,
    ).then(() => {
      document.getElementById(
        'customer1-token',
      ).textContent = Auth.getCustomerToken().token
      document.getElementById(
        'customer1-is-logged-in',
      ).textContent = Auth.isCustomerLoggedIn() ? 'true' : 'false'
      document.getElementById('customer1-profile').textContent = JSON.stringify(
        Auth.getProfile(),
      )
    })
  })
})

document.getElementById('market2-get-token').addEventListener('click', () => {
  Auth.setMarket(Number(import.meta.env.VITE_CL_SECONDARY_MARKET_ID)).then(
    () => {
      document.getElementById('guest-token').textContent = Auth.getToken().token
      document.getElementById('customer2-token').textContent =
        Auth.getCustomerToken() && Auth.getCustomerToken().token
      document.getElementById(
        'customer2-is-logged-in',
      ).textContent = Auth.isCustomerLoggedIn() ? 'true' : 'false'
      document.getElementById('customer2-profile').textContent =
        JSON.stringify(Auth.getProfile()) || 'null'
    },
  )
})
