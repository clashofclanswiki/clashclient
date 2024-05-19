import { IPost } from './post.types'
import { IBase } from './root.types'

export interface IUser extends IBase {
  email: string
  username: string | null
  isAdmin: boolean
  posts: IPost[]
}
