import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
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
  price_list: any // TODO: improve this type
  sku: SkuInstance
  attachments: any[] // TODO: improve this type
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
    price_list: 'price_lists', // TODO: check relationship type
    sku: 'skus', // TODO: check relationship type
    attachments: 'attachments', // TODO: check relationship type
  },
}

export const Prices: Resource<
  PriceAttributes,
  PriceRelationships,
  PriceInstance
> = createResource<PriceAttributes, PriceRelationships>(PricesConfig)
