import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { AttachmentInstance } from './Attachments'
import { DeliveryLeadTimeInstance } from './DeliveryLeadTimes'
import { MarketInstance } from './Markets'
import { ShippingCategoryInstance } from './ShippingCategories'

export interface ShippingMethodAttributes {
  name: string
  disabled_at: string
  currency_code: string
  price_amount_cents: number
  price_amount_float: number
  formatted_price_amount: string
  free_over_amount_cents: number
  free_over_amount_float: number
  formatted_free_over_amount: string
  price_amount_for_shipment_cents: number
  price_amount_for_shipment_float: number
  formatted_price_amount_for_shipment: string
}

export interface ShippingMethodRelationships {
  market: MarketInstance
  shipping_zone: any // TODO: improve this type
  shipping_category: ShippingCategoryInstance
  delivery_lead_time_for_shipment: DeliveryLeadTimeInstance
  attachments: AttachmentInstance[]
}

export type ShippingMethodInstance = ConcreteResourceInstance<
  ShippingMethodAttributes,
  ShippingMethodRelationships
>

export const ShippingMethodsConfig: ResourceConfig<
  ShippingMethodAttributes,
  ShippingMethodRelationships
> = {
  type: 'shipping_methods',

  attributes: [
    'name',
    'disabled_at',
    'currency_code',
    'price_amount_cents',
    'price_amount_float',
    'formatted_price_amount',
    'free_over_amount_cents',
    'free_over_amount_float',
    'formatted_free_over_amount',
    'price_amount_for_shipment_cents',
    'price_amount_for_shipment_float',
    'formatted_price_amount_for_shipment',
  ],

  relationships: {
    market: 'markets',
    shipping_zone: 'shipping_zones',
    shipping_category: 'shipping_categories',
    delivery_lead_time_for_shipment: 'delivery_lead_times',
    attachments: 'attachments',
  },
}

export const ShippingMethods: Resource<
  ShippingMethodAttributes,
  ShippingMethodRelationships,
  ShippingMethodInstance
> = createResource<ShippingMethodAttributes, ShippingMethodRelationships>(
  ShippingMethodsConfig,
)
