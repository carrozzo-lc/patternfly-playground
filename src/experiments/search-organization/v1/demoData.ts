/** Fictional fixtures for this experiment; no operational product data. */
export interface DemoRoute {
  id: string
  name: string
  network: string
  nation: string
  type: 'Road' | 'Air' | 'Sea'
}

export const demoRoutes: readonly DemoRoute[] = [
  { id: 'route-01', name: 'Alpha — Bravo', network: 'Demo Road', nation: 'France', type: 'Road' },
  { id: 'route-02', name: 'Bravo — Charlie', network: 'Demo Road', nation: 'France', type: 'Road' },
  { id: 'route-03', name: 'Delta — Echo', network: 'Demo Road', nation: 'Germany', type: 'Road' },
  { id: 'route-04', name: 'Foxtrot — Golf', network: 'Demo Road', nation: 'Italy', type: 'Road' },
  { id: 'route-05', name: 'Airfield Alpha — Bravo', network: 'Demo Air', nation: 'France', type: 'Air' },
  { id: 'route-06', name: 'Airfield Charlie — Delta', network: 'Demo Air', nation: 'Germany', type: 'Air' },
  { id: 'route-07', name: 'Port Alpha — Bravo', network: 'Demo Sea', nation: 'France', type: 'Sea' },
  { id: 'route-08', name: 'Port Charlie — Delta', network: 'Demo Sea', nation: 'Italy', type: 'Sea' },
]
