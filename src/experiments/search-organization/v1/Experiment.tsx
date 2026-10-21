import { MapBackground } from './components/MapBackground'
import { RoutesPanel } from './components/RoutesPanel'
import { MovementMissionDetailsCard } from './components/MovementMissionDetailsCard'
import styles from './Workspace.module.css'

export default function Experiment() {
  return (
    <div className={styles.frame}>
      <section className={styles.workspace} aria-label="Map workspace">
        <aside className={styles.routesRegion} aria-labelledby="routes-heading">
          <RoutesPanel />
        </aside>
        <div className={styles.mapRegion}>
          <MapBackground />
          <MovementMissionDetailsCard />
        </div>
      </section>
    </div>
  )
}
