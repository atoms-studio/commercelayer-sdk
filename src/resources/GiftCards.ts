import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { AttachmentInstance } from './Attachments'
import { MarketInstance } from './Markets'

interface GiftCardBalanceLog {
  date: string
  amount_cents: number
}

export interface GiftCardAttributes {
  status: string
  code: string
  currency_code: string
  initial_balance_cents: number
  initial_balance_float: number
  formatted_initial_balance: string
  balance_cents: number
  balance_float: number
  formatted_balance: string
  balance_max_cents: string
  balance_max_float: number
  formatted_balance_max: string
  balance_log: GiftCardBalanceLog[]
  single_use: boolean
  rechargeable: boolean
  image_url: string
  expires_at: string
  recipient_email: string
  _purchase: boolean
  _activate: boolean
  _deactivate: boolean
  _balance_change_cents: number
}

export interface GiftCardRelationships {
  market: MarketInstance
  gift_card_recipient: any // TODO: improve this type
  attachments: AttachmentInstance[]
}

export type GiftCardInstance = ConcreteResourceInstance<
  GiftCardAttributes,
  GiftCardRelationships
>

export const GiftCardsConfig: ResourceConfig<
  GiftCardAttributes,
  GiftCardRelationships
> = {
  type: 'gift_cards',

  attributes: [
    'status',
    'code',
    'currency_code',
    'initial_balance_cents',
    'initial_balance_float',
    'formatted_initial_balance',
    'balance_cents',
    'balance_float',
    'formatted_balance',
    'balance_max_cents',
    'balance_max_float',
    'formatted_balance_max',
    'balance_log',
    'single_use',
    'rechargeable',
    'image_url',
    'expires_at',
    'recipient_email',
    '_purchase',
    '_activate',
    '_deactivate',
    '_balance_change_cents',
  ],

  relationships: {
    market: 'markets',
    gift_card_recipient: 'gift_card_recipients',
    attachments: 'attachments',
  },
}

export const GiftCards: Resource<
  GiftCardAttributes,
  GiftCardRelationships,
  GiftCardInstance
> = createResource<GiftCardAttributes, GiftCardRelationships>(GiftCardsConfig)
