import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Table} from 'semantic-ui-react'

const UserList = props => {
  return (
    <div>
      <Table basic selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Blogs added</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <Link to={`/users/${user.id}`}>
                  <p>{user.name}</p>
                </Link>
              </Table.Cell>
              <Table.Cell>
                <Link to={`/users/${user.id}`}>
                  <p>{user.blogs.length}</p>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const ConnectedUserList = connect(mapStateToProps, null)(UserList)

export default ConnectedUserList
