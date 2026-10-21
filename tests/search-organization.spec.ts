import { expect, test } from '@playwright/test'

// Keep layout checks independent of the external map provider.
test.beforeEach(async ({ page }) => {
  await page.route('https://www.openstreetmap.org/export/embed.html**', (route) =>
    route.fulfill({ contentType: 'text/html', body: '<html lang="en"><body>Map preview</body></html>' }),
  )
})

test('opens the registered layout and supports a direct reload', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('list', { name: 'Search and organization versions' }).getByRole('link', { name: 'Open v1' }).click()
  await expect(page).toHaveURL(/#\/experiments\/search-organization\/v1$/)
  await expect(page.getByRole('heading', { name: 'Search and organization', exact: true })).toBeVisible()
  await expect(page.getByRole('region', { name: 'Map workspace' })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('complementary', { name: 'Routes', exact: true })).toBeVisible()
  await expect(page.getByRole('region', { name: 'Movement mission details', exact: true })).toBeVisible()
  await expect(page.getByText('Search + grouping', { exact: true })).toBeVisible()
  await expect(page.getByText('Search + sorting', { exact: true })).toBeVisible()
  await expect(page.getByTitle('OpenStreetMap — central Europe')).toHaveAttribute('src', /^https:\/\/www\.openstreetmap\.org\/export\/embed\.html\?/)
  await expect(page.getByRole('link', { name: /© OpenStreetMap contributors/ })).toBeVisible()
})

test('keeps the panels separate and stacks within narrow containers', async ({ page }) => {
  await page.goto('./#/experiments/search-organization/v1')
  const routes = page.getByRole('complementary', { name: 'Routes', exact: true })
  const details = page.getByRole('region', { name: 'Movement mission details', exact: true })
  const map = page.getByRole('region', { name: 'Map background', exact: true })
  await expect(routes).toBeVisible()
  await expect(details).toBeVisible()
  const workspaceBox = await page.getByRole('region', { name: 'Map workspace' }).boundingBox()
  const routesBox = await routes.boundingBox()
  const detailsBox = await details.boundingBox()
  const mapBox = await map.boundingBox()
  if (!workspaceBox || !routesBox || !detailsBox || !mapBox) throw new Error('Missing layout region')
  if (workspaceBox.width > 1000) {
    expect(routesBox.width).toBe(340)
    expect(detailsBox.width).toBe(430)
    expect(await details.locator(':scope > .pf-v6-c-card__body').evaluate((body) => body.scrollHeight <= body.clientHeight + 1)).toBe(true)
    expect(detailsBox.x).toBeGreaterThanOrEqual(routesBox.x + routesBox.width)
  } else {
    expect(mapBox.y).toBeGreaterThanOrEqual(routesBox.y + routesBox.height)
    expect(detailsBox.y).toBeGreaterThanOrEqual(mapBox.y + mapBox.height)
    expect(detailsBox.x).toBeGreaterThanOrEqual(workspaceBox.x)
    expect(detailsBox.x + detailsBox.width).toBeLessThanOrEqual(workspaceBox.x + workspaceBox.width)
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  expect(await page.getByRole('main').evaluate((main) => main.scrollWidth <= main.clientWidth)).toBe(true)
})


test('selects routes through parent checkboxes and bulk actions without changing the mission', async ({ page }) => {
  await page.goto('./#/experiments/search-organization/v1')
  const panel = page.getByRole('complementary', { name: 'Routes', exact: true })
  const summary = panel.getByRole('status')
  await expect(summary).toHaveText('3 / 8 SELECTED')
  await panel.getByRole('button', { name: 'Deselect All', exact: true }).click()
  await expect(summary).toHaveText('0 / 8 SELECTED')
  await panel.getByRole('button', { name: 'Expand all', exact: true }).click()
  const firstRoute = panel.getByRole('checkbox', { name: 'Alpha — Bravo', exact: true })
  await expect(firstRoute).toBeVisible()
  await firstRoute.focus()
  await page.keyboard.press('Space')
  await expect(summary).toHaveText('1 / 8 SELECTED')
  const roadNetwork = panel.getByRole('checkbox', { name: 'Network Demo Road', exact: true })
  await expect(roadNetwork).toBeChecked({ indeterminate: true })
  await roadNetwork.check()
  await expect(summary).toHaveText('4 / 8 SELECTED')
  await expect(panel.getByRole('checkbox', { name: 'Foxtrot — Golf', exact: true })).toBeChecked()
  await panel.getByRole('button', { name: 'Collapse all', exact: true }).click()
  await expect(firstRoute).not.toBeVisible()
  await panel.getByRole('button', { name: 'Select All', exact: true }).click()
  await expect(summary).toHaveText('8 / 8 SELECTED')
  await expect(page.getByRole('heading', { name: 'Movement mission details', exact: true })).toBeVisible()
  await expect(page.getByText('Mission legs', { exact: true })).toBeVisible()
})
