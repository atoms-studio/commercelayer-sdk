import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
} from '../createResource'
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

  relationships: ['skus', 'attachments'],
}

export const ShippingCategories = createResource<
  ShippingCategoryAttributes,
  ShippingCategoryRelationships
>(ShippingCategoriesConfig)
