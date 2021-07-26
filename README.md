![npm (scoped)](https://img.shields.io/npm/v/@atoms-studio/commercelayer-sdk)
![npm](https://img.shields.io/npm/dm/@atoms-studio/commercelayer-sdk)
[![Build Status](https://github.com//atoms-studio/commercelayer-sdk/workflows/Node.js%20CI/badge.svg)](https://github.com/atoms-studio/commercelayer-sdk/actions)
[![codecov](https://codecov.io/gh/atoms-studio/commercelayer-sdk/branch/main/graph/badge.svg?token=PYZQB331CP)](https://codecov.io/gh/atoms-studio/commercelayer-sdk)

# CommerceLayer SDK
A lightweight, opinionated CommerceLayer SDK built for fast delivery of e-commerce functionalities.

## Why
The official CommerceLayer SDK is a great multi-purpose library that covers a lot of scenarios, however we realized that in every project we worked on we had to 
reimplement a lot of functionalities tied to the e-commerce workflow: token refresh, token caching, multi-market switch, etc.<br>
This library aims to speed-up development by creating a thinner and easier interface with the CommerceLayer API and provide utilities to deal with the aforementioned problems.

## Features

### Strongly typed
All supported resources are strongly typed and provide code autocompletion for attributes and relationships, decreasing time spent reading the CommerceLayer API documentation.

### Automatic token refresh
Combining Authentication and API into a single library allows for automatic refresh of tokens when a request fails due to an expired token.

### Token caching
Tokens are cached by their scope and expiration date, avoiding rate limiting errors when generating static pages or making a lot of concurrent requests.

### Seamless multi-market switching
Switch between multiple markets and automatically create new auth tokens for that market.


## Installation

```bash
npm i @atoms-studio/commercelayer-sdk
```
```bash
yarn add @atoms-studio/commercelayer-sdk
```

## Quick start

```ts
import { init, Auth, Orders, Skus } from '@atoms-studio/commercelayer-sdk'

init({
  host: 'https://<your cl domain>.commercelayer.io',
  clientId: '<your cl client id>',
})

await Auth.setMarket(1234)

const order = await Orders.create()

const sku = await Skus.findBy({
  code: '12345678',
  include: ['prices'],
})

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
