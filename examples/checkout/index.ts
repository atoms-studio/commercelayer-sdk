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

const fetchOrder = () => {
  return Orders.find(order.id, {
    include: [
      'line_items',
      'line_items.item',
      'shipments',
      'shipments.available_shipping_methods',
      'available_payment_methods',
      'payment_method',
      'shipping_address',
      'billing_address',
    ],
  }).then((ord) => {
    order = ord
    console.log(ord)
    return ord
  })
}

Auth.setMarket(Number(import.meta.env.VITE_CL_PRIMARY_MARKET_ID))
  .then(() =>
    Promise.all([
      Skus.findBy({}),
      Orders.create({ customer_email: 'test@example.com' }),
    ]),
  )
  .then(([sku, ord]) => {
    skuCode = sku.code
    order = ord
  })
  .then(() => {
    LineItems.create(
      {
        sku_code: skuCode,
        quantity: 1,
        _update_quantity: true,
      },
      {
        order,
      },
    )
  })
  .then(fetchOrder)

document.querySelector('#shipping-address').addEventListener('submit', (e) => {
  e.preventDefault()

  const form = e.target as HTMLFormElement
  const data = new FormData(form)

  Addresses.create(Object.fromEntries(data))
    .then((addr) => {
      shippingAddress = addr
    })
    .then(() => {
      return Orders.update(
        order.id,
        {
          _billing_address_same_as_shipping: true,
          // _billing_address_clone_id: shippingAddress.id,
        },
        {
          shipping_address: shippingAddress,
        },
      )
    })
    // .then(() => {
    //   return new Promise((r) => setTimeout(r, 5000))
    // })
    .then(fetchOrder)
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
    Shipments.update(
      shipmentId,
      {},
      {
        shipping_method: form.elements['shipping_method'].value,
      },
    )
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
    Orders.update(
      order.id,
      {},
      {
        payment_method: paymentMethodId,
      },
    )
      .then(fetchOrder)
      .then(() => {
        return WireTransfers.create(
          {},
          {
            order,
          },
        )
      })
      .then(() => {
        return Orders.update(order.id, {
          _place: true,
        })
      })
      .then(fetchOrder)
      .then(() => {
        document.querySelector('#order-status').textContent = order.status
      })
  }
})
