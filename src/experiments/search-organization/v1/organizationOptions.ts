import type { OrganizationOption } from './components/SearchOrganizationBar'

export type GroupBy = 'nation' | 'type'
export type SortBy = 'departure-asc' | 'departure-desc' | 'arrival-asc' | 'arrival-desc'

export const groupingOptions: readonly OrganizationOption<GroupBy>[] = [
  { value: 'nation', label: 'Nation' },
  { value: 'type', label: 'Type' },
]

export const sortingOptions: readonly OrganizationOption<SortBy>[] = [
  { value: 'departure-asc', label: 'Departure ↑', accessibleLabel: 'Departure ascending' },
  { value: 'departure-desc', label: 'Departure ↓', accessibleLabel: 'Departure descending' },
  { value: 'arrival-asc', label: 'Arrival ↑', accessibleLabel: 'Arrival ascending' },
  { value: 'arrival-desc', label: 'Arrival ↓', accessibleLabel: 'Arrival descending' },
]
