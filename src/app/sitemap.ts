import { MetadataRoute } from 'next'

import { ICategoryOne, ICategoryResponse } from '@/types/category.types'
import { IPostResponse } from '@/types/post.types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const resPost = await fetch(`${process.env.SERVER_URL}/category/news`, {
    cache: 'no-cache'
  })

  const resCategoryHomeVillage = await fetch(
    `${process.env.SERVER_URL}/category?type=home-village`,
    {
      cache: 'no-cache'
    }
  )

  const resCategoryBuilderBase = await fetch(
    `${process.env.SERVER_URL}/category?type=builder-base`,
    {
      cache: 'no-cache'
    }
  )

  const resHomeVillage = await fetch(
    `${process.env.SERVER_URL}/post?categoryType=home-village`,
    {
      cache: 'no-cache'
    }
  )

  const resBuilderBase = await fetch(
    `${process.env.SERVER_URL}/post?categoryType=builder-base`,
    {
      cache: 'no-cache'
    }
  )

  const homeVillage: ICategoryResponse = await resCategoryHomeVillage.json()
  const builderBase: ICategoryResponse = await resCategoryBuilderBase.json()
  const homeVillagePosts: IPostResponse = await resHomeVillage.json()
  const builderBasePosts: IPostResponse = await resBuilderBase.json()
  const post: ICategoryOne = await resPost.json()

  const builderBasePostsWiki: MetadataRoute.Sitemap = homeVillagePosts.data.map(
    elem => ({
      url: `${process.env.BASE_URL}/${elem.category.slug}/${elem.slug}`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.7
    })
  )

  const homeVillagePostsWiki: MetadataRoute.Sitemap = homeVillagePosts.data.map(
    elem => ({
      url: `${process.env.BASE_URL}/${elem.category.slug}/${elem.slug}`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.7
    })
  )

  const homeVillageWiki: MetadataRoute.Sitemap = homeVillage.data.map(elem => ({
    url: `${process.env.BASE_URL}/${elem.slug}`,
    lastModified: new Date(),
    changeFrequency: 'hourly',
    priority: 0.7
  }))

  const builderBaseWiki: MetadataRoute.Sitemap = builderBase.data.map(elem => ({
    url: `${process.env.BASE_URL}/${elem.slug}`,
    lastModified: new Date(),
    changeFrequency: 'hourly',
    priority: 0.7
  }))

  const posts: MetadataRoute.Sitemap = post.posts.data.map(elem => ({
    url: `${process.env.BASE_URL}/news/${elem.slug}`,
    lastModified: new Date(),
    changeFrequency: 'hourly',
    priority: 0.7
  }))

  return [
    {
      url: `${process.env.BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1
    },
    {
      url: `${process.env.BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8
    },
    {
      url: `${process.env.BASE_URL}/home-village`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8
    },
    {
      url: `${process.env.BASE_URL}/builder-base`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8
    },
    ...posts,
    ...homeVillageWiki,
    ...builderBaseWiki,
    ...homeVillagePostsWiki,
    ...builderBasePostsWiki
  ]
}
