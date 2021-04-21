import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'

export interface AddressAttributes {
  business: boolean
  first_name: string
  last_name: string
  company: string
  full_name: string
  line_1: string
  line_2: string
  city: string
  zip_code: string
  state_code: string
  country_code: string
  phone: string
  full_address: string
  name: string
  email: string
  notes: string
  lat: number
  lng: number
  is_localized: boolean
  is_geocoded: boolean
  provider_name: string
  map_url: string
  static_map_url: string
  billing_info: string
}

export interface AddressRelationships {
  geocoder: any // TODO: improve this type
}

export type AddressInstance = ConcreteResourceInstance<
  AddressAttributes,
  AddressRelationships
>

export const AddressesConfig: ResourceConfig<
  AddressAttributes,
  AddressRelationships
> = {
  type: 'addresses',

  attributes: [
    'business',
    'first_name',
    'last_name',
    'company',
    'full_name',
    'line_1',
    'line_2',
    'city',
    'zip_code',
    'state_code',
    'country_code',
    'phone',
    'full_address',
    'name',
    'email',
    'notes',
    'lat',
    'lng',
    'is_localized',
    'is_geocoded',
    'provider_name',
    'map_url',
    'static_map_url',
    'billing_info',
  ],

  relationships: {
    geocoder: 'geocoders', // TODO: it seems there is no "geocoders" type, maybe it's a documentation error
  },
}

export const Addresses: Resource<
  AddressAttributes,
  AddressRelationships,
  AddressInstance
> = createResource<AddressAttributes, AddressRelationships>(AddressesConfig)
