import { useState } from 'react'
import { Button, Card, CardBody, Panel, PanelHeader, PanelMain, Title, TreeView } from '@patternfly/react-core'
import type { TreeViewDataItem } from '@patternfly/react-core'
import { AngleDoubleDownIcon, AngleDoubleUpIcon } from '@patternfly/react-icons'
import { demoRoutes } from '../demoData'
import { groupingOptions } from '../organizationOptions'
import type { GroupBy } from '../organizationOptions'
import { SearchOrganizationBar } from './SearchOrganizationBar'
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
  const [query, setQuery] = useState('')
  const [groupBy, setGroupBy] = useState<GroupBy>('nation')
  const searchTerm = query.trim().toLocaleLowerCase('en')
  const matchingRoutes = demoRoutes.filter((route) =>
    [route.name, route.network, route.nation, route.type].some((text) => text.toLocaleLowerCase('en').includes(searchTerm)),
  )
  const networks = [...new Set(matchingRoutes.map((route) => route.network))]
  const data = networks.map((network, index) => {
    const routes = matchingRoutes.filter((route) => route.network === network)
    return withCheckedState({
      id: `network-${index}`,
      name: `Network ${network}`,
      defaultExpanded: !!searchTerm || index === 0,
      children: [...new Set(routes.map((route) => route[groupBy]))].map((group) => ({
        id: `network-${index}-${groupBy}-${group}`,
        name: groupBy === 'nation' ? `Nation ${group}` : group,
        defaultExpanded: !!searchTerm,
        children: routes.filter((route) => route[groupBy] === group).map((route) => ({ id: route.id, name: route.name })),
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
              <span role="status" aria-label="Route selection">{selected.size} / {demoRoutes.length} SELECTED</span>
              <div className={styles.selectionActions}>
                <Button variant="link" isInline onClick={() => setSelected(new Set(demoRoutes.map((route) => route.id)))}>Select All</Button>
                <Button variant="link" isInline onClick={() => setSelected(new Set())}>Deselect All</Button>
              </div>
            </div>
            <SearchOrganizationBar
              searchLabel="Search routes"
              placeholder="Search routes..."
              query={query}
              onQueryChange={(nextQuery) => {
                setQuery(nextQuery)
                setAllExpanded(undefined)
              }}
              label="Group by"
              value={groupBy}
              options={groupingOptions}
              onValueChange={setGroupBy}
            />
            {searchTerm && (
              <p role="status" aria-label="Route search results" className={styles.searchFeedback}>
                {matchingRoutes.length === 0 ? 'No routes found.' : `${matchingRoutes.length} of ${demoRoutes.length} routes`}
              </p>
            )}
            <div className={styles.routeGroups}>
              <Button
                variant="link"
                isInline
                isDisabled={matchingRoutes.length === 0}
                className={styles.expandAction}
                icon={allExpanded ? <AngleDoubleUpIcon /> : <AngleDoubleDownIcon />}
                onClick={() => setAllExpanded(!allExpanded)}
              >
                {allExpanded ? 'Collapse all' : 'Expand all'}
              </Button>
              <TreeView
                key={`${groupBy}:${searchTerm}`}
                aria-label={`Routes by network and ${groupBy}`}
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
