import {
  init,
  Auth,
  Orders,
  LineItems,
  Skus,
  OrderInstance,
} from '@atoms-studio/commercelayer-sdk'

init({
  host: import.meta.env.VITE_CL_DOMAIN,
  clientId: import.meta.env.VITE_CL_CLIENT_ID,
})

let skuCode: string
let order: OrderInstance
Auth.setMarket(Number(import.meta.env.VITE_CL_PRIMARY_MARKET_ID)).then(() => {
  Promise.all([Skus.findBy({}), Orders.create({})]).then(([sku, ord]) => {
    skuCode = sku.code
    order = ord
  })
})

document.getElementById('add-to-cart').addEventListener('click', () => {
  LineItems.create(
    {
      sku_code: skuCode,
      quantity: 1,
      _update_quantity: true,
    },
    {
      order,
    },
  ).then(() => {
    Orders.find(order.id, {
      include: ['line_items', 'line_items.item'],
    }).then((ord) => {
      order = ord

      document.getElementById('line-items').innerHTML = order.line_items
        .map((lineItem) => `<li>${lineItem.name} - ${lineItem.quantity}</li>`)
        .join('\n')

      document.getElementById('cart-total').textContent =
        order.formatted_total_amount
    })
  })
})
