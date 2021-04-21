import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { AttachmentInstance } from './Attachments'
import { PriceInstance } from './Prices'

export interface PriceListAttributes {
  name: string
  currency_code: string
  tax_included: boolean
}

export interface PriceListRelationships {
  prices: PriceInstance[]
  attachments: AttachmentInstance[]
}

export type PriceListInstance = ConcreteResourceInstance<
  PriceListAttributes,
  PriceListRelationships
>

export const PriceListsConfig: ResourceConfig<
  PriceListAttributes,
  PriceListRelationships
> = {
  type: 'price_lists',

  attributes: ['name', 'currency_code', 'tax_included'],

  relationships: {
    prices: 'prices',
    attachments: 'attachments',
  },
}

export const PriceLists: Resource<
  PriceListAttributes,
  PriceListRelationships,
  PriceListInstance
> = createResource<PriceListAttributes, PriceListRelationships>(
  PriceListsConfig,
)
