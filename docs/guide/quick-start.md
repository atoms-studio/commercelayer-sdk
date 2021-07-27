# Quick start

## Installation

```bash
yarn add @atoms-studio/commercelayer-sdk
```
```bash
npm i @atoms-studio/commercelayer-sdk
```

This basic example shows how to add an item to the cart
```ts
import { init, Auth, Orders, Skus } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<domain>.commercelayer.io',
  clientId: '<your cl client id>',
})

// Get an access token by setting the market number.
// The access token will be automatically included in all subsequent requests
await Auth.setMarket(<your market number>)

// Find a sku by its code, and include the "prices" relationship in the response
const sku = await Skus.findBy({
  filter: {
    code_eq: '808811825',
  },
  include: ['prices'],
})

// Create the cart
const order = await Orders.create()

// Add an item to the cart
await LineItems.create({
  attributes: {
    sku_code: sku.code,
    quantity: 1,
  },
  relationships: {
    order
  }
})
```
