import styles from '../Workspace.module.css'

// Generic geographic context, independent of any product or operational data.
const mapUrl = 'https://www.openstreetmap.org/export/embed.html?bbox=3.8%2C45.2%2C8.8%2C49.0&layer=mapnik'

export function MapBackground() {
  return (
    <section className={styles.mapSurface} aria-label="Map background">
      <iframe
        className={styles.mapFrame}
        title="OpenStreetMap — central Europe"
        src={mapUrl}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <div className={styles.mapCaption}>
        <a href="https://www.openstreetmap.org/#map=7/47.1/6.3" target="_blank" rel="noreferrer">
          Open map <span className="pf-v6-screen-reader">in a new tab</span>
        </a>
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">
          © OpenStreetMap contributors<span className="pf-v6-screen-reader"> (opens in a new tab)</span>
        </a>
      </div>
    </section>
  )
}
