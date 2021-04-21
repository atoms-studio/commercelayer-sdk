import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'

export interface AdjustmentAttributes {
  name: string
  currency_code: string
  amount_cents: number
  amount_float: number
  formatted_amount: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AdjustmentRelationships {}

export type AdjustmentInstance = ConcreteResourceInstance<
  AdjustmentAttributes,
  AdjustmentRelationships
>

export const AdjustmentsConfig: ResourceConfig<
  AdjustmentAttributes,
  AdjustmentRelationships
> = {
  type: 'adjustments',

  attributes: [
    'name',
    'currency_code',
    'amount_cents',
    'amount_float',
    'formatted_amount',
  ],

  relationships: {},
}

export const Adjustments: Resource<
  AdjustmentAttributes,
  AdjustmentRelationships,
  AdjustmentInstance
> = createResource<AdjustmentAttributes, AdjustmentRelationships>(
  AdjustmentsConfig,
)
