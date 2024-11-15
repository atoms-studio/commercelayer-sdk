import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { AdjustmentInstance } from './Adjustments'
import { GiftCardInstance } from './GiftCards'
import { OrderInstance } from './Orders'
import { PaymentMethodInstance } from './PaymentMethods'
import { ShipmentInstance } from './Shipments'
import { SkuInstance } from './Skus'
import { BundleInstance } from './Bundles'

export interface LineItemAttributes {
  sku_code: string
  quantity: number
  _external_price: boolean
  _update_quantity: boolean
  currency_code: string
  unit_amount_cents: number
  unit_amount_float: number
  formatted_unit_amount: string
  options_amount_cents: number
  options_amount_float: number
  formatted_options_amount: string
  discount_cents: number
  discount_float: number
  formatted_discount: string
  total_amount_cents: number
  total_amount_float: number
  formatted_total_amount: string
  tax_amount_cents: number
  tax_amount_float: number
  formatted_tax_amount: string
  name: string
  image_url: string
  discount_breakdown: any // TODO: improve this type
  tax_rate: number
  tax_breakdown: any // TODO: improve this type
  item_type: string
  bundle_code: string
}

export interface LineItemRelationships {
  order: OrderInstance
  item:
    | SkuInstance
    | ShipmentInstance
    | PaymentMethodInstance
    | AdjustmentInstance
    | GiftCardInstance // TODO: missing promotions
    | BundleInstance
  line_item_options: any[] // TODO: improve this type
  shipment_line_items: LineItemInstance[]
  stock_transfers: any[] // TODO: improve this type
}

export type LineItemInstance = ConcreteResourceInstance<
  LineItemAttributes,
  LineItemRelationships
>

export const LineItemsConfig: ResourceConfig<
  LineItemAttributes,
  LineItemRelationships
> = {
  type: 'line_items',

  attributes: [
    'sku_code',
    'quantity',
    '_external_price',
    '_update_quantity',
    'currency_code',
    'unit_amount_cents',
    'unit_amount_float',
    'formatted_unit_amount',
    'options_amount_cents',
    'options_amount_float',
    'formatted_options_amount',
    'discount_cents',
    'discount_float',
    'formatted_discount',
    'total_amount_cents',
    'total_amount_float',
    'formatted_total_amount',
    'tax_amount_cents',
    'tax_amount_float',
    'formatted_tax_amount',
    'name',
    'image_url',
    'discount_breakdown',
    'tax_rate',
    'tax_breakdown',
    'item_type',
    'bundle_code'
  ],

  relationships: {
    order: 'orders',
    item: {
      polymorphic: true,
    },
    line_item_options: 'line_item_options',
    shipment_line_items: 'line_items',
    stock_transfers: 'stock_transfers',
  },
}

export const LineItems: Resource<
  LineItemAttributes,
  LineItemRelationships,
  LineItemInstance
> = createResource<LineItemAttributes, LineItemRelationships>(LineItemsConfig)
