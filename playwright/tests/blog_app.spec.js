const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
        loginWith(page, 'mluukkai', 'salainen')
        await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        loginWith(page, 'mluukkai', 'wrong')

        const errorDiv = page.locator('.error')
        await expect(errorDiv).toContainText('Wrong credentials')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

        await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        loginWith(page, 'mluukkai', 'salainen')
      })

      test('a new blog can be created', async ({ page }) => {
        createBlog(page, 'A blog created from playwright', 'Playwright Author', 'https://example.com')
        await expect(page.getByText('A blog created from playwright by Playwright Author')).toBeVisible()
      })

      test('a blog can be liked', async ({ page }) => {
        createBlog(page, 'A blog to like', 'Playwright Author', 'https://example.com')
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('a blog can be deleted by the same user', async ({ page }) => {
        createBlog(page, 'A blog to delete', 'Playwright Author', 'https://example.com')
        await page.getByRole('button', { name: 'view' }).click()
        page.on('dialog', dialog => dialog.accept());
        await page.getByRole('button', { name: 'delete' }).click()
        await expect(page.getByText('A blog to delete by Playwright Author')).not.toBeVisible()
      })
    })
  })
})