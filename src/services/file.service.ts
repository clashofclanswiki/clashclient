import { IFiles } from '@/types/file.types'

import { axiosWithAuth } from '@/api/interceptors'

class FileService {
  private BASE_URL = '/files'

  async getAllFiles() {
    const response = await axiosWithAuth.get<IFiles[]>(this.BASE_URL)
    return response.data
  }

  async create(files: File[]) {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('image', file)
    })
    const response = await axiosWithAuth.post<IFiles[]>(
      this.BASE_URL,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response.data
  }
}

export const fileService = new FileService()
