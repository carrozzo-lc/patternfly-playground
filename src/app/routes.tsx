import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppLayout } from './AppLayout'
import { experiments, experimentPath } from './experiments'
import { ExperimentPage } from './ExperimentPage'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { NotFoundPage } from './pages/NotFoundPage'

const experimentRoutes = experiments.flatMap((experiment) =>
  experiment.versions.map((version) => ({
    experiment,
    version,
    path: experimentPath(experiment.slug, version.id),
    Component: lazy(version.load),
    Notes: version.loadNotes ? lazy(version.loadNotes) : undefined,
  })),
)

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        {experimentRoutes.map(({ experiment, version, path, Component, Notes }) => (
          <Route
            key={path}
            path={path}
            element={
              <ExperimentPage key={path} experiment={experiment} version={version} notes={Notes}>
                <Component />
              </ExperimentPage>
            }
          />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
