import { init, Auth, Orders, LineItems } from '@atoms-studio/commercelayer-sdk'
;(async () => {
  init({
    host: import.meta.env.VITE_CL_DOMAIN,
    clientId: import.meta.env.VITE_CL_CLIENT_ID,
  })

  await Auth.setMarket(Number(import.meta.env.VITE_CL_PRIMARY_MARKET_ID))

  const order = await Orders.create({})

  const lineItem = await LineItems.create(
    {
      sku_code: '806848797',
      quantity: 1,
    },
    {
      order,
    },
  )

  const orderWith1LineItem = await Orders.find(order.id, {
    include: ['line_items', 'line_items.item'],
  })

  const updatedLineItem = await LineItems.update(lineItem.id, {
    quantity: 4,
  })

  const orderWith4LineItems = await Orders.find(order.id, {
    include: ['line_items', 'line_items.item'],
  })

  await LineItems.delete(lineItem.id)

  const orderWith0LineItems = await Orders.find(order.id, {
    include: ['line_items', 'line_items.item'],
  })

  ;(window as any).cartData = {
    order,
    lineItem,
    orderWith1LineItem,
    updatedLineItem,
    orderWith4LineItems,
    orderWith0LineItems,
  }
})()
