import { Deserializer, Serializer } from 'jsonapi-serializer'
import {
  ResourceConfig,
  AttributesPayload,
  RelationshipsPayload,
} from './resource'

const deserializer = new Deserializer({
  keyForAttribute: 'snake_case',
})

export const deserialize = async (data: Record<string, any>): Promise<any> => {
  const deserialized = await deserializer.deserialize(data)

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
): Promise<any> => {
  const serializer = new Serializer(config.type, {
    attributes: config.attributes as string[],
  })
  const serialized = serializer.serialize(attributes)

  // Manually add relationships to the serialized payload
  const relationshipKeys = Object.keys(relationships)
  if (relationshipKeys.length) {
    serialized.data.relationships = {}
    relationshipKeys.forEach((relationshipKey) => {
      const configRelationships: Record<string, any> = config.relationships
      if (configRelationships[relationshipKey]) {
        const relationshipValue = (relationships as any)[relationshipKey]

        serialized.data.relationships[relationshipKey] = {
          data: {
            type: configRelationships[relationshipKey],
            id:
              typeof relationshipValue === 'string'
                ? relationshipValue
                : relationshipValue.id,
          },
        }
      }
    })
  }

  return serialized
}
