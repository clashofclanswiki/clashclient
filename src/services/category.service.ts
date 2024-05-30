import {
  ICategory,
  ICategoryDate,
  ICategoryResponse
} from '@/types/category.types'

import { axiosClassic, axiosWithAuth } from '@/api/interceptors'

class CategoryService {
  private BASE_URL = '/category'

  async getCategorys(skip: number, take: number, title: string) {
    const response = await axiosClassic.get<ICategoryResponse>(this.BASE_URL, {
      params: { skip, take, title }
    })
    return response.data
  }

  async create(data: ICategoryDate) {
    const response = await axiosWithAuth.post<ICategory>(this.BASE_URL, data)
    return response.data
  }

  async getFullInfoCategory(slug: string) {
    const response = await axiosClassic.get<ICategory>(
      `${this.BASE_URL}/${slug}`
    )
    return response.data
  }

  async update(data: ICategoryDate, oldSlug: string) {
    const response = await axiosWithAuth.put<ICategory>(
      `${this.BASE_URL}/${oldSlug}`,
      data
    )
    return response.data
  }

  async remove(slug: string) {
    const response = await axiosWithAuth.delete<ICategory>(
      `${this.BASE_URL}/${slug}`
    )
    return response.data
  }
}

export const categoryService = new CategoryService()
