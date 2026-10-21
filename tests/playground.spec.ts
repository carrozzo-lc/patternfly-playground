import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

async function expectCatalog(page: Page) {
  await expect(page.getByRole('heading', { name: 'Experiments', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible()
}

test('loads the home with PF6 styling and no browser errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('requestfailed', (request) => errors.push(request.url()))
  await page.goto('./')
  await expect(page.getByRole('heading', { name: 'Experiments', exact: true })).toBeVisible()
  await expectCatalog(page)
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Experiments' })).toHaveAttribute('aria-current', 'page')
  await page.evaluate(() => document.fonts.ready)
  expect(await page.locator('body').evaluate((body) => getComputedStyle(body).fontFamily)).toContain('Red Hat')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  expect(await page.getByRole('main').evaluate((main) => main.scrollWidth <= main.clientWidth)).toBe(true)
  expect(errors).toEqual([])
})

test('supports navigation, direct links, reload, and browser history', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('navigation').getByRole('link', { name: 'About', exact: true }).click()
  await expect(page).toHaveURL(/#\/about$/)
  await expect(page.getByRole('heading', { name: 'About this playground' })).toBeVisible()
  await expect(page.getByRole('main')).toBeFocused()
  await expect(page).toHaveTitle('About this playground | PatternFly playground')
  await page.reload()
  await expect(page.getByText('PatternFly 6.7.0', { exact: true })).toBeVisible()
  await page.goBack()
  await expectCatalog(page)
  await page.goto('./#/about')
  await expect(page.getByRole('heading', { name: 'About this playground' })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  expect(await page.getByRole('main').evaluate((main) => main.scrollWidth <= main.clientWidth)).toBe(true)
})

test('handles unavailable experiment links without a blank screen', async ({ page }) => {
  await page.goto('./#/experiments/missing/v1')
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
  await page.getByRole('link', { name: 'Back to experiments' }).click()
  await expectCatalog(page)
})

test('offers a keyboard skip link without changing the hash route', async ({ page }) => {
  await page.goto('./#/about')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('main')).toBeFocused()
  await expect(page).toHaveURL(/#\/about$/)
})
