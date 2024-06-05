import { IPostResponse } from './post.types'
import { IBase } from './root.types'

export interface ICategory extends IBase {
  title: string
  description: string
  slug: string
  type: string
  posts: IPostResponse
}

export interface ICategoryOne {
  data: ICategory
  posts: IPostResponse
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
