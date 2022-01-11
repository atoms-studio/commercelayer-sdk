import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { AddressInstance } from './Addresses'
import { AttachmentInstance } from './Attachments'
import { CustomerInstance } from './Customers'
import { LineItemInstance } from './LineItems'
import { OrderInstance } from './Orders'
import { StockLocationInstance } from './StockLocations'

export interface ReturnAttributes {
  number: string
  status: string
  customer_email: string
  skus_count: number
  approved_at: string
  cancelled_at: string
  shipped_at: string
  rejected_at: string
  received_at: string
  archived_at: string
  _request: boolean
  _approve: boolean
  _cancel: boolean
  _ship: boolean
  _reject: boolean
  _receive: boolean
  _restock: boolean
  _archive: boolean
  _unarchive: boolean
}

export interface ReturnRelationships {
  order: OrderInstance
  customer: CustomerInstance
  stock_location: StockLocationInstance
  origin_address: AddressInstance
  destination_address: AddressInstance
  return_line_items: LineItemInstance[]
  attachments: AttachmentInstance[]
}

export type ReturnInstance = ConcreteResourceInstance<
  ReturnAttributes,
  ReturnRelationships
>

export const ReturnsConfig: ResourceConfig<
  ReturnAttributes,
  ReturnRelationships
> = {
  type: 'returns',

  attributes: [
    'number',
    'status',
    'customer_email',
    'skus_count',
    'approved_at',
    'cancelled_at',
    'shipped_at',
    'rejected_at',
    'received_at',
    'archived_at',
    '_request',
    '_approve',
    '_cancel',
    '_ship',
    '_reject',
    '_receive',
    '_restock',
    '_archive',
    '_unarchive',
  ],

  relationships: {
    order: 'orders',
    customer: 'customers',
    stock_location: 'stock_locations',
    origin_address: 'addresses',
    destination_address: 'addresses',
    return_line_items: 'line_items',
    attachments: 'attachments',
  },
}

export const Returns: Resource<
  ReturnAttributes,
  ReturnRelationships,
  ReturnInstance
> = createResource<ReturnAttributes, ReturnRelationships>(ReturnsConfig)
