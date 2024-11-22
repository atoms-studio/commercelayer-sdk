import {
  ResourceConfig,
  createResource,
  ConcreteResourceInstance,
  Resource,
} from '../resource'
import { AttachmentInstance } from './Attachments'
import { SkuInstance } from './Skus'
import { BundleInstance } from './Bundles'
import { SkuListItemInstance } from './SkuListItems'

export interface SkuListAttributes {
  name: string
  slug: string
  description: string
  image_url: string
  manual: boolean
  sku_code_regex: string
  created_at: string
  updated_at: number
  reference: string
  reference_origin: string
}

export interface SkuListRelationships {
  skus: SkuInstance[]
  sku_list_items: SkuListItemInstance[]
  bundles: BundleInstance
  attachments: AttachmentInstance[]
}

export type SkuListInstance = ConcreteResourceInstance<
  SkuListAttributes,
  SkuListRelationships
>

export const SkuListsConfig: ResourceConfig<
  SkuListAttributes,
  SkuListRelationships
> = {
  type: 'sku_lists',

  attributes: [
    'name',
    'slug',
    'description',
    'image_url',
    'manual',
    'sku_code_regex',
    'created_at',
    'updated_at',
    'reference',
    'reference_origin',
  ],

  relationships: {
    skus: 'shipping_categories',
    sku_list_items: 'prices',
    bundles: 'stock_items',
    attachments: 'attachments',
  },
}

export const SkuLists: Resource<
  SkuListAttributes,
  SkuListRelationships,
  SkuListInstance
> = createResource<SkuListAttributes, SkuListRelationships>(SkuListsConfig)
