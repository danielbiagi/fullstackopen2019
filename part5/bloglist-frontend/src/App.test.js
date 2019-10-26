import React from 'react'
import {render, waitForElement} from '@testing-library/react'
import {prettyDOM, getByText} from '@testing-library/dom'
jest.mock('./services/blog')
import App from './App'

describe('<App />', () => {
  jest.setTimeout(23000)
  test('renders all blogs it gets from backend', async () => {
    jest.setTimeout(23000)
    const component = render(<App />)
    component.rerender(<App />)
    await waitForElement(() => component.container.querySelector('.blog'))

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(4)

    expect(component.container).toHaveTextContent('This is a test')
    expect(component.container).toHaveTextContent('How to make enemies')
    expect(component.container).toHaveTextContent('Mongo DB Collections')
    expect(component.container).toHaveTextContent('Agora vai'), 30000
  })
  test('if no user logged, blogs are not rendered', async () => {
    jest.setTimeout(23000)
    const component = render(<App />)
    await waitForElement(() => component.getAllByText('login'))

    const login = component.container.querySelector('.login')

    expect(login).toBeDefined()

    const blogs = component.container.querySelector('.blog')

    expect(blogs).toBeNull()
  })
  test('if user is logged, blogs are rendered', async () => {
    jest.setTimeout(23000)
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }
    localStorage.setItem('loggedInUser', JSON.stringify(user))

    const component = render(<App />)
    await waitForElement(() => component.container.querySelector('.blog'))

    const blogs = component.container.querySelector('.blog')

    expect(blogs.length).toBe(4)
  })
})
