import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { AttachmentInstance } from './Attachments'
import { PriceListInstance } from './PriceLists'
import { SkuInstance } from './Skus'

export interface PriceAttributes {
  currency_code: string
  sku_code: string
  amount_cents: number
  amount_float: number
  formatted_amount: string
  compare_at_amount_cents: number
  compare_at_amount_float: number
  formatted_compare_at_amount: string
}

export interface PriceRelationships {
  price_list: PriceListInstance
  sku: SkuInstance
  attachments: AttachmentInstance[]
}

export type PriceInstance = ConcreteResourceInstance<
  PriceAttributes,
  PriceRelationships
>

export const PricesConfig: ResourceConfig<
  PriceAttributes,
  PriceRelationships
> = {
  type: 'prices',

  attributes: [
    'currency_code',
    'sku_code',
    'amount_cents',
    'amount_float',
    'formatted_amount',
    'compare_at_amount_cents',
    'compare_at_amount_float',
    'formatted_compare_at_amount',
  ],

  relationships: {
    price_list: 'price_lists',
    sku: 'skus',
    attachments: 'attachments',
  },
}

export const Prices: Resource<
  PriceAttributes,
  PriceRelationships,
  PriceInstance
> = createResource<PriceAttributes, PriceRelationships>(PricesConfig)
