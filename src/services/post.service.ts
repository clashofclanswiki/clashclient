import { IPost, IPostDate, IPostResponse } from '@/types/post.types'
import { IUser } from '@/types/user.types'

import { axiosClassic, axiosWithAuth } from '@/api/interceptors'

export interface IProfileResponse {
  user: IUser
}

class PostService {
  private BASE_URL = '/post'

  async getPosts(skip: number, take: number, title: string) {
    const response = await axiosWithAuth.get<IPostResponse>(this.BASE_URL, {
      params: { skip, take, title }
    })
    return response.data
  }

  async create(data: IPostDate) {
    const response = await axiosWithAuth.post<IPost>(this.BASE_URL, data)
    return response.data
  }

  async getFullInfo(slug: string) {
    const response = await axiosClassic.get<IPost>(`${this.BASE_URL}/${slug}`)
    return response.data
  }

  async update(data: IPostDate, oldSlug: string) {
    const response = await axiosWithAuth.put<IPost>(
      `${this.BASE_URL}/${oldSlug}`,
      data
    )
    return response.data
  }

  async remove(slug: string) {
    const response = await axiosWithAuth.delete<IPost>(
      `${this.BASE_URL}/${slug}`
    )
    return response.data
  }
}

export const postService = new PostService()
