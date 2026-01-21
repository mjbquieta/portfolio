// Type definitions for the portfolio

export type Theme = 'light' | 'dark'

export interface Skill {
  name: string
  icon: string
  level: number // 1-5
  category: 'frontend' | 'backend' | 'cloud' | 'devops' | 'database' | 'ai'
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  image?: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface NavItem {
  label: string
  href: string
}
