import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { MarketInstance } from './Markets'
import { OrderInstance } from './Orders'
import { OrderCopyInstance } from './OrderCopies'

export interface OrderSubscriptionAttributes {
  number: string
  status: string
  frequency: string
  activate_by_source_order: boolean
  customer_email: string
  starts_at: string
  expires_at: string
  next_run_at: string
  occurrencies: number
  errors_count: number
  succeeded_on_last_run: boolean
  options: any // TODO: improve this type
  _activate: boolean
  _deactivate: boolean
  _cancel: boolean
}

export interface OrderSubscriptionRelationships {
  market: MarketInstance
  source_order: OrderInstance
  order_copies: OrderCopyInstance[]
  orders: OrderInstance[]
}

export type OrderSubscriptionInstance = ConcreteResourceInstance<
  OrderSubscriptionAttributes,
  OrderSubscriptionRelationships
>

export const OrderSubscriptionsConfig: ResourceConfig<
  OrderSubscriptionAttributes,
  OrderSubscriptionRelationships
> = {
  type: 'order_subscriptions',

  attributes: [
    'number',
    'status',
    'frequency',
    'activate_by_source_order',
    'customer_email',
    'starts_at',
    'expires_at',
    'next_run_at',
    'occurrencies',
    'errors_count',
    'succeeded_on_last_run',
    'options',
    '_activate',
    '_deactivate',
    '_cancel',
  ],

  relationships: {
    market: 'markets',
    source_order: 'orders',
    order_copies: 'order_copies',
    orders: 'orders',
  },
}

export const OrderSubscriptions: Resource<
  OrderSubscriptionAttributes,
  OrderSubscriptionRelationships,
  OrderSubscriptionInstance
> = createResource<OrderSubscriptionAttributes, OrderSubscriptionRelationships>(
  OrderSubscriptionsConfig,
)
