import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { OrderInstance } from './Orders'

export interface RefundAttributes {
  number: string
  currency_code: string
  amount_cents: number
  amount_float: number
  formatted_amount: string
  succeeded: boolean
  message: string
  error_code: string
  error_detail: string
  token: string
  gateway_transaction_id: string
}

export interface RefundRelationships {
  order: OrderInstance
  reference_capture: any // TODO: improve this type
}

export type RefundInstance = ConcreteResourceInstance<
  RefundAttributes,
  RefundRelationships
>

export const RefundsConfig: ResourceConfig<
  RefundAttributes,
  RefundRelationships
> = {
  type: 'refunds',

  attributes: [
    'number',
    'currency_code',
    'amount_cents',
    'amount_float',
    'formatted_amount',
    'succeeded',
    'message',
    'error_code',
    'error_detail',
    'token',
    'gateway_transaction_id',
  ],

  relationships: {
    order: 'orders', // TODO: check relationship type
    reference_capture: 'reference_captures', // TODO: check relationship type
  },
}

export const Refunds: Resource<
  RefundAttributes,
  RefundRelationships,
  RefundInstance
> = createResource<RefundAttributes, RefundRelationships>(RefundsConfig)
