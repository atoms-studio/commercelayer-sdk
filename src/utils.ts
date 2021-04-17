// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const isObject = (value: any): boolean => {
  return value.toString() === '[object Object]'
}

export const getType = (variable: unknown): string => {
  if (variable === null) {
    return 'null'
  }

  if (Array.isArray(variable)) {
    return 'array'
  }

  return typeof variable
}
