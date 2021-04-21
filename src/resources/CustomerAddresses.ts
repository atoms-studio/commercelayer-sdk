import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { AddressInstance } from './Addresses'
import { CustomerInstance } from './Customers'

export interface CustomerAddressAttributes {
  name: string
}

export interface CustomerAddressRelationships {
  customer: CustomerInstance
  address: AddressInstance
}

export type CustomerAddressInstance = ConcreteResourceInstance<
  CustomerAddressAttributes,
  CustomerAddressRelationships
>

export const CustomerAddressesConfig: ResourceConfig<
  CustomerAddressAttributes,
  CustomerAddressRelationships
> = {
  type: 'customer_addresses',

  attributes: ['name'],

  relationships: {
    customer: 'customers',
    address: 'addresses',
  },
}

export const CustomerAddresses: Resource<
  CustomerAddressAttributes,
  CustomerAddressRelationships,
  CustomerAddressInstance
> = createResource<CustomerAddressAttributes, CustomerAddressRelationships>(
  CustomerAddressesConfig,
)
