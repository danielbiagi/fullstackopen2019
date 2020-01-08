import React from 'react'
import {connect} from 'react-redux'
import {Header, List} from 'semantic-ui-react'

const UserDetails = props => {
  if (props.user === undefined) {
    return null
  }

  return (
    <div>
      <Header as="h1">{props.user.name}</Header>
      <Header as="h2">Added blogs</Header>
      <List>
        {props.user.blogs.map(blog => (
          <List.Item key={blog.id}>
            {blog.title} by {blog.author}
          </List.Item>
        ))}
      </List>
    </div>
  )
}

const mapStateToProps = (state, props) => {
  const {id} = props

  return {
    user: state.users.find(user => user.id === id)
  }
}

const ConnectedUserDetails = connect(mapStateToProps, null)(UserDetails)

export default ConnectedUserDetails
