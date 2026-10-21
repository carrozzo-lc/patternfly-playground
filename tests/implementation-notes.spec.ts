import { expect, test } from '@playwright/test'

// Keep the documentation checks independent of the external map provider.
test.beforeEach(async ({ page }) => {
  await page.route('https://www.openstreetmap.org/export/embed.html**', (route) =>
    route.fulfill({ contentType: 'text/html', body: '<html lang="en"><body>Map preview</body></html>' }),
  )
})

test('loads version notes on demand and closes with Escape back to the trigger', async ({ page }) => {
  const noteRequests: string[] = []
  page.on('request', (request) => {
    if (/ImplementationNotes-[^/]+\.js/.test(request.url())) noteRequests.push(request.url())
  })
  await page.goto('./#/experiments/search-organization/v1')
  const trigger = page.getByRole('button', { name: 'Implementation notes', exact: true })
  await expect(trigger).toBeVisible()
  await expect(page.getByRole('searchbox', { name: 'Search routes', exact: true })).toBeVisible()
  expect(noteRequests).toHaveLength(0)
  await trigger.focus()
  await page.keyboard.press('Enter')
  const dialog = page.getByRole('dialog', { name: 'Implementation notes', exact: true })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByText('Search and organization · v1', { exact: true })).toBeVisible()
  await expect(dialog.getByRole('heading', { name: '1. What this example demonstrates', exact: true })).toBeVisible()
  expect(noteRequests).toHaveLength(1)
  const body = dialog.getByRole('region', { name: 'Implementation notes content', exact: true })
  await expect(body).toBeFocused()
  await expect(dialog.getByRole('table', { name: 'Building blocks of SearchOrganizationBar', exact: true })).toBeAttached()
  await expect(dialog.getByRole('link', { name: 'SearchOrganizationBar.module.css — exposed variables and extra CSS', exact: true })).toHaveAttribute('href', /github\.com\/carrozzo-lc\/patternfly-playground\/blob\/develop\/src\/experiments\/search-organization\/v1\/components\/SearchOrganizationBar\.module\.css$/)
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await expect(page).toHaveURL(/#\/experiments\/search-organization\/v1$/)
})

test('scrolls within the modal, traps focus, and preserves the experiment state after closing', async ({ page }) => {
  await page.goto('./#/experiments/search-organization/v1')
  const search = page.getByRole('searchbox', { name: 'Search routes', exact: true })
  await search.fill('Alpha')
  const trigger = page.getByRole('button', { name: 'Implementation notes', exact: true })
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'Implementation notes', exact: true })
  const body = dialog.getByRole('region', { name: 'Implementation notes content', exact: true })
  await expect(dialog.getByRole('heading', { name: '1. What this example demonstrates', exact: true })).toBeVisible()
  for (let index = 0; index < 12; index++) {
    await page.keyboard.press('Tab')
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true)
  }
  const source = dialog.getByRole('link', { name: 'search-organization.spec.ts — browser checks', exact: true })
  await source.scrollIntoViewIfNeeded()
  await expect(source).toBeVisible()
  expect(await body.evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
  expect(await body.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true)
  const box = await dialog.boundingBox()
  if (!box) throw new Error('Missing notes dialog')
  expect(box.x).toBeGreaterThanOrEqual(0)
  expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize()!.width)
  await dialog.getByRole('button', { name: 'Close', exact: true }).last().click()
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await expect(search).toHaveValue('Alpha')
  await trigger.click()
  await expect(dialog).toBeVisible()
  await dialog.getByRole('button', { name: 'Close', exact: true }).first().click()
  await expect(dialog).not.toBeVisible()
})
