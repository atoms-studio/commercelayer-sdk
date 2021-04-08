import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ApiErrorMessage {
  title: string
  detail: string
  code: string
  status: string
  source?: { pointer: string }
  meta?: Record<string, any>
}

export const handleApiErrors = (error: any): ResourceError => {
  // Process axios error
  if (error.response) {
    return new ResourceError(error)
  }

  // Throw anything else
  throw error
}

export class ResourceError extends Error {
  public request: any
  public config?: AxiosRequestConfig
  public response?: AxiosResponse
  public messages: ApiErrorMessage[] = []
  public firstMessage?: ApiErrorMessage
  public status?: number
  public isResourceError = true

  constructor(axiosError: AxiosError) {
    super(`CommerceLayer API error`)
    Object.setPrototypeOf(this, ResourceError.prototype)

    this.request = axiosError.request
    this.response = axiosError.response
    this.config = axiosError.config

    if (this.response && this.response.data && this.response.data.errors) {
      this.messages = this.response.data.errors
    }

    if (this.messages.length) {
      this.firstMessage = this.messages[0]
    }

    if (this.response) {
      this.status = this.response.status
    }
  }
}