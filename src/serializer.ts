import { Deserializer, Serializer } from 'jsonapi-serializer'
import { commonPayloadAttributes } from './config'
import {
  ResourceConfig,
  AttributesPayload,
  RelationshipsPayload,
  PolymorphicRelationship,
} from './resource'
import { getType, isObject } from './utils'

const deserializer = new Deserializer({
  keyForAttribute: 'snake_case',
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deserialize = async (data: Record<string, any>): Promise<any> => {
  const deserialized = await deserializer.deserialize(data)

  if (data.data.type && !deserialized.type) {
    deserialized.type = data.data.type
  }

  if (Array.isArray(deserialized)) {
    return {
      items: deserialized,
      total: (data.meta || {}).record_count || 0,
      lastPage: (data.meta || {}).page_count || 1,
    }
  }

  return deserialized
}

export const serialize = async <T, U>(
  config: ResourceConfig<T, U>,
  attributes: AttributesPayload<T>,
  relationships: RelationshipsPayload<U>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  if (!attributes || !isObject(attributes)) {
    throw new Error(
      `Invalid resource attributes, expected object, received ${getType(
        attributes,
      )}`,
    )
  }

  if (!relationships || !isObject(relationships)) {
    throw new Error(
      `Invalid resource relationships, expected object, received ${getType(
        relationships,
      )}`,
    )
  }

  const serializer = new Serializer(config.type, {
    keyForAttribute: 'snake_case',
    attributes: (config.attributes as string[]).concat(commonPayloadAttributes),
  })
  const serialized = serializer.serialize(attributes)

  // Add empty attributes if the key is missing
  // This is needed if an empty set of attributes is passed
  if (!serialized.data.attributes) {
    serialized.data.attributes = {}
  }

  // Manually add relationships to the serialized payload.
  // Serializing relationships seems broken in jsonapi-serializer
  const relationshipKeys = Object.keys(relationships)
  if (relationshipKeys.length) {
    serialized.data.relationships = {}

    // https://docs.commercelayer.io/api/creating-resources
    // Loop through each relationship passed,
    // and create an object with the following structure:
    // {
    //    <relationship name>: {
    //       data: {
    //         type: <relationship type>,
    //         id: <id>
    //       }
    //    }
    // }
    //
    relationshipKeys.forEach((relationshipKey) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const configRelationships: Record<
        string,
        string | PolymorphicRelationship
      > = config.relationships

      const relationshipTypeConfig = configRelationships[relationshipKey]

      // Only add relationships supported by the config
      if (relationshipTypeConfig) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const relationshipValue = (relationships as any)[relationshipKey] || {
          id: null,
        }

        if (typeof relationshipValue !== 'string' && !relationshipValue.id) {
          console.warn(
            `Invalid relationship value for "${relationshipKey}" on resource "${config.type}"`,
          )
        }

        if (
          typeof relationshipTypeConfig === 'object' &&
          relationshipTypeConfig.polymorphic &&
          (typeof relationshipValue === 'string' || !relationshipValue.type)
        ) {
          throw new Error(
            `You must pass a type for relationship "${relationshipKey}" because it is polymorphic`,
          )
        }

        serialized.data.relationships[relationshipKey] = {
          data: {
            type: relationshipValue.type ?? relationshipTypeConfig,
            // Support passing a relationship as id or as a full object
            id:
              typeof relationshipValue === 'string'
                ? relationshipValue
                : relationshipValue.id || '',
          },
        }
      }
    })
  }

  return serialized
}
