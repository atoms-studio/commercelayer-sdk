import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { CustomerInstance } from './Customers'
import { AttachmentInstance } from './Attachments'
import { MarketInstance } from './Markets'

export interface CustomerGroupAttributes {
  name: string
}

export interface CustomerGroupRelationships {
  customers: CustomerInstance[]
  attachments: AttachmentInstance[]
  markets: MarketInstance[]
}

export type CustomerGroupInstance = ConcreteResourceInstance<
  CustomerGroupAttributes,
  CustomerGroupRelationships
>

export const CustomerGroupsConfig: ResourceConfig<
  CustomerGroupAttributes,
  CustomerGroupRelationships
> = {
  type: 'customer_groups',

  attributes: ['name'],

  relationships: {
    customers: 'customers',
    markets: 'markets',
    attachments: 'attachments',
  },
}

export const CustomerGroups: Resource<
  CustomerGroupAttributes,
  CustomerGroupRelationships,
  CustomerGroupInstance
> = createResource<CustomerGroupAttributes, CustomerGroupRelationships>(
  CustomerGroupsConfig,
)
