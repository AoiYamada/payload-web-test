import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import type { Course as CourseType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import TimeSlot from '@/components/sections/TimeSlot'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'courses',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  let { slug = '' } = await paramsPromise
  slug = decodeURIComponent(slug)

  if (!slug) {
    return <PayloadRedirects url="/" />
  }

  const url = `/courses/${slug}`

  let course: CourseType | null

  course = await queryCourseBySlug({
    slug,
  })

  if (!course) {
    return <PayloadRedirects url={url} />
  }

  const {
    hero,
    // introduction,
    description,
    timeSlots,
  } = course

  return (
    <MaxWidthWrapper>
      <article className="pt-8 pb-16">
        {/* Allows redirects for valid pages too */}
        <PayloadRedirects disableNotFound url={url} />
        <RenderHero {...hero} />
        <RenderBlocks blocks={description} />
        {timeSlots ? <TimeSlot slots={timeSlots} /> : null}
      </article>
    </MaxWidthWrapper>
  )
}

export async function generateMetadata({ params: paramsPromise }): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryCourseBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryCourseBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'courses',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
