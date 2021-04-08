import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { SkuInstance } from './Skus'

export interface ShippingCategoryAttributes {
  name: string
}

export interface ShippingCategoryRelationships {
  skus: SkuInstance[]
  attachments: string
}

export type ShippingCategoryInstance = ConcreteResourceInstance<
  ShippingCategoryAttributes,
  ShippingCategoryRelationships
>

export const ShippingCategoriesConfig: ResourceConfig<
  ShippingCategoryAttributes,
  ShippingCategoryRelationships
> = {
  type: 'skus',

  attributes: ['name'],

  relationships: {
    skus: 'skus',
    attachments: 'attachments',
  },
}

export const ShippingCategories: Resource<
  ShippingCategoryAttributes,
  ShippingCategoryRelationships,
  ShippingCategoryInstance
> = createResource<ShippingCategoryAttributes, ShippingCategoryRelationships>(
  ShippingCategoriesConfig,
)
