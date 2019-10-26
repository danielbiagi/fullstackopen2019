import React from 'react'
import '@testing-library/dom'
import {render, fireEvent} from '@testing-library/react'
import {prettyDOM, getByText} from '@testing-library/dom'

import Blog from './Blog'
import Togglable from './Togglable'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Daniel Biagi',
  url: 'http://www.danielbiagi.dev/blog/post1',
  likes: 1,
  user: '5d92bc40f1ae44733e54b07c'
}
describe('Blog tests', () => {
  test('checking if Blog consists title and author', () => {
    const component = render(<Blog blog={blog} />)

    const domBlog = component.container.querySelector('blog')

    console.log(prettyDOM(domBlog))

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent('Daniel Biagi')
  })

  // test('clicking the like button twice', () => {
  //   const mockHandler = jest.fn()

  //   const component = render(<Blog blog={blog} onClick={mockHandler} />)

  //   let domBlog = document.querySelector('blog')

  //   console.log(prettyDOM(domBlog))

  //   const div = getByText('div')
  //   fireEvent.click(div)

  //   expect(domBlog.container).toHaveTextContent('1 likes')
  // })

  test('checking togglable', () => {
    const mockHandler = jest.fn()
    const component = render(<Blog blog={blog} onClick={mockHandler} />)
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
    fireEvent.click(div)
    expect(div).not.toHaveStyle('display: none')
  })
})
