import { IBase } from './root.types'

export interface ICategory extends IBase {
  title: string
  description: string
  slug: string
  type: string
}

export interface ICategoryDate {
  title: string
  description: string
  slug: string
  type: string
}

export interface ICategoryResponse {
  data: ICategory[]
  total: number
  skip: number
  take: number
}
