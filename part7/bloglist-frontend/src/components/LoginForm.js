/* eslint-disable react/no-typos */
import React from 'react'
import {connect} from 'react-redux'
import {createInputField} from '../utils'
import {useField} from '../hooks'
import {setNotification} from '../reducers/notificationReducer'
import {login, logout} from '../reducers/userReducer'

const LoginForm = props => {
  const [username] = useField('text')
  const [password] = useField('password')

  const handleLogin = async event => {
    event.preventDefault()
    const credentials = {
      username: username.value,
      password: password.value
    }

    props.login(credentials)
    props.setNotification(`Welcome, ${credentials.username}!`, 4000)
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input {...createInputField(username)} />
        </div>
        <div>
          password: <input {...createInputField(password)} />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  login,
  logout,
  setNotification
}

const ConnectedLoginForm = connect(
  null,
  mapDispatchToProps
)(LoginForm)

export default ConnectedLoginForm
