const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen'
      }})
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByText('log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await page.getByTestId('username-input').fill('mluukkai')
        await page.getByTestId('password-input').fill('salainen')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await page.getByTestId('username-input').fill('mluukkai')
        await page.getByTestId('password-input').fill('wrong')
        await page.getByRole('button', { name: 'login' }).click()

        const errorDiv = page.locator('.error')
        await expect(errorDiv).toContainText('Wrong credentials')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

        await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await page.getByTestId('username-input').fill('mluukkai')
        await page.getByTestId('password-input').fill('salainen')
        await page.getByRole('button', { name: 'login' }).click()
      })

      test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        await page.getByTestId('title-input').fill('A blog created from playwright')
        await page.getByTestId('author-input').fill('Playwright Author')
        await page.getByTestId('url-input').fill('https://example.com')
        await page.getByRole('button', { name: 'save' }).click()

        await expect(page.getByText('A blog created from playwright by Playwright Author')).toBeVisible()
      })
    })
  })
})