import React, {useState} from 'react'

const Blog = ({blog, onClick, onMouseDown, user}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible} onClick={toggleVisibility}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {blog.title} {blog.author}
        <br />
        <a href={blog.url}>{blog.url}</a>
        <br />
        {blog.likes} likes <button onClick={onClick}>like</button>
        <br />
        added by {blog.user.username}
        <br />
        {user !== null &&
        user !== undefined &&
        user.username === blog.user.username ? (
          <button onMouseDown={onMouseDown}>delete</button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Blog
