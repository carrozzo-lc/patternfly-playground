import { useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle } from '@patternfly/react-core'
import { sortingOptions } from '../organizationOptions'
import type { SortBy } from '../organizationOptions'
import { SearchOrganizationBar } from './SearchOrganizationBar'
import styles from '../Workspace.module.css'

export function MovementMissionDetailsCard() {
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortBy>('departure-asc')
  return (
    <Card isCompact component="section" aria-labelledby="movement-mission-heading" className={styles.detailCard}>
      <CardHeader className={styles.detailHeader}>
        <CardTitle component="h2" id="movement-mission-heading">Movement mission details</CardTitle>
      </CardHeader>
      <CardBody className={styles.detailBody}>
        <div className={`${styles.placeholderRegion} ${styles.detailSummary}`}>Mission summary</div>
        <SearchOrganizationBar
          searchLabel="Search mission legs"
          placeholder="Search for route, leg, origin, destination..."
          query={query}
          onQueryChange={setQuery}
          label="Sort by"
          value={sortBy}
          options={sortingOptions}
          onValueChange={setSortBy}
        />
        <div className={`${styles.placeholderRegion} ${styles.detailResults}`}>Mission legs</div>
      </CardBody>
    </Card>
  )
}
