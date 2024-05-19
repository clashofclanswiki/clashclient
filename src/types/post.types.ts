import { IBase } from './root.types'

export interface IPost extends IBase {
  title: string
  description: string
  slug: string
  countOpened: number
  image: string
  userId: string
  categoryId: string
}
