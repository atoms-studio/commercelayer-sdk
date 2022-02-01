import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { CustomerInstance } from './Customers'

export interface CustomerPaymentSourceAttributes {
  name: string
  customer_token: string
  payment_source_token: string
}

export interface CustomerPaymentSourceRelationships {
  customer: CustomerInstance
  payment_source: any // TODO: improve this type
}

export type CustomerPaymentSourceInstance = ConcreteResourceInstance<
  CustomerPaymentSourceAttributes,
  CustomerPaymentSourceRelationships
>

export const CustomerPaymentSourcesConfig: ResourceConfig<
  CustomerPaymentSourceAttributes,
  CustomerPaymentSourceRelationships
> = {
  type: 'customer_payment_sources',

  attributes: ['name', 'customer_token', 'payment_source_token'],

  relationships: {
    customer: 'customers',
    payment_source: {
      polymorphic: true,
    },
  },
}

export const CustomerPaymentSources: Resource<
  CustomerPaymentSourceAttributes,
  CustomerPaymentSourceRelationships,
  CustomerPaymentSourceInstance
> = createResource<
  CustomerPaymentSourceAttributes,
  CustomerPaymentSourceRelationships
>(CustomerPaymentSourcesConfig)
