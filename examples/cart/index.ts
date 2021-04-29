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

document.addEventListener('click', (e) => {
  const el: HTMLElement = e.target as HTMLElement

  if (el && el.classList.contains('more')) {
    const quantity = Number(el.dataset.currentQuantity) || 1
    const id = el.closest('li').id
    updateQuantity(id, quantity + 1)
  } else if (el && el.classList.contains('less')) {
    const quantity = Number(el.dataset.currentQuantity) || 1
    const id = el.closest('li').id
    updateQuantity(id, quantity - 1)
  }
})

const setCartContents = () => {
  document.getElementById('line-items').innerHTML = order.line_items
    .map(
      (lineItem) =>
        `<li id="${lineItem.id}">
          <div>${lineItem.name}</div>
          <button type="button" class="less" data-current-quantity="${lineItem.quantity}">-</button>
          <span class="quantity">${lineItem.quantity}</span>
          <button type="button" class="more" data-current-quantity="${lineItem.quantity}">+</button>
        </li>`,
    )
    .join('\n')

  document.getElementById('cart-total').textContent =
    order.formatted_total_amount
}

const updateQuantity = (id: string, quantity = 1) => {
  let promise
  if (quantity > 0) {
    promise = LineItems.update(id, {
      quantity,
    })
  } else {
    promise = LineItems.delete(id)
  }

  promise.then(() => {
    Orders.find(order.id, {
      include: ['line_items', 'line_items.item'],
    }).then((ord) => {
      order = ord
      setCartContents()
    })
  })
}

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
      setCartContents()
    })
  })
})
