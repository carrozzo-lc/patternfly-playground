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
export const experiments: readonly ExperimentDefinition[] = []

export function experimentPath(slug: string, version: string): string {
  return `/experiments/${encodeURIComponent(slug)}/${encodeURIComponent(version)}`
}
