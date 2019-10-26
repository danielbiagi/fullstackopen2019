import React from 'react'
import '@testing-library/dom'
import {render, fireEvent} from '@testing-library/react'
import {prettyDOM, getByText} from '@testing-library/dom'

import SimpleBlog from './SimpleBlog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Daniel Biagi',
  url: 'http://www.danielbiagi.dev/blog/post1',
  likes: 1,
  user: '5d92bc40f1ae44733e54b07c'
}

test('renders content', () => {
  const component = render(
    <SimpleBlog blog={blog} onClick={() => console.log('clicked!!')} />
  )

  const domBlog = component.container.querySelector('blog')

  console.log(prettyDOM(domBlog))

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent('Daniel Biagi')
  expect(component.container).toHaveTextContent('1 likes')
})

test('clicking the like button twice', () => {
  const mockHandler = jest.fn()

  const {getByText} = render(<SimpleBlog blog={blog} onClick={mockHandler} />)

  let domBlog = document.querySelector('blog')

  console.log(prettyDOM(domBlog))

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
  domBlog = document.querySelector('blog')
  console.log(prettyDOM(domBlog))
})
