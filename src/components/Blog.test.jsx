import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('does not render this', () => {
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