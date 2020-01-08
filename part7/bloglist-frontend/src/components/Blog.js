import React from 'react'
import {connect} from 'react-redux'
import {useField} from '../hooks'
import {setNotification} from '../reducers/notificationReducer'
import {like, remove, newComment} from '../reducers/blogReducer'
import {Link, withRouter} from 'react-router-dom'
import {Header, List, Form, Button} from 'semantic-ui-react'

const Blog = props => {
  const [comment, commentReset] = useField('text')
  const blog = props.blogs.find(b => b.id === props.id)

  const handleSubmit = event => {
    event.preventDefault()
    createComment({
      ...blog,
      comments: [...blog.comments, comment.value],
      comment: comment.value
    })
    commentReset()
  }

  const like = () => {
    props.like(blog)
    props.setNotification(`${blog.title} liked!`, 4000)
  }
  const createComment = obj => {
    props.newComment(obj)
    props.setNotification(`${blog.title} comment added!`, 4000)
  }

  const remove = () => {
    if (window.confirm(`delete "${blog.title}" by ${blog.author}?`)) {
      props.remove(blog)
      props.setNotification(`${blog.title} removed!`, 4000)
      props.history.push('/')
    }
  }

  return blog === undefined || blog === null ? null : (
    <div>
      <div className="details">
        <Header as="h1">{blog.title}</Header>
        <a href={blog.url}>{blog.url}</a>
        <br />
        <Button
          content="Like"
          icon="heart"
          label={{as: 'a', basic: true, content: blog.likes}}
          labelPosition="right"
          onClick={() => like(blog)}
        />
        <div>
          added by&nbsp;
          {blog.user.id !== undefined &&
          blog.user.name !== undefined &&
          blog.user.name !== null ? (
            <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
          ) : (
            'someone'
          )}
        </div>
        {blog.user.username === props.user.username && (
          <Button negative onClick={() => remove(blog)}>
            remove{' '}
          </Button>
        )}
      </div>
      <div>
        <Header as="h2">Comments</Header>
        <List>
          {blog.comments !== undefined &&
            blog.comments.map(comment => (
              <List.Item key={comment.id}>{comment}</List.Item>
            ))}
        </List>
        <Form onSubmit={handleSubmit}>
          <div>
            comment:
            <input {...comment} />
          </div>
          <Form.Button primary type="submit">
            comment
          </Form.Button>
        </Form>
      </div>
    </div>
  )
}

const BlogHistory = withRouter(Blog)

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  like,
  remove,
  setNotification,
  newComment
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(BlogHistory)

export default ConnectedBlog
