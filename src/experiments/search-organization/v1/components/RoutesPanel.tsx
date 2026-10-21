import { Card, CardBody, Panel, PanelHeader, PanelMain, Title } from '@patternfly/react-core'
import styles from '../Workspace.module.css'

export function RoutesPanel() {
  return (
    <Panel className={styles.routesPanel}>
      <PanelHeader className={styles.routesHeader}>
        <Title id="routes-heading" headingLevel="h2" size="lg">Routes</Title>
      </PanelHeader>
      <PanelMain>
        <Card isCompact className={styles.routesCard}>
          <CardBody>
            <div className={styles.selectionPlaceholder}>Selection summary</div>
            <div className={styles.controlSlot}>Search + grouping</div>
            <div className={`${styles.placeholderRegion} ${styles.routeGroups}`}>Route groups</div>
          </CardBody>
        </Card>
      </PanelMain>
    </Panel>
  )
}
