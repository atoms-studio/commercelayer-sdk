import { handleApiErrors, ResourceError } from '../src/errors'

describe('errors', () => {
  describe('handleApiErrors', () => {
    it('returns a ResourceError if error has a response property', () => {
      const res = handleApiErrors({
        response: {},
      })

      expect(res).toBeInstanceOf(ResourceError)
    })

    it('throws the original error if it has no response property', () => {
      expect(() => handleApiErrors(new Error('test'))).toThrow('test')
    })
  })

  describe('ResourceError', () => {
    it('extends Error class', () => {
      const err = new ResourceError({} as any)
      expect(err).toBeInstanceOf(Error)
      expect(err.message).toBe('CommerceLayer API error')
    })

    it('creates an error with a request property', () => {
      let err = new ResourceError({} as any)
      expect(err.request).toBeUndefined()

      err = new ResourceError({ request: {} } as any)
      expect(err.request).toEqual({})
    })

    it('creates an error with a response property', () => {
      let err = new ResourceError({} as any)
      expect(err.response).toBeUndefined()

      err = new ResourceError({ response: {} } as any)
      expect(err.response).toEqual({})
    })

    it('creates an error with a config property', () => {
      let err = new ResourceError({} as any)
      expect(err.config).toBeUndefined()

      err = new ResourceError({ config: {} } as any)
      expect(err.config).toEqual({})
    })

    it('creates an error with a messages property', () => {
      let err = new ResourceError({} as any)
      expect(err.messages).toEqual([])

      err = new ResourceError({ response: {} } as any)
      expect(err.messages).toEqual([])

      err = new ResourceError({ response: { data: {} } } as any)
      expect(err.messages).toEqual([])

      err = new ResourceError({ response: { data: { errors: null } } } as any)
      expect(err.messages).toEqual([])

      err = new ResourceError({ response: { data: { errors: ['1'] } } } as any)
      expect(err.messages).toEqual(['1'])
    })

    it('creates an error with a firstMessage property', () => {
      let err = new ResourceError({} as any)
      expect(err.firstMessage).toBeUndefined()

      err = new ResourceError({ response: {} } as any)
      expect(err.firstMessage).toBeUndefined()

      err = new ResourceError({ response: { data: { errors: 'asd' } } } as any)
      expect(err.firstMessage).toBeUndefined()

      err = new ResourceError({ response: { data: { errors: [] } } } as any)
      expect(err.firstMessage).toBeUndefined()

      err = new ResourceError({ response: { data: { errors: ['1'] } } } as any)
      expect(err.firstMessage).toEqual('1')
    })

    it('creates an error with a status property', () => {
      let err = new ResourceError({} as any)
      expect(err.status).toBeUndefined()

      err = new ResourceError({ response: {} } as any)
      expect(err.status).toBeUndefined()

      err = new ResourceError({ response: { status: 200 } } as any)
      expect(err.status).toEqual(200)
    })
  })
})
