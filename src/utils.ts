export const isObject = (value: any) => {
  return value.toString() === '[object Object]'
}

export const getType = (variable: any): string => {
  if (variable === null) {
    return 'null'
  }

  if (Array.isArray(variable)) {
    return 'array'
  }

  return typeof variable
}
