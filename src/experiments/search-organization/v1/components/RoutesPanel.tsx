import { useState } from 'react'
import { Button, Card, CardBody, Panel, PanelHeader, PanelMain, Title, TreeView } from '@patternfly/react-core'
import type { TreeViewDataItem } from '@patternfly/react-core'
import { AngleDoubleDownIcon, AngleDoubleUpIcon } from '@patternfly/react-icons'
import { demoRoutes } from '../demoData'
import styles from '../Workspace.module.css'

function leafIds(item: TreeViewDataItem): string[] {
  return item.children ? item.children.flatMap(leafIds) : item.id ? [item.id] : []
}

function withCheckedState(item: TreeViewDataItem, selected: ReadonlySet<string>): TreeViewDataItem {
  const ids = leafIds(item)
  const count = ids.filter((id) => selected.has(id)).length
  return {
    ...item,
    checkProps: { checked: count === ids.length ? true : count === 0 ? false : null },
    children: item.children?.map((child) => withCheckedState(child, selected)),
  }
}

export function RoutesPanel() {
  const [selected, setSelected] = useState(() => new Set(demoRoutes.slice(0, 3).map((route) => route.id)))
  const [allExpanded, setAllExpanded] = useState<boolean | undefined>(undefined)
  const networks = [...new Set(demoRoutes.map((route) => route.network))]
  const data = networks.map((network, index) => {
    const routes = demoRoutes.filter((route) => route.network === network)
    return withCheckedState({
      id: `network-${index}`,
      name: `Network ${network}`,
      defaultExpanded: index === 0,
      children: [...new Set(routes.map((route) => route.nation))].map((nation) => ({
        id: `network-${index}-${nation}`,
        name: `Nation ${nation}`,
        children: routes.filter((route) => route.nation === nation).map((route) => ({ id: route.id, name: route.name })),
      })),
    }, selected)
  })

  return (
    <Panel className={styles.routesPanel}>
      <PanelHeader className={styles.routesHeader}>
        <Title id="routes-heading" headingLevel="h2" size="lg">Routes</Title>
      </PanelHeader>
      <PanelMain>
        <Card isCompact className={styles.routesCard}>
          <CardBody>
            <div className={styles.selectionSummary}>
              <span role="status">{selected.size} / {demoRoutes.length} SELECTED</span>
              <div className={styles.selectionActions}>
                <Button variant="link" isInline onClick={() => setSelected(new Set(demoRoutes.map((route) => route.id)))}>Select All</Button>
                <Button variant="link" isInline onClick={() => setSelected(new Set())}>Deselect All</Button>
              </div>
            </div>
            <div className={styles.controlSlot}>Search + grouping</div>
            <div className={styles.routeGroups}>
              <Button
                variant="link"
                isInline
                className={styles.expandAction}
                icon={allExpanded ? <AngleDoubleUpIcon /> : <AngleDoubleDownIcon />}
                onClick={() => setAllExpanded(!allExpanded)}
              >
                {allExpanded ? 'Collapse all' : 'Expand all'}
              </Button>
              <TreeView
                aria-label="Routes by network and nation"
                data={data}
                hasCheckboxes
                allExpanded={allExpanded}
                onCheck={(event, item) => {
                  const checked = event.target.checked
                  setSelected((current) => {
                    const next = new Set(current)
                    leafIds(item).forEach((id) => checked ? next.add(id) : next.delete(id))
                    return next
                  })
                }}
              />
            </div>
          </CardBody>
        </Card>
      </PanelMain>
    </Panel>
  )
}
