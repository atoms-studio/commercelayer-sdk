import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { AttachmentInstance } from './Attachments'
import { OrderInstance } from './Orders'
import { ReturnInstance } from './Returns'

export interface CustomerAttributes {
  email: string
  password: string
  status: string
  has_password: boolean
}

export interface CustomerRelationships {
  customer_group: any // TODO: improve this type
  customer_addresses: any[] // TODO: improve this type
  customer_payment_sources: any[] // TODO: improve this type
  customer_subscriptions: any[] // TODO: improve this type
  orders: OrderInstance[]
  returns: ReturnInstance[]
  attachments: AttachmentInstance[]
}

export type CustomerInstance = ConcreteResourceInstance<
  CustomerAttributes,
  CustomerRelationships
>

export const CustomersConfig: ResourceConfig<
  CustomerAttributes,
  CustomerRelationships
> = {
  type: 'customers',

  attributes: ['email', 'password', 'status', 'has_password'],

  relationships: {
    customer_group: 'customer_groups',
    customer_addresses: 'customer_addresses',
    customer_payment_sources: 'customer_payment_sources',
    customer_subscriptions: 'customer_subscriptions',
    orders: 'orders',
    returns: 'returns',
    attachments: 'attachments',
  },
}

export const Customers: Resource<
  CustomerAttributes,
  CustomerRelationships,
  CustomerInstance
> = createResource<CustomerAttributes, CustomerRelationships>(CustomersConfig)
