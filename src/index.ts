export { initConfig as init } from './config'
export { Auth } from './auth'

export { ResourceError } from './errors'

// Resources: these are automatically added by the script
export { Skus, SkuInstance } from './resources/Skus'
export {
  ShippingCategories,
  ShippingCategoryInstance,
} from './resources/ShippingCategories'
export { Prices, PriceInstance } from './resources/Prices'
export { PriceLists, PriceListInstance } from './resources/PriceLists'
export { Orders, OrderInstance } from './resources/Orders'
export { LineItems, LineItemInstance } from './resources/LineItems'
export {
  DeliveryLeadTimes,
  DeliveryLeadTimeInstance,
} from './resources/DeliveryLeadTimes'
export { Customers, CustomerInstance } from './resources/Customers'
export { Addresses, AddressInstance } from './resources/Addresses'
export {
  CustomerAddresses,
  CustomerAddressInstance,
} from './resources/CustomerAddresses'
export { Markets, MarketInstance } from './resources/Markets'
export { Shipments, ShipmentInstance } from './resources/Shipments'
export {
  PaymentMethods,
  PaymentMethodInstance,
} from './resources/PaymentMethods'
export { Adjustments, AdjustmentInstance } from './resources/Adjustments'
export { GiftCards, GiftCardInstance } from './resources/GiftCards'
export {
  ShippingMethods,
  ShippingMethodInstance,
} from './resources/ShippingMethods'
export { Attachments, AttachmentInstance } from './resources/Attachments'
export { Returns, ReturnInstance } from './resources/Returns'
export { WireTransfers, WireTransferInstance } from './resources/WireTransfers'
