export interface IBase {
  id: string
  createdAt?: string
  updatedAt?: string
}

export interface RouteParams {
  params: {
    slug: string
  }
}

export interface RouteWikiParams {
  params: {
    wiki: string
  }
}
