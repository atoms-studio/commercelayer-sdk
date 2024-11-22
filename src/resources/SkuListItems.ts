import {
  ResourceConfig,
  createResource,
  ConcreteResourceInstance,
  Resource,
} from '../resource'

import { SkuInstance } from './Skus'
import { SkuListInstance } from './SkuLists'

export interface SkuListItemAttributes {
  position: number
  sku_code: string
  quantity: number
  created_at: string
  updated_at: string
  reference: string
  reference_origin: string
}

export interface SkuListItemRelationships {
  sku_list: SkuListInstance
  sku: SkuInstance
}

export type SkuListItemInstance = ConcreteResourceInstance<
  SkuListItemAttributes,
  SkuListItemRelationships
>

export const SkuListItemsConfig: ResourceConfig<
  SkuListItemAttributes,
  SkuListItemRelationships
> = {
  type: 'sku_lists',

  attributes: [
    'position',
    'sku_code',
    'quantity',
    'created_at',
    'updated_at',
    'reference',
    'reference_origin',
  ],

  relationships: {
    sku_list: 'sku_list',
    sku: 'sku',
  },
}

export const SkuListItems: Resource<
  SkuListItemAttributes,
  SkuListItemRelationships,
  SkuListItemInstance
> = createResource<SkuListItemAttributes, SkuListItemRelationships>(
  SkuListItemsConfig,
)
