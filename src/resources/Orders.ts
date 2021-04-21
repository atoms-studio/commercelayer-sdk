import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'
import { AddressInstance } from './Addresses'
import { AttachmentInstance } from './Attachments'
import { CustomerInstance } from './Customers'
import { LineItemInstance } from './LineItems'
import { MarketInstance } from './Markets'
import { PaymentMethodInstance } from './PaymentMethods'
import { ShipmentInstance } from './Shipments'

export interface OrderAttributes {
  number: number
  status: string
  payment_status: string
  fulfillment_status: string
  guest: boolean
  editable: boolean
  placeable: boolean
  customer_email: string
  customer_password: string
  language_code: string
  currency_code: string
  tax_included: boolean
  tax_rate: number
  freight_taxable: boolean
  requires_billing_info: boolean
  country_code: string
  shipping_country_code_lock: string
  coupon_code: string
  gift_card_code: string
  gift_card_or_coupon_code: string
  subtotal_amount_cents: number
  subtotal_amount_float: number
  formatted_subtotal_amount: string
  shipping_amount_cents: number
  shipping_amount_float: number
  formatted_shipping_amount: string
  payment_method_amount_cents: number
  payment_method_amount_float: number
  formatted_payment_method_amount: string
  discount_amount_cents: number
  discount_amount_float: number
  formatted_discount_amount: string
  adjustment_amount_cents: number
  adjustment_amount_float: number
  formatted_adjustment_amount: string
  gift_card_amount_cents: number
  gift_card_amount_float: number
  formatted_gift_card_amount: string
  total_tax_amount_cents: number
  total_tax_amount_float: number
  formatted_total_tax_amount: string
  subtotal_tax_amount_cents: number
  subtotal_tax_amount_float: number
  formatted_subtotal_tax_amount: string
  shipping_tax_amount_cents: number
  shipping_tax_amount_float: number
  formatted_shipping_tax_amount: string
  payment_method_tax_amount_cents: number
  payment_method_tax_amount_float: number
  formatted_payment_method_tax_amount: string
  adjustment_tax_amount_cents: number
  adjustment_tax_amount_float: number
  formatted_adjustment_tax_amount: string
  total_amount_cents: number
  total_amount_float: number
  formatted_total_amount: string
  total_taxable_amount_cents: number
  total_taxable_amount_float: number
  formatted_total_taxable_amount: string
  subtotal_taxable_amount_cents: number
  subtotal_taxable_amount_float: number
  formatted_subtotal_taxable_amount: string
  shipping_taxable_amount_cents: number
  shipping_taxable_amount_float: number
  formatted_shipping_taxable_amount: string
  payment_method_taxable_amount_cents: number
  payment_method_taxable_amount_float: number
  formatted_payment_method_taxable_amount: string
  adjustment_taxable_amount_cents: number
  adjustment_taxable_amount_float: number
  formatted_adjustment_taxable_amount: string
  total_amount_with_taxes_cents: number
  total_amount_with_taxes_float: number
  formatted_total_amount_with_taxes: string
  fees_amount_cents: number
  fees_amount_float: number
  formatted_fees_amount: string
  duty_amount_cents: number
  duty_amount_float: number
  formatted_duty_amount: string
  skus_count: number
  line_item_options_count: number
  shipments_count: number
  payment_source_details: any // TODO: improve this type
  token: string
  cart_url: string
  return_url: string
  terms_url: string
  privacy_url: string
  checkout_url: string
  _archive: boolean
  _unarchive: boolean
  _place: boolean
  _cancel: boolean
  _approve: boolean
  _approve_and_capture: boolean
  _authorize: boolean
  _authorization_amount_cents: number
  _capture: boolean
  _refund: boolean
  _update_taxes: boolean
  _billing_address_clone_id: string
  _shipping_address_clone_id: string
  _customer_payment_source_id: string
  _shipping_address_same_as_billing: boolean
  _billing_address_same_as_shipping: boolean
  _save_payment_source_to_customer_wallet: boolean
  _save_shipping_address_to_customer_address_book: boolean
  _save_billing_address_to_customer_address_book: boolean
  _refresh: boolean
  placed_at: string
  approved_at: string
  cancelled_at: string
  payment_updated_at: string
  fulfillment_updated_at: string
  archived_at: string
  expires_at: string
}

export interface OrderRelationships {
  market: MarketInstance
  customer: CustomerInstance
  shipping_address: AddressInstance
  billing_address: AddressInstance
  available_payment_methods: PaymentMethodInstance[]
  available_customer_payment_sources: any[] // TODO: improve this type
  payment_method: PaymentMethodInstance
  payment_source: any // TODO: improve this type
  line_items: LineItemInstance[]
  shipments: ShipmentInstance[]
  transactions: any[] // TODO: improve this type
  authorizations: any[] // TODO: improve this type
  captures: any[] // TODO: improve this type
  voids: any[] // TODO: improve this type
  refunds: any[] // TODO: improve this type
  attachments: AttachmentInstance[]
}

export type OrderInstance = ConcreteResourceInstance<
  OrderAttributes,
  OrderRelationships
>

export const OrdersConfig: ResourceConfig<
  OrderAttributes,
  OrderRelationships
> = {
  type: 'orders',

  attributes: [
    'number',
    'status',
    'payment_status',
    'fulfillment_status',
    'guest',
    'editable',
    'placeable',
    'customer_email',
    'customer_password',
    'language_code',
    'currency_code',
    'tax_included',
    'tax_rate',
    'freight_taxable',
    'requires_billing_info',
    'country_code',
    'shipping_country_code_lock',
    'coupon_code',
    'gift_card_code',
    'gift_card_or_coupon_code',
    'subtotal_amount_cents',
    'subtotal_amount_float',
    'formatted_subtotal_amount',
    'shipping_amount_cents',
    'shipping_amount_float',
    'formatted_shipping_amount',
    'payment_method_amount_cents',
    'payment_method_amount_float',
    'formatted_payment_method_amount',
    'discount_amount_cents',
    'discount_amount_float',
    'formatted_discount_amount',
    'adjustment_amount_cents',
    'adjustment_amount_float',
    'formatted_adjustment_amount',
    'gift_card_amount_cents',
    'gift_card_amount_float',
    'formatted_gift_card_amount',
    'total_tax_amount_cents',
    'total_tax_amount_float',
    'formatted_total_tax_amount',
    'subtotal_tax_amount_cents',
    'subtotal_tax_amount_float',
    'formatted_subtotal_tax_amount',
    'shipping_tax_amount_cents',
    'shipping_tax_amount_float',
    'formatted_shipping_tax_amount',
    'payment_method_tax_amount_cents',
    'payment_method_tax_amount_float',
    'formatted_payment_method_tax_amount',
    'adjustment_tax_amount_cents',
    'adjustment_tax_amount_float',
    'formatted_adjustment_tax_amount',
    'total_amount_cents',
    'total_amount_float',
    'formatted_total_amount',
    'total_taxable_amount_cents',
    'total_taxable_amount_float',
    'formatted_total_taxable_amount',
    'subtotal_taxable_amount_cents',
    'subtotal_taxable_amount_float',
    'formatted_subtotal_taxable_amount',
    'shipping_taxable_amount_cents',
    'shipping_taxable_amount_float',
    'formatted_shipping_taxable_amount',
    'payment_method_taxable_amount_cents',
    'payment_method_taxable_amount_float',
    'formatted_payment_method_taxable_amount',
    'adjustment_taxable_amount_cents',
    'adjustment_taxable_amount_float',
    'formatted_adjustment_taxable_amount',
    'total_amount_with_taxes_cents',
    'total_amount_with_taxes_float',
    'formatted_total_amount_with_taxes',
    'fees_amount_cents',
    'fees_amount_float',
    'formatted_fees_amount',
    'duty_amount_cents',
    'duty_amount_float',
    'formatted_duty_amount',
    'skus_count',
    'line_item_options_count',
    'shipments_count',
    'payment_source_details',
    'token',
    'cart_url',
    'return_url',
    'terms_url',
    'privacy_url',
    'checkout_url',
    '_archive',
    '_unarchive',
    '_place',
    '_cancel',
    '_approve',
    '_approve_and_capture',
    '_authorize',
    '_authorization_amount_cents',
    '_capture',
    '_refund',
    '_update_taxes',
    '_billing_address_clone_id',
    '_shipping_address_clone_id',
    '_customer_payment_source_id',
    '_shipping_address_same_as_billing',
    '_billing_address_same_as_shipping',
    '_save_payment_source_to_customer_wallet',
    '_save_shipping_address_to_customer_address_book',
    '_save_billing_address_to_customer_address_book',
    '_refresh',
    'placed_at',
    'approved_at',
    'cancelled_at',
    'payment_updated_at',
    'fulfillment_updated_at',
    'archived_at',
    'expires_at',
  ],

  relationships: {
    market: 'markets',
    customer: 'customers',
    shipping_address: 'addresses',
    billing_address: 'addresses',
    available_payment_methods: 'payment_methods',
    available_customer_payment_sources: 'customer_payment_sources',
    payment_method: 'payment_methods',
    payment_source: 'payment_sources', // TODO: this is a polymorphic relation
    line_items: 'line_items',
    shipments: 'shipments',
    transactions: 'transactions',
    authorizations: 'authorizations',
    captures: 'captures',
    voids: 'voids',
    refunds: 'refunds',
    attachments: 'attachments',
  },
}

export const Orders: Resource<
  OrderAttributes,
  OrderRelationships,
  OrderInstance
> = createResource<OrderAttributes, OrderRelationships>(OrdersConfig)
