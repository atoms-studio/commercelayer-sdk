import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { PaymentMethodInstance } from './PaymentMethods'

export interface PaymentGatewayAttributes {
  name: string
}

export interface PaymentGatewayRelationships {
  payment_methods: PaymentMethodInstance[]
}

export type PaymentGatewayInstance = ConcreteResourceInstance<
  PaymentGatewayAttributes,
  PaymentGatewayRelationships
>

export const PaymentGatewaysConfig: ResourceConfig<
  PaymentGatewayAttributes,
  PaymentGatewayRelationships
> = {
  type: 'payment_gateways',

  attributes: ['name'],

  relationships: {
    payment_methods: 'payment_methods', // TODO: check relationship type
  },
}

export const PaymentGateways: Resource<
  PaymentGatewayAttributes,
  PaymentGatewayRelationships,
  PaymentGatewayInstance
> = createResource<PaymentGatewayAttributes, PaymentGatewayRelationships>(
  PaymentGatewaysConfig,
)
