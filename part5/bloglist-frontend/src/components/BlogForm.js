import React from 'react'
import {createInputField} from '../utils'

const BlogForm = ({title, author, url, onSubmit}) => {
  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={onSubmit}>
        title:
        <input {...createInputField(title)} />
        <br />
        author:
        <input {...createInputField(author)} />
        <br />
        url:
        <input {...createInputField(url)} />
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
