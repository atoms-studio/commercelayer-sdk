import {
  ResourceConfig,
  createResource,
  ConcreteResourceInstance,
  Resource,
} from '../resource'
import { ShippingCategoryInstance } from './ShippingCategories'

export interface InventoryDeliveryLeadTimesShippingMethod {
  name: string
  reference: string
  price_amount_cents: number
  free_over_amount_cents: number
  formatted_price_amount: string
  formatted_free_over_amount: string
}

export interface InventoryDeliveryLeadTimes {
  shipping_method: InventoryDeliveryLeadTimesShippingMethod
  min: { hours: number; days: number }
  max: { hours: number; days: number }
}

export interface InventoryLevel {
  quantity: number
  delivery_lead_times: InventoryDeliveryLeadTimes[]
}

export interface Inventory {
  available: boolean
  quantity: number
  levels: InventoryLevel[]
}

export interface SkuAttributes {
  code: string
  name: string
  description: string
  image_url: string
  pieces_per_pack: number
  weight: number
  unit_of_weight: 'gr' | 'oz'
  hs_tariff_number: string
  inventory: Inventory
}

export interface SkuRelationships {
  shipping_category?: ShippingCategoryInstance
  prices?: any[]
  stock_items?: any[]
  delivery_lead_times?: any[]
  sku_options?: any[]
  attachments?: any[]
}

export type SkuInstance = ConcreteResourceInstance<
  SkuAttributes,
  SkuRelationships
>

export const SkusConfig: ResourceConfig<SkuAttributes, SkuRelationships> = {
  type: 'skus',

  attributes: [
    'code',
    'name',
    'description',
    'image_url',
    'pieces_per_pack',
    'weight',
    'unit_of_weight',
    'hs_tariff_number',
    'inventory',
  ],

  relationships: {
    shipping_category: 'shipping_categories',
    prices: 'prices',
    stock_items: 'stock_items',
    delivery_lead_times: 'delivery_lead_times',
    sku_options: 'sku_options',
    attachments: 'attachments',
  },
}

export const Skus: Resource<
  SkuAttributes,
  SkuRelationships,
  SkuInstance
> = createResource<SkuAttributes, SkuRelationships>(SkusConfig)
