'use client'

// import { Header } from '@/payload-types'
import { useRowLabel } from '@payloadcms/ui'

// type Tab = NonNullable<Header['tabs']>[number]
type Tab = {
  label: string
  navItems: NavItem[]
}

export const Tabs = () => {
  const { data } = useRowLabel<Tab>()

  return data.label || '...'
}

// type NavItem = NonNullable<Tab['navItems']>[number]
type NavItem = {
  style: 'default' | 'featured' | 'list'
  defaultLink?: {
    link: {
      label: string
    }
  }
  featuredLink?: {
    tag: string
  }
  listLinks?: {
    tag: string
  }
}

export const NavItem = () => {
  const { data } = useRowLabel<NavItem>()

  console.log(data, 'here?')

  if (data.style === 'default') {
    return data.defaultLink?.link.label
  }

  if (data.style === 'featured') {
    return data.featuredLink?.tag
  }

  if (data.style === 'list') {
    return data.listLinks?.tag
  }

  return '...'
}
