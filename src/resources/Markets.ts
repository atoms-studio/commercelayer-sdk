import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { AttachmentInstance } from './Attachments'
import { PriceListInstance } from './PriceLists'

export interface MarketAttributes {
  number: number
  name: string
  facebook_pixel_id: string
  checkout_url: string
  external_prices_url: string
  private: boolean
}

export interface MarketRelationships {
  merchant: any // TODO: improve this type
  price_list: PriceListInstance // TODO: improve this type
  inventory_model: any // TODO: improve this type
  customer_group: any // TODO: improve this type
  attachments: AttachmentInstance[]
}

export type MarketInstance = ConcreteResourceInstance<
  MarketAttributes,
  MarketRelationships
>

export const MarketsConfig: ResourceConfig<
  MarketAttributes,
  MarketRelationships
> = {
  type: 'markets',

  attributes: [
    'number',
    'name',
    'facebook_pixel_id',
    'checkout_url',
    'external_prices_url',
    'private',
  ],

  relationships: {
    merchant: 'merchants',
    price_list: 'price_lists',
    inventory_model: 'inventory_models',
    customer_group: 'customer_groups',
    attachments: 'attachments',
  },
}

export const Markets: Resource<
  MarketAttributes,
  MarketRelationships,
  MarketInstance
> = createResource<MarketAttributes, MarketRelationships>(MarketsConfig)
