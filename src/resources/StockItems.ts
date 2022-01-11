import {
  ResourceConfig,
  createResource,
  ConcreteResourceInstance,
  Resource,
} from '../resource'
import { StockLocationInstance } from './StockLocations'
import { SkuInstance } from './Skus'
import { AttachmentInstance } from './Attachments'

export interface StockItemAttributes {
  sku_code: string
  quantity: number
}

export interface StockItemRelationships {
  stock_location?: StockLocationInstance
  sku?: SkuInstance
  attachments?: AttachmentInstance[]
}

export type StockItemInstance = ConcreteResourceInstance<
  StockItemAttributes,
  StockItemRelationships
>

export const StockItemConfig: ResourceConfig<
  StockItemAttributes,
  StockItemRelationships
> = {
  type: 'stock_locations',

  attributes: ['sku_code', 'quantity'],

  relationships: {
    stock_location: 'stock_locations',
    sku: 'skus',
    attachments: 'attachments',
  },
}

export const StockItems: Resource<
  StockItemAttributes,
  StockItemRelationships,
  StockItemInstance
> = createResource<StockItemAttributes, StockItemRelationships>(StockItemConfig)
