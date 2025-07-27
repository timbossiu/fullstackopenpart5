import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('does render <Blog> with title and author', () => {
  const blog = {
    title: 'This is a title',
    author: 'This is an author',
  }

  const currentUser = vi.fn()


  const {container} = render(<Blog blog={blog} currentUser={currentUser} />)

  const element = container.querySelector('.blog-class')
  expect(element).toBeDefined()
  const titleElement = element.querySelector('.blog-title-author')
  expect(titleElement).toBeDefined()
  expect(titleElement).toHaveTextContent('This is a title This is an author')
})

test('does show <Blog> likes and url after clicking button', async () => {
  const user = userEvent.setup()
  const blog = {
    title: 'This is a title',
    author: 'This is an author',
    url: 'https://example.com',
    likes: 5,
  }

  const currentUser = vi.fn()

  const {container} = render(<Blog blog={blog} currentUser={currentUser} />)

  const element = container.querySelector('.blog-class')
  expect(element).toBeDefined()
  const showButton = element.querySelector('.show-button')
  await userEvent.click(showButton)
  const showSection = element.querySelector('.show-section')
  expect(showSection).not.toHaveStyle('display: none')
  expect(showSection).toHaveTextContent('https://example.com')
  expect(showSection).toHaveTextContent('likes 5')
})

test('clicks on <Blog> likes two times', async () => {
  const user = userEvent.setup()
  const blog = {
    title: 'This is a title',
    author: 'This is an author',
    url: 'https://example.com',
    likes: 5,
  }

  const currentUser = vi.fn()
  const updateLikes = vi.fn()

  render(<Blog blog={blog} currentUser={currentUser} updateBlogLikes={updateLikes} />)

  const showButton = screen.getByText('view')
  await user.click(showButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(updateLikes.mock.calls).toHaveLength(2)
})