import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import BlogForm from './BlogForm'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Daniel Biagi',
  url: 'http://www.danielbiagi.dev/blog/post1',
  likes: 1,
  user: '5d92bc40f1ae44733e54b07c'
}
const Wrapper = props => {
  const onChange = event => {
    props.state.value = event.target.value
  }

  return (
    <BlogForm
      value={props.state.value}
      onSubmit={props.onSubmit}
      handleBlogTitleChange={onChange}
    />
  )
}

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const onSubmit = jest.fn()
  const state = {
    value: ''
  }

  const component = render(<Wrapper onSubmit={onSubmit} state={state} />)

  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')

  fireEvent.change(input, {target: {value: 'testing of forms could be easier'}})
  fireEvent.submit(form)

  expect(onSubmit.mock.calls.length).toBe(1)
  expect(state.value).toBe('testing of forms could be easier')
})
