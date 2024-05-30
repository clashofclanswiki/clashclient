import { ICategory } from './category.types'
import { IBase } from './root.types'

export interface IPost extends IBase {
  title: string
  description: string
  slug: string
  countOpened?: number
  content?: string | undefined
  pictures?: string[]
  image?: string
  userId?: string
  categoryId?: string
  category?: ICategory | null
}

export interface IPostDate {
  title: string
  description: string
  slug: string
  content: string
  image: string
  category: string
}

export interface IPostResponse {
  data: IPost[]
  total: number
  skip: number
  take: number
}
