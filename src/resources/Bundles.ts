import {
  ResourceConfig,
  createResource,
  ConcreteResourceInstance,
  Resource,
} from '../resource'
import { AttachmentInstance } from './Attachments'
import { MarketInstance } from './Markets'
import { SkuListInstance } from './SkuLists'
import { SkuInstance } from './Skus'

export interface BundleAttributes {
  code: string
  name: string
  currency_code: string
  description: string
  image_url: string
  do_not_ship: boolean
  do_not_track: boolean
  price_amount_cents: number
  price_amount_float: number
  formatted_price_amount: string
  compare_at_amount_cents: number
  compare_at_amount_float: number
  formatted_compare_at_amount: string
  _compute_price_amount: boolean
  _compute_compare_at_amount: boolean
  skus_count: number
  created_at: number
  updated_at: number
  reference: string
  reference_origin: string
}

export interface BundleRelationships {
  market: MarketInstance
  sku_list: SkuListInstance
  skus: SkuInstance[]
  attachments: AttachmentInstance[]
}

export type BundleInstance = ConcreteResourceInstance<
  BundleAttributes,
  BundleRelationships
>

export const BundlesConfig: ResourceConfig<
  BundleAttributes,
  BundleRelationships
> = {
  type: 'bundles',

  attributes: [
    'code',
    'name',
    'currency_code',
    'description',
    'image_url',
    'do_not_ship',
    'do_not_track',
    'price_amount_cents',
    'price_amount_float',
    'formatted_price_amount',
    'compare_at_amount_cents',
    'compare_at_amount_float',
    'formatted_compare_at_amount',
    '_compute_price_amount',
    '_compute_compare_at_amount',
    'skus_count',
    'created_at',
    'updated_at',
    'reference',
    'reference_origin',
  ],

  relationships: {
    market: 'shipping_categories',
    sku_list: 'prices',
    skus: 'stock_items',
    attachments: 'attachments',
  },
}

export const Bundles: Resource<
  BundleAttributes,
  BundleRelationships,
  BundleInstance
> = createResource<BundleAttributes, BundleRelationships>(BundlesConfig)
