import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Header, Table} from 'semantic-ui-react'
import Togglable from '../components/Togglable'
import NewBlog from '../components/NewBlog'

const BlogList = props => {
  if (
    props.blogs === undefined ||
    props.blogs === null ||
    props.user === null ||
    props.user.username === undefined
  )
    return null

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const blogsToShow =
    props.user === undefined ||
    props.user === null ||
    props.user.username === undefined ||
    props.user.username === null
      ? props.blogs
      : props.blogs.filter(
          blog =>
            blog.user.username.toLowerCase() ===
            props.user.username.toLowerCase()
        )

  const newBlogRef = React.createRef()

  return (
    <>
      <Header as="h1">Blogs</Header>
      <Togglable buttonLabel="new blog" ref={newBlogRef}>
        <NewBlog newBlogRef={newBlogRef} ownerId={props.user.id} />
      </Togglable>
      <Table selectable inverted>
        <Table.Body>
          {blogsToShow.sort(byLikes).map(blog => (
            <Table.Row key={blog.id}>
              <Table.Cell>
                <Link to={`/blogs/${blog.id}`}>
                  <p>
                    <strong>{blog.title}</strong>
                  </p>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const ConnectedBlogList = connect(mapStateToProps, null)(BlogList)

export default ConnectedBlogList
