import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { OrderInstance } from './Orders'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WireTransferAttributes {}

export interface WireTransferRelationships {
  order: OrderInstance
}

export type WireTransferInstance = ConcreteResourceInstance<
  WireTransferAttributes,
  WireTransferRelationships
>

export const WireTransfersConfig: ResourceConfig<
  WireTransferAttributes,
  WireTransferRelationships
> = {
  type: 'wire_transfers',

  attributes: [],

  relationships: {
    order: 'orders', // TODO: check relationship type
  },
}

export const WireTransfers: Resource<
  WireTransferAttributes,
  WireTransferRelationships,
  WireTransferInstance
> = createResource<WireTransferAttributes, WireTransferRelationships>(
  WireTransfersConfig,
)
