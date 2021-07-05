import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { OrderInstance } from './Orders'
import { PaymentGatewayInstance } from './PaymentGateways'

export interface StripePaymentAttributes {
  client_secret: string
  publishable_key: string
  options: any // TODO: improve this type
  payment_method: any // TODO: improve this type
}

export interface StripePaymentRelationships {
  order: OrderInstance
  payment_gateway: PaymentGatewayInstance
}

export type StripePaymentInstance = ConcreteResourceInstance<
  StripePaymentAttributes,
  StripePaymentRelationships
>

export const StripePaymentsConfig: ResourceConfig<
  StripePaymentAttributes,
  StripePaymentRelationships
> = {
  type: 'stripe_payments',

  attributes: ['client_secret', 'publishable_key', 'options', 'payment_method'],

  relationships: {
    order: 'orders',
    payment_gateway: 'payment_gateways',
  },
}

export const StripePayments: Resource<
  StripePaymentAttributes,
  StripePaymentRelationships,
  StripePaymentInstance
> = createResource<StripePaymentAttributes, StripePaymentRelationships>(
  StripePaymentsConfig,
)
