import {
  init,
  Auth,
  Orders,
  LineItems,
  Skus,
  OrderInstance,
  Addresses,
  Shipments,
  WireTransfers,
} from '@atoms-studio/commercelayer-sdk'

init({
  host: import.meta.env.VITE_CL_DOMAIN,
  clientId: import.meta.env.VITE_CL_CLIENT_ID,
})

let skuCode: string
let order: OrderInstance
let shippingAddress

const ready = () => {
  document.querySelector('#ready').textContent = 'ready'
}

const orderIncludes = [
  'line_items',
  'line_items.item',
  'shipments',
  'shipments.available_shipping_methods',
  'available_payment_methods',
  'payment_method',
  'shipping_address',
  'billing_address',
]

const setOrder = (ord) => {
  order = ord
  console.log(ord)
  return ord
}

const fetchOrder = () => {
  return Orders.find(order.id, {
    include: orderIncludes,
  }).then((ord) => {
    return setOrder(ord)
  })
}

Auth.setMarket(String(import.meta.env.VITE_CL_PRIMARY_MARKET_ID))
  .then(() =>
    Promise.all([
      Skus.findBy({}),
      Orders.create({ attributes: { customer_email: 'test@example.com' } }),
    ]),
  )
  .then(([sku, ord]) => {
    skuCode = sku.code
    order = ord
  })
  .then(() => {
    LineItems.create({
      attributes: {
        sku_code: skuCode,
        quantity: 1,
        _update_quantity: true,
      },
      relationships: {
        order,
      },
    })
  })
  .then(fetchOrder)
  .then(ready)

document.querySelector('#shipping-address').addEventListener('submit', (e) => {
  e.preventDefault()

  const form = e.target as HTMLFormElement
  const data = new FormData(form)

  Addresses.create({ attributes: Object.fromEntries(data) })
    .then((addr) => {
      shippingAddress = addr
    })
    .then(() => {
      return Orders.update(order.id, {
        attributes: {
          _billing_address_same_as_shipping: true,
          // _billing_address_clone_id: shippingAddress.id,
        },
        query: {
          include: orderIncludes,
        },
        relationships: {
          shipping_address: shippingAddress,
        },
      })
    })
    // .then(() => {
    //   return new Promise((r) => setTimeout(r, 5000))
    // })
    .then(setOrder)
    .then(() => {
      document.querySelector('#shipments').innerHTML = order.shipments
        .map((shipment) => {
          return `
          <h4>${shipment.number}</h4>
          <form id="shipment-${shipment.id}">
            ${shipment.available_shipping_methods.map(
              (shippingMethod) =>
                `<label><input type="radio" name="shipping_method" value="${shippingMethod.id}" />  ${shippingMethod.name}</label>`,
            )}
            <br><br>
            <button type="submit">Set shippping method</button>
          </form>
        `
        })
        .join('\n')
    })
})

document.addEventListener('submit', (e) => {
  e.preventDefault()
  const form = e.target as HTMLFormElement

  if (form.id.startsWith('shipment-')) {
    const shipmentId = form.id.replace('shipment-', '')
    console.log(shipmentId)
    Shipments.update(shipmentId, {
      relationships: {
        shipping_method: form.elements['shipping_method'].value,
      },
    })
      .then(fetchOrder)
      .then(() => {
        document.querySelector('#payments').innerHTML = `
        <form id="payment-methods">
          ${order.available_payment_methods
            .map((paymentMethod) => {
              return `<label><input type="radio" name="payment_method" value="${paymentMethod.id}" data-payment-method-type="${paymentMethod.payment_source_type}" />  ${paymentMethod.name}</label><br>`
            })
            .join('\n')}
            <br>
          <button type="submit">Set payment method</button>
        </form>
      `
      })
  } else if (form.id === 'payment-methods') {
    const paymentMethodId = form.elements['payment_method'].value
    Orders.update(order.id, {
      query: {
        include: orderIncludes,
      },
      relationships: {
        payment_method: paymentMethodId,
      },
    })
      .then(setOrder)
      .then(() => {
        return WireTransfers.create({
          relationships: {
            order,
          },
        })
      })
      .then(() => {
        return Orders.update(order.id, {
          attributes: {
            _place: true,
          },
          query: { include: orderIncludes },
        })
      })
      .then(setOrder)
      .then(() => {
        document.querySelector('#order-status').textContent = order.status
      })
  }
})
