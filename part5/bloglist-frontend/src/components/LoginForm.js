/* eslint-disable react/no-typos */
import React from 'react'
import PropTypes from 'prop-types'
import {createInputField} from '../utils'

const LoginForm = ({username, password, onSubmit}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
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

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm
