import { Card, CardBody, CardHeader, CardTitle } from '@patternfly/react-core'
import styles from '../Workspace.module.css'

export function MovementMissionDetailsCard() {
  return (
    <Card isCompact component="section" aria-labelledby="movement-mission-heading" className={styles.detailCard}>
      <CardHeader className={styles.detailHeader}>
        <CardTitle component="h2" id="movement-mission-heading">Movement mission details</CardTitle>
      </CardHeader>
      <CardBody className={styles.detailBody}>
        <div className={`${styles.placeholderRegion} ${styles.detailSummary}`}>Mission summary</div>
        <div className={styles.controlSlot}>Search + sorting</div>
        <div className={`${styles.placeholderRegion} ${styles.detailResults}`}>Mission legs</div>
      </CardBody>
    </Card>
  )
}
