/** Fictional fixtures for this experiment; no operational product data. */
export interface DemoRoute {
  id: string
  name: string
  network: string
  nation: string
  type: 'Type A' | 'Type B' | 'Type C'
}

export const demoRoutes: readonly DemoRoute[] = [
  { id: 'route-01', name: 'Sample Route 01', network: 'Group A', nation: 'A', type: 'Type A' },
  { id: 'route-02', name: 'Example Route 02', network: 'Group A', nation: 'A', type: 'Type B' },
  { id: 'route-03', name: 'Example Route 03', network: 'Group A', nation: 'B', type: 'Type B' },
  { id: 'route-04', name: 'Example Route 04', network: 'Group A', nation: 'C', type: 'Type C' },
  { id: 'route-05', name: 'Sample Route 05', network: 'Group B', nation: 'A', type: 'Type A' },
  { id: 'route-06', name: 'Example Route 06', network: 'Group B', nation: 'B', type: 'Type C' },
  { id: 'route-07', name: 'Sample Route 07', network: 'Group C', nation: 'A', type: 'Type B' },
  { id: 'route-08', name: 'Example Route 08', network: 'Group C', nation: 'C', type: 'Type C' },
]
