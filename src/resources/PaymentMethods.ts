import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { AttachmentInstance } from './Attachments'
import { MarketInstance } from './Markets'

export interface PaymentMethodAttributes {
  payment_source_type: string
  name: string
  disabled_at: string
  price_amount_cents: number
  price_amount_float: number
  formatted_price_amount: string
}

export interface PaymentMethodRelationships {
  market: MarketInstance
  payment_gateway: any // TODO: improve this type
  attachments: AttachmentInstance[]
}

export type PaymentMethodInstance = ConcreteResourceInstance<
  PaymentMethodAttributes,
  PaymentMethodRelationships
>

export const PaymentMethodsConfig: ResourceConfig<
  PaymentMethodAttributes,
  PaymentMethodRelationships
> = {
  type: 'payment_methods',

  attributes: [
    'payment_source_type',
    'name',
    'disabled_at',
    'price_amount_cents',
    'price_amount_float',
    'formatted_price_amount',
  ],

  relationships: {
    market: 'markets',
    payment_gateway: 'payment_gateways',
    attachments: 'attachments',
  },
}

export const PaymentMethods: Resource<
  PaymentMethodAttributes,
  PaymentMethodRelationships,
  PaymentMethodInstance
> = createResource<PaymentMethodAttributes, PaymentMethodRelationships>(
  PaymentMethodsConfig,
)
