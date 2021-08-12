import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { CustomerInstance } from './Customers'

export interface CustomerPasswordResetAttributes {
  customer_email: string
  reset_password_token: string
  customer_password: string
  _reset_password_token: string
  reset_password_at: string
}

export interface CustomerPasswordResetRelationships {
  customer: CustomerInstance
}

export type CustomerPasswordResetInstance = ConcreteResourceInstance<
  CustomerPasswordResetAttributes,
  CustomerPasswordResetRelationships
>

export const CustomerPasswordResetsConfig: ResourceConfig<
  CustomerPasswordResetAttributes,
  CustomerPasswordResetRelationships
> = {
  type: 'customer_password_resets',

  attributes: [
    'customer_email',
    'reset_password_token',
    'customer_password',
    '_reset_password_token',
    'reset_password_at',
  ],

  relationships: {
    customer: 'customers',
  },
}

export const CustomerPasswordResets: Resource<
  CustomerPasswordResetAttributes,
  CustomerPasswordResetRelationships,
  CustomerPasswordResetInstance
> = createResource<
  CustomerPasswordResetAttributes,
  CustomerPasswordResetRelationships
>(CustomerPasswordResetsConfig)
