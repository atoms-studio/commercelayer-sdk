import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { AttachmentInstance } from './Attachments'
import { ShippingMethodInstance } from './ShippingMethods'
import { StockLocationInstance } from './StockLocations'

export interface DeliveryLeadTimeAttributes {
  min_hours: number
  max_hours: number
  min_days: number
  max_days: number
}

export interface DeliveryLeadTimeRelationships {
  stock_location: StockLocationInstance
  shipping_method: ShippingMethodInstance
  attachments: AttachmentInstance[]
}

export type DeliveryLeadTimeInstance = ConcreteResourceInstance<
  DeliveryLeadTimeAttributes,
  DeliveryLeadTimeRelationships
>

export const DeliveryLeadTimesConfig: ResourceConfig<
  DeliveryLeadTimeAttributes,
  DeliveryLeadTimeRelationships
> = {
  type: 'delivery_lead_times',

  attributes: ['min_hours', 'max_hours', 'min_days', 'max_days'],

  relationships: {
    stock_location: 'stock_locations',
    shipping_method: 'shipping_methods',
    attachments: 'attachments',
  },
}

export const DeliveryLeadTimes: Resource<
  DeliveryLeadTimeAttributes,
  DeliveryLeadTimeRelationships,
  DeliveryLeadTimeInstance
> = createResource<DeliveryLeadTimeAttributes, DeliveryLeadTimeRelationships>(
  DeliveryLeadTimesConfig,
)
