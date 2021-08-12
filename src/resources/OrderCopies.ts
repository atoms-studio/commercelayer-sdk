import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { OrderInstance } from './Orders'
import { OrderSubscriptionInstance } from './OrderSubscriptions'

export interface OrderCopyAttributes {
  status: string
  started_at: string
  completed_at: string
  failed_at: string
  place_target_order: boolean
  cancel_source_order: boolean
  errors_log: any[] // TODO: improve this type
  errors_count: number
}

export interface OrderCopyRelationships {
  source_order: OrderInstance
  target_order: OrderInstance
  order_subscription: OrderSubscriptionInstance
}

export type OrderCopyInstance = ConcreteResourceInstance<
  OrderCopyAttributes,
  OrderCopyRelationships
>

export const OrderCopiesConfig: ResourceConfig<
  OrderCopyAttributes,
  OrderCopyRelationships
> = {
  type: 'order_copies',

  attributes: [
    'status',
    'started_at',
    'completed_at',
    'failed_at',
    'place_target_order',
    'cancel_source_order',
    'errors_log',
    'errors_count',
  ],

  relationships: {
    source_order: 'orders',
    target_order: 'orders',
    order_subscription: 'order_subscriptions',
  },
}

export const OrderCopies: Resource<
  OrderCopyAttributes,
  OrderCopyRelationships,
  OrderCopyInstance
> = createResource<OrderCopyAttributes, OrderCopyRelationships>(
  OrderCopiesConfig,
)
