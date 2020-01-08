import loginService from '../services/login'
import blogService from '../services/blogs'
import {setNotification} from './notificationReducer'

export const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const login = credentials => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setNotification({notification: 'logged in'}, 4000)

      dispatch({
        type: 'LOGIN',
        user
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export const logout = () => {
  return async (dispatch, getState) => {
    const user = getState().user

    window.localStorage.removeItem('loggedBlogAppUser')

    setNotification({notification: 'logged out'}, 4000)

    dispatch({
      type: 'LOGOUT',
      user
    })
    window.location.reload(true)
  }
}

export const setUser = user => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      user
    })

    blogService.setToken(user.token)
  }
}
export default userReducer
