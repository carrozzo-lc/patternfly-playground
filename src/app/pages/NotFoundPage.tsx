import { Button, EmptyState, EmptyStateActions, EmptyStateBody, EmptyStateFooter, PageSection } from '@patternfly/react-core'
import { SearchIcon } from '@patternfly/react-icons'

export function NotFoundPage() {
  return (
    <PageSection>
      <EmptyState headingLevel="h1" titleText="Page not found" icon={SearchIcon}>
        <EmptyStateBody>
          This link does not match an available page or experiment version.
        </EmptyStateBody>
        <EmptyStateFooter>
          <EmptyStateActions>
            <Button component="a" href="#/">Back to experiments</Button>
          </EmptyStateActions>
        </EmptyStateFooter>
      </EmptyState>
    </PageSection>
  )
}
