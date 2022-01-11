import {
  ResourceConfig,
  createResource,
  ConcreteResourceInstance,
  Resource,
} from '../resource'
import { AttachmentInstance } from './Attachments'

export interface StockLocationAttributes {
  number: number
  name: string
  label_format: 'PDF' | 'ZPL' | 'EPL2' | 'PNG'
  suppress_etd: boolean
}

export interface StockLocationRelationships {
  inventory_stock_locations?: any[]
  inventory_return_locations?: any[]
  stock_items?: any[]
  stock_transfers?: any[]
  attachments?: AttachmentInstance[]
}

export type StockLocationInstance = ConcreteResourceInstance<
  StockLocationAttributes,
  StockLocationRelationships
>

export const StockLocationConfig: ResourceConfig<
  StockLocationAttributes,
  StockLocationRelationships
> = {
  type: 'stock_locations',

  attributes: ['number', 'name', 'label_format', 'suppress_etd'],

  relationships: {
    inventory_stock_locations: 'inventory_stock_locations',
    inventory_return_locations: 'inventory_return_locations',
    stock_items: 'stock_items',
    stock_transfers: 'stock_transfers',
    attachments: 'attachments',
  },
}

export const StockLocations: Resource<
  StockLocationAttributes,
  StockLocationRelationships,
  StockLocationInstance
> = createResource<StockLocationAttributes, StockLocationRelationships>(
  StockLocationConfig,
)
