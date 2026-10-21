import type { ComponentType } from 'react'

export interface ExperimentVersion {
  id: string
  load: () => Promise<{ default: ComponentType }>
  loadNotes?: () => Promise<{ default: ComponentType }>
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
    description: 'Option 1 · Joined search and organization controls: group Routes by Nation or Type, and select a sort order in the Movement Mission layout preview.',
    versions: [
      {
        id: 'v1',
        load: () => import('../experiments/search-organization/v1/Experiment'),
        loadNotes: () => import('../experiments/search-organization/v1/ImplementationNotes'),
      },
    ],
  },
]

export function experimentPath(slug: string, version: string): string {
  return `/experiments/${encodeURIComponent(slug)}/${encodeURIComponent(version)}`
}
