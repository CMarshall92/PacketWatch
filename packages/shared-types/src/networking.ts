export interface NetworkResponse<T> {
  status: number
  data?: T | undefined
  message?: string | undefined
}