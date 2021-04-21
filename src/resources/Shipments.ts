import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { AddressInstance } from './Addresses'
import { AttachmentInstance } from './Attachments'
import { DeliveryLeadTimeInstance } from './DeliveryLeadTimes'
import { LineItemInstance } from './LineItems'
import { OrderInstance } from './Orders'
import { ShippingCategoryInstance } from './ShippingCategories'
import { ShippingMethodInstance } from './ShippingMethods'

interface ShipmentRate {
  id: string
  rate: string
  object: string
  carrier: string
  service: string
  currency: string
  shipment_id: string
  delivery_days: number
  list_currency: any
  retail_currency: any
  est_delivery_days: number
  carrier_account_id: string
  delivery_date_guaranteed: any
}

export interface ShipmentAttributes {
  number: string
  status: string
  currency_code: string
  cost_amount_cents: number
  cost_amount_float: number
  formatted_cost_amount: string
  skus_count: number
  _on_hold: boolean
  _picking: boolean
  _packing: boolean
  _ready_to_ship: boolean
  _ship: boolean
  _get_rates: boolean
  selected_rate_id: string
  rates: ShipmentRate[]
  _purchase: boolean
  purchase_error_code: string
  purchase_error_message: string
  get_rates_started_at: string
  get_rates_completed_at: string
  purchase_started_at: string
  purchase_completed_at: string
  purchase_failed_at: string
}

export interface ShipmentRelationships {
  order: OrderInstance
  shipping_category: ShippingCategoryInstance
  stock_location: any // TODO: improve this type
  origin_address: AddressInstance
  shipping_address: AddressInstance
  shipping_method: ShippingMethodInstance
  delivery_lead_time: DeliveryLeadTimeInstance
  shipment_line_items: LineItemInstance[]
  stock_transfers: any[] // TODO: improve this type
  available_shipping_methods: ShippingMethodInstance[]
  carrier_accounts: any[] // TODO: improve this type
  parcels: any[] // TODO: improve this type
  attachments: AttachmentInstance[]
}

export type ShipmentInstance = ConcreteResourceInstance<
  ShipmentAttributes,
  ShipmentRelationships
>

export const ShipmentsConfig: ResourceConfig<
  ShipmentAttributes,
  ShipmentRelationships
> = {
  type: 'shipments',

  attributes: [
    'number',
    'status',
    'currency_code',
    'cost_amount_cents',
    'cost_amount_float',
    'formatted_cost_amount',
    'skus_count',
    '_on_hold',
    '_picking',
    '_packing',
    '_ready_to_ship',
    '_ship',
    '_get_rates',
    'selected_rate_id',
    'rates',
    '_purchase',
    'purchase_error_code',
    'purchase_error_message',
    'get_rates_started_at',
    'get_rates_completed_at',
    'purchase_started_at',
    'purchase_completed_at',
    'purchase_failed_at',
  ],

  relationships: {
    order: 'orders',
    shipping_category: 'shipping_categories',
    stock_location: 'stock_locations',
    origin_address: 'addresses',
    shipping_address: 'addresses',
    shipping_method: 'shipping_methods',
    delivery_lead_time: 'delivery_lead_times',
    shipment_line_items: 'line_items',
    stock_transfers: 'stock_transfers',
    available_shipping_methods: 'shipping_methods',
    carrier_accounts: 'carrier_accounts',
    parcels: 'parcels',
    attachments: 'attachments',
  },
}

export const Shipments: Resource<
  ShipmentAttributes,
  ShipmentRelationships,
  ShipmentInstance
> = createResource<ShipmentAttributes, ShipmentRelationships>(ShipmentsConfig)
