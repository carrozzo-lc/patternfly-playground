import { Component, Suspense } from 'react'
import type { ComponentType, ReactNode } from 'react'
import {
  Alert,
  Bullseye,
  Button,
  Content,
  Label,
  PageSection,
  Spinner,
  Stack,
  StackItem,
  Title,
} from '@patternfly/react-core'
import type { ExperimentDefinition, ExperimentVersion } from './experiments'
import { ExperimentNotes } from './ExperimentNotes'

class ExperimentErrorBoundary extends Component<{ children: ReactNode; errorTitle?: string }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert isInline variant="danger" title={this.props.errorTitle ?? 'Unable to load this experiment'}>
          <Content component="p">Reload the page to try again.</Content>
          <Button variant="link" onClick={() => window.location.reload()}>Reload page</Button>
        </Alert>
      )
    }
    return this.props.children
  }
}

interface ExperimentPageProps {
  experiment: ExperimentDefinition
  version: ExperimentVersion
  children: ReactNode
  notes?: ComponentType
}

export function ExperimentPage({ experiment, version, children, notes: Notes }: ExperimentPageProps) {
  return (
    <>
      <PageSection>
        <Stack hasGutter>
          <StackItem><a href="#/">All experiments</a></StackItem>
          <StackItem>
            <Title headingLevel="h1" size="2xl">{experiment.title}</Title>
          </StackItem>
          <StackItem><Label>{version.id}</Label></StackItem>
          <StackItem><Content component="p">{experiment.description}</Content></StackItem>
          {Notes && (
            <StackItem>
              <ExperimentNotes context={`${experiment.title} · ${version.id}`}>
                <ExperimentErrorBoundary errorTitle="Unable to load implementation notes">
                  <Suspense fallback={<Bullseye><Spinner aria-label="Loading implementation notes" /></Bullseye>}>
                    <Notes />
                  </Suspense>
                </ExperimentErrorBoundary>
              </ExperimentNotes>
            </StackItem>
          )}
        </Stack>
      </PageSection>
      <PageSection aria-label="Interactive experiment">
        <ExperimentErrorBoundary>
          <Suspense fallback={<Bullseye><Spinner aria-label="Loading experiment" /></Bullseye>}>
            {children}
          </Suspense>
        </ExperimentErrorBoundary>
      </PageSection>
    </>
  )
}
