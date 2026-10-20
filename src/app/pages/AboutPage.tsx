import {
  Card,
  CardBody,
  CardTitle,
  Content,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  PageSection,
  Stack,
  StackItem,
  Title,
} from '@patternfly/react-core'
import { dependencies } from '../../../package.json'

export function AboutPage() {
  return (
    <>
      <PageSection isWidthLimited>
        <Stack hasGutter>
          <StackItem><Title headingLevel="h1" size="2xl">About this playground</Title></StackItem>
          <StackItem>
            <Content component="p">
              A space to explore components, compare proposals, and review interactions built with PatternFly 6.
            </Content>
          </StackItem>
        </Stack>
      </PageSection>
      <PageSection isWidthLimited aria-label="Playground information">
        <Stack hasGutter>
          <StackItem>
            <Card>
              <CardTitle component="h2">Environment</CardTitle>
              <CardBody>
                <DescriptionList>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Design system</DescriptionListTerm>
                    <DescriptionListDescription>PatternFly {dependencies['@patternfly/react-core']}</DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>React</DescriptionListTerm>
                    <DescriptionListDescription>{dependencies.react}</DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Demo content</DescriptionListTerm>
                    <DescriptionListDescription>Fictional data</DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </CardBody>
            </Card>
          </StackItem>
          <StackItem>
            <Card>
              <CardTitle component="h2">Reviewing an experiment</CardTitle>
              <CardBody>
                <Content>
                  <p>Each experiment has a direct link to a specific proposal version. Share the full URL to open that version directly.</p>
                  <p>Experiments are prototypes. They are used to review behavior and feasibility before product implementation.</p>
                  <p>All experiments share the PatternFly version shown above.</p>
                  <p><a href="https://www.patternfly.org/">PatternFly documentation</a></p>
                </Content>
              </CardBody>
            </Card>
          </StackItem>
        </Stack>
      </PageSection>
    </>
  )
}
