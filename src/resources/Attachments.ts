import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'

export interface AttachmentAttributes {
  name: string
  description: string
  url: string
}

export interface AttachmentRelationships {
  attachable: any // TODO: improve this type
}

export type AttachmentInstance = ConcreteResourceInstance<
  AttachmentAttributes,
  AttachmentRelationships
>

export const AttachmentsConfig: ResourceConfig<
  AttachmentAttributes,
  AttachmentRelationships
> = {
  type: 'attachments',

  attributes: ['name', 'description', 'url'],

  relationships: {
    attachable: {
      polymorphic: true,
    },
  },
}

export const Attachments: Resource<
  AttachmentAttributes,
  AttachmentRelationships,
  AttachmentInstance
> = createResource<AttachmentAttributes, AttachmentRelationships>(
  AttachmentsConfig,
)
