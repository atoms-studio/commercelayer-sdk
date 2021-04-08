import { white } from 'chalk'
import { existsSync, writeFileSync } from 'fs'
import pluralize from 'pluralize'
import { JSDOM } from 'jsdom'
import axios from 'axios'

const pluralCustomRules: Record<string, string> = {
  Skus: 'Sku',
}

const pluralExceptions = Object.keys(pluralCustomRules)

const printError = (message: string) => {
  console.log()
  console.error(white.bgRed.bold(' ERROR: ') + white.bgRed(message + ' '))
  console.log()
  process.exit(1)
}

const args = process.argv.slice(2)

if (!args.length) {
  printError('This command requires parameters')
}

const [resourceName] = args

if (!resourceName) {
  printError('Missing resource name')
}

if (
  resourceName.toString()[0].toLocaleLowerCase() === resourceName.toString()[0]
) {
  printError('Resource name must start with a capital letter')
}

if (
  !pluralExceptions.includes(resourceName) &&
  !pluralize.isPlural(resourceName)
) {
  printError('Resource name must be plural')
}

if (!/^[a-zA-Z]+$/.test(resourceName)) {
  printError('Resource name can only contain letters')
}

const path = `src/resources/${resourceName}.ts`

if (existsSync(path)) {
  printError(`Resource ${resourceName} already exists`)
}

const singular =
  pluralCustomRules[resourceName] || pluralize.singular(resourceName)

const normalizeType = (type: string) => {
  const [realType] = type.split(',')

  switch (realType) {
    case 'integer':
    case 'float':
      return 'number'
    case 'object':
      return 'any // TODO: improve this type'
    case 'array':
      return 'any[] // TODO: improve this type'
    case 'datetime':
      return 'string'
    default:
      return realType || 'any'
  }
}

const writeTemplate = (
  type: string,
  attributes: string[],
  relationships: string[],
  attributesInterface: Record<string, string>,
  relationshipsInterface: Record<string, string>,
) => {
  const attributesString = attributes
    .map((attribute) => "\n    '" + attribute + "',")
    .join('')
  const relationshipsString = relationships
    .map(
      (relationship) =>
        `\n    ${relationship}: '` +
        pluralize(relationship) +
        "', // TODO: check relationship type",
    )
    .join('')
  const attributesInterfaceString = Object.entries(attributesInterface)
    .map(([key, value]) => `\n  ${key}: ${value}`)
    .join('')
  const relationshipsInterfaceString = Object.entries(relationshipsInterface)
    .map(([key, value]) => `\n  ${key}: ${value}`)
    .join('')

  const template = `import {
  ResourceConfig,
  ConcreteResourceInstance,
  createResource,
  Resource,
} from '../resource'

export interface ${singular}Attributes {${attributesInterfaceString}
}

export interface ${singular}Relationships {${relationshipsInterfaceString}
}

export type ${singular}Instance = ConcreteResourceInstance<
  ${singular}Attributes,
  ${singular}Relationships
>

export const ${resourceName}Config: ResourceConfig<
  ${singular}Attributes,
  ${singular}Relationships
> = {
  type: '${type}',

  attributes: [${attributesString}
  ],

  relationships: {${relationshipsString}
  },
}

export const ${resourceName}: Resource<
  ${singular}Attributes,
  ${singular}Relationships,
  ${singular}Instance
> = createResource<${singular}Attributes, ${singular}Relationships>(${resourceName}Config)
`

  writeFileSync(path, template, 'UTF8')
}

const url = `https://docs.commercelayer.io/api/resources/${resourceName.toLowerCase()}`
console.log(white.bgCyan.bold(` Fetching ${url}`))

axios
  .get(url)
  .then(({ data }) => {
    const dom = new JSDOM(data)
    const table = dom.window.document.querySelector('table')
    if (!table) {
      printError(`Cannot find documentation for resource ${resourceName}`)
    }
    const trs = (table as HTMLTableElement).querySelectorAll('tr')
    if (!trs) {
      printError(`Cannot find documentation for resource ${resourceName}`)
    }

    const rows = Array.from(trs).slice(1)

    const blacklist = [
      'id',
      'reference',
      'reference_origin',
      'created_at',
      'updated_at',
      'metadata',
    ]
    let type = ''
    const attributes = []
    const relationships = []
    const attributesInterface: Record<string, any> = {}
    const relationshipsInterface: Record<string, any> = {}

    for (const row of rows) {
      const [fieldName, fieldType, fieldDescription] = Array.from(
        row.querySelectorAll('td'),
      )

      if (fieldName.textContent === 'type') {
        type = fieldDescription.textContent || ''
      } else if (fieldName.textContent?.startsWith('attributes.')) {
        const attribute = fieldName.textContent.replace('attributes.', '')
        if (!blacklist.includes(attribute)) {
          attributes.push(attribute)
          attributesInterface[attribute] = normalizeType(
            fieldType.textContent || '',
          )
        }
      } else if (fieldName.textContent?.startsWith('relationships.')) {
        const relationship = fieldName.textContent.replace('relationships.', '')
        relationships.push(relationship)
        relationshipsInterface[relationship] = normalizeType(
          fieldType.textContent || '',
        )
      }
    }

    writeTemplate(
      type,
      attributes,
      relationships,
      attributesInterface,
      relationshipsInterface,
    )
    console.log(white.bgGreen.bold(` SUCCESS: created resource ${path} `))
  })
  .catch((err) => {
    printError(err.message)
  })
