import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import {initializeBlogs} from './reducers/blogReducer'
import {login, logout, setUser} from './reducers/userReducer'
import {initializeUsers} from './reducers/usersReducer'
import Blog from './components/Blog'
import {Button, Menu} from 'semantic-ui-react'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const App = props => {
  useEffect(() => {
    props.initializeUsers()
    props.initializeBlogs()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // console.log('loggedUserJSON', loggedUserJSON)
      props.setUser(user)
    }
    // eslint-disable-next-line
  }, [])

  const handleLogout = () => {
    props.logout()
  }

  return (
    <div>
      <Router>
        <div>
          <Menu size="small" color="blue" inverted stackable>
            <Menu.Item name="home">
              <Link to="/">home</Link>
            </Menu.Item>
            <Menu.Item name="users">
              <Link to="/users">users</Link>
            </Menu.Item>
            <Menu.Item>
              <Button onClick={handleLogout}>log out</Button>
            </Menu.Item>
            <Menu.Item>{props.user.name}&nbsp;logged in</Menu.Item>
          </Menu>
          {props.user === undefined ||
          props.user === null ||
          props.user.name === undefined ? (
            <LoginForm />
          ) : null}
          <Notification />
        </div>
        <div>
          <div>
            <Route exact path="/" render={() => <BlogList />} />
            <Route
              exact
              path="/blogs/:id"
              render={({match, history}) => (
                <Blog id={match.params.id} history={history} />
              )}
            />
            <Route exact path="/users" render={() => <UserList />} />
            <Route
              exact
              path="/users/:id"
              render={({match}) => <UserDetails id={match.params.id} />}
            />
          </div>
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
    blogs: state.blogs,
    users: state.users,
    user: state.user
  }
}

const mapDispatchToProps = {
  login,
  logout,
  initializeUsers,
  initializeBlogs,
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
