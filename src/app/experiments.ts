import type { ComponentType } from 'react'

export interface ExperimentVersion {
  id: string
  load: () => Promise<{ default: ComponentType }>
}

export interface ExperimentDefinition {
  slug: string
  title: string
  description: string
  versions: readonly ExperimentVersion[]
}

// Register a version only when its demo is ready to open and review.
export const experiments: readonly ExperimentDefinition[] = [
  {
    slug: 'search-organization',
    title: 'Search and organization',
    description: 'Option 1 · Layout preview with a map, routes panel, and movement mission detail card.',
    versions: [
      {
        id: 'v1',
        load: () => import('../experiments/search-organization/v1/Experiment'),
      },
    ],
  },
]

export function experimentPath(slug: string, version: string): string {
  return `/experiments/${encodeURIComponent(slug)}/${encodeURIComponent(version)}`
}
