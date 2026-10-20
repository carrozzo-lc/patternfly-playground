import { Link } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardTitle,
  Content,
  EmptyState,
  EmptyStateBody,
  Gallery,
  PageSection,
  Stack,
  StackItem,
  Title,
} from '@patternfly/react-core'
import { CubesIcon } from '@patternfly/react-icons'
import { experiments, experimentPath } from '../experiments'

export function HomePage() {
  return (
    <>
      <PageSection isWidthLimited>
        <Stack hasGutter>
          <StackItem><Title headingLevel="h1" size="2xl">Experiments</Title></StackItem>
          <StackItem>
            <Content component="p">Explore and review interactive PatternFly 6 prototypes.</Content>
          </StackItem>
        </Stack>
      </PageSection>
      <PageSection isWidthLimited aria-label="Available experiments">
        {experiments.length === 0 ? (
          <EmptyState headingLevel="h2" titleText="No experiments yet" icon={CubesIcon}>
            <EmptyStateBody>
              New experiments will appear here with a direct link to each version.
            </EmptyStateBody>
          </EmptyState>
        ) : (
          <Gallery hasGutter minWidths={{ default: '280px' }}>
            {experiments.map((experiment) => (
              <Card key={experiment.slug}>
                <CardTitle component="h2">{experiment.title}</CardTitle>
                <CardBody>
                  <Stack hasGutter>
                    <StackItem><Content component="p">{experiment.description}</Content></StackItem>
                    <StackItem>
                      <Content component="ul" aria-label={`${experiment.title} versions`}>
                        {experiment.versions.map((version) => (
                          <li key={version.id}>
                            <Link to={experimentPath(experiment.slug, version.id)}>
                              Open {version.id}
                            </Link>
                          </li>
                        ))}
                      </Content>
                    </StackItem>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </Gallery>
        )}
      </PageSection>
    </>
  )
}
